"use client";

import { useState } from "react";
import { weekInfo, weekFromLmp, dueDateFromLmp, MIN_WEEK, MAX_WEEK } from "@/lib/pregnancy-weeks";

/** Week-by-week tool page block (.tool/.lmp/.wkbig/.range/.now/.stgs). */
export function WeekTool() {
  const [week, setWeek] = useState(20);
  const [lmpOut, setLmpOut] = useState<React.ReactNode | null>(null);
  const info = weekInfo(week);
  const tri = week < 14 ? "first" : week < 28 ? "second" : "third";

  const calc = (v: string) => {
    if (!v) return setLmpOut("Choose a date first.");
    const d = new Date(v + "T00:00:00");
    const days = Math.floor((Date.now() - d.getTime()) / 864e5);
    if (days < 0 || days > 300) return setLmpOut("That date looks outside a pregnancy. Please check it.");
    const wk = Math.floor(days / 7);
    setLmpOut(
      <>
        You are about <b>{wk} weeks</b>. Your due date is around{" "}
        <b>{dueDateFromLmp(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</b>.
      </>,
    );
    setWeek(Math.max(MIN_WEEK, Math.min(MAX_WEEK, wk)));
  };

  const stageWeeks = [[4, 7], [8, 11], [12, 14], [15, 19], [20, 23], [24, 28], [29, 34], [35, 40]];

  return (
    <div className="tool">
      <div className="lmp">
        <label htmlFor="tool-lmp">First day of your last period</label>
        <div className="row">
          <input type="date" id="tool-lmp" />
          <button
            className="btn btn-navy"
            type="button"
            style={{ minHeight: 54 }}
            onClick={() => calc((document.getElementById("tool-lmp") as HTMLInputElement).value)}
          >
            Work it out
          </button>
        </div>
        <p className="out">{lmpOut ?? "Or drag the week slider below."}</p>
      </div>
      <div className="wkbig">
        <b>{week}</b>
        <span>
          weeks
          <small>{tri} trimester</small>
        </span>
      </div>
      <input
        className="range"
        type="range"
        min={MIN_WEEK}
        max={MAX_WEEK}
        value={week}
        aria-label="Week of pregnancy"
        style={{ "--p": `${(((week - MIN_WEEK) / (MAX_WEEK - MIN_WEEK)) * 100).toFixed(0)}%` } as React.CSSProperties}
        onChange={(e) => setWeek(+e.target.value)}
      />
      <div className="tris">
        <span>First trimester</span>
        <span>Second</span>
        <span>Third</span>
      </div>
      <div className="now">
        <div className="szc">
          <small>Baby is about the size of</small>
          <b>{info.size}</b>
        </div>
        <div>
          <h3>At Penguin, now</h3>
          <p>{info.hospital}</p>
        </div>
        <div>
          <h3>You may notice</h3>
          <p>{info.feel}</p>
        </div>
      </div>
      <div className="stgs">
        {stageWeeks.map(([a, b]) => {
          const i = weekInfo(b === 40 ? MAX_WEEK : b);
          const cur = week >= a && week <= b;
          return (
            <div className={`stg${cur ? " cur" : ""}`} key={a}>
              <div className="wk">
                <b>
                  {a}
                  {a === b ? "" : ` to ${b}`}
                </b>
                <small>weeks</small>
              </div>
              <div className="sz">{weekInfo(a).size}</div>
              <div>
                <h3>At Penguin</h3>
                <p>{weekInfo(a).hospital}</p>
              </div>
              <div>
                <h3>You may notice</h3>
                <p>{weekInfo(a).feel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
