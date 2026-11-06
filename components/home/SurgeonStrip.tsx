// "Surgeon strip" inside home Heart and vessels: compact photo + intro for
// Dr. Ashish between the heart map row and the "Beyond the heart" cards.
// Server component — doctor image slots resolve against public/ at render.

import Link from "next/link";
import { DoctorFigure, DoctorImg } from "@/components/DoctorImage";
import { doctors } from "@/lib/doctors";

export function SurgeonStrip() {
  const d = doctors[1];
  return (
    <div className="surg">
      <DoctorFigure
        slot="ashishEcg"
        className="surg-ph"
        aspectRatio={null}
        maxHeight={null}
        objectPosition={null}
        sizes="(max-width: 1024px) 92vw, 560px"
      >
        <span className="surg-chip">
          <i className="dot" aria-hidden="true" />
          Reading every ECG himself
        </span>
      </DoctorFigure>
      <div className="surg-tx">
        <span className="by">
          <DoctorImg who={d.slug} kind="Headshot" />
          With Dr. Ashish Baviskar
        </span>
        <h3>
          {d.name} {d.nameSoft}
        </h3>
        <span className="role">{d.role}</span>
        <p>Often the first step is simply tests and a clear explanation.</p>
        <div className="ctas">
          <Link className="btn btn-glass" href={d.profileHref}>
            Meet Dr. Ashish
          </Link>
          <Link
            className="btn btn-coral"
            href={`/book/?doctor=${d.slug}`}
          >
            Book a heart check-up
          </Link>
        </div>
      </div>
    </div>
  );
}
