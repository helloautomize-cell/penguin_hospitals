"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Phone, TriangleAlert } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/lib/site-config";
import { WhatsAppIcon } from "./icons";

const HERO_SEL = ".hhero,.v-hero,.a-hero,.d-hero,.chero,.phero,.dhero,.hero";
const BLOCK_SEL = ".foot,.pct,.cta-band,.fcta";

/** Floating glass dock (.mbar) under 767px; hides while the hero, the footer,
 *  a CTA band or the open menu is on screen, and while scrolling down fast. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);
  const [hidden, setHidden] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const fields = "input, select, textarea";
    const onIn = (e: FocusEvent) => (e.target as HTMLElement).matches(fields) && setTyping(true);
    const onOut = (e: FocusEvent) => (e.target as HTMLElement) && setTyping(false);
    document.addEventListener("focusin", onIn, true);
    document.addEventListener("focusout", onOut, true);
    return () => {
      document.removeEventListener("focusin", onIn, true);
      document.removeEventListener("focusout", onOut, true);
    };
  }, []);

  /* hero / footer / CTA visibility + scroll direction + menu open */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // still respect menu-open + field focus, but skip the slide games
    }
    /* landscape phones: dock only ever appears on scroll-up */
    const land = matchMedia("(max-height: 500px) and (max-width: 920px)").matches;
    let blocked = false; // hero, footer or CTA on screen
    const io = new IntersectionObserver(
      (es) => {
        blocked = es.some((e) => e.isIntersecting);
        if (blocked || land) setHidden(true);
        else setHidden(false);
      },
      { threshold: 0.08 },
    );
    const hero = document.querySelector(HERO_SEL);
    if (hero) io.observe(hero);
    document.querySelectorAll(BLOCK_SEL).forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const dy = y - lastY.current;
        lastY.current = y;
        if (blocked) return; // IO controls visibility while hero/footer/CTA is up
        if (dy > 12) setHidden(true);
        else if (dy < -2) setHidden(false);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mo = new MutationObserver(() => {
      if (document.body.dataset.menuOpen === "1") setHidden(true);
      else if (!blocked) setHidden((h) => h); // keep current until scroll/hero says otherwise
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (pathname === "/thank-you/" || typing) return null;
  if (typeof document !== "undefined" && document.body.dataset.menuOpen === "1") return null;

  const emergency = pathname === "/emergency/";
  return (
    <nav className={`mbar${hidden ? " hide" : ""}`} aria-label="Quick actions">
      {emergency ? (
        <a className="book sos" href="tel:108">
          <TriangleAlert className="ico" aria-hidden="true" />
          Call 108
        </a>
      ) : (
        <Link className="book" href="/book/">
          <CalendarDays className="ico" aria-hidden="true" />
          Book a visit
        </Link>
      )}
      <a className="call" href={`tel:${emergency ? site.phone.tel : site.phone.tel}`}>
        <Phone className="ico" aria-hidden="true" />
        Call
      </a>
      <a className="waa" href={whatsappLink("a visit")}>
        <WhatsAppIcon className="ico" />
        WhatsApp
      </a>
    </nav>
  );
}
