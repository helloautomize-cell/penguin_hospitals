"use client";

// "A life, in chapters" — ported 1:1 from resources/reference/chapters-v2/.
// Desktop: 602vh scroll-driven sideways story, sticky 100svh pin, five panels
// (intro + four chapters). Each chapter dwells .62 viewport heights while its
// instrument runs 0→1; travel between panels lasts .48 with cubic easing.
// ≤900px or reduced motion: panels stack, instruments count up once at 45%
// visibility over 1.6s (or jump straight to resting values).

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  buildChapterInstrument,
  type ChapterInstrumentUpdate,
} from "@/lib/chapter-instruments";

type ByImg = { src: string; alt: string };

const IMG_SIZES = "(max-width: 900px) 88vw, 600px";

const D = 0.62; // dwell per panel, in viewport heights
const T = 0.48; // travel between panels, in viewport heights
const REST = [0.48, 0.55, 0.4, 0.6];

function ease(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function By({ img, children }: { img: ByImg; children: React.ReactNode }) {
  return (
    <span className="by">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} />
      {children}
    </span>
  );
}

export function LifeChapters({
  lakshmiImg,
  ashishImg,
}: {
  lakshmiImg: ByImg;
  ashishImg: ByImg;
}) {
  const secRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cntRef = useRef<HTMLSpanElement>(null);
  const lifeBRef = useRef<SVGPathElement>(null);
  const lifeFRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    const lifeB = lifeBRef.current;
    const lifeF = lifeFRef.current;
    if (!sec || !pinEl || !track || !lifeB || !lifeF) return;
    const root = sec;

    const $$ = <T extends Element>(s: string) =>
      Array.from(root.querySelectorAll<T>(s));

    /* instruments */
    const upd: ChapterInstrumentUpdate[] = [];
    $$<SVGSVGElement>("[data-inst]").forEach((s) => {
      upd.push(
        buildChapterInstrument(
          s.getAttribute("data-inst") as Parameters<
            typeof buildChapterInstrument
          >[0],
          s,
        ),
      );
    });

    /* lifeline */
    const dl = "M0 20H651l8-14 10 28 9-20 5 6H1000";
    lifeB.setAttribute("d", dl);
    lifeF.setAttribute("d", dl);
    const LL = lifeF.getTotalLength();
    lifeF.style.strokeDasharray = String(LL);
    lifeF.style.strokeDashoffset = String(LL);

    const marks = $$<HTMLAnchorElement>(".life .mks a");
    const pnls = $$<HTMLElement>(".pnl");

    const stacked = matchMedia(
      "(max-width:900px),(prefers-reduced-motion:reduce)",
    );
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

    const secTop = () => sec.getBoundingClientRect().top + scrollY;

    function frame() {
      if (stacked.matches) return;
      const vh = innerHeight;
      const u = (scrollY - secTop()) / vh;
      let x = 0;
      const loc = [0, 0, 0, 0, 0];
      let a = 0;
      for (let k = 0; k < 5; k++) {
        if (u < a + D) {
          x = k;
          loc[k] = Math.max(0, (u - a) / D);
          break;
        }
        loc[k] = 1;
        if (k < 4 && u < a + D + T) {
          x = k + ease((u - a - D) / T);
          break;
        }
        a += D + T;
        x = k + 1;
      }
      x = Math.min(4, x); // past the section's end the pin stays on ch4
      track!.style.transform = `translate3d(${-x * 100}vw,0,0)`;
      for (let i = 1; i < 5; i++) upd[i - 1](Math.min(1, loc[i]));
      const cur = Math.round(x);
      pnls.forEach((p, i) => {
        if (Math.abs(x - i) < 0.55) p.classList.add("in");
      });
      if (cntRef.current)
        cntRef.current.textContent = "0" + Math.max(1, cur);
      marks.forEach((m, i) => m.classList.toggle("on", i === cur - 1));
      const lp = Math.max(0, Math.min(1, (x - 1) / 3));
      lifeF!.style.strokeDashoffset = String(LL * (1 - lp));
      if (x > 3.5) pinEl!.setAttribute("data-dark", "");
      else pinEl!.removeAttribute("data-dark");
      if (x < 0.5) pinEl!.setAttribute("data-intro", "");
      else pinEl!.removeAttribute("data-intro");
    }

    let tick = false;
    function onS() {
      if (!tick) {
        tick = true;
        requestAnimationFrame(() => {
          tick = false;
          frame();
        });
      }
    }
    addEventListener("scroll", onS, { passive: true });
    addEventListener("resize", onS);

    /* stacked mode: each instrument counts up once when it comes into view */
    let io: IntersectionObserver | null = null;
    function stackInit() {
      io?.disconnect();
      pnls.forEach((p) => p.classList.add("in"));
      upd.forEach((u, i) => u(reduce ? REST[i] : 0));
      if (reduce || !("IntersectionObserver" in window)) {
        upd.forEach((u, i) => u(REST[i]));
        return;
      }
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            io!.unobserve(e.target);
            const i = +e.target.id.slice(2) - 1;
            const t0 = performance.now();
            (function st(n: number) {
              const k = Math.min(1, (n - t0) / 1600);
              upd[i](REST[i] * ease(k));
              if (k < 1) requestAnimationFrame(st);
            })(t0);
          });
        },
        { threshold: 0.45 },
      );
      pnls.slice(1).forEach((p) => io!.observe(p));
    }

    function mode() {
      if (stacked.matches) stackInit();
      else {
        io?.disconnect();
        pnls.forEach((p, i) => {
          if (i) p.classList.remove("in");
        });
        frame();
      }
    }
    const onMode = () => mode();
    if (stacked.addEventListener) stacked.addEventListener("change", onMode);
    else stacked.addListener(onMode);
    mode();

    /* chapter links jump to the right scroll position */
    const goLinks = $$<HTMLAnchorElement>("[data-go]");
    const onGo = (e: Event) => {
      if (stacked.matches) return;
      e.preventDefault();
      const a = e.currentTarget as HTMLAnchorElement;
      const k = +(a.getAttribute("data-go") || 0);
      scrollTo({
        top: secTop() + (k * (D + T) + D * 0.15) * innerHeight,
        behavior: reduce ? "auto" : "smooth",
      });
    };
    goLinks.forEach((a) => a.addEventListener("click", onGo));

    return () => {
      removeEventListener("scroll", onS);
      removeEventListener("resize", onS);
      io?.disconnect();
      goLinks.forEach((a) => a.removeEventListener("click", onGo));
      if (stacked.removeEventListener)
        stacked.removeEventListener("change", onMode);
      else stacked.removeListener(onMode);
    };
  }, []);

  return (
    <section className="lc" ref={secRef} aria-labelledby="lc-h">
      <div className="lc-pin" ref={pinRef} data-intro="">
        <div className="lc-track" ref={trackRef}>
          <div className="pnl p0 in" id="ch0">
            <div>
              <span className="tag">
                <i></i>A life, in chapters
              </span>
              <h2 id="lc-h">
                Every chapter of a woman&apos;s life.{" "}
                <span>And the heart that carries the family.</span>
              </h2>
              <ol className="idx">
                <li>
                  <a href="#ch1" data-go="1">
                    <Image
                      src="/images/chapters/ch1.jpg"
                      alt=""
                      width={88}
                      height={88}
                    />
                    <em>13+</em>Growing up
                  </a>
                </li>
                <li>
                  <a href="#ch2" data-go="2">
                    <Image
                      src="/images/chapters/ch2.jpg"
                      alt=""
                      width={88}
                      height={88}
                    />
                    <em>40 weeks</em>Nine months
                  </a>
                </li>
                <li>
                  <a href="#ch3" data-go="3">
                    <Image
                      src="/images/chapters/ch3.jpg"
                      alt=""
                      width={88}
                      height={88}
                    />
                    <em>Day 1</em>First breath
                  </a>
                </li>
                <li>
                  <a href="#ch4" data-go="4">
                    <Image
                      src="/images/chapters/ch4.jpg"
                      alt=""
                      width={88}
                      height={88}
                    />
                    <em>Always</em>The heart
                  </a>
                </li>
              </ol>
              <p className="hint">
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
                Keep scrolling, the story moves sideways
              </p>
            </div>
          </div>

          <article className="pnl p1" id="ch1" aria-labelledby="h1t">
            <div className="stage" aria-hidden="true">
              <Image
                className="ph"
                src="/images/chapters/ch1.jpg"
                alt=""
                width={600}
                height={600}
                sizes={IMG_SIZES}
              />
              <svg viewBox="0 0 600 600" data-inst="cycle"></svg>
              <div className="ro">
                <span>Day</span>
                <b data-v="">1</b>
                <i></i>
                <span data-l="">Period</span>
              </div>
            </div>
            <div className="txt">
              <div className="age">
                <b>13+</b>
                <span>
                  Chapter one<br />
                  Growing up
                </span>
              </div>
              <h3 id="h1t">Getting to know your body</h3>
              <p>
                Periods that are too heavy, too painful or too irregular. A PCOS
                diagnosis that raises more questions than it answers. Dr.
                Lakshmi explains what your body is doing, then what can help.
              </p>
              <div className="links">
                <Link href="/pcos/">PCOS</Link>
                <Link href="/heavy-periods/">Heavy periods</Link>
                <Link href="/irregular-menstruation/">Irregular periods</Link>
                <Link href="/uterine-fibroids/">Fibroids</Link>
              </div>
              <By img={lakshmiImg}>With Dr. Lakshmi Kalbande</By>
            </div>
          </article>

          <article className="pnl p2" id="ch2" aria-labelledby="h2t">
            <div className="stage" aria-hidden="true">
              <Image
                className="ph"
                src="/images/chapters/ch2.jpg"
                alt=""
                width={600}
                height={600}
                sizes={IMG_SIZES}
              />
              <svg viewBox="0 0 600 600" data-inst="weeks"></svg>
              <div className="ro">
                <span>Week</span>
                <b data-v="">4</b>
                <i></i>
                <span data-l="">First trimester</span>
              </div>
            </div>
            <div className="txt">
              <div className="age">
                <b>40</b>
                <span>
                  Chapter two<br />
                  Weeks of pregnancy
                </span>
              </div>
              <h3 id="h2t">Nine months, one visit at a time</h3>
              <p>
                Check-ups, scans and blood tests at the right weeks, with closer
                watch when a pregnancy needs it: twins, diabetes, high blood
                pressure or a history of loss.
              </p>
              <div className="links">
                <Link href="/pregnancy-week-by-week/">
                  Pregnancy week by week
                </Link>
                <Link href="/high-risk-pregnancy/">High-risk pregnancy</Link>
                <Link href="/preeclampsia-treatment/">Preeclampsia</Link>
              </div>
              <By img={lakshmiImg}>With Dr. Lakshmi Kalbande</By>
            </div>
          </article>

          <article className="pnl p3" id="ch3" aria-labelledby="h3t">
            <div className="stage" aria-hidden="true">
              <Image
                className="ph"
                src="/images/chapters/ch3.jpg"
                alt=""
                width={600}
                height={600}
                sizes={IMG_SIZES}
              />
              <svg viewBox="0 0 600 600" data-inst="hour"></svg>
              <div className="ro">
                <span>Minute</span>
                <b data-v="">0</b>
                <i></i>
                <span data-l="">First cry</span>
              </div>
            </div>
            <div className="txt">
              <div className="age">
                <b>Day 1</b>
                <span>
                  Chapter three<br />
                  First breath
                </span>
              </div>
              <h3 id="h3t">The day your baby arrives</h3>
              <p>
                Normal birth, painless delivery with an epidural, or a caesarean
                when it is the safer way. The labour team is here day and night,
                and newborn care is in the same building.
              </p>
              <div className="links">
                <Link href="/normal-delivery/">Normal delivery</Link>
                <Link href="/painless-delivery/">Painless delivery</Link>
                <Link href="/postnatal-care/">After birth</Link>
              </div>
              <By img={lakshmiImg}>With Dr. Lakshmi and the night team</By>
            </div>
          </article>

          <article className="pnl p4" id="ch4" aria-labelledby="h4t">
            <div className="stage" aria-hidden="true">
              <Image
                className="ph"
                src="/images/chapters/ch4.jpg"
                alt=""
                width={600}
                height={600}
                sizes={IMG_SIZES}
              />
              <svg viewBox="0 0 600 600" data-inst="heart"></svg>
              <div className="ro">
                <b>24</b>
                <span>hours</span>
                <i></i>
                <span>Every day</span>
              </div>
            </div>
            <div className="txt">
              <div className="age">
                <b>Always</b>
                <span>
                  Chapter four<br />
                  The heart
                </span>
              </div>
              <h3 id="h4t">A heart for the years ahead</h3>
              <p>
                Chest pain, breathlessness or a worrying ECG. Tests happen here,
                and when surgery is needed, Dr. Ashish explains every option,
                including keyhole heart surgery through a small cut in the side.
              </p>
              <div className="links">
                <Link href="/heart-and-vascular-surgery/">
                  Explore the heart map
                </Link>
                <Link href="/keyhole-heart-surgery/">Keyhole surgery</Link>
                <Link href="/varicose-veins/">Varicose veins</Link>
              </div>
              <By img={ashishImg}>With Dr. Ashish Baviskar</By>
            </div>
          </article>
        </div>

        <div className="cnt" aria-hidden="true">
          <span ref={cntRef}>01</span>
          <small> / 04</small>
        </div>
        <div className="life" aria-hidden="true">
          <svg viewBox="0 0 1000 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lc-lg" x1="0" x2="1">
                <stop offset="0" stopColor="#17407E" />
                <stop offset=".7" stopColor="#8E6F96" />
                <stop offset="1" stopColor="#F4978E" />
              </linearGradient>
            </defs>
            <path className="bg" ref={lifeBRef} />
            <path
              className="fg"
              ref={lifeFRef}
              style={{ stroke: "url(#lc-lg)" }}
            />
          </svg>
          <div className="mks">
            <a href="#ch1" data-go="1" tabIndex={-1}>
              Growing up
            </a>
            <a href="#ch2" data-go="2" tabIndex={-1}>
              Nine months
            </a>
            <a href="#ch3" data-go="3" tabIndex={-1}>
              First breath
            </a>
            <a href="#ch4" data-go="4" tabIndex={-1}>
              The heart
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
