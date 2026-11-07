"use client";

// "Heart and vessels" — ported 1:1 from resources/reference/sections-v2/.
// Night section with a plain-language heart map: five hotspots drive matching
// SVG zones (data-z), a right-hand accordion explains each, and a pause
// control stops all ambient motion (hidden under reduced motion).
// SVG drawing order matches the reference: ribs, lungs/trachea, great vessels
// behind the heart, aorta, pulmonary trunk in front, then the heart itself.

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";

const ZONES: {
  z: number;
  label: string;
  title: string;
  text: string;
  icon: "cor" | "val" | "aor" | "mics" | "lung";
  pos: { left: string; top: string };
}[] = [
  {
    z: 1,
    label: "Coronary arteries",
    title: "Coronary arteries",
    text: "When the heart's own arteries are blocked, bypass surgery (CABG) routes blood around the blockage, on the heart-lung machine or on a beating heart.",
    icon: "cor",
    pos: { left: "59%", top: "58%" },
  },
  {
    z: 2,
    label: "Heart valves",
    title: "Heart valves",
    text: "Narrow or leaking valves can often be repaired. When they cannot, they are replaced. Dr. Ashish explains which suits you and why.",
    icon: "val",
    pos: { left: "52%", top: "33%" },
  },
  {
    z: 3,
    label: "The aorta",
    title: "The aorta",
    text: "The body's main artery can widen or tear. Aortic and aortic root surgery repairs it, sometimes as an emergency.",
    icon: "aor",
    pos: { left: "57%", top: "12%" },
  },
  {
    z: 4,
    label: "Keyhole access",
    title: "Keyhole access (MICS)",
    text: "Some operations can be done through a small cut between the ribs on the side, instead of opening the breastbone. You will be told if you are suited to it.",
    icon: "mics",
    pos: { left: "89%", top: "46%" },
  },
  {
    z: 5,
    label: "Lungs and chest",
    title: "Lungs and chest",
    text: "Thoracic surgery for lung and chest conditions, planned with scans and a clear talk about recovery.",
    icon: "lung",
    pos: { left: "16%", top: "62%" },
  },
];

function ZoneIcon({ icon }: { icon: (typeof ZONES)[number]["icon"] }) {
  switch (icon) {
    case "cor":
      return (
        <svg viewBox="0 0 32 32">
          <path d="M16 27c-6-3-11-8-11-14a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 6-5 11-11 14z" />
          <path d="M15 9c-3 4-5 8-4 14M17 9c3 3 6 6 6 10" />
        </svg>
      );
    case "val":
      return (
        <svg viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="11" />
          <path d="M16 16V5M16 16l9.5 5.5M16 16l-9.5 5.5" />
        </svg>
      );
    case "aor":
      return (
        <svg viewBox="0 0 32 32">
          <path d="M10 28V14c0-6 3-9 8-9s7 3 7 8v15" />
          <path d="M14 5V2M18 4V1M22 6V3" />
        </svg>
      );
    case "mics":
      return (
        <svg viewBox="0 0 32 32">
          <path d="M4 10c8-4 16-4 24 0M4 16c8-4 16-4 24 0M4 22c8-4 16-4 24 0" />
          <path d="M20 15c2 1 4 3 5 5" strokeWidth="2.6" />
        </svg>
      );
    case "lung":
      return (
        <svg viewBox="0 0 32 32">
          <path d="M16 4v10M16 14c-2 0-3 1-4 2M16 14c2 0 3 1 4 2" />
          <path d="M11 8C6 8 4 16 4 22c0 3 2 5 4 5s4-2 4-5zM21 8c5 0 7 8 7 14 0 3-2 5-4 5s-4-2-4-5z" />
        </svg>
      );
  }
}

