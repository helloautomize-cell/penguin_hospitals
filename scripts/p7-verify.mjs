import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3500/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(1200);
await p.getByRole("button", { name: "Accept" }).click().catch(() => {});
await p.screenshot({ path: "review/p7v-hero-1440.png" });
// cards section
await p.evaluate(() => document.querySelectorAll("section")[1].scrollIntoView());
await p.waitForTimeout(600);
await p.screenshot({ path: "review/p7v-cards-1440.png" });
// chapter story mid
const y0 = await p.evaluate(() => {
  const s = document.querySelector('section[aria-label="A life, in chapters"] > div');
  return s.getBoundingClientRect().top + scrollY;
});
await p.evaluate(([y, hh]) => scrollTo(0, y + 0.35 * (document.querySelector('section[aria-label="A life, in chapters"] > div').offsetHeight - hh)), [y0, 900]);
await p.waitForTimeout(700);
await p.screenshot({ path: "review/p7v-cs2-1440.png" });
await p.evaluate(([y, hh]) => scrollTo(0, y + 0.6 * (document.querySelector('section[aria-label="A life, in chapters"] > div').offsetHeight - hh)), [y0, 900]);
await p.waitForTimeout(700);
await p.screenshot({ path: "review/p7v-cs3-1440.png" });
await b.close();
