import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const hm = await p.$(".hm");
await hm.scrollIntoViewIfNeeded();
await p.evaluate(() => scrollBy(0, -80));
await p.waitForTimeout(600);
await p.screenshot({ path: "shots-v2/hm-head-1440.png" });
// gap between head and hm-grid
const gap = await p.evaluate(() => {
  const head = document.querySelector(".hm .head").getBoundingClientRect();
  const grid = document.querySelector(".hm .hm-grid").getBoundingClientRect();
  const p = document.querySelector(".hm .head p").getBoundingClientRect();
  const h2 = document.querySelector(".hm .head h2").getBoundingClientRect();
  return { headToGrid: Math.round(grid.top - head.bottom), pBottom: Math.round(p.bottom), h2Bottom: Math.round(h2.bottom) };
});
console.log(JSON.stringify(gap));
await b.close();
