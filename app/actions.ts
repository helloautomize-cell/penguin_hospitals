"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

const appointmentSchema = z.object({
  form_type: z.literal("appointment"),
  name: z.string().trim().min(2, "Please enter the patient's name.").max(80),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile starting 6 to 9.")),
  age: z.string().trim().optional(),
  age_unit: z.enum(["years", "months"]).default("years"),
  doctor: z.string().max(80).optional(),
  reason: z.string().max(80).optional(),
  date: z.string().optional(),
  time_of_day: z.string().max(40).optional(),
  city: z.string().max(60).optional(),
  under18: z.string().optional(),
  guardian_name: z.string().trim().max(80).optional(),
  consent: z.literal("on", { error: "Please tick the consent box." }),
  company: z.string().max(0).optional(), // honeypot
  form_t: z.string().optional(), // render timestamp
  turnstile_token: z.string().optional(),
  source: z.string().max(200).optional(),
});

const contactSchema = appointmentSchema.omit({
  form_type: true, age: true, age_unit: true, doctor: true, reason: true,
  date: true, time_of_day: true, under18: true, guardian_name: true,
}).extend({
  form_type: z.literal("contact"),
  message: z.string().trim().min(5, "Please write a short message.").max(1000),
});

export type FormState = {
  errors?: Record<string, string[]>;
  serverError?: boolean;
};

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // keys not set: honeypot + timing only
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  }).then((r) => r.json()).catch(() => null);
  return res?.success === true;
}

function istNow() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

async function sendEmail(rows: [string, string][], source: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CLINIC_EMAIL ?? "penguinhospitals@gmail.com";
  const from = process.env.RESEND_FROM; // verified sender, [CONFIRM: domain]
  const html = `<h2>${source}</h2><p>${istNow()} IST</p><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="border:1px solid #ccc"><b>${k}</b></td><td style="border:1px solid #ccc">${v}</td></tr>`)
    .join("")}</table><p>Mobile: <a href="tel:+91${rows.find(r=>r[0]==="Mobile")?.[1]}">${rows.find(r=>r[0]==="Mobile")?.[1]}</a> · <a href="https://wa.me/91${rows.find(r=>r[0]==="Mobile")?.[1]}">WhatsApp</a></p>`;
  if (!key || !from) {
    // preview/dev: log the email, still succeed (production launch-check requires keys)
    console.log("[email-preview]", source, JSON.stringify(rows));
    if (process.env.NODE_ENV === "production" && process.env.REQUIRE_EMAIL === "1") {
      throw new Error("email not configured");
    }
    return;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `${source} — ${rows.find(r=>r[0]==="Name")?.[1] ?? "new request"}`,
    html,
  });
  if (error) throw new Error(error.message);
}

export async function submitForm(_prev: FormState, fd: FormData): Promise<FormState> {
  const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
  const parsed = raw.form_type === "contact" ? contactSchema.safeParse(raw) : appointmentSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] = [...(errors[String(i.path[0])] ?? []), i.message];
    return { errors };
  }
  const d = parsed.data as Record<string, string | undefined>;

  // under-18 guardian block
  const ageN = parseInt(d.age ?? "", 10);
  const underAge = !isNaN(ageN) && (d.age_unit === "months" ? ageN < 216 : ageN < 18);
  if (underAge && d.under18 !== "on")
    return { errors: { under18: ["For patients under 18, please tick the guardian consent box."] } };
  if (d.under18 === "on" && underAge && !d.guardian_name?.trim())
    return { errors: { guardian_name: ["Guardian name is required for patients under 18."] } };

  // min fill time: 3s
  const t = parseInt(d.form_t ?? "0", 10);
  if (t && Date.now() - t < 3000) return { errors: { form: ["Something went wrong. Please try again."] } };

  if (!(await verifyTurnstile(d.turnstile_token)))
    return { errors: { form: ["Verification failed. Please try again."] } };

  const isAppt = d.form_type === "appointment";
  const rows: [string, string][] = [
    ["Name", d.name!],
    ["Mobile", d.mobile!],
    ...(isAppt
      ? ([
          ["Age", d.age ? `${d.age} ${d.age_unit}` : "not given"],
          ["Doctor", d.doctor || "any"],
          ["Reason", d.reason || "not given"],
          ["Preferred date", d.date || "not given"],
          ["Time of day", d.time_of_day || "not given"],
          ["Guardian", d.guardian_name || "-"],
        ] as [string, string][])
      : ([["Message", d.message!]] as [string, string][])),
    ["City", d.city || "-"],
    ["Source page", d.source || "direct"],
    ["Submitted", istNow() + " IST"],
    ["Consent", "I agree that Penguin Hospital may contact me about this request. Please do not include detailed medical information in this form. — ticked " + istNow() + " IST"],
  ];

  try {
    await sendEmail(rows, isAppt ? "Appointment request" : "Contact message");
  } catch {
    return { serverError: true };
  }
  redirect(`/thank-you/?type=${isAppt ? "appointment" : "contact"}`);
}
