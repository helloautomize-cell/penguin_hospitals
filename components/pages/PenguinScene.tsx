"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/** The little penguin illustration, drawn twice in the scene (PG in reference). */
function Penguin() {
  return (
    <svg viewBox="0 0 120 200" aria-hidden="true" style={{ width: "100%", display: "block" }}>
      <ellipse cx="60" cy="196" rx="38" ry="5" fill="#000" opacity=".18" />
      <path d="M60 8C40 8 32 28 32 48c0 18-12 42-12 76 0 42 18 70 40 70s40-28 40-70c0-34-12-58-12-76C88 28 80 8 60 8Z" fill="#0B1B33" />
      <path d="M62 50c-14 4-22 32-22 72 0 36 9 62 22 62s20-26 20-62c0-40-8-68-20-72Z" fill="#F4F7FC" />
      <path d="M62 50c-6 2-10 8-13 16 6-3 14-3 21 0-1-8-4-14-8-16Z" fill="#F1B45B" opacity=".9" />
      <ellipse cx="78" cy="40" rx="6" ry="10" fill="#F1B45B" opacity=".9" />
      <path d="M82 28l22 8-22 5Z" fill="#3A3F4A" />
      <path d="M84 34l18 2.6-18 3.4Z" fill="#E9A16A" />
      <circle cx="74" cy="27" r="2.6" fill="#fff" />
      <path d="M34 76c-12 14-16 40-12 62 6-12 12-26 14-44Z" fill="#14294A" />
      <ellipse cx="50" cy="192" rx="12" ry="4" fill="#3A3F4A" />
      <ellipse cx="72" cy="192" rx="12" ry="4" fill="#3A3F4A" />
    </svg>
  );
}

function prog(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  const span = el.offsetHeight - window.innerHeight;
  return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
}

/**
 * Pinned "Why a penguin" scroll scene for /about/ (reference setBeat).
 * Reduced-motion users get all beats statically via CSS instead.
 */
