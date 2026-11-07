import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Phone } from "lucide-react";
import type { PageDoc } from "@/lib/content";
import { treatmentHeroes } from "@/lib/treatment-heroes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Tag } from "@/components/Tag";
import { ServiceBadge } from "@/components/badges/ServiceBadge";
import { DoctorImg } from "@/components/DoctorImage";
import { doctors } from "@/lib/doctors";
import { slugFor, type BadgeSlug } from "@/lib/service-badges";
import { doctorFor, whatsappTopic } from "@/lib/booking-context";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/Button";

function crumbsFor(url: string) {
  const parts = url.split("/").filter(Boolean);
  return parts.slice(0, -1).map((p, i) => ({
    label: p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + parts.slice(0, i + 1).join("/") + "/",
  }));
}

const HUB_LABEL = { lakshmi: "Women and pregnancy", ashish: "Heart and vessels" } as const;

/** Glass doctor card shared by cinema and split photo cards. */
function LedByCard({ d, className = "" }: { d: (typeof doctors)[number]; className?: string }) {
  return (
    <div className={`gcard ${className}`.trim()}>
      <DoctorImg who={d.slug} kind="Headshot" />
      <div>
        <b>
          Led by {d.name} {d.nameSoft}
        </b>
        <small>{d.role}</small>
      </div>
      <Link href={d.profileHref}>
        View profile <ArrowRight className="ico" aria-hidden="true" />
      </Link>
    </div>
  );
}

/**
 * Photo-led hero for hub and treatment pages. Reads lib/treatment-heroes.ts
 * only: "cinema" = full-bleed photo (.phero/.win, both hubs), "split" = navy
 * panel with the photo card on the right, and pages missing from the map get
 * the same panel with a large SVG badge tile ("badge" fallback).
 */
export function TreatmentHero({ doc, h1, intro }: { doc: PageDoc; h1: string; intro: string }) {
  const hero = treatmentHeroes[doc.url];
  const who: "lakshmi" | "ashish" =
    hero?.doctor ?? (doctorFor(doc.url)?.includes("ashish") ? "ashish" : "lakshmi");
  const d = doctors[who === "ashish" ? 1 : 0];
  const hubLabel = HUB_LABEL[who];
  const title = h1 || doc.title.split("|")[0].trim();
  const crumbs = crumbsFor(doc.url);
  const badgeSlug: BadgeSlug =
    slugFor(doc.badge ?? doc.url.replace(/^\/+|\/+$/g, "")) ??
    (who === "ashish" ? "doctor-male" : "doctor-female");

  if (hero?.variant === "cinema") {
    return (
      <section className="phero">
        <div className="wrap">
          <div className="win" style={{ "--mp": hero.focus } as React.CSSProperties}>
            <Image
              src={`/images/services/${hero.file}`}
              alt={hero.alt}
              fill
              preload
              sizes="(max-width: 1368px) calc(100vw - 48px), 1272px"
              style={{ objectPosition: hero.focus }}
            />
            <div className="in">
              <div className="copy">
                <Breadcrumbs items={crumbs} dark />
                <Tag dark>{hubLabel}</Tag>
                <h1>{title}</h1>
                <p className="intro">{intro}</p>
                <div className="ctas">
                  <Button variant="primary" href={`/book/?doctor=${d.slug}`}>
                    <CalendarDays className="ico" aria-hidden="true" />
                    Book with {d.name.split(" ")[1]}
                  </Button>
                  <Button variant="glass" href={`tel:${site.phone.tel}`}>
                    <Phone className="ico" aria-hidden="true" />
                    {site.phone.nationalDisplay}
                  </Button>
                </div>
              </div>
              <LedByCard d={d} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="thero">
      <div className="wrap">
        <div className="thero-panel on-dark">
          <div className="thero-copy">
            <Breadcrumbs items={crumbs} dark />
            <span className="tag dk thero-pill">
              {doc.badge || hero ? (
                <ServiceBadge slug={badgeSlug} size="sm" />
              ) : (
                <i aria-hidden="true" />
              )}
              {hubLabel}
            </span>
            <h1>{title}</h1>
            <p className="intro">{intro}</p>
            <div className="ctas">
              <Button variant="primary" href={`/book/?doctor=${d.slug}`}>
                <CalendarDays className="ico" aria-hidden="true" />
                {d.bookingLabel}
              </Button>
              <Button variant="glass" href={whatsappLink(whatsappTopic(doc.url))}>
                <WhatsAppIcon className="ico" />
                WhatsApp
              </Button>
            </div>
            <div className="meta">
              <span>
                <DoctorImg who={d.slug} kind="Headshot" />
                Reviewed by {d.name} {d.nameSoft}
              </span>
            </div>
          </div>
          <div className="thero-media">
            {hero ? (
              <div className={`thero-ph${hero.ratio === "4/5" ? " tall" : ""}`}>
                <Image
                  src={`/images/services/${hero.file}`}
                  alt={hero.alt}
                  fill
                  preload
                  sizes="(max-width: 1024px) calc(100vw - 80px), (max-width: 1360px) 40vw, 502px"
                  style={{ objectFit: "cover", objectPosition: hero.focus }}
                />
                <LedByCard d={d} />
              </div>
            ) : (
              <div className="thero-tile">
                <ServiceBadge slug={badgeSlug} size="xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
