"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Pause, Play } from "lucide-react";

/**
 * Self-moving swipe carousel (agency-standards 4.8 rule 1):
 * cards ~84% wide with the next peeking, auto-advance every 4.5s,
 * pause on touch/hover/focus/hidden tab, resume 6s after interaction,
 * a pause/play button, and no motion under prefers-reduced-motion.
 */
export function SwipeCarousel({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode[];
  label: string;
  className?: string;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", containScroll: false });
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useRef(false);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const schedule = useCallback(() => {
    clearTimer();
    if (paused || reduced.current) return;
    timer.current = setTimeout(() => embla?.scrollNext(), 4500);
  }, [paused, embla, clearTimer]);

  const hold = useCallback(() => {
    clearTimer();
    if (resume.current) clearTimeout(resume.current);
    resume.current = setTimeout(() => setPaused(false), 6000);
  }, [clearTimer]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setPaused(true);
  }, []);

  useEffect(() => {
    if (!embla) return;
    schedule();
    embla.on("select", schedule);
    embla.on("pointerDown", () => {
      setPaused(true);
      hold();
    });
    const vis = () => {
      if (document.hidden) {
        setPaused(true);
        clearTimer();
      } else {
        schedule();
      }
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      document.removeEventListener("visibilitychange", vis);
      clearTimer();
      if (resume.current) clearTimeout(resume.current);
    };
  }, [embla, schedule, hold, clearTimer]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={emblaRef} className="overflow-hidden" aria-label={label}>
        <div className="flex gap-4">
          {children.map((c, i) => (
            <div key={i} className="min-w-0 flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-[0_0_31%]">
              {c}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play the carousel" : "Pause the carousel"}
        className="absolute -top-12 right-0 grid size-12 place-items-center rounded-full border border-line bg-white text-ink"
      >
        {paused ? (
          <Play aria-hidden className="size-5" strokeWidth={1.75} />
        ) : (
          <Pause aria-hidden className="size-5" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
