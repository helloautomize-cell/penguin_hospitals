"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Room = {
  k: string;
  n: string;
  img: string;
  t: string;
  c?: boolean;
  ai?: boolean;
};

const ROOMS: Room[] = [
  { k: "wards", n: "Wards", img: "general-ward", t: "Curtained beds, and private rooms for a quieter recovery.", c: true },
  { k: "ot", n: "Operation theatre", img: "operation-theatre", t: "For caesarean births, laparoscopic surgery and other planned and emergency operations." },
  { k: "labour", n: "Labour room", img: "labour-room", t: "With a newborn warming station, so your baby is checked and kept warm the moment they are born." },
  { k: "scan", n: "Consultation and ultrasound", img: "ultrasound-room", t: "The scan room sits next to the consultation room, for pregnancy and gynaecology scans in the same visit." },
  { k: "er", n: "Emergency and front desk", img: "dr-ashish-night", t: "Open day and night. Walk in, or call ahead on +91 95189 04156.", ai: true },
];

function roomSrc(img: string) {
  return `/images/${img.startsWith("dr-") ? "doctors" : "pages"}/${img}.jpg`;
}

const H = 74;
const TOP = 78;

/** Interactive building: tap a floor to look inside (reference buildTower/showRoom). */
export function BuildingTour() {
  const [ix, setIx] = useState(2);
  const [fading, setFading] = useState(false);
  const userRef = useRef(false);
  const fadeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* floors cycle until the visitor picks one; off entirely under reduced motion */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!userRef.current) setIx((i) => (i + 1) % ROOMS.length);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const pick = (i: number) => {
    userRef.current = true;
    if (i === ix) return;
    setFading(true);
    if (fadeT.current) clearTimeout(fadeT.current);
    fadeT.current = setTimeout(() => setIx(i), 350);
  };

  const r = ROOMS[ix];

  return (
    <div className="bld">
      <div className="tower">
        <svg viewBox="0 0 360 470" role="group" aria-label="Rooms in the building">
          <path d="M40 72 L180 18 L320 72Z" fill="#0E3466" stroke="#2A5BA8" strokeWidth="1.5" />
          <rect x="150" y="40" width="60" height="22" rx="4" fill="#fff" />
          <text x="180" y="56" textAnchor="middle" fontSize="12" fontWeight="800" fill="#E40913" fontFamily="Figtree">
            PENGUIN
          </text>
          {ROOMS.map((room, i) => {
            const y = TOP + i * H;
            return (
              <g
                key={room.k}
                className={`fl${i === ix ? " on" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={room.n}
                aria-pressed={i === ix}
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(i);
                  }
                }}
              >
                <rect className="flr" x="40" y={y} width="280" height={H - 6} rx="6" />
                {Array.from({ length: 5 }, (_, w) => (
                  <g key={w}>
                    <rect className="flw" x={178 + w * 28} y={y + 16} width="18" height={H - 36} rx="3" />
                    {(i * 5 + w) % 3 === 0 && (
                      <rect
                        className="glow"
                        style={{ animationDelay: `${-((i * 5 + w) * 0.7)}s` }}
                        x={178 + w * 28}
                        y={y + 16}
                        width="18"
                        height={H - 36}
                        rx="3"
                      />
                    )}
                  </g>
                ))}
                <text x="56" y={y + H / 2 + 2}>
                  {room.n.replace(" and ultrasound", "").replace(" and front desk", "")}
                </text>
              </g>
            );
          })}
          <rect x="10" y="452" width="340" height="6" rx="3" fill="#2A5BA8" />
        </svg>
      </div>
      <div>
        <div className="roomview">
          <Image
            key={r.img}
            className={fading ? "out" : ""}
            src={roomSrc(r.img)}
            alt={r.n}
            fill
            sizes="(max-width: 860px) 100vw, 58vw"
            onLoad={() => setFading(false)}
          />
          <span className="real">{r.ai ? "Illustrative photo" : "Real photo"}</span>
          <div className="cap">
            <b>{r.n}</b>
            <p>
              {r.t}
              {r.c ? " " : ""}
              {r.c && <span className="confirm">CONFIRM room types, beds</span>}
            </p>
          </div>
        </div>
        <p className="rooms-note">
          Illustration, not a floor plan.{" "}
          <span className="confirm">CONFIRM floor order, ICU or HDU, NICU, lab, pharmacy, lift, parking</span>
        </p>
      </div>
    </div>
  );
}
