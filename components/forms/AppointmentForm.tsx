"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { submitForm, type FormState } from "@/app/actions";
import { site } from "@/lib/site-config";
import { doctors } from "@/lib/doctors";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

const input = "";
const label = "fld";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function nextDays(n: number) {
  const out: { iso: string; day: string; num: number; mon: string; sun: boolean }[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
    out.push({
      iso,
      day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : DAY_NAMES[t.getDay()],
      num: t.getDate(),
      mon: MONTHS[t.getMonth()],
      sun: t.getDay() === 0,
    });
  }
  return out;
}

const REASONS = [
  { v: "pregnancy-care", t: "Pregnancy care", doc: "dr-lakshmi-vijay-kalbande" },
  { v: "womens-health", t: "Women's health", doc: "dr-lakshmi-vijay-kalbande" },
  { v: "heart-and-vessels", t: "Heart and vessels", doc: "dr-ashish-baviskar" },
  { v: "other", t: "Something else", doc: "" },
];

function ErrorSummary({ errors }: { errors: Record<string, string[]> }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), [errors]);
  const items = Object.entries(errors);
  if (!items.length) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="callem outline-none"
    >
      <p className="text-[15px] font-semibold text-alert">Please check these fields:</p>
      <ul className="mt-1.5 list-disc pl-5 text-[15px] text-ink">
        {items.map(([k, msgs]) => (
          <li key={k}>{msgs[0]}</li>
        ))}
      </ul>
    </div>
  );
}

