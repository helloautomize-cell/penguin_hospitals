"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { site } from "@/lib/site-config";

const BANDS = [
  { c: "42,91,168", o: 0.55, y: 0.28, a: 0.08, t: 0.3, f: 1.2, f2: 2.6, s: 1 },
  { c: "143,184,234", o: 0.32, y: 0.18, a: 0.06, t: 0.22, f: 0.8, f2: 3.1, s: 1.3 },
  { c: "244,151,142", o: 0.42, y: 0.36, a: 0.07, t: 0.26, f: 1.6, f2: 2.2, s: 0.9 },
  { c: "90,200,190", o: 0.18, y: 0.24, a: 0.05, t: 0.2, f: 2.1, f2: 1.4, s: 1.1 },
];

/** Closing band (.closew) with the aurora canvas, ported from the preview. */
export function CloseBand() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      t = Math.random() * 100,
      raf = 0,
      run = false;
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      try {
        ctx.filter = `blur(${Math.round(Math.min(w, 900) / 26)}px)`;
      } catch {}
      BANDS.forEach((b, i) => {
        const base = h * b.y,
          amp = h * b.a,
          g = ctx.createLinearGradient(0, base - amp * 2, 0, base + h * b.t);
        g.addColorStop(0, `rgba(${b.c},0)`);
        g.addColorStop(0.35, `rgba(${b.c},${b.o})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 16) {
          const y = base + Math.sin((x * b.f * 6.28) / w + t * b.s + i) * amp + Math.sin((x * b.f2 * 6.28) / w - t * b.s * 0.7) * amp * 0.5;
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        for (let x = w + 20; x >= -20; x -= 16) {
          const y2 = base + h * b.t + Math.sin((x * b.f * 6.28) / w + t * b.s * 0.8 + i) * amp * 0.6;
          ctx.lineTo(x, y2);
        }
        ctx.closePath();
        ctx.fill();
      });
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    };
    const loop = () => {
      t += 0.006;
      draw();
      if (run) raf = requestAnimationFrame(loop);
    };
    size();
    draw();
    const onResize = () => {
      size();
      draw();
    };
    addEventListener("resize", onResize);
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !run) {
            run = true;
            loop();
          } else if (!e.isIntersecting) {
            run = false;
            cancelAnimationFrame(raf);
          }
        });
      });
      io.observe(cv);
    }
    return () => {
      removeEventListener("resize", onResize);
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="close" aria-labelledby="c-h">
      <div className="wrap">
        <div className="closew">
          <canvas ref={ref} aria-hidden="true"></canvas>
          <div>
            <h2 id="c-h">
              Together
              <br />
              through life.
            </h2>
            <p>For the first scan, the first breath, and every heartbeat after.</p>
            <div className="ctas">
              <Link className="btn btn-coral" href="/book/">
                <CalendarDays className="ico" aria-hidden="true" />
                Book a visit
              </Link>
              <a className="btn btn-glass" href={`tel:${site.phone.tel}`}>
                <Phone className="ico" aria-hidden="true" />
                {site.phone.nationalDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
