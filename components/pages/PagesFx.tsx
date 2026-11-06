"use client";

import { useEffect } from "react";

/**
 * Shared behaviours for the pages-v1 reference pages, ported from the
 * reference <script>:
 * - .prv reveal via IntersectionObserver (threshold .18, once). Below-fold
 *   items get .pre so content stays visible without JS.
 * - [data-count] number count-up on reveal.
 * - [data-clock] live IST time + #opdState open/closed line (30s tick).
 * - .zoom scroll-linked photo scaling on the doctors profiles.
 * Renders nothing.
 */
export function PagesFx() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".pgs");
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vh = window.innerHeight;

    /* ---------- reveal + counters ---------- */
    const countUp = (el: Element) => {
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        if (n.dataset.done) return;
        n.dataset.done = "1";
        const to = Number(n.dataset.count);
        const t0 = performance.now();
        const d = reduce ? 1 : 1400;
        const f = (t: number) => {
          const k = Math.min(1, (t - t0) / d);
          n.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
      });
    };
    const els = Array.from(root.querySelectorAll(".prv, .week, .pct, .tile, .gl"));
    els.forEach((el) => {
      if (el.classList.contains("prv") && el.getBoundingClientRect().top > vh * 0.95)
        el.classList.add("pre");
    });
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("in");
            e.target.classList.remove("pre");
            countUp(e.target);
            io!.unobserve(e.target);
          }),
        { threshold: 0.18 },
      );
      els.forEach((el) => io!.observe(el));
    } else {
      els.forEach((el) => {
        el.classList.add("in");
        el.classList.remove("pre");
      });
    }

    /* ---------- IST clock + OPD state ---------- */
    const opd = root.querySelector<HTMLElement>("#opdState");
    const tick = () => {
      const d = new Date();
      const s = d.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      root.querySelectorAll("[data-clock]").forEach((e) => {
        e.textContent = s.toUpperCase();
      });
      const ist = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const day = ist.getDay();
      const h = ist.getHours() + ist.getMinutes() / 60;
      const open = day !== 0 || (h >= 16 && h < 18);
      if (opd) {
        opd.textContent = open
          ? "OPD open now"
          : "OPD closed now, opens " + (day === 0 && h < 16 ? "at 4 pm" : "Monday");
        opd.classList.toggle("closed", !open);
      }
    };
    tick();
    const clockT = window.setInterval(tick, 30000);

    /* ---------- .zoom scroll scaling (doctors profiles) ---------- */
    const zooms = Array.from(root.querySelectorAll<HTMLElement>(".zoom"));
    let raf = 0;
    const onScroll = () => {
      zooms.forEach((img) => {
        const r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const k = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
        img.style.setProperty("--s", (1.12 - k * 0.12).toFixed(3));
      });
    };
    const scrollHandler = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        onScroll();
      });
    };
    if (zooms.length && !reduce) {
      onScroll();
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    return () => {
      io?.disconnect();
      window.clearInterval(clockT);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return null;
}
