// Instruments for "A life, in chapters" (resources/reference/chapters-v2/).
// Ported 1:1 from the approved reference: same geometry, same angles, same
// update functions driven by one progress value t in [0,1].
//
// Coordinate system: 600x600 viewBox, centre C=300, ring R=206,
// ticks at TR=230, numbers at NR=262(-6), labels at LR=284.
// Angles are degrees, 0 = twelve o'clock, clockwise.

const NS = "http://www.w3.org/2000/svg";
const C = 300;
const R = 206;
const TR = 230;
const NR = 262;
const LR = 284;

export type ChapterInstrumentKind = "cycle" | "weeks" | "hour" | "heart";
export type ChapterInstrumentUpdate = (t: number) => void;

function el(
  n: string,
  a: Record<string, string | number>,
  p?: Element | null,
): SVGElement {
  const e = document.createElementNS(NS, n);
  for (const k in a) e.setAttribute(k, String(a[k]));
  if (p) p.appendChild(e);
  return e;
}

function pt(r: number, d: number): [number, number] {
  const a = (d * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)];
}

function f(n: number) {
  return Math.round(n * 100) / 100;
}

function arc(r: number, a0: number, a1: number, rev = false) {
  const p0 = pt(r, rev ? a1 : a0);
  const p1 = pt(r, rev ? a0 : a1);
  const lg = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${f(p0[0])} ${f(p0[1])}A${r} ${r} 0 ${lg} ${rev ? 0 : 1} ${f(p1[0])} ${f(p1[1])}`;
}

let uid = 0;

/** Curved textPath label; the path is reversed on the lower half so the
 *  text stays upright all the way around the ring. */
function label(
  svg: Element,
  txt: string,
  r: number,
  a0: number,
  a1: number,
) {
  const mid = (((a0 + a1) / 2 + 360) % 360 + 360) % 360;
  const low = mid > 90 && mid < 270;
  const id = `lp${uid++}`;
  el("path", { id, d: arc(low ? r + 9 : r, a0, a1, low), fill: "none" }, svg);
  const t = el(
    "text",
    { class: "lab", "text-anchor": "middle" },
    svg,
  );
  const tp = el("textPath", { href: `#${id}`, startOffset: "50%" }, t);
  tp.textContent = txt;
}

function ticks(
  svg: Element,
  n: number,
  r: number,
  isMajor: (i: number) => boolean,
) {
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n;
    const mj = isMajor(i);
    const p0 = pt(r, a);
    const p1 = pt(r + (mj ? 14 : 7), a);
    el(
      "line",
      {
        class: `tk${mj ? " mj" : ""}`,
        x1: f(p0[0]),
        y1: f(p0[1]),
        x2: f(p1[0]),
        y2: f(p1[1]),
      },
      svg,
    );
  }
}

function num(svg: Element, txt: string | number, r: number, a: number) {
  const p = pt(r, a);
  const t = el(
    "text",
    { class: "num", x: f(p[0]), y: f(p[1] + 4), "text-anchor": "middle" },
    svg,
  );
  t.textContent = String(txt);
}

type Seg = [number, number, string, string];

function segs(svg: Element, n: number, list: Seg[], r: number) {
  const per = 360 / n;
  const g = 1.7;
  list.forEach((s) => {
    el(
      "path",
      {
        class: "seg",
        d: arc(r, (s[0] - 1) * per + g, s[1] * per - g),
        stroke: s[2],
      },
      svg,
    );
  });
}

function marker(svg: Element) {
  const g = el("g", { class: "mk" }, svg);
  el("circle", { class: "o", r: 12 }, g);
  el("circle", { class: "i", r: 4.5 }, g);
  return g;
}

function roField(svg: Element, sel: string) {
  const ro = svg.parentElement;
  return ro ? ro.querySelector<HTMLElement>(sel) : null;
}