export function HeartMap({ strip }: { strip?: ReactNode }) {
  const p = useId();
  const [z, setZ] = useState(1);
  const [paused, setPaused] = useState(false);

  return (
    <section
      className={`pad hm${paused ? " paused" : ""}`}
      aria-labelledby="hm-h"
    >
      <div className="wrap">
        <div className="head">
          <div>
            <span className="tag dk">
              <i></i>Heart and vessels
            </span>
            <h2 id="hm-h">
              Tap a part of the heart.{" "}
              <span>See how Dr. Ashish treats it.</span>
            </h2>
          </div>
          <p>
            A plain-language map of heart surgery. Every operation starts with
            tests and a conversation, and many heart problems never need
            surgery at all.
          </p>
        </div>
        <div className="hm-grid">
          <div className="art" data-z={z}>
            <svg viewBox="0 0 600 600" aria-hidden="true">
              <defs>
                <radialGradient id={`${p}hb`} cx="40%" cy="34%" r="72%">
                  <stop offset="0" stopColor="#2A5BA8" />
                  <stop offset=".5" stopColor="#123C78" />
                  <stop offset="1" stopColor="#0A2550" />
                </radialGradient>
                <linearGradient id={`${p}aoG`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#F4978E" />
                  <stop offset="1" stopColor="#F9C9B6" />
                </linearGradient>
              </defs>
              {/* ribs */}
              <g className="z z4">
                <path
                  className="rib"
                  d="M300 150c-70-22-150-6-214 46M300 150c70-22 150-6 214 46"
                />
                <path
                  className="rib"
                  d="M300 214c-74-20-156 0-224 56M300 214c74-20 156 0 224 56"
                />
                <path
                  className="rib"
                  d="M300 280c-76-18-160 4-230 62M300 280c76-18 160 4 230 62"
                />
                <path
                  className="rib"
                  d="M300 346c-76-16-158 6-226 62M300 346c76-16 158 6 226 62"
                />
              </g>
              {/* lungs and trachea */}
              <g className="z z5 lungsG">
                <path
                  className="lung"
                  d="M232 132c-46 6-104 80-124 170-16 74-12 150 20 172 30 20 90 6 118-30 14-18 18-46 18-80V188c0-30-10-58-32-56z"
                />
                <path
                  className="lung"
                  d="M368 132c46 6 104 80 124 170 16 74 12 150-20 172-30 20-80 10-104-20 30-34 34-74 20-110l-12-34V188c0-30 2-58 24-56z"
                />
                <path
                  className="fis"
                  d="M120 300c40-10 80-30 120-70M138 400c40-12 76-40 112-90M480 312c-36-14-70-40-98-80"
                />
                <path
                  className="ln f"
                  d="M300 36v86M300 122c-14 8-30 14-48 20M300 122c14 8 30 14 48 20"
                />
                <g stroke="rgba(143,184,234,.3)" strokeWidth="1.2">
                  <path d="M290 50h20M290 64h20M290 78h20M290 92h20M290 106h20" />
                </g>
              </g>
              {/* great vessels behind the heart */}
              <g>
                <path
                  className="tubeO"
                  strokeWidth="24"
                  d="M380 178c-40-10-96-12-150 0"
                />
                <path
                  className="tubeI"
                  strokeWidth="21"
                  d="M380 178c-40-10-96-12-150 0"
                />
                <path
                  className="tubeO"
                  strokeWidth="30"
                  d="M234 104c-2 40 0 80-2 120"
                />
                <path
                  className="tubeI"
                  strokeWidth="27"
                  d="M234 104c-2 40 0 80-2 120"
                />
                <path
                  className="tubeO"
                  strokeWidth="34"
                  d="M398 150v120"
                />
                <path
                  className="tubeI"
                  strokeWidth="31"
                  d="M398 150v120"
                />
              </g>
              {/* aorta */}
              <g className="z z3">
                <path
                  className="tubeO"
                  strokeWidth="14"
                  d="M300 92l-6-58M330 82v-56M356 88l12-54"
                />
                <path
                  className="tubeI"
                  strokeWidth="11"
                  d="M300 92l-6-58M330 82v-56M356 88l12-54"
                />
                <path
                  className="tubeO"
                  strokeWidth="40"
                  d="M286 236c-6-50-8-100 10-126 22-32 82-34 102 2 8 14 2 30 0 44"
                />
                <path
                  className="tubeI"
                  strokeWidth="37"
                  d="M286 236c-6-50-8-100 10-126 22-32 82-34 102 2 8 14 2 30 0 44"
                />
                <path
                  className="on3"
                  fill="none"
                  stroke={`url(#${p}aoG)`}
                  strokeWidth="37"
                  strokeLinecap="round"
                  d="M286 236c-6-50-8-100 10-126 22-32 82-34 102 2 8 14 2 30 0 44"
                  opacity=".85"
                />
                <path
                  className="flow"
                  d="M286 236c-6-50-8-100 10-126 22-32 82-34 102 2 8 14 2 30 0 44"
                />
              </g>
              {/* pulmonary trunk */}
              <g>
                <path
                  className="tubeO"
                  strokeWidth="34"
                  d="M338 246c4-30 14-52 34-70 14-12 34-18 58-16"
                />
                <path
                  className="tubeI"
                  strokeWidth="31"
                  d="M338 246c4-30 14-52 34-70 14-12 34-18 58-16"
                />
              </g>
              {/* the heart */}
              <g className="beat">
                <path
                  d="M232 222c-14-12-36-10-46 4 8 6 16 14 20 24"
                  fill={`url(#${p}hb)`}
                  stroke="#8FB8EA"
                  strokeWidth="1.5"
                />
                <path
                  d="M248 226c-36 6-62 40-64 86-2 48 26 92 76 124 44 28 98 46 136 48 16 1 26-8 32-22 26-56 38-108 34-152-3-36-16-60-38-72-22-12-48-16-70-14l-34 2c-24-4-50-6-72 0z"
                  fill={`url(#${p}hb)`}
                  stroke="#8FB8EA"
                  strokeWidth="1.6"
                />
                <path
                  d="M418 236c20-12 40-4 40 18-10 2-20 0-28 4"
                  fill={`url(#${p}hb)`}
                  stroke="#8FB8EA"
                  strokeWidth="1.5"
                />
                <path className="ln f" d="M232 260c-14 40-14 84 8 126" />
                {/* coronary arteries */}
                <g className="z z1">
                  <path
                    className="cor"
                    d="M262 246c-26 30-36 80-24 124 10 34 40 62 82 82"
                  />
                  <path
                    className="cor"
                    d="M352 244c8 70 22 150 62 230"
                  />
                  <path
                    className="cor"
                    d="M366 300c24 14 50 22 80 24M376 360c20 8 40 10 62 8"
                  />
                  <path
                    className="cor"
                    d="M356 240c38 2 72 12 92 38 10 14 14 30 16 46"
                  />
                  <path
                    className="flow"
                    d="M262 246c-26 30-36 80-24 124 10 34 40 62 82 82"
                  />
                  <path
                    className="flow"
                    d="M352 244c8 70 22 150 62 230"
                  />
                  <path
                    className="flow"
                    d="M356 240c38 2 72 12 92 38 10 14 14 30 16 46"
                  />
                </g>
                {/* valves at the roots */}
                <g className="z z2">
                  <g transform="translate(290 236)">
                    <circle
                      r="17"
                      fill="#0A2550"
                      stroke="#F9C9B6"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 0V-15M0 0l13 7.5M0 0l-13 7.5"
                      stroke="#F9C9B6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      className="on2"
                      r="24"
                      fill="none"
                      stroke="#F4978E"
                      strokeWidth="2"
                    />
                  </g>
                  <g transform="translate(338 244)">
                    <circle
                      r="15"
                      fill="#0A2550"
                      stroke="#F9C9B6"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 0V-13M0 0l11 6.5M0 0l-11 6.5"
                      stroke="#F9C9B6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      className="on2"
                      r="22"
                      fill="none"
                      stroke="#F4978E"
                      strokeWidth="2"
                    />
                  </g>
                </g>
              </g>
              {/* keyhole access */}
              <g className="on4">
                <path
                  d="M506 322c10 12 16 26 18 42"
                  fill="none"
                  stroke="#F4978E"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M500 342H446"
                  stroke="#F4978E"
                  strokeWidth="1.6"
                  strokeDasharray="4 6"
                />
                <text className="cut-l" x="470" y="396" textAnchor="middle">
                  SMALL SIDE CUT
                </text>
              </g>
              {/* ECG strip */}
              <path
                d="M90 556h150l10-22 14 46 12-38 8 14h30l6-10 8 10h182"
                fill="none"
                stroke="rgba(143,184,234,.2)"
                strokeWidth="1.6"
              />
              <path
                className="ecg"
                d="M90 556h150l10-22 14 46 12-38 8 14h30l6-10 8 10h182"
              />
            </svg>
            {ZONES.map((zone) => (
              <button
                key={zone.z}
                className="hs"
                style={{ left: zone.pos.left, top: zone.pos.top }}
                aria-pressed={z === zone.z}
                aria-label={zone.label}
                onClick={() => setZ(zone.z)}
              >
                <span>{zone.z}</span>
              </button>
            ))}
            <button
              className="pz"
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((v) => !v)}
            >
              <svg viewBox="0 0 14 14">
                <rect x="2" y="1" width="3.5" height="12" rx="1" />
                <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
              </svg>
              <span>{paused ? "Play motion" : "Pause motion"}</span>
            </button>
          </div>

          <div className="list">
            <button
              type="button"
              className="itx"
              aria-label="Close"
              onClick={() => setZ(0)}
            >
              ×
            </button>
            {ZONES.map((zone) => (
              <button
                key={zone.z}
                className="it"
                aria-pressed={z === zone.z}
                onClick={() => setZ(zone.z)}
              >
                <span className="ic">
                  <ZoneIcon icon={zone.icon} />
                </span>
                <span>
                  <b>
                    <i>0{zone.z}</i>
                    {zone.title}
                  </b>
                  <p>
                    <span>{zone.text}</span>
                  </p>
                </span>
                <svg className="ico pl" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        {strip}
        <div className="bey">
              <h3>Beyond the heart</h3>
              <div className="bcards">
                <Link className="bc" href="/varicose-veins/">
                  <svg
                    viewBox="0 0 44 44"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M17 4v18l-4 16h10l2-4"
                      stroke="#8FB8EA"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M25 4v14c0 4 2 6 2 10"
                      stroke="#8FB8EA"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M20 10c2 2 0 4 2 6s0 4 2 6 0 4 1 6"
                      stroke="#F4978E"
                      strokeWidth="2"
                    />
                  </svg>
                  Varicose veins
                </Link>
                <Link className="bc" href="/peripheral-artery-disease/">
                  <svg
                    viewBox="0 0 44 44"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M16 4v18l-4 16h10l2-4M24 4v14c0 4 2 6 2 10"
                      stroke="#8FB8EA"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M20 6v26"
                      stroke="#F4978E"
                      strokeWidth="2"
                    />
                    <circle
                      cx="34"
                      cy="34"
                      r="3"
                      stroke="#8FB8EA"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M33 26h.01M37 28h.01M30 27h.01"
                      stroke="#8FB8EA"
                      strokeWidth="2.4"
                    />
                  </svg>
                  Leg artery disease
                </Link>
                <Link className="bc" href="/av-fistula-for-dialysis/">
                  <svg
                    viewBox="0 0 44 44"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M4 26h22a6 6 0 0 0 0-12H12"
                      stroke="#8FB8EA"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M26 20c4 0 6-4 10-4h4M26 20c4 0 6 4 10 4h4"
                      stroke="#8FB8EA"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M8 20h12c3 0 4 2 4 4"
                      stroke="#F4978E"
                      strokeWidth="2"
                    />
                  </svg>
                  AV fistula for dialysis
                </Link>
              </div>
            </div>
            <div className="ctas">
              <Link className="btn btn-coral" href="/book/">
                <svg className="ico" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
                Book with Dr. Ashish
              </Link>
              <Link className="btn btn-glass" href="/heart-check-up/">
                Heart check-up
              </Link>
            </div>
        </div>
    </section>
  );
}
