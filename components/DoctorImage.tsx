import Image from "next/image";
import { doctorImage } from "@/lib/doctor-images.server";
import { doctorSlot, type DoctorSlotId, type DoctorSlotKind, type DoctorSlotRatio } from "@/lib/doctor-images";

const DEV = process.env.NODE_ENV !== "production";

/** Height caps per slot ratio: no doctor photo renders as a giant banner.
 *  Page-hero placements opt out with maxHeight={null}. */
const RATIO_MAX: Partial<Record<DoctorSlotRatio, number>> = {
  "4/5": 560,
  "16/9": 440,
  "3/2": 440,
};

/** Fixed header offset for anchor scrolling (same as .prose section). */
const HEADER_OFFSET = "110px";

/** Default `sizes` per slot kind — Hero/Cutout photos render ~460-600px wide,
 *  Headshot chips ~56px. Wrong sizes make the browser fetch a tiny variant
 *  and stretch it (blurry heroes). */
const SIZES_BY_KIND: Record<DoctorSlotKind, string> = {
  Headshot: "56px",
  Hero: "(max-width: 767px) 92vw, 580px",
  Cutout: "(max-width: 900px) 88vw, 560px",
  Consult: "(max-width: 900px) 88vw, 900px",
  Note: "(max-width: 900px) 60vw, 480px",
};

/** Drop-in replacement for an existing <img> spot (chips, cards, heroes).
 *  Resolves to public/images/doctors/<file> when present, else the slot's
 *  fallback, else renders nothing. DOM shape stays a bare <img>. Pass `slot`
 *  directly or `who` (slug/name) + `kind`. */
export function DoctorImg({
  slot,
  who,
  kind = "Headshot",
  className,
  sizes,
}: {
  slot?: DoctorSlotId;
  who?: string;
  kind?: DoctorSlotKind;
  className?: string;
  sizes?: string;
}) {
  const s = slot ?? (who ? doctorSlot(who, kind) : null);
  if (!s) return null;
  const v = doctorImage(s);
  if (v.kind !== "single") return null;
  return (
    <Image
      src={v.src}
      alt={v.alt}
      className={className}
      width={64}
      height={64}
      sizes={sizes ?? SIZES_BY_KIND[kind]}
      style={v.objectPosition ? { objectPosition: v.objectPosition } : undefined}
    />
  );
}

/** Fixed-ratio figure for placements that did not exist before (scene and
 *  together slots). Renders nothing when the slot has no fallback, so
 *  nice-to-have photos simply appear once their file drops in. A small
 *  CONFIRM chip shows in development while the fallback is in use. */
export function DoctorFigure({
  slot,
  className,
  sizes = "(max-width: 900px) 88vw, 900px",
  priority = false,
  style,
  objectPosition,
  aspectRatio,
  maxHeight,
  children,
}: {
  slot: DoctorSlotId;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  /** object-position for this placement; pass null to leave it to the CSS
   *  class (e.g. per-breakpoint values). */
  objectPosition?: string | null;
  /** Replaces the slot ratio; pass null to leave it to the CSS class. */
  aspectRatio?: string | null;
  /** Caps figure height; defaults by ratio (4:5 -> 560, 16:9 and 3:2 -> 440).
   *  Pass null for page-hero placements that may run taller. */
  maxHeight?: number | null;
  children?: React.ReactNode;
}) {
  const v = doctorImage(slot);
  if (v.kind === "none") return null;
  const pos = (o?: string) =>
    objectPosition === null ? undefined : (objectPosition ?? o ?? "50% 20%");
  const cap = maxHeight === null ? undefined : (maxHeight ?? RATIO_MAX[v.ratio]);
  return (
    <figure
      className={`dfig${className ? ` ${className}` : ""}`}
      style={{
        scrollMarginTop: HEADER_OFFSET,
        ...(aspectRatio === null ? {} : { aspectRatio: aspectRatio ?? v.ratio }),
        ...(cap ? { maxHeight: cap } : {}),
        ...style,
      }}
    >
      {v.kind === "pair" ? (
        <span className="dimg-pair">
          <span className="dimg-cell">
            <Image
              src={v.left.src}
              alt={v.alt}
              fill
              sizes={sizes}
              style={{
                objectFit: "cover",
                objectPosition: pos(v.left.objectPosition),
              }}
            />
          </span>
          <span className="dimg-cell">
            <Image
              src={v.right.src}
              alt=""
              fill
              sizes={sizes}
              style={{
                objectFit: "cover",
                objectPosition: pos(v.right.objectPosition),
              }}
            />
          </span>
        </span>
      ) : (
        <Image
          src={v.src}
          alt={v.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{
            objectFit: "cover",
            objectPosition: pos(v.objectPosition),
          }}
        />
      )}
      {children}
      {DEV && v.isFallback && (
        <span className="confirm dimg-flag">CONFIRM photo</span>
      )}
    </figure>
  );
}

/** CONFIRM chip for spots that pair a doctor photo with a "new portrait"
 *  marker. Renders only while the slot resolves to its fallback; disappears
 *  on its own once the real photo drops into public/images/doctors/. */
export function FallbackFlag({
  slot,
  text = "CONFIRM: new portrait",
  className = "",
}: {
  slot: DoctorSlotId;
  text?: string;
  className?: string;
}) {
  const v = doctorImage(slot);
  if (v.kind !== "single" || !v.isFallback) return null;
  return <span className={`confirm ${className}`.trim()}>{text}</span>;
}
