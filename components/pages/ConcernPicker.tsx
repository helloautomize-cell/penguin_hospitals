"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { concerns, concernImg, concernDoctor } from "@/lib/concerns";
import { Ico } from "@/components/icons/PgIcons";

const GROUPS: { g: "W" | "H" | "E"; title: string }[] = [
  { g: "W", title: "Women and pregnancy" },
  { g: "H", title: "Heart, lungs and vessels" },
  { g: "E", title: "Right now" },
];

function fieldsFor(ix: number) {
  const c = concerns[ix];
  const d = concernDoctor(c);
  return {
    face: d.face,
    name: d.name,
    role: d.role,
    book: d.book,
    bookHref: d.bookHref,
    why: c.why,
    link: c.link,
    linkHref: c.linkHref,
  };
}

/** "Tell us what brings you in" concern picker + swapping answer card. */
export function ConcernPicker() {
  const [sel, setSel] = useState(0);
  const [frontA, setFrontA] = useState(true);
  const [srcA, setSrcA] = useState(() => concernImg(concerns[0].img));
  const [srcB, setSrcB] = useState(() => concernImg(concerns[0].img));
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);
  const [fields, setFields] = useState(() => fieldsFor(0));
  const [swap, setSwap] = useState(false);
  const [open, setOpen] = useState(false);
  const busy = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchY = useRef(0);

  const pick = (ix: number, e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
    if (ix === sel) return;
    const c = concerns[ix];
    setSel(ix);
    // crossfade: load the next photo into the hidden layer, flip .show on load
    const next = concernImg(c.img);
    if (frontA) setSrcB(next);
    else setSrcA(next);
    setSwap(true);
    if (busy.current) clearTimeout(busy.current);
    busy.current = setTimeout(() => {
      setFields(fieldsFor(ix));
      setSwap(false);
    }, 280);
  };

  const imgLoaded = (layer: "a" | "b") => {
    if (layer === "a" && !frontA) {
      setShowA(true);
      setShowB(false);
      setFrontA(true);
    }
    if (layer === "b" && frontA) {
      setShowB(true);
      setShowA(false);
      setFrontA(false);
    }
  };

  return (
    <div className="pk">
      <div>
        {GROUPS.map(({ g, title }) => (
          <div className="pkgrp" key={g}>
            <h3>{title}</h3>
            <div className="chips">
              {concerns.map((c, ix) =>
                c.g !== g ? null : (
                  <a
                    key={c.t}
                    href={c.linkHref}
                    className={`pkchip${c.g === "E" ? " sos" : ""}${ix === sel ? " on" : ""}`}
                    aria-current={ix === sel ? "true" : undefined}
                    onClick={(e) => pick(ix, e)}
                  >
                    <i>
                      <Ico n={c.i} />
                    </i>
                    {c.t}
                  </a>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`ans${swap ? " swap" : ""}${open ? " open" : ""}`}
        aria-live="polite"
        onTouchStart={(e) => {
          touchY.current = e.touches[0].clientY;
        }}
        onTouchMove={(e) => {
          if (e.touches[0].clientY - touchY.current > 70) setOpen(false);
        }}
      >
        <span className="grab" aria-hidden="true" />
        <button
          type="button"
          className="pkclose"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <div className="ph">
          <Image
            className={showA ? "show" : ""}
            src={srcA}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 36vw"
            onLoad={() => imgLoaded("a")}
          />
          <Image
            className={showB ? "show" : ""}
            src={srcB}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 36vw"
            onLoad={() => imgLoaded("b")}
          />
          <div className="who fade">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fields.face} alt="" width={48} height={48} />
            <div>
              <b>{fields.name}</b>
              <span>{fields.role}</span>
            </div>
          </div>
        </div>
        <div className="body">
          <p className="why fade">{fields.why}</p>
          <div className="acts fade">
            <Link className="btn btn-coral" href={fields.bookHref}>
              {fields.book}
            </Link>
            <Link className="btn btn-ghost" href={fields.linkHref}>
              {fields.link} →
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`pkback${open ? " open" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
