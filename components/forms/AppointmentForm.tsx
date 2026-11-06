"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { submitForm, type FormState } from "@/app/actions";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

const input = "";
const label = "fld";

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

  return (
    <form action={action} className="form" noValidate={false}>
      <input type="hidden" name="form_type" value={type} />
      <input type="hidden" name="form_t" value={renderedAt} />
      <input type="hidden" name="source" value={source} />
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden" inert>
        <label>Company <input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <h2>{isAppt ? "Book a visit" : "Write to us"}</h2>
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

      <label className={label}>Patient name
        <input required name="name" autoComplete="name" aria-invalid={!!errs.name} className={input} />
      </label>
      <label className={label}>Mobile
        <input required name="mobile" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" placeholder="10-digit mobile" autoComplete="tel-national" aria-invalid={!!errs.mobile} className={input} />
      </label>

      {isAppt && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>Age
              <input name="age" type="number" min="0" max="120" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} className={input} />
            </label>
            <label className={label}>In
              <select name="age_unit" className={input}>
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>Doctor
              <select name="doctor" defaultValue={defaultDoctor} className={input}>
                <option value="dr-lakshmi-vijay-kalbande">Dr. Lakshmi Kalbande</option>
                <option value="dr-ashish-baviskar">Dr. Ashish Baviskar</option>
                <option value="any">Either doctor</option>
              </select>
            </label>
            <label className={label}>Reason
              <select name="reason" defaultValue={defaultReason} className={input}>
                <option value="pregnancy-care">Pregnancy care</option>
                <option value="womens-health">Women's health</option>
                <option value="heart-and-vessels">Heart and vessels</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>Preferred date
              <input name="date" type="date" className={input} />
            </label>
            <label className={label}>Time of day
              <select name="time_of_day" className={input}>
                <option value="">Any time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening, Sunday 4 pm to 6 pm</option>
              </select>
            </label>
          </div>
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

      <label className="flex min-h-12 cursor-pointer items-start gap-3 text-[15px] text-ink-2">
        <input required type="checkbox" name="consent" className="mt-1 size-5 accent-blue" aria-invalid={!!errs.consent} />
        {site.formConsentLine} <a href="/privacy-policy/" className="text-blue underline">Read our privacy policy</a>
      </label>
      {errs.consent && <p className="-mt-3 text-[14px] font-medium text-alert">{errs.consent[0]}</p>}
      {errs.form && <p className="text-[14px] font-medium text-alert">{errs.form[0]}</p>}

      <button
        type="submit"
        disabled={pending}
        className="min-h-14 justify-self-start rounded-full bg-[image:var(--grad-brand)] px-8 text-[16px] font-semibold text-white shadow-card disabled:opacity-60"
      >
        {pending ? "Sending…" : isAppt ? "Request an appointment" : "Send message"}
      </button>
      <p className="t-fine text-ink-2">
        Please do not include detailed medical information. For urgent symptoms call us or come in.
      </p>
    </form>
  );
}
