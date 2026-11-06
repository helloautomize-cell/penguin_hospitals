"use client";

import { useEffect, useRef, useState } from "react";
import { Ico } from "@/components/icons/PgIcons";

type PackItem = [icon: string, title: string, sub: string];
const PACKS: Record<string, { n: string; items: PackItem[] }> = {
  opd: {
    n: "OPD visit",
    items: [
      ["file", "Old reports and scans", "Even old ones"],
      ["pill", "Your medicines", "Or a list of them"],
      ["id", "Photo ID", "For registration"],
      ["phone", "Booking message", "If you booked"],
      ["water", "Water and a snack", "If you are not fasting"],
      ["people", "A family member", "Welcome in the room"],
    ],
  },
  preg: {
    n: "Pregnancy check",
    items: [
      ["file", "Pregnancy file", "Every scan and report"],
      ["cal", "Date of last period", "Or your due date"],
      ["pill", "Supplements you take", "Iron, folic acid, calcium"],
      ["people", "Partner or family", "If you can"],
      ["water", "Water", "Some scans need a full bladder"],
      ["id", "Photo ID", "For registration"],
    ],
  },
  adm: {
    n: "Admission",
    items: [
      ["shirt", "Loose, comfortable clothes", "Two or three sets"],
      ["slipper", "Slippers", ""],
      ["brush", "Toiletries", "Toothbrush, soap, comb"],
      ["pill", "Medicines in their boxes", "So doses are clear"],
      ["plug", "Phone charger", ""],
      ["card", "Insurance card and ID", "Plus pre-authorisation forms"],
      ["file", "All reports", "Including old discharge summaries"],
    ],
  },
  baby: {
    n: "Delivery bag",
    items: [
      ["shirt", "Clothes for you", "Front-opening for feeding"],
      ["pad", "Maternity pads", ""],
      ["cap", "Caps for the baby", "Newborns lose heat fast"],
      ["sock", "Socks and mittens", ""],
      ["baby", "Baby clothes and wraps", "Soft cotton"],
      ["brush", "Toiletries", ""],
      ["plug", "Phone charger", ""],
      ["file", "Pregnancy file", "Every scan and report"],
    ],
  },
};

const STORE_KEY = "ph-packed";

function readPacked(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
}

/** "What to bring": tabbed checklist, ticks persist in localStorage. */
export function PackingList() {
  const [key, setKey] = useState("opd");
  const [packed, setPacked] = useState<Record<string, boolean>>({});
  const [bounce, setBounce] = useState(0);
  const bagRef = useRef<SVGSVGElement>(null);

  /* read persisted ticks after mount (localStorage is client-only) */
  useEffect(() => {
    const t = setTimeout(() => setPacked(readPacked()), 0);
    return () => clearTimeout(t);
  }, []);

  const items = PACKS[key].items;
  const n = items.filter((_, i) => packed[key + i]).length;
  const k = n / items.length;
  const fillH = 130 * k;

  const toggle = (i: number) => {
    const id = key + i;
    const next = { ...packed, [id]: !packed[id] };
    setPacked(next);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* private mode */
    }
    setBounce((b) => b + 1);
  };

  useEffect(() => {
    const svg = bagRef.current;
    if (!svg || bounce === 0) return;
    svg.classList.remove("bag-bounce");
    void svg.getBoundingClientRect();
    svg.classList.add("bag-bounce");
  }, [bounce]);

  return (
    <div className="pack">
      <div className="bagwrap">
        <svg viewBox="0 0 200 200" aria-hidden="true" ref={bagRef}>
          <defs>
            <clipPath id="bagClip">
              <path d="M30 70 Q30 60 40 60 H160 Q170 60 170 70 L162 180 Q161 190 150 190 H50 Q39 190 38 180Z" />
            </clipPath>
            <linearGradient id="bagGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F4978E" />
              <stop offset="1" stopColor="#2A5BA8" />
            </linearGradient>
          </defs>
          <path
            d="M70 62 V44 Q70 26 100 26 Q130 26 130 44 V62"
            fill="none"
            stroke="#17407E"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M30 70 Q30 60 40 60 H160 Q170 60 170 70 L162 180 Q161 190 150 190 H50 Q39 190 38 180Z"
            fill="#E7EEF8"
          />
          <g clipPath="url(#bagClip)">
            <rect
              className="bag-fill"
              x="20"
              y={190 - fillH}
              width="160"
              height={fillH}
              fill="url(#bagGrad)"
            />
          </g>
          <path
            d="M30 70 Q30 60 40 60 H160 Q170 60 170 70 L162 180 Q161 190 150 190 H50 Q39 190 38 180Z"
            fill="none"
            stroke="#17407E"
            strokeWidth="5"
          />
          <rect x="88" y="54" width="24" height="14" rx="4" fill="#17407E" />
          <path
            d="M100 118 l-14 -13 a8 8 0 0 1 14 -8 a8 8 0 0 1 14 8Z"
            fill="#fff"
            opacity=".9"
          />
        </svg>
        <div className="cnt">
          {n} / {items.length}
        </div>
        <div className="meter">
          <i style={{ width: `${k * 100}%` }} />
        </div>
        <p className="msg">
          {n === 0
            ? "Tap an item when it is in your bag."
            : n === items.length
              ? "All packed. See you soon."
              : `${items.length - n} more to go.`}
        </p>
      </div>
      <div>
        <div className="tabs" role="tablist">
          {Object.entries(PACKS).map(([k2, p]) => (
            <button
              key={k2}
              type="button"
              role="tab"
              id={`tab-${k2}`}
              aria-selected={k2 === key}
              onClick={() => setKey(k2)}
            >
              {p.n}
            </button>
          ))}
        </div>
        <div className="items">
          {items.map(([ic, t, s], i) => (
            <button
              key={key + i}
              type="button"
              className="item"
              aria-pressed={!!packed[key + i]}
              onClick={() => toggle(i)}
            >
              <i>
                <Ico n={ic} />
              </i>
              <span>
                <b>{t}</b>
                {s ? <span>{s}</span> : null}
              </span>
              <span className="tick">
                <Ico n="check" />
              </span>
            </button>
          ))}
        </div>
        <p style={{ fontSize: "14.5px", color: "var(--ink-2)", marginTop: 16 }}>
          Some blood tests need you to fast. If you are not sure, ask us on WhatsApp the day before.
        </p>
      </div>
    </div>
  );
}
