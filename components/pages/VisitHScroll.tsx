"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CARDS = [
  {
    img: "/images/pages/step-1-book.jpg",
    alt: "A woman booking a visit on WhatsApp from her sofa",
    b: "Book a slot",
    p: "Online, by phone or on WhatsApp. Walk-ins are seen in OPD hours, but a booking saves you waiting.",
  },
  {
    img: "/images/pages/step-2-arrive.jpg",
    alt: "A couple at the front desk",
    b: "Register at the front desk",
    p: "Your name, mobile number and an ID. Bring every old report and scan.",
  },
  {
    icon: true,
    b: "Quick checks with a nurse",
    p: "Weight, blood pressure and pulse, before you see your doctor.",
  },
  {
    img: "/images/pages/step-3-consultation.jpg",
    alt: "Dr. Lakshmi in consultation with a couple",
    b: "See your doctor",
    p: "Your own specialist, with time for your questions and your family.",
  },
  {
    img: "/images/pages/ultrasound-room.jpg",
    alt: "The ultrasound room next to the consultation room",
    b: "Scan next door, if needed",
    p: "The ultrasound room is beside the consultation room. Many scans happen in the same visit.",
  },
  {
    img: "/images/pages/step-5-plan.jpg",
    alt: "A doctor writing a care plan",
    b: "Leave with a written plan",
    p: "Medicines, tests and the date of your next visit, on paper.",
  },
  {
    img: "/images/pages/step-6-follow-up.jpg",
    alt: "A mother on a video follow-up with her baby",
    b: "Follow up with the same doctor",
    p: "Questions after you go home? Message us on WhatsApp.",
  },
] as const;

/** "Your first visit": pinned horizontal track on desktop, scroller on mobile. */
export function VisitHScroll() {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGCircleElement>(null);
  const handRef = useRef<SVGLineElement>(null);
  const [lbl, setLbl] = useState("Step 1 of 7");

  useEffect(() => {
    const sec = secRef.current;
    const tr = trackRef.current;
    if (!sec || !tr) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let hsMax = 0;
    const measure = () => {
      if (window.innerWidth > 760) {
        hsMax = Math.max(0, tr.scrollWidth - window.innerWidth);
        sec.style.height = window.innerHeight + hsMax + "px";
      } else {
        sec.style.height = "auto";
      }
    };
    const onScroll = () => {
      if (window.innerWidth <= 760) return;
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      tr.style.transform = `translateX(${-p * hsMax}px)`;
      if (fgRef.current) fgRef.current.style.strokeDashoffset = String(226 * (1 - p));
      if (handRef.current) handRef.current.style.transform = `rotate(${p * 360}deg)`;
      setLbl(`Step ${Math.min(7, Math.floor(p * 6.99) + 1)} of 7`);
    };
    let raf = 0;
    const handler = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          onScroll();
        });
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    onScroll();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", onResize);
      sec.style.height = "";
      tr.style.transform = "";
    };
  }, []);

  return (
    <section className="hscroll" id="v-first" ref={secRef}>
      <div className="stick">
        <div className="wrap hs-head">
          <div>
            <p className="kicker">Your first visit</p>
            <h2 className="h-l" style={{ marginTop: 10, maxWidth: "14ch" }}>
              From the front door to a written plan.
            </h2>
          </div>
          <div className="ringclock">
            <svg viewBox="0 0 84 84" aria-hidden="true">
              <circle className="bg" cx="42" cy="42" r="36" />
              <circle className="fg" ref={fgRef} cx="42" cy="42" r="36" />
              <line className="hand" ref={handRef} x1="42" y1="42" x2="42" y2="16" />
              <circle cx="42" cy="42" r="3.5" fill="#fff" />
            </svg>
            <div>
              <b>{lbl}</b>
              <span>About an hour in total</span>
            </div>
          </div>
        </div>
        <div className="track" ref={trackRef}>
          {CARDS.map((c, i) => (
            <article key={c.b} className={`vcard${"icon" in c ? " icon" : ""}`}>
              <div className="im">
                {"icon" in c ? (
                  <svg className="bp" viewBox="0 0 200 130" aria-hidden="true">
                    <path className="beat" d="M0 66 H60 l10 -14 8 14 H100 l12 -46 14 70 10 -24 H200" />
                    <g className="pulse">
                      <circle cx="100" cy="66" r="9" fill="#F4978E" />
                    </g>
                  </svg>
                ) : (
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 760px) 82vw, 420px"
                  />
                )}
                <span className="no">{i + 1}</span>
              </div>
              <div className="tx">
                <b>{c.b}</b>
                <p>{c.p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
