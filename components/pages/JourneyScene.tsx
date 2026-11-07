"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type JStep = { t: string; p: string; img: string; c: string };

const JOURNEYS: Record<"l" | "a", JStep[]> = {
  l: [
    { t: "First visit", p: "You meet Dr. Lakshmi herself. She listens, examines and explains what she thinks is going on.", img: "dr-lakshmi-consult", c: "Consultation" },
    { t: "The scan, next door", p: "With a fellowship in ultrasound, she reads many scans herself and explains them in the same visit.", img: "dr-lakshmi-pregnancy", c: "Pregnancy check" },
    { t: "Delivery or surgery", p: "The doctor who planned your care is the one in the labour room or theatre.", img: "dr-lakshmi-scrubs", c: "In theatre" },
    { t: "Follow-up", p: "She reviews your reports and plans the next step, so nothing is lost between doctors.", img: "dr-lakshmi-review", c: "Reviewing reports" },
  ],
  a: [
    { t: "First visit, family included", p: "Dr. Ashish explains the heart with a model, to you and to whoever came with you.", img: "dr-ashish-consult", c: "Consultation" },
    { t: "Tests, then a decision", p: "ECG, echo and other reports first. No decision until you understand them.", img: "dr-ashish-ecg", c: "Reading an ECG" },
    { t: "Surgery, when it is right", p: "Bypass, valve or keyhole surgery, by the surgeon you already know.", img: "dr-ashish-scrubs", c: "Before theatre" },
    { t: "Walking again", p: "He checks on your recovery and plans walking, wound care and follow-up visits.", img: "dr-ashish-recovery", c: "Recovery walk" },
  ],
};

const FACES: Record<"l" | "a", string> = {
  l: "/images/doctors/dr-lakshmi-headshot.jpg",
  a: "/images/doctors/dr-ashish-headshot.jpg",
};

function prog(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  const span = el.offsetHeight - window.innerHeight;
  return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
}

/** Pinned "one doctor, start to finish" journey scene (scroll-driven). */
export function JourneyScene() {
  const secRef = useRef<HTMLElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const jphRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLElement>(null);
  const btnL = useRef<HTMLButtonElement>(null);
  const btnA = useRef<HTMLButtonElement>(null);
  const [doc, setDoc] = useState<"l" | "a">("l");
  const [step, setStep] = useState(0);
  const [jp, setJp] = useState(0);
  const [fading, setFading] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tall, setTall] = useState(false);
  const fadeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const moveKnob = useCallback(() => {
    const b = doc === "l" ? btnL.current : btnA.current;
    const k = knobRef.current;
    if (!b || !k || !b.offsetWidth) return;
    k.style.width = b.offsetWidth + "px";
    k.style.transform = `translateX(${b.offsetLeft - 4}px)`;
  }, [doc]);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = matchMedia("(max-width: 860px)");
    const onMq = () => {
      setMobile(mq.matches);
      if (mq.matches) setStep(3);
    };
    mq.addEventListener("change", onMq);

    const sec = secRef.current;
    let raf = 0;
    const onScroll = () => {
      if (!sec || window.innerWidth <= 860) return;
      const p = prog(sec);
      setJp(p);
      setStep(Math.min(3, Math.floor(p * 4.6)));
    };
    const measure = () => {
      const left = leftRef.current;
      const stick = stickRef.current;
      if (!left || !stick || window.innerWidth <= 860) return;
      setTall(left.scrollHeight > stick.clientHeight);
    };
    const handler = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        onScroll();
      });
    };
    /* initial state is set inside rAF so it is not a synchronous effect setState */
    const init = requestAnimationFrame(() => {
      onMq();
      if (reduce) setStep(3);
      else onScroll();
    });
    if (!reduce) window.addEventListener("scroll", handler, { passive: true });
    const onResize = () => {
      onScroll();
      moveKnob();
      measure();
    };
    measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(init);
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", onResize);
      if (fadeT.current) clearTimeout(fadeT.current);
    };
  }, [moveKnob]);

  useEffect(() => {
    moveKnob();
  }, [doc, mobile, moveKnob]);

  const toggle = (d: "l" | "a") => {
    if (d === doc) return;
    setFading(true);
    fadeT.current = setTimeout(() => {
      setDoc(d);
      setFading(false);
    }, 420);
  };

  const steps = JOURNEYS[doc];
  const capStep = steps[Math.min(Math.max(step, 0), steps.length - 1)];

  const head = (
    <>
      <p className="kicker">One doctor, start to finish</p>
      <h2 style={{ marginTop: 12, maxWidth: "14ch" }}>
        The doctor you meet is the doctor who stays.
      </h2>
    </>
  );

  return (
    <section
      className={`journey night${tall ? " jtall" : ""}`}
      id="journey"
      ref={secRef}
    >
      {tall && <div className="wrap jhead">{head}</div>}
      <div className="stick wrap" ref={stickRef}>
        <div ref={leftRef}>
          {!tall && head}
          <div className="jtoggle" role="group" aria-label="Choose doctor">
            <span className="knob" ref={knobRef}></span>
            <button
              type="button"
              ref={btnL}
              aria-pressed={doc === "l"}
              onClick={() => toggle("l")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FACES.l} alt="" width={28} height={28} />
              Dr. Lakshmi
            </button>
            <button
              type="button"
              ref={btnA}
              aria-pressed={doc === "a"}
              onClick={() => toggle("a")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FACES.a} alt="" width={28} height={28} />
              Dr. Ashish
            </button>
          </div>
          <ol className="jsteps">
            <i
              className="bar"
              style={{ transform: `scaleY(${Math.min(1, (step + 1) / 4)})` }}
            ></i>
            {steps.map((s, i) => (
              <li key={s.t} className={mobile || i <= step ? "on" : ""}>
                <span className="no">0{i + 1}</span>
                <div>
                  <b>{s.t}</b>
                  <p>{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={`jph${fading ? " fading" : ""}`} ref={jphRef}>
          {steps.map((s, i) => (
            <Image
              key={s.img}
              className={`st${i <= step ? " on" : ""}`}
              src={`/images/doctors/${s.img}.jpg`}
              alt={s.c}
              fill
              sizes="(max-width: 860px) 100vw, 55vw"
              style={{ zIndex: i + 1 }}
            />
          ))}
          <div className="segs">
            {steps.map((s, i) => (
              <i key={s.t}>
                <b
                  style={{
                    transform: `scaleX(${
                      i < step ? 1 : i === step ? Math.max(0.04, jp * 4 - i) : 0
                    })`,
                  }}
                ></b>
              </i>
            ))}
          </div>
          <div className="cap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FACES[doc]} alt="" width={30} height={30} />
            <span>{capStep.c}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
