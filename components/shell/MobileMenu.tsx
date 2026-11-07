"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, CalendarDays, Phone } from "lucide-react";
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

const TILES: { key: string; label: string; img: string; links: { label: string; href: string }[] }[] = [
  { key: "women", label: "Women and pregnancy", img: "/images/services/hub-obg.jpg", links: womenLinks },
  { key: "heart", label: "Heart and vessels", img: "/images/services/heart-grandfather.jpg", links: heartLinks },
];

function opdNow() {
  const ist = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
  const d = ist.getDay(), h = ist.getHours() + ist.getMinutes() / 60;
  return d === 0 ? h >= 16 && h < 18 : true; // Sun 4 to 6 pm; Mon to Sat all day
}

/** Full-screen navy sheet menu (.msheet), opened by the header burger. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [exp, setExp] = useState<string | null>(null);
  const [opd, setOpd] = useState(true);

  /* close via UI: also pop the pushed history entry so back-swipe stays clean */
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const close = useCallback(() => {
    if (window.history.state?.msheet) window.history.back();
    onCloseRef.current();
  }, []);

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setOpd(opdNow());
    else setExp(null);
  }

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
      document.body.dataset.menuOpen = "1";
      history.pushState({ msheet: 1 }, "");
      const onPop = () => onCloseRef.current();
      window.addEventListener("popstate", onPop);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
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
      return () => {
        document.documentElement.style.overflow = "";
        document.body.dataset.menuOpen = "0";
        window.removeEventListener("popstate", onPop);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, close]);

  return (
    <div
      className={`msheet${open ? " open" : ""}`}
      id="msheet"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
    >
      <div className="top">
        <Image src="/images/brand/logo-penguin-hospital.png" alt="Dr. Lakshmi's Penguin Hospital" width={70} height={44} />
        <button className="x" type="button" aria-label="Close menu" onClick={close} ref={closeRef}>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <div className="body">
        <div className="mtiles">
          {TILES.map((t) => (
            <button
              key={t.key}
              type="button"
              className="mtile"
              aria-expanded={exp === t.key}
              onClick={() => setExp(exp === t.key ? null : t.key)}
            >
              <Image src={t.img} alt="" fill sizes="(max-width: 767px) 50vw, 0px" />
              <b>{t.label}</b>
              <span className="chev">
                <ChevronDown className="ico" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
        {exp && (
          <div className="msub">
            {TILES.find((t) => t.key === exp)!.links.map((l) => (
              <Link key={l.href + l.label} href={l.href} onClick={onClose}>
                {l.label}
                <ChevronDown className="ico" aria-hidden="true" style={{ transform: "rotate(-90deg)" }} />
              </Link>
            ))}
          </div>
        )}
        {sheetSoloLinks.map((l, i) => (
          <Link
            key={l.href}
            className="solo"
            href={l.href}
            onClick={onClose}
            style={{ transitionDelay: `${0.15 + i * 0.05}s` }}
          >
            {l.label}
          </Link>
        ))}
        <Link className="solo red" href="/emergency/" onClick={onClose} style={{ transitionDelay: "0.4s" }}>
          <i aria-hidden="true" />
          Emergency, day and night
        </Link>
      </div>
      <div className="foot2">
        <div className="contactc">
          <i aria-hidden="true" />
          <span>{opd ? "OPD open now" : "OPD closed now"} · Emergency open, day and night</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Link className="btn btn-coral" href="/book/" onClick={onClose}>
            <CalendarDays className="ico" aria-hidden="true" />
            Book
          </Link>
          <a className="btn btn-navy" href={`tel:${site.phone.tel}`}>
            <Phone className="ico" aria-hidden="true" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
