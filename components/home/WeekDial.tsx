"use client";

import { useEffect, useRef, useState } from "react";
import { Fetus } from "./ChapterStory";

const CX = 250,
  CY = 250,
  R = 200;
const MS = [
  [8, "Dating scan", "8 wks"],
  [12, "NT scan", "12 wks"],
  [20, "Anomaly scan", "20 wks"],
  [26, "Sugar test", "26 wks"],
  [32, "Growth scan", "32 wks"],
  [37, "Full term", "37 wks"],
  [40, "Due date", "40 wks"],
] as const;
const FR = [
  [4, 7, "Pomegranate seed", "#D9534F", 0.32, ["Confirm the pregnancy", "First visit and folic acid"], ["Tiredness", "Nausea, for some", "Sore breasts"]],
  [8, 11, "Jamun", "#5B3A73", 0.42, ["Booking visit with blood tests", "Dating scan"], ["Nausea may peak", "Needing to pee more often"]],
  [12, 14, "Lemon", "#E6CF4A", 0.5, ["NT scan and first-trimester screening", "Diet, work and travel talk"], ["Energy often returns", "Nausea often eases"]],
  [15, 19, "Guava", "#8DBF6A", 0.58, ["Monthly check: weight, BP, urine", "Blood tests if due"], ["A small bump", "First flutters, for some"]],
  [20, 23, "Mango", "#F2B33D", 0.68, ["Anomaly scan, usually 18 to 22 weeks", "Iron and calcium checked"], ["Clear baby movements", "Back ache, for some"]],
  [24, 28, "Papaya", "#F39A4A", 0.78, ["Sugar test for diabetes in pregnancy", "Blood pressure watched closely"], ["Heartburn", "Leg cramps at night"]],
  [29, 34, "Coconut", "#8B6B4A", 0.88, ["Visits every two weeks", "Growth scan if needed, birth plan talk"], ["Breathless on stairs", "Practice tightenings"]],
  [35, 40, "Watermelon", "#4E9A5B", 1, ["Weekly visits and movement checks", "Painless delivery and hospital bag planned"], ["Baby moves lower", "Trouble sleeping"]],
] as const;

const pt = (w: number, rad: number) => {
  const a = (w / 40) * Math.PI * 2 - Math.PI / 2;
  return [+(CX + Math.cos(a) * rad).toFixed(2), +(CY + Math.sin(a) * rad).toFixed(2)];
};
const arc = (w0: number, w1: number, rad: number) => {
  const p0 = pt(w0, rad),
    p1 = pt(w1, rad);
  return `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${rad} ${rad} 0 ${w1 - w0 > 20 ? 1 : 0} 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`;
};

function FruitSvg({ c, s }: { c: string; s: number }) {
  return (
    <svg viewBox="0 0 54 54" style={{ transform: `scale(${(0.55 + s * 0.45).toFixed(2)})` }}>
      <ellipse cx="27" cy="30" rx="20" ry="18" fill={c} />
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#fff" opacity=".35" />
      <path d="M27 12c4-8 12-8 14-6-4 4-8 6-14 6z" fill="#4E9A5B" />
    </svg>
  );
}

