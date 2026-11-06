"use client";

import { useState } from "react";
import { Ico } from "@/components/icons/PgIcons";

/** Flip-up health-policy card (tap to see the bring list). */
export function InsuranceCard() {
  const [flip, setFlip] = useState(false);
  return (
    <button
      type="button"
      className={`pcard${flip ? " flip" : ""}`}
      aria-label="Flip the card to see what to bring"
      aria-pressed={flip}
      onClick={() => setFlip((f) => !f)}
    >
      <div className="in">
        <div className="face front">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span className="chipg" />
            <Ico n="shield" style={{ width: 30, height: 30, color: "#F4978E" }} />
          </div>
          <div className="num">•••• •••• 0411</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <div>
              <small>Health policy</small>
              <div style={{ fontWeight: 600 }}>Your name here</div>
            </div>
            <small>Tap to flip</small>
          </div>
        </div>
        <div className="face back">
          <small style={{ color: "var(--ink-2)" }}>Bring on the day</small>
          <ol>
            <li>Your policy card</li>
            <li>Photo ID</li>
            <li>Any pre-authorisation forms</li>
          </ol>
          <small style={{ color: "var(--ink-2)" }}>Tap to flip back</small>
        </div>
      </div>
    </button>
  );
}
