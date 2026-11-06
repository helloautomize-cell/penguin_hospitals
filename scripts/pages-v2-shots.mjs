// Capture pages-v2 sections at scroll fractions for reference comparison.
// node scripts/pages-v2-shots.mjs <base-url> <outdir> [width]
import { chromium } from "@playwright/test";
const [base = "http://localhost:3105", out = "shots-pages-v2", W = "1440"] = process.argv.slice(2);
const w = +W, h = w > 500 ? 900 : 800;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: h } });
p.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE:", m.text()); });
p.on("pageerror", (e) => console.log("PAGEERROR:", e.message));

async function at(page, sel, frac, name, wait = 900) {
  await p.goto(`${base}/${page}/`, { waitUntil: "networkidle" });
  // dismiss cookie banner for clean comparison shots
  await p.evaluate(() => localStorage.setItem("ph-consent", "1")).catch(() => {});
  const top = await p.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.top + scrollY;
  }, sel);
  if (top === null) { console.log("MISSING", sel); return; }
  const span = await p.evaluate((s) => document.querySelector(s).offsetHeight - innerHeight, sel);
  await p.evaluate((y) => scrollTo(0, y), top + Math.max(0, span) * frac);
  await p.waitForTimeout(wait);
  await p.screenshot({ path: `${out}/${name}.png` });
  console.log("shot", name);
}

// journey pin (doctors): frac 0, .35, .7, 1
for (const [f, n] of [[0, "d-journey-0"], [0.35, "d-journey-35"], [0.7, "d-journey-70"], [1, "d-journey-100"]])
  await at("doctors", ".journey", f, n);
// penguin (about): 0, .3, .6, 1
for (const [f, n] of [[0, "a-peng-0"], [0.3, "a-peng-30"], [0.6, "a-peng-60"], [1, "a-peng-100"]])
  await at("about", ".peng", f, n);
// hscroll (visit): 0, .5, 1
for (const [f, n] of [[0, "v-hs-0"], [0.5, "v-hs-50"], [1, "v-hs-100"]])
  await at("plan-your-visit", ".hscroll", f, n);
await b.close();
