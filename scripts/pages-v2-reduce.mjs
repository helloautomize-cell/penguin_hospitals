// Reduced-motion check: emulate prefers-reduced-motion, verify pinned
// sections render readable content (no empty pins) at 1440.
import { chromium } from "@playwright/test";
const base = "http://localhost:3105", out = "shots-pages-v2";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
p.on("pageerror", (e) => console.log("PAGEERROR:", e.message));

for (const page of ["doctors", "about", "plan-your-visit"]) {
  await p.goto(`${base}/${page}/`, { waitUntil: "networkidle" });
  await p.evaluate(async () => {
    await new Promise((done) => {
      let y = 0;
      const step = () => { y += 800; scrollTo(0, y); if (y < document.body.scrollHeight) setTimeout(step, 40); else done(); };
      step();
    });
  });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${out}/${page}-rm.png`, fullPage: true });
  const checks = await p.evaluate(() => ({
    journeySteps: [...document.querySelectorAll(".jsteps li.on")].length,
    beatsVisible: [...document.querySelectorAll(".ptext .beat")].filter((b) => getComputedStyle(b).opacity === "1").length,
    trackTransform: getComputedStyle(document.querySelector(".track") ?? document.body).transform,
    prvHidden: [...document.querySelectorAll(".prv.pre")].length,
  }));
  console.log(page, JSON.stringify(checks));
}
await b.close();
