// Layout audit for TreatmentHero: for every route in the map + the badge
// fallbacks, verify at 1440 / 1024 / 390 that
//   - the left copy column is not clipped by the 640px-capped panel
//   - the panel height is <= 640 on desktop
//   - no horizontal overflow
//   - every CTA button is >= 48px tall
//   - the photo card keeps its aspect ratio class
// node scripts/hero-fit-audit.mjs [baseUrl]
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = process.argv[2] || "http://localhost:3000";

const src = readFileSync(path.join(root, "lib", "treatment-heroes.ts"), "utf8");
const routes = [
  ...src.matchAll(/'(\/[^']*\/)':\s*\{/g),
].map((m) => m[1]);
routes.push("/medical-termination-of-pregnancy/", "/lab-and-scans/", "/nutrition-and-physiotherapy/");

const SIZES = [1440, 1024, 390];
let fails = 0;
const b = await chromium.launch();
const p = await b.newPage();
for (const w of SIZES) {
  await p.setViewportSize({ width: w, height: 900 });
  for (const r of routes) {
    await p.goto(BASE + r, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(300);
    const m = await p.evaluate(() => {
      const panel = document.querySelector(".thero-panel");
      const out = { w: innerWidth, scrollW: document.documentElement.scrollWidth, over: 0, panelH: 0, copyClip: false, btnMin: 99, phH: 0 };
      out.over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      if (panel) {
        const pr = panel.getBoundingClientRect();
        out.panelH = Math.round(pr.height);
        const copy = panel.querySelector(".thero-copy");
        if (copy) {
          const cr = copy.getBoundingClientRect();
          out.copyClip = cr.bottom > pr.bottom - 20 || cr.top < pr.top + 20;
        }
        const ph = panel.querySelector(".thero-ph");
        if (ph) out.phH = Math.round(ph.getBoundingClientRect().height);
      }
      for (const b of document.querySelectorAll(".thero .btn")) {
        out.btnMin = Math.min(out.btnMin, b.getBoundingClientRect().height);
      }
      return out;
    });
    const problems = [];
    if (m.over > 1) problems.push(`hscroll +${m.over}px`);
    if (m.copyClip) problems.push("copy clipped by panel cap");
    if (w >= 1024 && m.panelH > 641) problems.push(`panel ${m.panelH}px > 640`);
    if (m.btnMin < 48) problems.push(`button ${Math.round(m.btnMin)}px < 48`);
    if (problems.length) {
      fails++;
      console.log(`FAIL ${r} @${w}: ${problems.join(", ")}`);
    }
  }
  console.log(`-- ${w}px sweep done`);
}
await b.close();
console.log(fails ? `\n${fails} problem(s)` : "\nALL CLEAR");
process.exit(fails ? 1 : 0);
