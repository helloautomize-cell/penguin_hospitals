"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Ico } from "@/components/icons/PgIcons";
import { site } from "@/lib/site-config";

const AREAS: [name: string, hint: string][] = [
  ["Nigdi", "From Nigdi, come south past Akurdi towards Chinchwad Gaon."],
  ["Akurdi", "From Akurdi, head for Chinchwad Gaon and Bijli Nagar Road."],
  ["Ravet", "From Ravet, cross towards Chinchwad Gaon and Bijli Nagar Road."],
  ["Moshi", "From Moshi, come west through Pimpri towards Chinchwad."],
  ["Pimpri", "From Pimpri, head west to Chinchwad Gaon and Bijli Nagar Road."],
  ["Punawale", "From Punawale, head north-east to Chinchwad Gaon."],
  ["Tathawade", "From Tathawade, head north to Chinchwad Gaon."],
  ["Wakad", "From Wakad, head north to Chinchwad Gaon."],
  ["Hinjawadi", "From Hinjawadi, come through Wakad or Tathawade to Chinchwad Gaon."],
];

const DEFAULT_AREA = 4; // Pimpri
const ADDRESS =
  "Penguin Hospital, Plot No. 59, New Pawana Nagar Society, Bijli Nagar Road, opposite Laxmi Medico and Mart, Chinchwad Gaon, Pimpri-Chinchwad, Maharashtra 411033";

/** Real Google Map (lazy iframe) + address card + "Coming from" chips. */
export function MapSection() {
  const [sel, setSel] = useState(DEFAULT_AREA);
  const [copyLbl, setCopyLbl] = useState("Copy address");
  const [loadMap, setLoadMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  /* start loading the embed only when the map is within 400px of the viewport */
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setLoadMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
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
    <>
      <div className="mapgrid">
        <div className="gmap" ref={mapRef}>
          <div className="gmap-stand" aria-hidden="true">
            <i className="road r1" />
            <i className="road r2" />
            <i className="road r3" />
            <div className="gpin">
              <span className="halo" />
              <span className="dot">
                <Ico n="pin" />
              </span>
              <b>Penguin Hospital</b>
            </div>
          </div>
          {loadMap && (
            <iframe
              src={site.mapEmbedSrc}
              title="Map showing Penguin Hospital, Chinchwad Gaon"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </div>
        <div className="addr">
          <div className="addrc">
            <b style={{ fontSize: 20 }}>Plot No. 59, New Pawana Nagar Society</b>
            <p>
              Bijli Nagar Road, opposite Laxmi Medico and Mart, Chinchwad Gaon, Pimpri-Chinchwad,
              Maharashtra 411033
            </p>
            <div className="copyrow">
              <button type="button" onClick={copy}>
                <Ico n="copy" />
                <span>{copyLbl}</span>
              </button>
              <a
                className="btn btn-coral"
                style={{ padding: "10px 16px", fontSize: 14 }}
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener"
              >
                <Ico n="map" />
                Directions
              </a>
            </div>
            <p style={{ fontSize: "13.5px" }}>
              <span className="confirm">CONFIRM parking, lift and wheelchair access</span>
            </p>
          </div>
          <div className="lm">
            <Image
              src="/images/real/real-facade.jpg"
              alt="The Penguin Hospital entrance with its blue and red sign"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
            <span>
              <Ico n="pin" />
              Look for this entrance
            </span>
          </div>
        </div>
      </div>
      <div className="from">
        <p className="sub" style={{ margin: "28px 0 12px" }}>
          Coming from
        </p>
        <div className="chips">
          {AREAS.map(([n], i) => (
            <button
              key={n}
              type="button"
              className="pkchip"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="fromHint" aria-live="polite">
          {AREAS[sel][1]} We are opposite Laxmi Medico and Mart.
        </p>
      </div>
    </>
  );
}
