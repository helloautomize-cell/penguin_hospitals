import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { badges, type BadgeSlug } from "@/lib/service-badges";
import { ServiceBadge, DoctorBadge } from "@/components/badges/ServiceBadge";
import { Icon, type IconName } from "@/components/icons/Icons";
import { ServiceCard } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Badge sheet | dev",
  robots: { index: false, follow: false },
};

const ICONS: IconName[] = [
  "cal", "phone", "arrow", "alert", "menu", "wa", "pin", "plus", "chev", "check",
  "shield", "heart", "pulse", "drop", "baby", "sun", "home", "cycle", "seed",
  "scope", "lungs", "leg", "arm", "wave", "gauge", "bump", "dot", "dots",
  "clock", "doc", "lock", "users", "moon", "car", "pause", "play",
];

const SIZES = ["sm", "md", "lg", "xl"] as const;

function BadgeGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={dark ? "night" : ""}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 18,
        padding: 24,
        background: dark ? "var(--night)" : "var(--ice)",
        borderRadius: 16,
        color: dark ? "var(--on-dark)" : "var(--ink)",
      }}
    >
      {(Object.keys(badges) as BadgeSlug[]).map((slug) => (
        <figure key={slug} style={{ display: "grid", gap: 6, justifyItems: "start", margin: 0 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {SIZES.map((s) => (
              <ServiceBadge key={s} slug={slug} size={s} />
            ))}
          </div>
          <figcaption style={{ font: "600 12px var(--sans)", opacity: 0.75 }}>
            {slug} — {badges[slug].title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function BadgeSheet() {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_DEV_SHEETS !== "1")
    notFound();

  return (
    <article style={{ padding: "120px 0 80px" }}>
      <div className="wrap" style={{ display: "grid", gap: 40 }}>
        <div>
          <h1 className="h2">Badge sheet</h1>
          <p className="lede">31 hand-drawn SVG badges at sm, md, lg, xl. Dev only, noindex.</p>
        </div>

        <section>
          <h2 className="t-h3" style={{ marginBottom: 12 }}>Light</h2>
          <BadgeGrid />
        </section>
        <section>
          <h2 className="t-h3" style={{ marginBottom: 12 }}>Dark</h2>
          <BadgeGrid dark />
        </section>

        <section>
          <h2 className="t-h3" style={{ marginBottom: 12 }}>Doctor badges (menu headings, no ring)</h2>
          <div style={{ display: "flex", gap: 24, padding: 16, background: "var(--ice)", borderRadius: 16 }}>
            <DoctorBadge variant="female" />
            <DoctorBadge variant="male" />
          </div>
          <div className="night" style={{ display: "flex", gap: 24, padding: 16, marginTop: 12, background: "var(--night)", borderRadius: 16 }}>
            <DoctorBadge variant="female" className="dark" />
            <DoctorBadge variant="male" className="dark" />
          </div>
        </section>

        <section>
          <h2 className="t-h3" style={{ marginBottom: 12 }}>UI icons</h2>
          {[false, true].map((dark) => (
            <div
              key={String(dark)}
              className={dark ? "night" : ""}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                padding: 20,
                marginBottom: 12,
                background: dark ? "var(--night)" : "var(--ice)",
                color: dark ? "var(--on-dark)" : "var(--ink)",
                borderRadius: 16,
              }}
            >
              {ICONS.map((n) => (
                <span key={n} style={{ display: "inline-grid", gap: 4, justifyItems: "center" }} title={n}>
                  <Icon name={n} size={18} />
                  <Icon name={n} size={24} />
                  <small style={{ font: "500 10px var(--sans)", opacity: 0.6 }}>{n}</small>
                </span>
              ))}
            </div>
          ))}
        </section>

        <section>
          <h2 className="t-h3" style={{ marginBottom: 12 }}>Real service cards</h2>
          <div className="cards" style={{ maxWidth: 900 }}>
            <ServiceCard href="/pregnancy-care/" title="Pregnancy care" text="Check-ups, scans and tests from the first visit to the birth." />
            <ServiceCard href="/keyhole-heart-surgery/" title="Keyhole heart surgery" text="Heart surgery through a small cut in the side, when it suits you." />
            <ServiceCard href="/uterine-fibroids/" title="Fibroids" text="Growths in the womb that may or may not need treatment." />
          </div>
        </section>
      </div>
    </article>
  );
}
