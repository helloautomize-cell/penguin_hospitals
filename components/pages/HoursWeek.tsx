"use client";

import { useEffect, useRef } from "react";

/* OPD hours per Google profile: index = JS getDay() (0 = Sunday). */
const HOURS: [number, number][] = [
  [16, 18],
  [0, 24],
  [0, 24],
  [0, 24],
  [0, 24],
  [0, 24],
  [0, 24],
];
const NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Weekly hours chart with a live "now" line (IST). */
export function HoursWeek() {
  const weekRef = useRef<HTMLDivElement>(null);
  const nowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const place = () => {
      const w = weekRef.current;
      const nl = nowRef.current;
      if (!w || !nl) return;
      const col = w.querySelector<HTMLElement>(".day .col");
      if (!col) return;
      const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = ist.getHours() + ist.getMinutes() / 60;
      nl.style.top = col.offsetTop + (col.offsetHeight * h) / 24 + "px";
      w.querySelectorAll<HTMLElement>(".day").forEach((d) =>
        d.classList.toggle("today", Number(d.dataset.d) === ist.getDay()),
      );
    };
    place();
    const t = setInterval(place, 30000);
    window.addEventListener("resize", place);
    return () => {
      clearInterval(t);
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <div className="week" ref={weekRef}>
      <div className="axis">
        <span>12 am</span>
        <span>6 am</span>
        <span>12 pm</span>
        <span>6 pm</span>
      </div>
      {ORDER.map((d) => {
        const [a, b] = HOURS[d];
        return (
          <div className="day" data-d={d} key={d}>
            <div className="col">
              <span
                className="open"
                style={{ top: `${(a / 24) * 100}%`, height: `${((b - a) / 24) * 100}%` }}
              />
              <span className="emg" />
            </div>
            <span>{NAMES[d]}</span>
          </div>
        );
      })}
      <div className="nowline" ref={nowRef} />
    </div>
  );
}
