"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Plus, CalendarDays, Phone } from "lucide-react";
import { womenGroups, heartGroups, sheetSoloLinks } from "@/lib/nav";
import { site } from "@/lib/site-config";

const womenLinks = [
  ...womenGroups[0].links,
  ...womenGroups[1].links,
  ...womenGroups[2].links,
  { label: "All women's care", href: "/obstetrics-gynaecology/" },
];
const heartLinks = [
  ...heartGroups[0].links.slice(0, 4),
  { label: "All heart care", href: "/heart-and-vascular-surgery/" },
  ...heartGroups[0].links.slice(4),
  ...heartGroups[1].links,
];

/** Mobile sheet (.msheet) from the approved preview. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const root = document.getElementById("msheet");
        if (!root) return;
        const list = [...root.querySelectorAll<HTMLElement>(
          "a[href], button, summary, [tabindex]:not([tabindex='-1'])",
        )].filter((el) => el.offsetParent !== null);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !root.contains(active))) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && (active === last || !root.contains(active))) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`msheet${open ? " open" : ""}`} id="msheet" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="top">
        <img src="/images/brand/logo-penguin-hospital.png" alt="Dr. Lakshmi's Penguin Hospital" />
        <button className="x" type="button" aria-label="Close menu" onClick={onClose} ref={closeRef}>
          ×
        </button>
      </div>
      <div className="body">
        <details>
          <summary>
            Women and pregnancy
            <Plus className="ico" aria-hidden="true" />
          </summary>
          <div>
            {womenLinks.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </details>
        <details>
          <summary>
            Heart and vessels
            <Plus className="ico" aria-hidden="true" />
          </summary>
          <div>
            {heartLinks.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </details>
        {sheetSoloLinks.map((l) => (
          <Link key={l.href} className="solo" href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link className="solo red" href="/emergency/">
          Emergency, day and night
        </Link>
      </div>
      <div className="foot2">
        <Link className="btn btn-coral" href="/book/">
          <CalendarDays className="ico" aria-hidden="true" />
          Book
        </Link>
        <a className="btn btn-navy" href={`tel:${site.phone.tel}`}>
          <Phone className="ico" aria-hidden="true" />
          Call
        </a>
        <p>Emergency open day and night</p>
      </div>
    </div>
  );
}
