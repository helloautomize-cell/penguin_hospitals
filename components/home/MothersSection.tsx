"use client";

// "For mothers-to-be" — ported 1:1 from resources/reference/sections-v2/.
// 40-week dial (trimester arcs, ticks, curved labels, milestone dots) with a
// draggable knob, fruit illustration in the centre, week facts on the right,
// milestone timeline, and a last-period calculator that works without JS.
// Geometry: 560x560 viewBox, centre C=280, ring R=214, 9deg per week.

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { fruitForWeek } from "@/lib/pregnancy-weeks";
import { FruitSvg } from "@/components/fruits";
import { lmpCalc, type LmpState } from "@/app/actions";

const C = 280;
const R = 214;
const N = 40;
const per = 360 / N;

const TRI: [number, number, string, string][] = [
  [1, 13, "#C3D7F1", "First trimester"],
  [14, 27, "#F9C9B6", "Second trimester"],
  [28, 40, "#F4978E", "Third trimester"],
];

const MS: [number, string][] = [
  [8, "Dating scan"],
  [12, "NT scan"],
  [20, "Anomaly scan"],
  [26, "Sugar test"],
  [32, "Growth scan"],
  [37, "Full term"],
  [40, "Due date"],
];

function f(n: number) {
  return Math.round(n * 10) / 10;
}

function pt(r: number, d: number): [number, number] {
  const a = (d * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)];
}

