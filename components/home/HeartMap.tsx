"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";

const ZONES = [
  { z: "1", label: "Coronary arteries", text: "When the heart's own arteries are blocked, bypass surgery (CABG) routes blood around the blockage, on the heart-lung machine or on a beating heart.", spot: { left: "47%", top: "58%" } },
  { z: "2", label: "Heart valves", text: "Narrow or leaking valves can often be repaired. When they cannot, they are replaced. Dr. Ashish explains which suits you and why.", spot: { left: "54%", top: "44%" } },
  { z: "3", label: "The aorta", text: "The body's main artery can widen or tear. Aortic and aortic root surgery repairs it, sometimes as an emergency.", spot: { left: "70%", top: "19%" } },
  { z: "4", label: "Keyhole access (MICS)", text: "Some operations can be done through a small cut between the ribs on the side, instead of opening the breastbone. You will be told if you are suited to it.", spot: { left: "88%", top: "56%" } },
  { z: "5", label: "Lungs and chest", text: "Thoracic surgery for lung and chest conditions, planned with scans and a clear talk about recovery.", spot: { left: "14%", top: "52%" } },
];

/** Blueprint heart map (.hm) with tap-to-highlight zones. */
export function HeartMap() {
  const [z, setZ] = useState("1");
  return (
    <section className="pad hm" id="heart" aria-labelledby="hm-h">
      <div className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="tag dk">
              <i></i>Heart and vessels
            </span>
            <h2 className="h2 rv" id="hm-h">
              Tap a part of the heart. <span className="soft">See how Dr. Ashish treats it.</span>
            </h2>
          </div>
          <p className="lede rv">
            A plain-language map of heart surgery. Every operation starts with tests and a
            conversation, and many heart problems never need surgery at all.
          </p>
        </div>
        <div className="hm-grid">
          <div className="hm-art" data-z={z}>
            <svg viewBox="0 0 560 560" aria-hidden="true">
              <path className="bp soft" d="M120 170c-50 40-74 120-62 210 6 46 40 60 78 44 30-12 44-40 44-80V200c0-30-30-50-60-30z" />
              <path className="bp soft" d="M440 170c50 40 74 120 62 210-6 46-40 60-78 44-30-12-44-40-44-80V200c0-30 30-50 60-30z" />
              <g className="zone z5">
                <path d="M120 170c-50 40-74 120-62 210 6 46 40 60 78 44 30-12 44-40 44-80V200c0-30-30-50-60-30z" fill="rgba(244,151,142,.18)" stroke="#F4978E" strokeWidth="2" />
                <path d="M440 170c50 40 74 120 62 210-6 46-40 60-78 44-30-12-44-40-44-80V200c0-30 30-50 60-30z" fill="rgba(244,151,142,.18)" stroke="#F4978E" strokeWidth="2" />
              </g>
              <path className="bp" d="M300 210c0-60 20-110 70-110s60 50 60 80v40" />
              <path className="bp" d="M330 210c0-46 12-80 40-80s32 30 32 50v40" />
              <path className="bp" d="M320 116v-50M350 104v-46M380 104v-40" />
              <path className="bp" d="M250 220c-10-40-40-70-80-76M268 214c-6-30-26-50-56-58" />
              <g className="zone z3">
                <path d="M300 210c0-60 20-110 70-110s60 50 60 80v40" fill="none" stroke="#F4978E" strokeWidth="5" strokeLinecap="round" opacity=".9" />
              </g>
              <path className="fillh" d="M290 470c-80-30-150-100-150-180 0-60 40-100 96-100 30 0 50 12 64 30 16-22 40-36 74-36 54 0 86 44 86 100 0 90-80 160-170 186z" />
              <path className="bp" d="M290 470c-80-30-150-100-150-180 0-60 40-100 96-100 30 0 50 12 64 30 16-22 40-36 74-36 54 0 86 44 86 100 0 90-80 160-170 186z" />
              <path className="bp soft" d="M300 222c-6 70 2 160-10 248" />
              <g className="zone z1">
                <path className="cor" d="M296 226c-30 20-60 30-84 64-20 30-24 70-14 100" />
                <path className="cor" d="M302 230c26 30 70 50 92 96 14 30 10 70-6 92" />
                <path className="cor" d="M252 300c20 10 36 30 40 60" />
              </g>
              <g className="dim">
                <path d="M296 226c-30 20-60 30-84 64-20 30-24 70-14 100" fill="none" stroke="rgba(244,151,142,.35)" strokeWidth="1.6" />
                <path d="M302 230c26 30 70 50 92 96 14 30 10 70-6 92" fill="none" stroke="rgba(244,151,142,.35)" strokeWidth="1.6" />
              </g>
              <g className="zone z2">
                <circle cx="268" cy="290" r="18" fill="rgba(244,151,142,.22)" stroke="#F4978E" strokeWidth="2" />
                <path d="M268 272v36M252 299l32-18" stroke="#F4978E" strokeWidth="2" />
                <circle cx="330" cy="280" r="16" fill="rgba(244,151,142,.22)" stroke="#F4978E" strokeWidth="2" />
                <path d="M330 264v32M316 288l28-16" stroke="#F4978E" strokeWidth="2" />
              </g>
              <g className="dim">
                <circle cx="268" cy="290" r="18" fill="none" stroke="rgba(143,184,234,.4)" strokeWidth="1.4" />
                <circle cx="330" cy="280" r="16" fill="none" stroke="rgba(143,184,234,.4)" strokeWidth="1.4" />
              </g>
              <g className="zone z4">
                <path d="M470 300c18 4 34 16 40 32" fill="none" stroke="#F4978E" strokeWidth="5" strokeLinecap="round" />
                <path d="M462 300 L360 300" stroke="#F4978E" strokeWidth="1.6" strokeDasharray="5 6" />
                <text x="440" y="368" fill="#F9C9B6" style={{ font: "600 13px Figtree,sans-serif", letterSpacing: ".1em" }}>
                  SMALL SIDE CUT
                </text>
              </g>
            </svg>
            {ZONES.map((zn, i) => (
              <button
                key={zn.z}
                className="hspot"
                style={zn.spot}
                aria-pressed={z === zn.z}
                aria-label={zn.label}
                onClick={() => setZ(zn.z)}
              >
                <span>{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="hm-card">
            <div className="hm-list">
              {ZONES.map((zn, i) => (
                <button key={zn.z} className="hm-item" aria-pressed={z === zn.z} onClick={() => setZ(zn.z)}>
                  <span className="n">{i + 1}</span>
                  <span>
                    <b>{zn.label}</b>
                    <small>{zn.text}</small>
                  </span>
                  <Plus className="ico" aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="beyond">
              <span>Beyond the heart:</span>
              <span className="c">Varicose veins</span>
              <span className="c">Leg artery disease</span>
              <span className="c">AV fistula for dialysis</span>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-coral" href="/book/?doctor=dr-ashish-baviskar">
                <CalendarDays className="ico" aria-hidden="true" />
                Book with Dr. Ashish
              </Link>
              <Link className="btn btn-glass" href="/heart-check-up/">
                Heart check-up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
