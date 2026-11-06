"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global behaviours from main-pages site.js:
 * - .rv reveal: only below-the-fold items get .pre, IO reveals them.
 * - .toc nav a .on: table-of-contents highlight.
 * No-JS and reduced-motion safe: content is visible at rest.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vh = innerHeight;

    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.remove("pre");
              io!.unobserve(e.target);
            }
          }),
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      document.querySelectorAll(".rv").forEach((el) => {
        if (el.getBoundingClientRect().top > vh * 0.95) el.classList.add("pre");
        io!.observe(el);
      });
    }

    const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toc nav a"));
    let so: IntersectionObserver | undefined;
    if (tocLinks.length && "IntersectionObserver" in window) {
      so = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting)
              tocLinks.forEach((a) =>
                a.classList.toggle("on", a.getAttribute("href") === "#" + (e.target as HTMLElement).id),
              );
          }),
        { rootMargin: "-30% 0px -60% 0px" },
      );
      tocLinks.forEach((a) => {
        const s = document.querySelector(a.getAttribute("href")!);
        if (s) so!.observe(s);
      });
    }

    return () => {
      io?.disconnect();
      so?.disconnect();
    };
  }, [pathname]);

  return null;
}