/** Pregnancy week dial + due-date + stage cards (.comp). */
export function WeekDial() {
  const [week, setWeek] = useState(20);
  const [lmpOut, setLmpOut] = useState<React.ReactNode>("Or simply drag the dial to your week.");
  const dialRef = useRef<SVGSVGElement>(null);
  const drag = useRef(false);

  const cur = Math.min(40, Math.max(4, week));
  const tri = cur < 14 ? "first" : cur < 28 ? "second" : "third";
  const fi = FR.findIndex((f) => cur >= f[0] && cur <= f[1]);
  const f = FR[Math.max(0, fi)];
  const knobP = pt(cur, R);
  const nextMs = MS.find((m) => m[0] >= cur)?.[0];

  const fromEvent = (e: React.PointerEvent) => {
    const r = dialRef.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 500 - CX,
      y = ((e.clientY - r.top) / r.height) * 500 - CY;
    let a = Math.atan2(y, x) + Math.PI / 2;
    if (a < 0) a += Math.PI * 2;
    return Math.round((a / (Math.PI * 2)) * 40);
  };

  const calcLmp = (v: string) => {
    if (!v) return setLmpOut("Choose a date first.");
    const d = new Date(v + "T00:00:00"),
      today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.floor((today.getTime() - d.getTime()) / 864e5);
    if (days < 0 || days > 300)
      return setLmpOut("That date looks outside a pregnancy. Please check it.");
    const due = new Date(d.getTime() + 280 * 864e5),
      wk = Math.floor(days / 7),
      dd = days % 7;
    setLmpOut(
      <>
        You are about <b>{`${wk} weeks and ${dd} day${dd === 1 ? "" : "s"}`}</b>. Your due date is
        around <b>{due.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</b>.
      </>,
    );
    setWeek(Math.max(4, wk));
  };

  return (
    <section className="pad comp" id="mothers" aria-labelledby="m-h">
      <div className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="tag">
              <i></i>For mothers-to-be
            </span>
            <h2 className="h2 rv" id="m-h">
              Your pregnancy, <span className="soft">week by week.</span>
            </h2>
          </div>
          <p className="lede rv">
            Drag the dial to your week, or enter the first day of your last period. You will see your
            baby's size, what happens at Penguin at that stage, and what you might feel.
          </p>
        </div>
        <div className="comp-card rv">
          <div className="dialw">
            <svg
              viewBox="0 0 500 500"
              className="dial"
              ref={dialRef}
              role="slider"
              aria-label="Week of pregnancy"
              aria-valuemin={4}
              aria-valuemax={40}
              aria-valuenow={cur}
              aria-valuetext={`${cur} weeks`}
              tabIndex={0}
              onPointerDown={(e) => {
                drag.current = true;
                (e.target as Element).setPointerCapture?.(e.pointerId);
                setWeek(fromEvent(e));
                const h = document.querySelector(".dialw .hint") as HTMLElement;
                if (h) h.style.opacity = "0";
              }}
              onPointerMove={(e) => drag.current && setWeek(fromEvent(e))}
              onPointerUp={() => (drag.current = false)}
              onPointerCancel={() => (drag.current = false)}
              onKeyDown={(e) => {
                if (["ArrowRight", "ArrowUp"].includes(e.key)) {
                  setWeek(cur + 1);
                  e.preventDefault();
                }
                if (["ArrowLeft", "ArrowDown"].includes(e.key)) {
                  setWeek(cur - 1);
                  e.preventDefault();
                }
              }}
            >
              <circle className="trk" cx="250" cy="250" r="200" />
              <path className="tri" d={arc(0.3, 13, R)} stroke="#C9DDF5" />
              <path className="tri" d={arc(13.6, 27, R)} stroke="#F9C9B6" />
              <path className="tri" d={arc(27.6, 39.7, R)} stroke="#F4978E" />
              <path className="prog" d={arc(0.01, Math.max(cur, 0.5), R)} stroke="url(#dg)" />
              {Array.from({ length: 40 }, (_, wk) => {
                const maj = wk % 4 === 0,
                  p0 = pt(wk, R + 18),
                  p1 = pt(wk, R + (maj ? 30 : 25));
                return (
                  <g key={wk}>
                    <line className={`tk${maj ? " maj" : ""}`} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} />
                    {maj && wk > 0 && (
                      <text className="wl" x={pt(wk, R + 44)[0]} y={pt(wk, R + 44)[1] + 4}>
                        {wk}
                      </text>
                    )}
                  </g>
                );
              })}
              {MS.map((m) => {
                const p = pt(m[0], R);
                const done = m[0] < cur,
                  isCur = Math.abs(m[0] - cur) <= 1 || m[0] === nextMs;
                return (
                  <circle
                    key={m[0]}
                    className={`ms${done ? " done" : ""}${isCur ? " cur" : ""}`}
                    cx={p[0]}
                    cy={p[1]}
                    r="7"
                  />
                );
              })}
              <circle cx="250" cy="250" r="150" fill="#FFF6F3" />
              <g className="baby" style={{ transform: `scale(${(0.5 + (cur / 40) * 0.6).toFixed(2)})` }}>
                <Fetus width={104} height={104} x={198} y={112} />
              </g>
              <text className="wknum" x="250" y="300">
                {cur}
              </text>
              <text className="wksub" x="250" y="330">
                weeks · {tri} trimester
              </text>
              <g className="knob" transform={`translate(${knobP[0].toFixed(1)} ${knobP[1].toFixed(1)})`}>
                <circle className="o" r="20" />
                <circle className="i" r="8" />
              </g>
              <defs>
                <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#17407E" />
                  <stop offset="1" stopColor="#F4978E" />
                </linearGradient>
              </defs>
            </svg>
            <span className="hint">drag me</span>
          </div>
          <div className="comp-r">
            <div className="ddate">
              <label htmlFor="lmp">
                First day of your last period
                <input type="date" id="lmp" />
              </label>
              <button
                className="btn btn-navy"
                type="button"
                style={{ height: 52 }}
                onClick={() => calcLmp((document.getElementById("lmp") as HTMLInputElement).value)}
              >
                Work it out
              </button>
              <p className="out">{lmpOut}</p>
            </div>
            <div className="stage swap" key={f[0]}>
              <div className="st">
                <span className="k">Baby is about the size of</span>
                <div className="fruit">
                  <FruitSvg c={f[3]} s={f[4]} />
                  <b>{f[2]}</b>
                </div>
              </div>
              <div className="st dark">
                <span className="k">At Penguin, now</span>
                <ul>
                  {f[5].map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="st">
                <span className="k">You may notice</span>
                <ul>
                  {f[6].map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="fine">
              A general guide for healthy pregnancies. Dr. Lakshmi sets your own schedule after your
              first visit.
            </p>
          </div>
        </div>
        <div className="miles" aria-label="Pregnancy milestones">
          {MS.map((m) => (
            <button
              key={m[0]}
              className={`mile${m[0] < cur ? " done" : ""}${m[0] === nextMs ? " cur" : ""}`}
              type="button"
              onClick={() => setWeek(m[0])}
            >
              <b>{m[2]}</b>
              {m[1]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
