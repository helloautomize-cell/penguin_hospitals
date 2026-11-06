// Hero screenshots for the treatment-hero fix.
// node scripts/hero-shots.mjs [baseUrl] [outDir]
// Captures the hero section (.thero or .phero) at 1440, 1024 and 390.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "shots-v2/heroes";

const ROUTES = [
  "obstetrics-gynaecology",
  "heart-and-vascular-surgery",
  "pregnancy-care",
  "pcos",
  "ovarian-cysts",
  "varicose-veins",
  "av-fistula-for-dialysis",
  "lung-and-chest-surgery",
  "medical-termination-of-pregnancy",
  "lab-and-scans",
  "nutrition-and-physiotherapy",
];
const SIZES = [
  { w: 1440, h: 900 },
  { w: 1024, h: 800 },
  { w: 390, h: 844 },
];

mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
for (const s of SIZES) {
  const p = await b.newPage({ viewport: { width: s.w, height: s.h } });
  for (const r of ROUTES) {
    try {
      await p.goto(`${BASE}/${r}/`, { waitUntil: "networkidle" });
      await p.waitForTimeout(1400); // let the hero animation settle
      const el = p.locator("article section").first();
      await el.screenshot({ path: `${OUT}/${r}-${s.w}.png` });
      console.log(`shot ${r} @${s.w}`);
    } catch (e) {
      console.log(`FAIL ${r} @${s.w}: ${e.message}`);
    }
  }
  await p.close();
}
await b.close();
console.log(`done -> ${OUT}`);