export function AppointmentForm({
  type = "appointment",
  defaultDoctor = "",
  defaultReason = "",
  source = "",
}: {
  type?: "appointment" | "contact";
  defaultDoctor?: string;
  defaultReason?: string;
  source?: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm, {});
  const [renderedAt] = useState(() => Date.now());
  const [age, setAge] = useState("");
  const errs = state.errors ?? {};
  const ageN = parseInt(age, 10);
  const underAge = !isNaN(ageN) && ageN < 18;
  const isAppt = type === "appointment";

  /* mobile 3-step state */
  const [step, setStep] = useState(1);
  const [docPick, setDocPick] = useState(defaultDoctor || "any");
  const [reasPick, setReasPick] = useState(defaultReason || "");
  const [datePick, setDatePick] = useState("");
  const [timePick, setTimePick] = useState("");
  const [ageUnit, setAgeUnit] = useState("years");
  const [altDate, setAltDate] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const days = nextDays(14);

  const next = () => {
    const f = formRef.current;
    if (f) {
      const els = f.querySelectorAll<HTMLElement>(`[data-step="${step}"] :is(input,select,textarea)`);
      for (const el of Array.from(els)) {
        const inp = el as HTMLInputElement;
        if (!inp.checkValidity()) {
          inp.reportValidity();
          return;
        }
      }
    }
    setStep((s) => Math.min(3, s + 1));
  };

  return (
    <form ref={formRef} action={action} className={`form${isAppt ? " steps" : ""}`} data-cur={step} noValidate={false}>
      <input type="hidden" name="form_type" value={type} />
      <input type="hidden" name="form_t" value={renderedAt} />
      <input type="hidden" name="source" value={source} />
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden" inert>
        <label>Company <input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <h2>{isAppt ? "Book a visit" : "Write to us"}</h2>

      {isAppt && (
        <div className="fbarw" aria-hidden="true">
          <div className="fbar">
            <i style={{ transform: `scaleX(${step / 3})` }} />
          </div>
          <ol className="ftabs">
            {["Who", "When", "Confirm"].map((t, i) => (
              <li key={t} className={step === i + 1 ? "on" : step > i + 1 ? "done" : ""}>
                <b>{i + 1}</b> {t}
              </li>
            ))}
          </ol>
        </div>
      )}
      {state.errors && <ErrorSummary errors={errs} />}

      {state.serverError && (
        <div role="alert" className="callem">
          <p className="text-[15px] font-semibold text-alert">
            We could not send your request just now. Your details are still here.
          </p>
          <div className="mt-3 flex gap-3">
            <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 text-[15px] font-semibold text-white no-underline">
              <Phone className="size-4" /> Call
            </a>
            <a href={whatsappLink("my appointment request")} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wa px-5 text-[15px] font-semibold text-white no-underline">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* step 1: who (doctor cards + reason chips) */}
      {isAppt && (
        <div className="fui" data-step="1">
          <p className="fstep-t">Who do you want to see?</p>
          <div className="fdocs" role="group" aria-label="Choose doctor">
            {doctors.map((d) => (
              <button
                type="button"
                key={d.slug}
                className={`fdoc${docPick === d.slug ? " on" : ""}`}
                aria-pressed={docPick === d.slug}
                onClick={() => setDocPick(d.slug)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.portrait} alt="" />
                <b>{d.name} {d.nameSoft}</b>
                <span>{d.shortRole}</span>
              </button>
            ))}
            <button
              type="button"
              className={`fdoc fany${docPick === "any" ? " on" : ""}`}
              aria-pressed={docPick === "any"}
              onClick={() => setDocPick("any")}
            >
              <b>Either doctor</b>
              <span>First free slot</span>
            </button>
          </div>
          <p className="fstep-t">What is it about?</p>
          <div className="fchips" role="group" aria-label="Reason for visit">
            {REASONS.filter((r) => !r.doc || docPick === "any" || r.doc === docPick).map((r) => (
              <button
                type="button"
                key={r.v}
                className={`fchip${reasPick === r.v ? " on" : ""}`}
                aria-pressed={reasPick === r.v}
                onClick={() => setReasPick(r.v)}
              >
                {r.t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* step 2: when (date pills + time pills) */}
      {isAppt && (
        <div className="fui" data-step="2">
          <p className="fstep-t">Pick a day</p>
          <div className="fdays" role="group" aria-label="Preferred date">
            {days.map((d) => (
              <button
                type="button"
                key={d.iso}
                className={`fday${datePick === d.iso ? " on" : ""}`}
                aria-pressed={datePick === d.iso}
                onClick={() => setDatePick(d.iso)}
              >
                <small>{d.day}</small>
                <b>{d.num}</b>
                <small>{d.sun ? "evening" : d.mon}</small>
              </button>
            ))}
          </div>
          {!altDate && (
            <button type="button" className="falt" onClick={() => setAltDate(true)}>
              <CalendarDays className="ico" aria-hidden="true" /> Pick another date
            </button>
          )}
          <p className="fstep-t">What time suits you?</p>
          <div className="fchips" role="group" aria-label="Time of day">
            {[
              { v: "morning", t: "Morning" },
              { v: "evening", t: "Evening" },
            ].map((t) => (
              <button
                type="button"
                key={t.v}
                className={`fchip${timePick === t.v ? " on" : ""}`}
                aria-pressed={timePick === t.v}
                onClick={() => setTimePick(t.v)}
              >
                {t.t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div data-step={isAppt ? 3 : undefined}>
        <label className={label}>Patient name
          <input required name="name" autoComplete="name" aria-invalid={!!errs.name} className={input} />
        </label>
        <label className={label}>Mobile
          <input required name="mobile" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" placeholder="10-digit mobile" autoComplete="tel-national" aria-invalid={!!errs.mobile} className={input} />
        </label>
      </div>

      {isAppt && (
        <>
          <div className="grid gap-4 sm:grid-cols-2" data-step="3">
            <label className={label}>Age
              <input name="age" type="number" min="0" max="120" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} className={input} />
            </label>
            <label className={label} data-fsel="age_unit">In
              <select name="age_unit" value={ageUnit} onChange={(e) => setAgeUnit(e.target.value)} className={input}>
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </label>
            <div className="fseg" role="group" aria-label="Age in years or months">
              {["years", "months"].map((u) => (
                <button
                  type="button"
                  key={u}
                  className={ageUnit === u ? "on" : ""}
                  aria-pressed={ageUnit === u}
                  onClick={() => setAgeUnit(u)}
                >
                  {u === "years" ? "Years" : "Months"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-step="1">
            <label className={label} data-fsel>
              Doctor
              <select name="doctor" value={docPick} onChange={(e) => setDocPick(e.target.value)} className={input}>
                <option value="dr-lakshmi-vijay-kalbande">Dr. Lakshmi Kalbande</option>
                <option value="dr-ashish-baviskar">Dr. Ashish Baviskar</option>
                <option value="any">Either doctor</option>
              </select>
            </label>
            <label className={label} data-fsel>
              Reason
              <select name="reason" value={reasPick} onChange={(e) => setReasPick(e.target.value)} className={input}>
                <option value="">Choose</option>
                <option value="pregnancy-care">Pregnancy care</option>
                <option value="womens-health">{"Women's health"}</option>
                <option value="heart-and-vessels">Heart and vessels</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className={`grid gap-4 sm:grid-cols-2${altDate ? " altd" : ""}`} data-step="2">
            <label className={label} data-fsel="date">Preferred date
              <input name="date" type="date" value={datePick} onChange={(e) => setDatePick(e.target.value)} className={input} />
            </label>
            <label className={label} data-fsel>Time of day
              <select name="time_of_day" value={timePick} onChange={(e) => setTimePick(e.target.value)} className={input}>
                <option value="">Any time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening, Sunday 4 pm to 6 pm</option>
              </select>
            </label>
          </div>
          <div data-step={3}>
            <label className={label}>City or area (optional)
              <input name="city" autoComplete="address-level2" className={input} />
            </label>
            {underAge && (
              <div className="grid gap-3 rounded-input border border-line bg-ice p-4">
                <label className="flex min-h-12 cursor-pointer items-start gap-3 text-[15px] text-ink">
                  <input type="checkbox" name="under18" className="mt-1 size-5 accent-blue" />
                  The patient is under 18. I am a parent or guardian and I agree to be contacted.
                </label>
                {errs.under18 && <p className="text-[14px] font-medium text-alert">{errs.under18[0]}</p>}
                <label className={label}>Guardian name
                  <input name="guardian_name" autoComplete="name" aria-invalid={!!errs.guardian_name} className={input} />
                </label>
              </div>
            )}
          </div>
        </>
      )}

      {!isAppt && (
        <>
          <label className={label}>City or area (optional)
            <input name="city" className={input} />
          </label>
          <label className={label}>Message
            <textarea name="message" required rows={4} className={`${input} h-auto py-3`} />
          </label>
        </>
      )}

      <div data-step={isAppt ? 3 : undefined}>
        <label className="flex min-h-12 cursor-pointer items-start gap-3 text-[15px] text-ink-2">
          <input required type="checkbox" name="consent" className="mt-1 size-5 accent-blue" aria-invalid={!!errs.consent} />
          {site.formConsentLine} <Link href="/privacy-policy/" className="text-blue underline">Read our privacy policy</Link>
        </label>
        {errs.consent && <p className="-mt-3 text-[14px] font-medium text-alert">{errs.consent[0]}</p>}
        {errs.form && <p className="text-[14px] font-medium text-alert">{errs.form[0]}</p>}

        <button
          type="submit"
          disabled={pending}
          className="fsubmit min-h-14 justify-self-start rounded-full bg-[image:var(--grad-brand)] px-8 text-[16px] font-semibold text-white shadow-card disabled:opacity-60"
        >
          {pending ? "Sending…" : isAppt ? "Request an appointment" : "Send message"}
        </button>
        <p className="t-fine text-ink-2">
          Please do not include detailed medical information. For urgent symptoms call us or come in.
        </p>
      </div>

      {isAppt && (
        <div className="fnav" data-step-nav>
          <button type="button" className="fback" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
            <ChevronLeft className="ico" aria-hidden="true" /> Back
          </button>
          <button type="button" className="fnext" onClick={next} disabled={step === 3}>
            {step === 3 ? "Check your details" : "Next"} <ChevronRight className="ico" aria-hidden="true" />
          </button>
        </div>
      )}
    </form>
  );
}
