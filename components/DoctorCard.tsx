import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ConfirmChip } from "./Tag";
import { DoctorImg, FallbackFlag } from "./DoctorImage";
import { doctorSlot } from "@/lib/doctor-images";
import type { Doctor } from "@/lib/doctors";

/** Home + profile doctor block (.doc/.ph/.idcard/.three/.note). */
export function DoctorCard({ doctor, flip = false }: { doctor: Doctor; flip?: boolean }) {
  return (
    <article className={`doc${flip ? " flip" : ""}`}>
      <div className="ph rv">
        <div className="frame">
          <DoctorImg who={doctor.slug} kind="Hero" />
        </div>
        <FallbackFlag slot={doctorSlot(doctor.slug, "Hero")} text="CONFIRM: new 4:5 portrait" className="lowres" />
        <span className="note">
          <span dangerouslySetInnerHTML={{ __html: doctor.marginNote.replace(/\.$/, "").replace(" ", " ") }} />
        </span>
      </div>
      <div className="dinfo">
        <h3 className="rv">
          {doctor.name} <span className="soft">{doctor.nameSoft}</span>
        </h3>
        <span className="role rv">{doctor.role}</span>
        <div className="idcard rv">
          <div className="hd">
            <span>Doctor profile</span>
            <PenguinGlyph />
          </div>
          <dl>
            {doctor.facts.map((f) => (
              <div key={f.label} style={{ display: "contents" }}>
                <dt>{f.label}</dt>
                <dd>
                  {f.value} {f.confirm ? <ConfirmChip note={f.confirm} /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="three rv">
          {doctor.principles.map((p, i) => (
            <div key={p}>
              <b>{["i.", "ii.", "iii."][i]}</b>
              <span>{p}</span>
            </div>
          ))}
        </div>
        <Link className="btn btn-navy rv" href={`/book/?doctor=${doctor.slug}`} style={{ justifySelf: "start" }}>
          {doctor.bookingLabel}
          <ArrowRight className="ico" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** Small doctor card (.dmini) for mega menu / related areas. */
export function DoctorMiniCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={doctor.profileHref} className="dmini">
      <span className="ph">
        <DoctorImg who={doctor.slug} kind="Headshot" />
        <FallbackFlag slot={doctorSlot(doctor.slug, "Headshot")} text="CONFIRM" />
      </span>
      <span className="tx">
        <small>{doctor.shortRole}</small>
        <b>
          {doctor.name} {doctor.nameSoft}
        </b>
        <span>{doctor.role}</span>
        <em>
          View profile <ArrowRight className="ico" aria-hidden="true" />
        </em>
      </span>
    </Link>
  );
}

/** Large doctor card (.bigdoc) for the doctors hub. */
export function BigDocCard({ doctor, facts }: { doctor: Doctor; facts?: { label: string; value: string; confirm?: string }[] }) {
  return (
    <article className="bigdoc">
      <div className="ph">
        <DoctorImg who={doctor.slug} kind="Hero" />
        <FallbackFlag slot={doctorSlot(doctor.slug, "Hero")} />
        <span className="nm">
          {doctor.name.replace("Dr. ", "Dr. ")}
        </span>
      </div>
      <div className="tx">
        <small>{doctor.shortRole}</small>
        <h2>
          {doctor.name} {doctor.nameSoft}
        </h2>
        <p className="role">{doctor.role}</p>
        <div className="kf">
          {(facts ?? doctor.facts.slice(0, 4)).map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                {f.value} {f.confirm ? <ConfirmChip note={f.confirm} /> : null}
              </dd>
            </div>
          ))}
        </div>
        <h3>Sees</h3>
        <p className="role">{doctor.sees}</p>
        <div className="ctas">
          <Link className="btn btn-coral" href={`/book/?doctor=${doctor.slug}`}>
            {doctor.bookingLabel}
          </Link>
          <Link className="btn btn-line" href={doctor.profileHref}>
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}

function PenguinGlyph() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 4c-7.5 0-12 6.5-12 16 0 9 4.6 16 12 16s12-7 12-16C32 10.5 27.5 4 20 4z" fill="#001F43" />
      <path d="M20 12c-4 0-6.5 4-6.5 9.5S16 32 20 32s6.5-5 6.5-10.5S24 12 20 12z" fill="#fff" />
      <circle cx="16.5" cy="10" r="1.4" fill="#fff" />
      <circle cx="23.5" cy="10" r="1.4" fill="#fff" />
      <path d="M18.8 12.4l1.2 2 1.2-2z" fill="#F9C9B6" />
      <path d="M20 28s-4.6-2.7-4.6-6a2.4 2.4 0 0 1 4.6-1 2.4 2.4 0 0 1 4.6 1c0 3.3-4.6 6-4.6 6z" fill="#E40913" />
    </svg>
  );
}

/** @deprecated dev-only compat for the styleguide page. */
export function PortraitPlaceholder({ className = "" }: { className?: string; name?: string }) {
  return <span className={`badge lg ${className}`} aria-hidden="true" />;
}
