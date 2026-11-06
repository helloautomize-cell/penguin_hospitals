"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Pinned horizontal "life in chapters" (.hs/.pin/.track/.lifeline). */
export function ChapterStory() {
  const hsRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const llfRef = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(0);
  const [L, setL] = useState(0);

  useEffect(() => {
    const llf = llfRef.current;
    if (llf) {
      const len = llf.getTotalLength();
      setL(len);
      llf.style.strokeDasharray = String(len);
      llf.style.strokeDashoffset = String(len);
    }
    const cycle = document.getElementById("cycleDots");
    if (cycle) {
      let cd = "";
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * Math.PI * 2,
          x = 260 + Math.sin(a) * 190,
          y = 260 - Math.cos(a) * 190;
        let c = "#E8F0FA",
          r = 9;
        if (i < 5) c = "#F4978E";
        else if (i < 13) c = "#C9DDF5";
        else if (i === 13) {
          c = "#001F43";
          r = 14;
        }
        cd += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${c}"${i > 13 ? ' stroke="#C8D5E6" stroke-width="1.2"' : ""}/>`;
      }
      cd += '<circle cx="260" cy="44" r="5" fill="#E40913"/>';
      cycle.innerHTML = cd;
    }

    const frame = () => {
      const hs = hsRef.current,
        pin = pinRef.current,
        track = trackRef.current;
      if (!hs || !pin || !track || innerWidth <= 860) return;
      const r = hs.getBoundingClientRect(),
        total = r.height - innerHeight,
        p = Math.max(0, Math.min(1, -r.top / total));
      const dist = track.scrollWidth - innerWidth;
      track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      if (llf) llf.style.strokeDashoffset = (L * (1 - p)).toFixed(1);
      let act = 0;
      track.querySelectorAll<HTMLElement>(".panel[data-c]").forEach((pn) => {
        if (pn.getBoundingClientRect().left < innerWidth * 0.5) act = +pn.dataset.c!;
      });
      pin.dataset.a = String(act);
      setActive(act);
    };
    let tick = false;
    const req = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(() => {
          tick = false;
          frame();
        });
      }
    };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    frame();
    return () => {
      removeEventListener("scroll", req);
      removeEventListener("resize", req);
    };
  }, [L]);

  const marks = ["Growing up", "Nine months", "First breath", "The heart"];

  return (
    <section className="hs" id="chapters" aria-labelledby="ch-h" ref={hsRef}>
      <div className="pin" id="pin" data-a="0" ref={pinRef}>
        <div className="track" ref={trackRef}>
          <div className="panel intro">
            <span className="tag">
              <i></i>A life, in chapters
            </span>
            <h2 className="h2" id="ch-h">
              Every chapter of a woman's life.{" "}
              <span className="soft">And the heart that carries the family.</span>
            </h2>
            <span className="note">
              <svg viewBox="0 0 46 34">
                <path d="M2 6c14 2 26 10 34 24M30 28l6 3 2-7" />
              </svg>
              Keep scrolling, the story moves sideways
            </span>
          </div>

          <article className="panel p1" data-c="1">
            <div className="txt">
              <div className="age">
                <b>13+</b>
                <span>
                  Chapter one<br />Growing up
                </span>
              </div>
              <h3>Getting to know your body</h3>
              <p>
                Periods that are too heavy, too painful or too irregular. A PCOS diagnosis that raises
                more questions than it answers. Dr. Lakshmi explains what your body is doing, then
                what can help.
              </p>
              <div className="links">
                <Link href="/pcos/">PCOS</Link>
                <Link href="/heavy-periods/">Heavy periods</Link>
                <Link href="/irregular-menstruation/">Irregular periods</Link>
                <Link href="/uterine-fibroids/">Fibroids</Link>
              </div>
              <span className="by">
                <img src="/images/clinic/dr-lakshmi-portrait.jpg" alt="" />
                With Dr. Lakshmi Kalbande
              </span>
            </div>
            <div className="scene sc" aria-hidden="true">
              <svg viewBox="0 0 520 520">
                <circle className="ring0" cx="260" cy="260" r="236" />
                <g className="spin">
                  <g id="cycleDots"></g>
                </g>
                <circle cx="260" cy="260" r="120" fill="#FDEDE8" />
                <text className="big" x="260" y="282" textAnchor="middle">
                  28
                </text>
                <text className="mid" x="260" y="316" textAnchor="middle">
                  day cycle
                </text>
                <text className="lbl" x="260" y="30" textAnchor="middle">
                  Period
                </text>
                <text className="lbl" x="260" y="500" textAnchor="middle">
                  Ovulation
                </text>
              </svg>
            </div>
          </article>

          <article className="panel p2" data-c="2">
            <div className="txt">
              <div className="age">
                <b>40</b>
                <span>
                  Chapter two<br />Weeks of pregnancy
                </span>
              </div>
              <h3>Nine months, one visit at a time</h3>
              <p>
                Check-ups, scans and blood tests at the right weeks, with closer watch when a
                pregnancy needs it: twins, diabetes, high blood pressure or a history of loss.
              </p>
              <div className="links">
                <Link href="/pregnancy-week-by-week/">Your week by week</Link>
                <Link href="/high-risk-pregnancy/">High-risk pregnancy</Link>
                <Link href="/preeclampsia-treatment/">Preeclampsia</Link>
              </div>
              <span className="by">
                <img src="/images/clinic/dr-lakshmi-portrait.jpg" alt="" />
                With Dr. Lakshmi Kalbande
              </span>
            </div>
            <div className="scene sc" aria-hidden="true">
              <svg viewBox="0 0 520 520">
                <circle cx="260" cy="260" r="220" fill="none" stroke="#E8F0FA" strokeWidth="26" />
                <path d="M260 40 A220 220 0 0 1 465 340" fill="none" stroke="#C9DDF5" strokeWidth="26" strokeLinecap="round" />
                <path d="M460 352 A220 220 0 0 1 120 432" fill="none" stroke="#F9C9B6" strokeWidth="26" strokeLinecap="round" />
                <path d="M108 424 A220 220 0 0 1 252 40" fill="none" stroke="#F4978E" strokeWidth="26" strokeLinecap="round" opacity=".75" />
                <text className="lbl" x="420" y="150">1st</text>
                <text className="lbl" x="330" y="470">2nd</text>
                <text className="lbl" x="58" y="210">3rd</text>
                <g className="breathe">
                  <circle cx="260" cy="260" r="138" fill="#FDEDE8" />
                  <circle cx="260" cy="260" r="138" fill="none" stroke="#F4978E" strokeWidth="1.5" strokeDasharray="3 7" />
                  <Fetus />
                </g>
              </svg>
            </div>
          </article>

          <article className="panel p3" data-c="3">
            <div className="txt">
              <div className="age">
                <b>Day 1</b>
                <span>
                  Chapter three<br />First breath
                </span>
              </div>
              <h3>The day your baby arrives</h3>
              <p>
                Normal birth, painless delivery with an epidural, or a caesarean when it is the safer
                way. The labour team is here day and night, and newborn care is in the same building.
              </p>
              <div className="links">
                <Link href="/normal-delivery/">Labour and delivery</Link>
                <Link href="/painless-delivery/">Painless delivery</Link>
                <Link href="/postnatal-care/">Newborn care</Link>
              </div>
              <span className="by">
                <img src="/images/clinic/dr-lakshmi-portrait.jpg" alt="" />
                With Dr. Lakshmi and the night team
              </span>
            </div>
            <div className="scene sc" aria-hidden="true">
              <svg viewBox="0 0 520 520">
                <circle cx="260" cy="230" r="150" fill="#FDEDE8" />
                <path d="M170 300c0-70 40-120 90-120s90 50 90 120c0 30-40 50-90 50s-90-20-90-50z" fill="#fff" stroke="#F4978E" strokeWidth="3" />
                <path d="M190 290c30 14 110 14 140 0" fill="none" stroke="#F9C9B6" strokeWidth="3" />
                <circle cx="260" cy="186" r="52" fill="#fff" stroke="url(#ng)" strokeWidth="4" />
                <path d="M240 186c4 4 10 4 14 0M266 186c4 4 10 4 14 0M250 206c6 5 14 5 20 0" fill="none" stroke="url(#ng)" strokeWidth="3.4" strokeLinecap="round" />
                <path d="M256 134c-2-12 8-18 16-12" fill="none" stroke="url(#ng)" strokeWidth="3.4" strokeLinecap="round" />
                <text className="lbl" x="40" y="420">Mother</text>
                <text className="lbl" x="40" y="476">Baby</text>
                <path d="M120 416h90l12-24 16 46 14-34 10 12h218" fill="none" stroke="#E8F0FA" strokeWidth="3" />
                <path className="ecg-run" d="M120 416h90l12-24 16 46 14-34 10 12h218" fill="none" stroke="#17407E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M120 472h50l8-16 10 30 10-22 6 8h60l8-16 10 30 10-22 6 8h142" fill="none" stroke="#E8F0FA" strokeWidth="3" />
                <path className="ecg-run fast" d="M120 472h50l8-16 10 30 10-22 6 8h60l8-16 10 30 10-22 6 8h142" fill="none" stroke="#F4978E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </article>

          <article className="panel p4" data-c="4">
            <div className="txt">
              <div className="age">
                <b>Always</b>
                <span>
                  Chapter four<br />The heart
                </span>
              </div>
              <h3 style={{ color: "#fff" }}>A heart for the years ahead</h3>
              <p>
                Chest pain, breathlessness or a worrying ECG. Tests happen here, and when surgery is
                needed, Dr. Ashish explains every option, including keyhole heart surgery through a
                small cut in the side.
              </p>
              <div className="links">
                <Link href="/heart-and-vascular-surgery/">Explore the heart map</Link>
                <Link href="/keyhole-heart-surgery/">Keyhole surgery</Link>
                <Link href="/varicose-veins/">Varicose veins</Link>
              </div>
              <span className="by">
                <img src="/images/clinic/dr-ashish-portrait.jpg" alt="" />
                With Dr. Ashish Baviskar
              </span>
            </div>
            <div className="scene sc" aria-hidden="true">
              <svg viewBox="0 0 520 520">
                <g fill="none" stroke="rgba(143,184,234,.18)" strokeWidth="1">
                  <circle cx="260" cy="250" r="230" />
                  <circle cx="260" cy="250" r="180" />
                  <circle cx="260" cy="250" r="130" />
                </g>
                <g className="beat2">
                  <path d="M260 400s-150-86-150-196a76 76 0 0 1 150-30 76 76 0 0 1 150 30c0 110-150 196-150 196z" fill="rgba(42,91,168,.25)" stroke="#8FB8EA" strokeWidth="2.4" />
                  <path d="M260 372s-120-72-120-166a56 56 0 0 1 104-28" fill="none" stroke="rgba(249,201,182,.5)" strokeWidth="8" strokeLinecap="round" />
                </g>
                <path d="M40 260h120l16-34 22 70 20-52 12 16h250" fill="none" stroke="rgba(244,151,142,.25)" strokeWidth="3" />
                <path className="ecg-run" d="M40 260h120l16-34 22 70 20-52 12 16h250" fill="none" stroke="#F4978E" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </article>
        </div>
        <div className="hs-count" aria-hidden="true">
          <b>{String(Math.max(1, active)).padStart(2, "0")}</b> / 04
        </div>
        <div className="lifeline" aria-hidden="true">
          <svg viewBox="0 0 1000 46" preserveAspectRatio="none">
            <defs>
              <linearGradient id="llg" x1="0" x2="1">
                <stop offset="0" stopColor="#2A5BA8" />
                <stop offset="1" stopColor="#F4978E" />
              </linearGradient>
            </defs>
            <path className="bgp" d="M0 23H220l10-16 12 32 10-22 6 6H470l10-16 12 32 10-22 6 6H720l10-16 12 32 10-22 6 6H1000" />
            <path className="fgp" ref={llfRef} d="M0 23H220l10-16 12 32 10-22 6 6H470l10-16 12 32 10-22 6 6H720l10-16 12 32 10-22 6 6H1000" />
          </svg>
          <div className="marks">
            {marks.map((m, i) => (
              <span key={m} className={i + 1 === active ? "on" : ""}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Fetus symbol (#fetus in the reference). */
export function Fetus({ width = 200, height = 200, x = 160, y = 160 }: { width?: number; height?: number; x?: number; y?: number }) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 200 200">
      <g transform="rotate(-28 100 110)" stroke="#17407E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M92 88C58 94 42 128 52 158c10 28 48 36 74 22 24-14 32-44 20-68-8-16-24-24-40-24z" fill="#F9C9B6" />
        <path d="M84 186c-6 8-4 16 4 20" fill="none" stroke="#F4978E" strokeDasharray="2 6" />
        <circle cx="110" cy="62" r="38" fill="#FFF6F2" />
        <path d="M118 66q8 6 16 0" fill="none" />
      </g>
      <circle cx="140" cy="62" r="5" fill="#F4978E" opacity=".5" />
    </svg>
  );
}
