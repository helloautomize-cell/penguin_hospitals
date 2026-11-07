"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Phone, TriangleAlert } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/lib/site-config";
import { WhatsAppIcon } from "./icons";
import { Button } from "./Button";

const HERO_SEL = ".phs,.hhero,.v-hero,.a-hero,.d-hero,.chero,.phero,.dhero,.hero";
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
    const hero = document.querySelector(HERO_SEL);
    /* live check too: IO callbacks can lag a fast scroll-up */
    const heroAboveDock = () =>
      hero ? hero.getBoundingClientRect().bottom > innerHeight - 84 : false;
    let heroBlocked = false, bandBlocked = false;
    const blocked = () => heroBlocked || bandBlocked || heroAboveDock();
    const update = () => {
      if (blocked() || land) setHidden(true);
      else setHidden(false);
    };
    /* the dock may only appear once the hero's bottom edge has passed the
       top of the dock (~84px above the viewport bottom) */
    const io = new IntersectionObserver(
      (es) => {
        heroBlocked = es.some((e) => e.isIntersecting);
        update();
      },
      { threshold: 0, rootMargin: "0px 0px -84px 0px" },
    );
    if (hero) io.observe(hero);
    /* footer / CTA bands hide it as soon as they peek into view */
    const io2 = new IntersectionObserver(
      (es) => {
        bandBlocked = es.some((e) => e.isIntersecting);
        update();
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(BLOCK_SEL).forEach((el) => io2.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const dy = y - lastY.current;
        lastY.current = y;
        if (blocked()) return; // IO controls visibility while hero/footer/CTA is up
        if (dy > 12) setHidden(true);
        else if (dy < -2) setHidden(false);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mo = new MutationObserver(() => {
      if (document.body.dataset.menuOpen === "1") setHidden(true);
      else if (!blocked()) setHidden((h) => h); // keep current until scroll/hero says otherwise
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });

    return () => {
      io.disconnect();
      io2.disconnect();
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
        <Button variant="emergency" className="book sos" href="tel:108">
          <TriangleAlert className="ico" aria-hidden="true" />
          Call 108
        </Button>
      ) : (
        <Button variant="primary" className="book" href="/book/">
          <CalendarDays className="ico" aria-hidden="true" />
          Book a visit
        </Button>
      )}
      <Button variant="glass" className="call" href={`tel:${site.phone.tel}`}>
        <Phone className="ico" aria-hidden="true" />
        Call
      </Button>
      <Button variant="glass" className="waa" href={whatsappLink("a visit")}>
        <WhatsAppIcon className="ico" />
        WhatsApp
      </Button>
    </nav>
  );
}
