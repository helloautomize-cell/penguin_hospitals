"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, TriangleAlert } from "lucide-react";
import { site } from "@/lib/site-config";
import { utilityBarLinks } from "@/lib/nav";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Thin night bar above the header, desktop only (>=1024px).
 * On the home page it stays hidden while the hero is in view.
 */
export function UtilityBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  const show = !isHome || pastHero;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  return (
    <div
      className={`on-dark fixed inset-x-0 top-0 z-[80] hidden bg-night text-[13px] text-mist lg:block ${
        show ? "" : "lg:hidden"
      }`}
    >
      <div className="wrap flex h-9 items-center justify-between gap-6">
        <p className="flex items-center gap-2.5">
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 font-semibold text-alert-dark-bg no-underline"
          >
            <TriangleAlert aria-hidden className="size-3.5" strokeWidth={1.75} />
            Medical emergency? Call 108 or 112
          </a>
          <span aria-hidden className="text-white/25">
            ·
          </span>
          <span>Emergency open day and night</span>
        </p>
        <nav aria-label="Utility" className="flex items-center gap-5">
          {utilityBarLinks.map((l) => (
            <a key={l.href} href={l.href} className="py-1.5 no-underline hover:text-white">
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex items-center gap-2 py-1.5 font-medium no-underline hover:text-white"
          >
            <Phone aria-hidden className="size-3.5" strokeWidth={1.75} />
            {site.phone.display}
          </a>
          <a
            href={whatsappLink("a visit")}
            className="inline-flex items-center gap-2 py-1.5 no-underline hover:text-white"
          >
            <WhatsAppIcon className="size-3.5" />
            WhatsApp
          </a>
        </nav>
      </div>
    </div>
  );
}
