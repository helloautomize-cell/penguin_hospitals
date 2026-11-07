"use client";

import { useEffect } from "react";

/**
 * Mobile-polish effects for markdown-rendered pages:
 * - 3-dot progress indicators under horizontal scrollers (.cards, who-it-is-for row)
 * - .tri timeline: coral line draws with scroll (--tlp), rows light crossing mid-screen
 * - .steps/.tl items: number fills when crossing mid-screen
 * All desktop-identical; dots are display:none above 767px.
 */
export function ProseFx() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = () => innerWidth <= 767;
    const cleanups: (() => void)[] = [];

    /* --- scroller dots --- */
    const rows = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".grp .cards, section .cards, #who-it-is-for ul, [data-t='who-it-is-for'] ul",
      ),
    ).filter((r) => r.scrollWidth > r.clientWidth + 8);
    rows.forEach((row) => {
      if (row.dataset.dotted) return;
      row.dataset.dotted = "1";
      const dots = document.createElement("div");
      dots.className = "sdots";
      dots.setAttribute("aria-hidden", "true");
      const n = Math.min(3, Math.max(2, row.children.length));
      for (let i = 0; i < n; i++) dots.appendChild(document.createElement("i"));
      row.after(dots);
      const ds = Array.from(dots.children) as HTMLElement[];
      const upd = () => {
        const max = row.scrollWidth - row.clientWidth;
        const p = max > 0 ? row.scrollLeft / max : 0;
        const ix = Math.round(p * (n - 1));
        ds.forEach((d, i) => d.classList.toggle("on", i === ix));
      };
      upd();
      row.addEventListener("scroll", upd, { passive: true });
      cleanups.push(() => {
        row.removeEventListener("scroll", upd);
        dots.remove();
      });
    });

    if (reduce) return () => cleanups.forEach((c) => c());

    /* --- timeline draw + mid-screen fills --- */
    const tris = Array.from(document.querySelectorAll<HTMLElement>(".tri"));
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".tri > div, .steps li, .tl li"),
    );
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!mobile()) return;
        const mid = innerHeight * 0.55;
        tris.forEach((t) => {
          const r = t.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
          t.style.setProperty("--tlp", String(p));
        });
        items.forEach((el) => {
          const r = el.getBoundingClientRect();
          el.classList.toggle("on", r.top < mid);
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
