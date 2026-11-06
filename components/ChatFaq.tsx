"use client";

import React, { useEffect, useRef } from "react";
import { TriangleAlert } from "lucide-react";
import { PenguinMark } from "./icons";
import type { FaqItem } from "./Accordion";

/**
 * Chat-style FAQ (.chatw/.thread/.b): patient questions right, hospital answers
 * left with the penguin avatar. Bubbles reveal with a typing indicator once the
 * thread scrolls into view; everything is readable without JS.
 */
export function ChatFaq({ items }: { items: FaqItem[] }) {
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    const bubbles = Array.from(thread.querySelectorAll<HTMLElement>(".b"));
    const typing = thread.querySelector<HTMLElement>(".typing");
    if (thread.getBoundingClientRect().top <= innerHeight) return;
    bubbles.forEach((b) => b.classList.add("hide"));
    let done = false;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting || done) return;
        done = true;
        io.disconnect();
        let k = 0;
        const next = () => {
          if (k >= bubbles.length) {
            typing?.classList.remove("on");
            return;
          }
          const b = bubbles[k];
          if (b.classList.contains("a") && typing) {
            typing.classList.add("on");
            thread.insertBefore(typing, b);
            setTimeout(() => {
              typing.classList.remove("on");
              b.classList.remove("hide");
              k++;
              setTimeout(next, 260);
            }, 550);
          } else {
            b.classList.remove("hide");
            k++;
            setTimeout(next, 260);
          }
        };
        next();
      },
      { threshold: 0.2 },
    );
    io.observe(thread);
    return () => io.disconnect();
  }, []);

  return (
    <div className="thread" ref={threadRef}>
      <div className="b sys">
        <TriangleAlert className="ico" aria-hidden="true" />
        Medical emergency? Call 108 or 112 first.
      </div>
      {items.map((item) => (
        <React.Fragment key={item.q}>
          <div className="b q">{item.q}</div>
          <div className="b a">
            <span className="av">
              <PenguinMark />
            </span>
            <span>
              <b>Penguin Hospital</b>
              {item.a}
            </span>
          </div>
        </React.Fragment>
      ))}
      <div className="typing" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
}
