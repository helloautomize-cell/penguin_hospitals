"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Ico } from "@/components/icons/PgIcons";

type Area = [name: string, x: number, y: number, hint: string];
const AREAS: Area[] = [
  ["Nigdi", 300, 70, "From Nigdi, come south past Akurdi towards Chinchwad Gaon."],
  ["Akurdi", 190, 120, "From Akurdi, head for Chinchwad Gaon and Bijli Nagar Road."],
  ["Ravet", 80, 190, "From Ravet, cross towards Chinchwad Gaon and Bijli Nagar Road."],
  ["Moshi", 540, 90, "From Moshi, come west through Pimpri towards Chinchwad."],
  ["Pimpri", 540, 250, "From Pimpri, head west to Chinchwad Gaon and Bijli Nagar Road."],
  ["Punawale", 100, 340, "From Punawale, head north-east to Chinchwad Gaon."],
  ["Tathawade", 210, 410, "From Tathawade, head north to Chinchwad Gaon."],
  ["Wakad", 380, 415, "From Wakad, head north to Chinchwad Gaon."],
  ["Hinjawadi", 40, 425, "From Hinjawadi, come through Wakad or Tathawade to Chinchwad Gaon."],
];

const HX = 320;
const HY = 250;
const ADDRESS =
  "Penguin Hospital, Plot No. 59, New Pawana Nagar Society, Bijli Nagar Road, opposite Laxmi Medico and Mart, Chinchwad Gaon, Pimpri-Chinchwad, Maharashtra 411033";
const MAPS_URL = "https://maps.app.goo.gl/StwJKYnv9kRLnd1k7";

function routePath(x: number, y: number, i: number) {
  const mx = (x + HX) / 2 + (i % 2 ? 30 : -30);
  const my = (y + HY) / 2 + (i % 2 ? -20 : 20);
  return `M${x} ${y} Q${mx} ${my} ${HX} ${HY}`;
}

/** Illustrated area map: hover/focus an area to trace its route in. */
export function RouteMap() {
  const [sel, setSel] = useState(4);
  const [copyLbl, setCopyLbl] = useState("Copy address");
  const svgRef = useRef<SVGSVGElement>(null);
  const stopRef = useRef(false);

  /* auto-trace routes until the visitor hovers the map; off under reduced motion */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let auto = 0;
    const t = setInterval(() => {
      if (stopRef.current) {
        clearInterval(t);
        return;
      }
      setSel(auto++ % AREAS.length);
    }, 2600);
    const svg = svgRef.current;
    const stop = () => {
      stopRef.current = true;
      clearInterval(t);
    };
    svg?.addEventListener("mouseenter", stop);
    svg?.addEventListener("focusin", stop);
    return () => {
      clearInterval(t);
      svg?.removeEventListener("mouseenter", stop);
      svg?.removeEventListener("focusin", stop);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopyLbl("Copied");
    } catch {
      setCopyLbl("Select the address above to copy");
    }
    setTimeout(() => setCopyLbl("Copy address"), 2400);
  };

  return (
    <div className="mapgrid">
      <div className="map">
        <svg
          viewBox="0 0 640 460"
          ref={svgRef}
          role="group"
          aria-label="Routes to Penguin Hospital from nearby areas"
        >
          <rect width="640" height="460" fill="#F7FAFD" />
          <path className="river" d="M-10 300 C120 270 200 330 300 300 S470 230 650 260" />
          {AREAS.map(([n, x, y], i) => {
            const d = routePath(x, y, i);
            return (
              <g key={`r-${n}`}>
                <path className={`rt${i === sel ? " on" : ""}`} d={d} />
                <path className={`flow${i === sel ? " on" : ""}`} d={d} />
              </g>
            );
          })}
          <g className="hosp" transform="translate(320 250)">
            <circle className="halo" r="22" />
            <circle r="15" fill="#001F43" />
            <path d="M-5 0h10M0 -5v10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>
          <text x="320" y="292" textAnchor="middle" fontFamily="Figtree" fontWeight="700" fontSize="15" fill="#001F43">
            Penguin Hospital
          </text>
          <text x="320" y="310" textAnchor="middle" fontFamily="Figtree" fontSize="12.5" fill="#4B5A70">
            Chinchwad Gaon
          </text>
          {AREAS.map(([n, x, y], i) => {
            const anchor = x < 120 ? "start" : x > 500 ? "end" : "middle";
            const ty = y < HY ? y - 14 : y + 26;
            return (
              <g
                key={`a-${n}`}
                className={`area${i === sel ? " on" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={n}
                onMouseEnter={() => setSel(i)}
                onClick={() => setSel(i)}
                onFocus={() => setSel(i)}
              >
                <circle cx={x} cy={y} r="8" />
                <text
                  x={x + (anchor === "start" ? -6 : anchor === "end" ? 6 : 0)}
                  y={ty}
                  textAnchor={anchor}
                >
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
        <span className="note">Not to scale</span>
      </div>
      <div className="addr">
        <div className="addrc">
          <b style={{ fontSize: 20 }}>Plot No. 59, New Pawana Nagar Society</b>
          <p>
            Bijli Nagar Road, opposite Laxmi Medico and Mart, Chinchwad Gaon, Pimpri-Chinchwad,
            Maharashtra 411033
          </p>
          <p>{AREAS[sel][3]} We are opposite Laxmi Medico and Mart.</p>
          <div className="copyrow">
            <button type="button" onClick={copy}>
              <Ico n="copy" />
              <span>{copyLbl}</span>
            </button>
            <a
              className="btn btn-coral"
              style={{ padding: "10px 16px", fontSize: 14 }}
              href={MAPS_URL}
              target="_blank"
              rel="noopener"
            >
              <Ico n="map" />
              Open in Google Maps
            </a>
          </div>
          <p style={{ fontSize: "13.5px" }}>
            <span className="confirm">CONFIRM parking, lift and wheelchair access</span>
          </p>
        </div>
        <div className="lm">
          <Image
            src="/images/pages/patients-from-pcmc.jpg"
            alt="A tree-lined road in Pimpri-Chinchwad at dusk"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
          <span>
            <Ico n="pin" />
            Look for Laxmi Medico, we are opposite
          </span>
        </div>
      </div>
    </div>
  );
}
