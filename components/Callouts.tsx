import Image from "next/image";
import { CalendarDays, Phone, ShieldAlert, TriangleAlert } from "lucide-react";
import { site } from "@/lib/site-config";
import { doctors } from "@/lib/doctors";
import { whatsappLink } from "@/lib/whatsapp";
import { doctorImageSrcFor } from "@/lib/doctor-images.server";
import { doctorSlot } from "@/lib/doctor-images";
import { FallbackFlag } from "./DoctorImage";
import { WhatsAppIcon } from "./icons";
import { Button } from "./Button";

/** Emergency callout (.callem) inside prose. */
export function EmergencyCallout({ children, items, title = "When to get help straight away." }: { children?: React.ReactNode; items?: string[]; title?: string }) {
  if (items?.length)
    return (
      <div className="callem" role="note">
        <TriangleAlert className="ico" aria-hidden="true" />
        <p>
          <b>{title}</b> {items.join(" ")} Call 108 or 112, or come to our emergency entrance. Do not
          wait for an appointment.
        </p>
      </div>
    );
  return (
    <div className="callem" role="note">
      <TriangleAlert className="ico" aria-hidden="true" />
      {children ?? (
        <p>
          <b>{site.emergencyLine}</b>, or come to our emergency entrance. Do not wait for an
          appointment.
        </p>
      )}
    </div>
  );
}

/** Reviewer box (.rev). */
export function ReviewerBox({
  name,
  qualifications,
  lastReviewed,
  portrait,
  doctor,
}: {
  name: string;
  qualifications: string;
  lastReviewed: React.ReactNode;
  portrait?: string;
  /** Doctor slug/name; resolves the matching headshot slot. */
  doctor?: string;
}) {
  const img = portrait ?? doctorImageSrcFor(doctor ?? "lakshmi", "Headshot");
  return (
    <div className="rev rv">
      <Image src={img} alt="" width={48} height={48} />
      <p>
        Medically reviewed by <b>{name}</b>
        {qualifications ? `, ${qualifications}` : ""}. Last reviewed {lastReviewed}. This page
        explains general information. It does not replace an examination by a doctor.
      </p>
    </div>
  );
}

/** PCPNDT compliance line (.pcp). */
export function PcpndtLine({ className = "" }: { className?: string }) {
  return (
    <p className={`pcp ${className}`}>
      <ShieldAlert className="ico" aria-hidden="true" />
      {site.pcpndtLine}
    </p>
  );
}

/** Closing CTA band (.cta > .ctaw). */
export function CtaBand({
  title = "Talk to a specialist at Penguin Hospital.",
  text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta">
      <div className="wrap">
        <div className="ctaw rv">
          <div>
            <h2>{title}</h2>
            <p>
              {text ??
                `Book a visit, call ${site.phone.display} or message us on WhatsApp.`}
            </p>
          </div>
          <div className="ctas">
            <Button variant="primary" href="/book/">
              <CalendarDays className="ico" aria-hidden="true" />
              Book a visit
            </Button>
            <Button variant="glass" href={`tel:${site.phone.tel}`}>
              <Phone className="ico" aria-hidden="true" />
              Call
            </Button>
            <Button variant="glass" href={whatsappLink("a visit")}>
              <WhatsAppIcon className="ico" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Doctor band (.docband) used on hubs. */
export function DocBand({ doctorIndex = 0 }: { doctorIndex?: number }) {
  const d = doctors[doctorIndex];
  const romans = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];
  return (
    <div className="docband rv">
      <div className="ph">
        <Image src={doctorImageSrcFor(d.slug, "Hero")} alt={`${d.name} ${d.nameSoft}`} width={400} height={500} />
        <FallbackFlag slot={doctorSlot(d.slug, "Hero")} />
      </div>
      <div>
        <span className="tag">
          <i></i>Your doctor
        </span>
        <h3 style={{ marginTop: 18 }}>
          {d.name} {d.nameSoft}
        </h3>
        <p className="role">{d.role}</p>
        <span className="note">{d.marginNote.replace(/\.$/, "")}</span>
        <ul>
          {d.principles.map((p, i) => (
            <li key={p}>
              <b>{romans[i] ?? `${i + 1}.`}</b>
              {p}.
            </li>
          ))}
        </ul>
        <div className="ctas">
          <Button variant="navy" href={`/book/?doctor=${d.slug}`}>
            {d.bookingLabel}
          </Button>
          <Button variant="outline" href={d.profileHref}>
            Doctor profile
          </Button>
        </div>
      </div>
    </div>
  );
}
