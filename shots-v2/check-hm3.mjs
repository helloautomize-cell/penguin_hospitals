import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const order = await p.evaluate(() => {
  const hm = document.querySelector(".hm");
  return [...hm.querySelectorAll(":scope > .wrap > *")].map(e => e.className.split(" ")[0]).join(" > ");
});
console.log("order:", order);
const bey = await p.$(".bey");
await bey.scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
await p.screenshot({ path: "shots-v2/hm-bottom-1440.png" });
await b.close();
