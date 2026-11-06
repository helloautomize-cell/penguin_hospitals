"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CalendarDays, Pause, Phone, Play } from "lucide-react";
import { site } from "@/lib/site-config";

const FRAMES = [
  {
    cls: "f1",
    src: "/images/hero/hero-mother-newborn.jpg",
    alt: "A mother holding her sleeping newborn by a sunlit window",
    tag: "Pregnancy and birth",
    title: "A new life",
    text: "From the first scan to the first cuddle. Normal and painless delivery, with newborn care in the same building.",
    who: { img: "/images/clinic/dr-lakshmi-portrait.jpg", text: "With Dr. Lakshmi Kalbande, obstetrician" },
  },
  {
    cls: "f2",
    src: "/images/hero/heart-walk.jpg",
    alt: "An older couple laughing together on a morning walk",
    tag: "Heart and vessels",
    title: "A strong heart",
    text: "Heart check-ups, keyhole heart surgery and vein care, so the morning walks keep going.",
    who: { img: "/images/clinic/dr-ashish-portrait.jpg", text: "With Dr. Ashish Baviskar, heart surgeon" },
  },
  {
    cls: "f3",
    src: "/images/hero/night-corridor.jpg",
    alt: "A softly lit hospital corridor at night with a nurse on her rounds",
    tag: "Emergency",
    title: "Every night",
    text: "The emergency team stays awake so you can rest. In a medical emergency, call 108 or 112 first.",
    who: null,
  },
];

const DUR = 7000;

/** Photo-film hero (.phs): three chapters, reel tabs, pause, live IST clock. */
export function HeroFilm() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("--:--");
  const [opd, setOpd] = useState("Chinchwad time");
  const filmRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const t0 = useRef(performance.now());
  const pausedRef = useRef(false);
  const curRef = useRef(0);

  const OPD: Record<number, [number, number]> = { 0: [16, 18], 1: [0, 24], 2: [0, 24], 3: [0, 24], 4: [0, 24], 5: [0, 24], 6: [0, 24] };

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPaused(true);
      pausedRef.current = true;
    }
    let raf = 0;
    const loop = (now: number) => {
      if (!pausedRef.current) {
        const p = Math.min(1, (now - t0.current) / DUR);
        setProgress(p);
        if (p >= 1) show((curRef.current + 1) % FRAMES.length);
      } else {
        t0.current = now;
      }
      raf = requestAnimationFrame(loop);
    };
    const show = (i: number) => {
      curRef.current = i;
      setCur(i);
      setProgress(0);
      t0.current = performance.now();
    };
    raf = requestAnimationFrame(loop);

    const tick = () => {
      const d = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
      const h = d.getHours(),
        m = d.getMinutes(),
        o = OPD[d.getDay()];
      setClock(`${h % 12 || 12}:${m < 10 ? "0" : ""}${m} ${h < 12 ? "AM" : "PM"}`);
      setOpd(h >= o[0] && h < o[1] ? "Emergency and OPD" : `Emergency only, OPD at ${o[0] % 12 || 12}${o[0] < 12 ? " am" : " pm"}`);
    };
    tick();
    const id = setInterval(tick, 20000);

    const onScroll = () => {
      const film = filmRef.current,
        hero = heroRef.current;
      if (!film || !hero || reduce) return;
      const h = hero.offsetHeight,
        p = Math.max(0, Math.min(1, scrollY / (h * 0.7)));
      const inset = (p * Math.min(28, innerWidth * 0.03)).toFixed(1),
        r = (p * 36).toFixed(1);
      film.style.clipPath = `inset(${inset}px ${inset}px ${inset}px ${inset}px round ${r}px)`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
      removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const show = (i: number) => {
    curRef.current = i;
    setCur(i);
    setProgress(0);
    t0.current = performance.now();
  };

  return (
    <section className="phs" id="hero" aria-label="Welcome" ref={heroRef}>
      <div className="film" ref={filmRef}>
        {FRAMES.map((f, i) => (
          <div className={`fr ${f.cls}${i === cur ? " on" : ""}`} key={f.cls}>
            <img src={f.src} alt={f.alt} loading={i === 0 ? undefined : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
            <div className="grade"></div>
          </div>
        ))}

        <div className="copy">
          <p className="hello">
            <span className="dev">नमस्कार</span>
            <i></i>
            <span>
              Chinchwad Gaon<span className="long">, Dr. Lakshmi's Penguin Hospital</span>
            </span>
          </p>
          <h1 id="h1">
            <span className="ln">
              <span>Together</span>
            </span>
            <span className="ln">
              <span>
                through life<span className="pdot">.</span>
              </span>
            </span>
          </h1>
          <div className="chap" aria-live="polite">
            {FRAMES.map((f, i) => (
              <div className={`cp${i === cur ? " on" : ""}`} key={f.cls}>
                <h2>{f.title}</h2>
                <p>{f.text}</p>
                <span className="pwho">
                  {f.who ? (
                    <>
                      <img src={f.who.img} alt="" />
                      <span dangerouslySetInnerHTML={{ __html: f.who.text.replace(/Dr\. (Lakshmi Kalbande|Ashish Baviskar)/, "<b>Dr. $1</b>") }} />
                    </>
                  ) : (
                    <span className="pill">
                      <AlertTriangle className="ico" aria-hidden="true" />
                      Emergency open day and night
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="ctas">
            <Link className="btn btn-p" href="/book/">
              <CalendarDays className="ico" aria-hidden="true" />
              Book a visit
            </Link>
            <a className="btn btn-g" href={`tel:${site.phone.tel}`}>
              <Phone className="ico" aria-hidden="true" />
              {site.phone.nationalDisplay}
            </a>
          </div>
        </div>

        <button
          className="pause"
          type="button"
          aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
          onClick={() => {
            setPaused(!paused);
            pausedRef.current = !paused;
          }}
        >
          {paused ? <Play className="ico" /> : <Pause className="ico" />}
        </button>

        <div className="reel" role="tablist" aria-label="Chapters">
          {FRAMES.map((f, i) => (
            <button
              key={f.cls}
              className={`rb${i === cur ? " on" : ""}${i < cur ? " done" : ""}`}
              role="tab"
              aria-selected={i === cur}
              onClick={() => show(i)}
            >
              <img src={f.src} alt="" />
              <span>
                {f.tag}
                <b>{f.title}</b>
              </span>
              <span className="pbar">
                <i style={{ transform: `scaleX(${i === cur ? progress : i < cur ? 1 : 0})` }}></i>
              </span>
            </button>
          ))}
          <div className="live">
            <span className="clock">{clock}</span>
            <span className="lst">
              <b>
                <i></i>Open now
              </b>
              <span>{opd}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
