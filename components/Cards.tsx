import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { badgeInitial, slugFor } from "@/lib/service-badges";
import { ServiceBadge } from "@/components/badges/ServiceBadge";

/** Monogram badge ring (.badge) until illustrated badges ship. `lg` = 96px. */
export function Badge({
  label,
  lg = false,
  icon,
}: {
  label: string;
  lg?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <span className={`badge${lg ? " lg" : ""}`} aria-hidden="true">
      {icon ?? badgeInitial(label)}
    </span>
  );
}

/** Service card (.card): badge ring, title, one line, round arrow, stretched link. */
export function ServiceCard({
  href,
  title,
  text,
  delay = 0,
}: {
  href: string;
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <article className="card rv" style={{ "--d": `${delay}s` } as React.CSSProperties}>
      <ServiceBadge slug={slugFor(href) ?? slugFor(title) ?? ""} />
      <h3>
        <Link className="stretch" href={href}>
          {title}
        </Link>
      </h3>
      <p>{text}</p>
      <span className="go" aria-hidden="true">
        <ArrowRight className="ico" />
      </span>
    </article>
  );
}

/** Backwards-compatible alias used by existing templates. */
export function BadgeCard({
  href,
  title,
  text,
  initial,
}: {
  href: string;
  title: string;
  text: string;
  initial?: string;
  badgeSrc?: string;
  className?: string;
}) {
  return <ServiceCard href={href} title={title} text={text} />;
}

/** @deprecated dev-only compat for the styleguide page. */
export function PhotoCard({ href, kicker, title, src, alt }: { href: string; kicker: string; title: string; src: string; alt: string; className?: string }) {
  return (
    <a className="pcard" href={href} style={{ display: "block", aspectRatio: "3/4.2" }}>
      <img src={src} alt={alt} />
      <span className="cap">
        <small>{kicker}</small>
        <b>{title}</b>
      </span>
    </a>
  );
}