/** Build an instrument inside `svg`. Returns its update(t) function. */
export function buildChapterInstrument(
  kind: ChapterInstrumentKind,
  svg: SVGSVGElement,
): ChapterInstrumentUpdate {
  /* 1. 28-day cycle */
  if (kind === "cycle") {
    const N = 28;
    const per = 360 / N;
    const S: Seg[] = [
      [1, 5, "#F4978E", "Period"],
      [6, 12, "#C3D7F1", "Follicular"],
      [13, 15, "#17407E", "Ovulation"],
      [16, 28, "#8FB8EA", "Luteal"],
    ];
    el("circle", { class: "trk", cx: C, cy: C, r: R }, svg);
    segs(svg, N, S, R);
    ticks(svg, N, TR, (i) => i % 7 === 0);
    [1, 7, 14, 21, 28].forEach((d) => num(svg, d, NR - 6, (d - 0.5) * per));
    S.forEach((s) => label(svg, s[3], LR, (s[0] - 1) * per, s[1] * per));
    const prog = el("path", { class: "prog" }, svg);
    const mk = marker(svg);
    return (t) => {
      const day = Math.max(1, Math.min(28, 1 + Math.floor(t * 27.999)));
      const a = (1 + t * 26.999 - 0.5) * per;
      prog.setAttribute("d", a > 0.5 ? arc(R - 22, 0, a) : "");
      const p = pt(R, a);
      mk.setAttribute("transform", `translate(${f(p[0])} ${f(p[1])})`);
      const ph = S.filter((s) => day >= s[0] && day <= s[1])[0];
      const v = roField(svg, "[data-v]");
      const l = roField(svg, "[data-l]");
      if (v) v.textContent = String(day);
      if (l) l.textContent = ph[3];
    };
  }

  /* 2. 40 weeks */
  if (kind === "weeks") {
    const N = 40;
    const per = 360 / N;
    const S: Seg[] = [
      [1, 13, "#C3D7F1", "First trimester"],
      [14, 27, "#F9C9B6", "Second trimester"],
      [28, 40, "#F4978E", "Third trimester"],
    ];
    el("circle", { class: "trk", cx: C, cy: C, r: R }, svg);
    segs(svg, N, S, R);
    ticks(svg, N, TR, (i) => i % 4 === 0);
    [12, 20, 28, 36].forEach((w) => num(svg, w, NR - 6, w * per));
    num(svg, 40, NR - 6, 0);
    [12, 20, 28, 36].forEach((w) => {
      const p = pt(R, w * per);
      el("circle", { class: "ms", cx: f(p[0]), cy: f(p[1]), r: 4.5 }, svg);
    });
    S.forEach((s) => label(svg, s[3], LR, (s[0] - 1) * per, s[1] * per));
    const prog = el("path", { class: "prog" }, svg);
    const mk = marker(svg);
    return (t) => {
      const wk = 4 + t * 36;
      const a = wk * per;
      prog.setAttribute("d", arc(R - 22, 0, a));
      const p = pt(R, a);
      mk.setAttribute("transform", `translate(${f(p[0])} ${f(p[1])})`);
      const w = Math.round(wk);
      const v = roField(svg, "[data-v]");
      const l = roField(svg, "[data-l]");
      if (v) v.textContent = String(w);
      if (l)
        l.textContent =
          (w <= 13 ? "First" : w <= 27 ? "Second" : "Third") + " trimester";
    };
  }

  /* 3. the first hour */
  if (kind === "hour") {
    const N = 60;
    const per = 360 / N;
    const S: Seg[] = [
      [1, 5, "#17407E", "First cry"],
      [6, 15, "#C3D7F1", "First check"],
      [16, 45, "#F9C9B6", "Skin to skin"],
      [46, 60, "#F4978E", "First feed"],
    ];
    el("circle", { class: "trk", cx: C, cy: C, r: R }, svg);
    segs(svg, N, S, R);
    ticks(svg, N, TR, (i) => i % 5 === 0);
    ([[15, "15"], [30, "30"], [45, "45"], [60, "60"]] as const).forEach((m) =>
      num(svg, m[1], NR - 6, (m[0] % 60) * per),
    );
    S.forEach((s) => label(svg, s[3], LR, (s[0] - 1) * per, s[1] * per));
    const prog = el("path", { class: "prog" }, svg);
    const mk = marker(svg);
    return (t) => {
      const m = t * 59.99;
      const a = m * per;
      prog.setAttribute("d", a > 0.5 ? arc(R - 22, 0, a) : "");
      const p = pt(R, a);
      mk.setAttribute("transform", `translate(${f(p[0])} ${f(p[1])})`);
      const mi = Math.floor(m);
      const ph = S.filter((s) => mi + 1 >= s[0] && mi + 1 <= s[1])[0];
      const v = roField(svg, "[data-v]");
      const l = roField(svg, "[data-l]");
      if (v) v.textContent = String(mi);
      if (l) l.textContent = ph[3];
    };
  }

  /* 4. the heart: a monitor trace wrapped around the photo */
  function ecg(x: number) {
    const g = (c: number, w: number, h: number) =>
      h * Math.exp(-Math.pow((x - c) / w, 2));
    return (
      g(0.16, 0.035, 0.12) +
      g(0.3, 0.008, -0.14) +
      g(0.33, 0.011, 1) +
      g(0.362, 0.01, -0.3) +
      g(0.6, 0.06, 0.26)
    );
  }
  const beats = 9;
  const pts: string[] = [];
  const n = 1440;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * 360;
    const ph = ((a / 360) * beats) % 1;
    const r = R + ecg(ph) * 34;
    const p = pt(r, a);
    pts.push(`${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`);
  }
  const d = pts.join("");
  ticks(svg, 72, TR + 18, (i) => i % 6 === 0);
  el("path", { class: "ecg-b", d }, svg);
  const fg = el("path", { class: "ecg-f", d }, svg) as SVGPathElement;
  const L = fg.getTotalLength();
  const seg = L * 0.22;
  fg.style.strokeDasharray = `${seg} ${L - seg}`;
  const H: [number, string][] = [
    [0, "Check-up"],
    [72, "Keyhole surgery"],
    [144, "Valves"],
    [216, "Bypass"],
    [288, "Veins"],
  ];
  H.forEach((h) => label(svg, h[1], LR + 14, h[0] - 30, h[0] + 30));
  const head = el(
    "circle",
    { r: 5, fill: "#FDEDE8", style: "filter:drop-shadow(0 0 8px #F4978E)" },
    svg,
  );
  return (t) => {
    const off = t * L * 1.4;
    fg.style.strokeDashoffset = String((-(off - seg)) % L);
    const q = fg.getPointAtLength(off % L);
    head.setAttribute("cx", String(q.x));
    head.setAttribute("cy", String(q.y));
  };
}
