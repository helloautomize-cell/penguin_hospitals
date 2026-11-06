import { badgeArt, badges, type BadgeSlug } from "@/lib/service-badges";

export type BadgeSize = "sm" | "md" | "lg" | "xl";

const FRAME: Record<BadgeSize, number> = { sm: 52, md: 64, lg: 96, xl: 160 };
const ART: Record<BadgeSize, number> = { sm: 26, md: 32, lg: 52, xl: 92 };

/** The .badge ring from pages.css, at the four used sizes. */
export function BadgeFrame({
  size = "md",
  className = "",
  children,
}: {
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}) {
  const px = FRAME[size];
  return (
    <span
      className={`badge ${size !== "md" ? `badge-${size}` : ""} ${className}`}
      style={size === "md" ? undefined : ({ width: px, height: px } as React.CSSProperties)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/** Frame + hand-drawn art. Slug comes from the `badge:` frontmatter. */
export function ServiceBadge({
  slug,
  size = "md",
  className = "",
}: {
  slug: BadgeSlug | string;
  size?: BadgeSize;
  className?: string;
}) {
  const Art = badgeArt(slug);
  if (!Art) return null;
  return (
    <BadgeFrame size={size} className={className}>
      <Art size={ART[size]} />
    </BadgeFrame>
  );
}

/** Doctor badge without the ring (mega menu headings), at 40px. */
export function DoctorBadge({
  variant,
  className = "",
}: {
  variant: "female" | "male";
  className?: string;
}) {
  const Art = badgeArt(variant === "female" ? "doctor-female" : "doctor-male");
  return (
    <span className={`bdoc ${className}`} aria-hidden="true">
      {Art ? <Art size={40} /> : null}
    </span>
  );
}

export { badges };