export function PenguinScene() {
  const secRef = useRef<HTMLElement>(null);
  const pgA = useRef<HTMLDivElement>(null);
  const pgB = useRef<HTMLDivElement>(null);
  const egg = useRef<HTMLDivElement>(null);
  const skyD = useRef<HTMLDivElement>(null);
  const stars = useRef<HTMLDivElement>(null);
  const snow = useRef<HTMLDivElement>(null);
  const pdocs = useRef<HTMLDivElement>(null);
  const chick = useRef<SVGSVGElement>(null);
  const [beat, setBeat] = useState(0);
  const beatRef = useRef(0);
  const eggT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const walkT = useRef<Partial<Record<"a" | "b", ReturnType<typeof setTimeout>>>>({});

  /* stars + snow are random, so they are generated client-side only. */
  useEffect(() => {
    const st = stars.current;
    const sn = snow.current;
    if (st && !st.childElementCount) {
      for (let i = 0; i < 70; i++) {
        const s = document.createElement("i");
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 62 + "%";
        s.style.animationDelay = -Math.random() * 3 + "s";
        s.style.opacity = String(0.3 + Math.random() * 0.7);
        st.append(s);
      }
    }
    if (sn && !sn.childElementCount) {
      for (let i = 0; i < 46; i++) {
        const s = document.createElement("i");
        s.style.left = Math.random() * 110 + "%";
        const sz = 2 + Math.random() * 4;
        s.style.width = s.style.height = sz + "px";
        s.style.animationDuration = 7 + Math.random() * 9 + "s";
        s.style.animationDelay = -Math.random() * 16 + "s";
        sn.append(s);
      }
    }
  }, []);

  const walk = useCallback((el: HTMLDivElement | null, to: number, dir: "l" | "r", key: "a" | "b") => {
    if (!el) return;
    el.classList.add("walk");
    el.classList.toggle("face-l", dir === "l");
    el.style.left = to + "%";
    if (walkT.current[key]) clearTimeout(walkT.current[key]);
    walkT.current[key] = setTimeout(() => el.classList.remove("walk"), 2200);
  }, []);

  /* apply a beat: penguin positions, egg, sky and overlay states */
  const applyBeat = useCallback(
    (b: number) => {
      const A = pgA.current, B = pgB.current, E = egg.current;
      const wide = window.innerWidth > 760;
      const base = wide ? 30 : 12;
      const step = wide ? 14 : 26;
      if (skyD.current) skyD.current.style.opacity = b >= 2 ? "1" : "0";
      if (stars.current) stars.current.style.opacity = b >= 2 ? ".15" : "1";
      if (snow.current) snow.current.style.opacity = b <= 1 ? "1" : ".15";
      pdocs.current?.classList.toggle("on", b === 3);
      chick.current?.classList.toggle("on", b === 3);
      if (E) E.style.opacity = b === 3 ? "0" : "1";
      if (eggT.current) clearTimeout(eggT.current);
      if (b === 0) {
        walk(A, base, "r", "a");
        walk(B, base + step, "l", "b");
        if (E) E.style.left = `calc(${base}% + 3.6vw)`;
        if (A) A.style.opacity = "1";
        if (B) B.style.opacity = "1";
      }
      if (b === 1) {
        walk(A, base, "r", "a");
        walk(B, wide ? 82 : 84, "r", "b");
        if (B) B.style.opacity = wide ? "1" : "0";
        if (E) E.style.left = `calc(${base}% + 3.6vw)`;
      }
      if (b === 2) {
        if (B) B.style.opacity = "1";
        walk(B, base + step * 0.5, "l", "b");
        walk(A, wide ? 80 : 84, "r", "a");
        eggT.current = setTimeout(() => {
          if (beatRef.current === 2 && E) E.style.left = `calc(${base + step * 0.5}% + 2vw)`;
        }, 1400);
      }
      if (b === 3) {
        walk(A, base, "r", "a");
        walk(B, base + step, "l", "b");
        if (A) A.style.opacity = "1";
      }
    },
    [walk],
  );

  useEffect(() => {
    beatRef.current = beat;
    applyBeat(beat);
  }, [beat, applyBeat]);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      const p = prog(sec);
      setBeat(Math.min(3, Math.floor(p * 4.2)));
    };
    const handler = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          onScroll();
        });
    };
    onScroll();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    const wt = walkT.current;
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (eggT.current) clearTimeout(eggT.current);
      (["a", "b"] as const).forEach((k) => wt[k] && clearTimeout(wt[k]));
    };
  }, []);

  return (
    <section className="peng night" id="peng" aria-label="Why a penguin" ref={secRef}>
      <div className="stick">
        <div className="sky" />
        <div className="sky-d" ref={skyD} />
        <div className="stars" ref={stars} />
        <div className="snow" ref={snow} />
        <div className="sea" />
        <div className="ice" />
        <div className="pg" ref={pgA} style={{ left: "30%" }}>
          <Penguin />
        </div>
        <div className="pg face-l" ref={pgB} style={{ left: "44%" }}>
          <Penguin />
        </div>
        <div className="egg glow" ref={egg} style={{ left: "calc(30% + 3.6vw)" }} />
        <svg className="chick" ref={chick} viewBox="0 0 60 70" style={{ left: "calc(37% + 1vw)" }}>
          <ellipse cx="30" cy="44" rx="20" ry="24" fill="#B8C3D1" />
          <circle cx="30" cy="22" r="15" fill="#E9EEF4" />
          <path d="M17 22a13 13 0 0 1 26 0c-4-5-9-6-13-6s-9 1-13 6Z" fill="#26364F" />
          <circle cx="25" cy="22" r="2" fill="#13223A" />
          <circle cx="35" cy="22" r="2" fill="#13223A" />
          <path d="M28 27l2 3 2-3Z" fill="#7A6A55" />
        </svg>
        <div className="ptext">
          <p className="kicker">Why a penguin</p>
          <div className="beats">
            <div className={`beat${beat === 0 ? " on" : ""}`}>
              <h2>Winter on the ice.</h2>
              <p>
                Penguin parents share one egg. One keeps it warm on their feet through the long,
                cold nights.
              </p>
            </div>
            <div className={`beat${beat === 1 ? " on" : ""}`}>
              <h2>The other goes out to sea.</h2>
              <p>
                While one stays, the other walks to the water to find food. Neither can do both
                alone.
              </p>
            </div>
            <div className={`beat${beat === 2 ? " on" : ""}`}>
              <h2>Then they swap.</h2>
              <p>
                The one who ate comes back and takes the egg. The one who waited finally goes to
                eat.
              </p>
            </div>
            <div className={`beat${beat === 3 ? " on" : ""}`}>
              <h2>Neither does it alone.</h2>
              <p>
                That is the care we wanted to build. A team that takes turns staying with you, and
                a hospital that keeps the light on through the night.{" "}
                <span className="confirm">CONFIRM story wording</span>
              </p>
            </div>
          </div>
        </div>
        <div className="pdocs" ref={pdocs}>
          <figure>
            <Image
              src="/images/doctors/dr-lakshmi-headshot.jpg"
              alt="Dr. Lakshmi Vijay Kalbande"
              width={190}
              height={190}
              sizes="(max-width: 760px) 96px, 190px"
            />
            <figcaption>
              <b>Dr. Lakshmi</b>Mothers and women
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/images/doctors/dr-ashish-headshot.jpg"
              alt="Dr. Ashish A. Baviskar"
              width={190}
              height={190}
              sizes="(max-width: 760px) 96px, 190px"
            />
            <figcaption>
              <b>Dr. Ashish</b>Hearts and vessels
            </figcaption>
          </figure>
        </div>
        <div className="pprog">
          {[0, 1, 2, 3].map((i) => (
            <i key={i} className={beat === i ? "on" : ""} />
          ))}
        </div>
        <span className="tagline">Together through life</span>
      </div>
    </section>
  );
}
