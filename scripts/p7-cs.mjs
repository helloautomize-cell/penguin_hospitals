import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3500/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(1500);
await p.getByRole("button", { name: "Accept" }).click().catch(() => {});
// find the chapters section and scroll inside the pin at 4 progress points
const y0 = await p.evaluate(() => {
  const s = document.querySelector('section[aria-label="A life, in chapters"] > div');
  return s.getBoundingClientRect().top + scrollY;
});
const h = await p.evaluate(() => innerHeight);
for (const [i, prog] of [0.05, 0.3, 0.55, 0.8].entries()) {
  await p.evaluate(([y, pr, hh]) => scrollTo(0, y + pr * (document.querySelector('section[aria-label="A life, in chapters"] > div').offsetHeight - hh)), [y0, prog, h]);
  await p.waitForTimeout(700);
  await p.screenshot({ path: `review/p7-cs${i}-1440.png` });
}
// mobile
await p.setViewportSize({ width: 390, height: 844 });
await p.goto("http://localhost:3500/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(1200);
await p.evaluate(() => document.querySelector('section[aria-label="A life, in chapters"]').scrollIntoView());
await p.waitForTimeout(500);
await p.screenshot({ path: "review/p7-cs-390.png" });
await b.close();