function arc(r: number, a0: number, a1: number, rev = false) {
  const p0 = pt(r, rev ? a1 : a0);
  const p1 = pt(r, rev ? a0 : a1);
  return `M${f(p0[0])} ${f(p0[1])}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${rev ? 0 : 1} ${f(p1[0])} ${f(p1[1])}`;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

export function MothersSection() {
  const [week, setWeekState] = useState(20);
  const [hintGone, setHintGone] = useState(false);
  const dragging = useRef(false);
  const touched = useRef(false);
  const dialRef = useRef<SVGSVGElement>(null);
  const [lmp, lmpAction, lmpPending] = useActionState<LmpState, FormData>(
    lmpCalc,
    { status: "idle" },
  );

  const setWeek = useCallback((w: number) => {
    setWeekState(Math.max(4, Math.min(40, Math.round(w))));
  }, []);

  // The server action's result also turns the dial to the computed week.
  useEffect(() => {
    if (lmp.status === "ok") setWeek(Math.max(4, lmp.week));
  }, [lmp, setWeek]);

  // One gentle sweep from week 4 to 20 the first time the dial is seen.
  useEffect(() => {
    const dial = dialRef.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!dial || reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        if (touched.current) return;
        const t0 = performance.now();
        (function st(n: number) {
          const q = Math.min(1, (n - t0) / 1800);
          const e = 1 - Math.pow(1 - q, 3);
          setWeek(4 + 16 * e);
          if (q < 1 && !dragging.current) requestAnimationFrame(st);
        })(t0);
      },
      { threshold: 0.5 },
    );
    io.observe(dial);
    return () => io.disconnect();
  }, [setWeek]);

  const fromEv = (e: React.PointerEvent) => {
    const r = dialRef.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 560 - C;
    const y = ((e.clientY - r.top) / r.height) * 560 - C;
    let a = (Math.atan2(x, -y) * 180) / Math.PI;
    if (a < 0) a += 360;
    return a / per;
  };

  const touch = () => {
    touched.current = true;
    setHintGone(true);
  };

  const a = week * per;
  const kp = pt(R, a);
  const tri = week <= 13 ? 0 : week <= 27 ? 1 : 2;
  const { index: fi, row: fr } = fruitForWeek(week);
  const within = (week - fr[0]) / Math.max(1, fr[1] - fr[0]);
  const k = 0.4 + 0.42 * (fr[4] + within * 0.06);
  const sz = 200 * k;
  const nextMs = MS.find((m) => m[0] >= week);
  const tlPct = ((week - 4) / 36) * 100;

  return (
    <section className="pad mo" id="mothers" aria-labelledby="m-h">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="tag">
              <i></i>For mothers-to-be
            </span>
            <h2 id="m-h">
              Your pregnancy, <span>week by week.</span>
            </h2>
          </div>
          <p>
            Turn the dial to your week, or enter the first day of your last
            period. See your baby&apos;s size, what happens at Penguin at that
            stage, and what you might feel.
          </p>
        </div>
        <div className="mo-card">
          <div className="mo-grid">
            <div className="dialw">
              <svg
                className="dial"
                ref={dialRef}
                viewBox="0 0 560 560"
                role="slider"
                tabIndex={0}
                aria-label="Week of pregnancy"
                aria-valuemin={4}
                aria-valuemax={40}
                aria-valuenow={week}
                aria-valuetext={`Week ${week}, ${TRI[tri][3].toLowerCase()}`}
                onPointerDown={(e) => {
                  dragging.current = true;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setWeek(fromEv(e));
                  touch();
                }}
                onPointerMove={(e) => {
                  if (dragging.current) setWeek(fromEv(e));
                }}
                onPointerUp={() => {
                  dragging.current = false;
                }}
                onPointerCancel={() => {
                  dragging.current = false;
                }}
                onKeyDown={(e) => {
                  const key = e.key;
                  if (key === "ArrowRight" || key === "ArrowUp") {
                    setWeek(week + 1);
                    e.preventDefault();
                  } else if (key === "ArrowLeft" || key === "ArrowDown") {
                    setWeek(week - 1);
                    e.preventDefault();
                  } else if (key === "PageUp") {
                    setWeek(week + 4);
                    e.preventDefault();
                  } else if (key === "PageDown") {
                    setWeek(week - 4);
                    e.preventDefault();
                  } else if (key === "Home") {
                    setWeek(4);
                    e.preventDefault();
                  } else if (key === "End") {
                    setWeek(40);
                    e.preventDefault();
                  }
                  touch();
                }}
              >
                <defs>
                  <radialGradient id="plateG" cx="50%" cy="42%" r="60%">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset=".7" stopColor="#FFF4F0" />
                    <stop offset="1" stopColor="#FCE6DF" />
                  </radialGradient>
                </defs>
                <circle className="trk" cx={C} cy={C} r={R} />
                <g>
                  {TRI.map((t, i) => {
                    const a0 = (t[0] - 1) * per;
                    const a1 = t[1] * per;
                    const mid = (a0 + a1) / 2;
                    const low = mid > 90 && mid < 270;
                    return (
                      <g key={t[3]}>
                        <path
                          className="tri"
                          stroke={t[2]}
                          d={arc(R, a0 + 1.6, a1 - 1.6)}
                        />
                        <path
                          id={`mo-tl${i}`}
                          fill="none"
                          d={arc(low ? R + 80 : R + 70, a0, a1, low)}
                        />
                        <text className="lab" textAnchor="middle">
                          <textPath href={`#mo-tl${i}`} startOffset="50%">
                            {t[3].toUpperCase()}
                          </textPath>
                        </text>
                      </g>
                    );
                  })}
                </g>
                <path className="prog" d={arc(R - 24, 0, a)} />
                <g>
                  {Array.from({ length: N }, (_, i) => {
                    const mj = i % 4 === 0;
                    const aa = i * per;
                    const p0 = pt(R + 22, aa);
                    const p1 = pt(R + (mj ? 38 : 30), aa);
                    return (
                      <line
                        key={i}
                        className={`tk${mj ? " mj" : ""}`}
                        x1={f(p0[0])}
                        y1={f(p0[1])}
                        x2={f(p1[0])}
                        y2={f(p1[1])}
                      />
                    );
                  })}
                  {[8, 12, 16, 20, 24, 28, 32, 36].map((w) => {
                    const p = pt(R + 52, w * per);
                    return (
                      <text
                        key={w}
                        className="num"
                        textAnchor="middle"
                        x={f(p[0])}
                        y={f(p[1] + 4)}
                      >
                        {w}
                      </text>
                    );
                  })}
                  {(() => {
                    const p = pt(R + 52, 0);
                    return (
                      <text
                        className="num"
                        textAnchor="middle"
                        x={f(p[0])}
                        y={f(p[1] + 4)}
                      >
                        40
                      </text>
                    );
                  })()}
                </g>
                <g>
                  {MS.map((m) => {
                    const p = pt(R, m[0] * per);
                    return (
                      <circle
                        key={m[0]}
                        className={`ms${m[0] <= week ? " done" : ""}`}
                        cx={f(p[0])}
                        cy={f(p[1])}
                        r="6"
                      />
                    );
                  })}
                </g>
                <circle className="plate" cx={C} cy={C} r="164" />
                <circle className="plring" cx={C} cy={C} r="164" />
                <g
                  id="fruitG"
                  transform={`translate(${f(C - sz / 2)} ${f(226 - sz / 2)}) scale(${k.toFixed(3)})`}
                >
                  <FruitSvg
                    key={fi}
                    id={fr[2]}
                    x={0}
                    y={0}
                    width={200}
                    height={200}
                  />
                </g>
                <text className="wkn" x={C} y={400}>
                  {week}
                </text>
                <text className="wks" x={C} y={424}>
                  {week === 1 ? "WEEK" : "WEEKS"}
                </text>
                <g
                  className="knob"
                  transform={`translate(${f(kp[0])} ${f(kp[1])})`}
                >
                  <circle className="o" r="17" />
                  <circle className="i" r="6" />
                </g>
              </svg>
              <span
                className="drag"
                aria-hidden="true"
                style={hintGone ? { opacity: 0 } : undefined}
              >
                <svg viewBox="0 0 34 20">
                  <path d="M3 14C10 4 24 4 31 14M26 15l5-1 0-5" />
                </svg>
                Turn the dial
              </span>
            </div>

            {/* phones only: readout + week slider directly under the dial */}
            <div className="wsl">
              <div className="eyb">
                <span className="chip">{TRI[tri][3]}</span>
                <span>
                  Week <b>{week}</b> of 40
                </span>
              </div>
              <input
                className="wr"
                type="range"
                min={4}
                max={40}
                value={week}
                onChange={(e) => {
                  setWeek(+e.target.value);
                  touch();
                }}
                style={{ "--p": `${tlPct}%` } as React.CSSProperties}
                aria-label="Week of pregnancy"
              />
            </div>

            <div className="now" aria-live="polite">
              <div className="eyb">
                <span className="chip">{TRI[tri][3]}</span>
                <span>
                  Week <b>{week}</b> of 40
                </span>
              </div>
              <h3 className="size">
                Baby is about the size of <em>{fr[3]}</em>
              </h3>
              <div className="cols swap" key={fi}>
                <div className="col dk">
                  <h4>At Penguin, now</h4>
                  <ul>
                    {fr[5].map((x) => (
                      <li key={x}>
                        <CheckIcon />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col">
                  <h4>You may notice</h4>
                  <ul>
                    {fr[6].map((x) => (
                      <li key={x}>
                        <DotIcon />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <form className="lmp" action={lmpAction}>
                <label htmlFor="lmp">Know your dates? First day of your last period</label>
                <input type="date" id="lmp" name="lmp" />
                <button
                  className="btn btn-navy"
                  type="submit"
                  disabled={lmpPending}
                >
                  Work it out
                </button>
                <p className="out" aria-live="polite" data-due-result>
                  {lmp.status === "error" && lmp.message}
                  {lmp.status === "ok" && (
                    <>
                      You are about{" "}
                      <b>
                        {lmp.week} weeks and {lmp.days} day
                        {lmp.days === 1 ? "" : "s"}
                      </b>
                      . Your due date is around <b>{lmp.due}</b>.
                    </>
                  )}
                </p>
              </form>
              <p className="fine">
                A general guide for healthy pregnancies. Dr. Lakshmi sets your
                own schedule after your first visit.
              </p>
            </div>
          </div>

          <div className="tlw" aria-label="Pregnancy milestones">
            <div className="tl">
              <div className="bar">
                <i style={{ width: "27.8%", background: "#D7E5F7" }}></i>
                <i style={{ width: "38.9%", background: "#FCDCCD" }}></i>
                <i style={{ width: "33.3%", background: "#F8BDB6" }}></i>
              </div>
              <div
                className="fill"
                style={{ "--tl": `${tlPct}%` } as React.CSSProperties}
              ></div>
              {MS.map((m, i) => (
                <button
                  key={m[0]}
                  type="button"
                  className={`pin ${i % 2 ? "dn" : "up"}${m[0] < week ? " done" : ""}${nextMs && nextMs[0] === m[0] ? " next" : ""}`}
                  style={{ left: `${((m[0] - 4) / 36) * 100}%` }}
                  aria-label={`${m[1]}, week ${m[0]}`}
                  onClick={() => {
                    setWeek(m[0]);
                    touch();
                  }}
                >
                  <span className="t">
                    <small>Week {m[0]}</small>
                    {m[1]}
                  </span>
                  <span className="d"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
