import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/styleguide/", { waitUntil: "networkidle" });
const top = await p.evaluate(() => document.querySelector("#doctors").getBoundingClientRect().top + scrollY);
await p.evaluate((y) => scrollTo(0, y), top + 1015 - 450);
await p.waitForTimeout(500);
const hit = await p.evaluate(() => {
  const els = document.elementsFromPoint(28, 862);
  return els.slice(0,4).map(el => ({ tag: el.tagName, cls: el.className?.toString().slice(0,160) }));
});
console.log(JSON.stringify(hit, null, 1));
await b.close();
