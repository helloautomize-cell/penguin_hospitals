import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [1440, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const el = await p.$(".hm");
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  await p.screenshot({ path: `shots-v2/hm-strip-${w}.png` });
  // scroll to the surgeon strip itself
  const s = await p.$(".surg");
  if (s) { await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(700); await p.screenshot({ path: `shots-v2/hm-strip-focus-${w}.png` }); }
  const meas = await p.evaluate(() => {
    const ph = document.querySelector(".surg-ph");
    const sec = document.querySelector(".hm");
    const r = ph?.getBoundingClientRect();
    return { phH: r?.height, phW: r?.width, scrollW: document.documentElement.scrollWidth, winW: innerWidth };
  });
  console.log(w, JSON.stringify(meas));
  await p.close();
}
await b.close();
