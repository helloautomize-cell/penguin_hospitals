import { chromium } from "@playwright/test";
const pages = ["/obstetrics-gynaecology/","/high-risk-pregnancy/","/heart-and-vascular-surgery/","/keyhole-heart-surgery/","/doctors/dr-lakshmi-vijay-kalbande/","/emergency/","/book/","/privacy-policy/"];
const b = await chromium.launch();
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const u of pages) {
    await p.goto("http://localhost:3000" + u, { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(400);
    const n = u.replace(/\//g, "_");
    await p.screenshot({ path: `review/p3-${n}-${w}.png`, clip: { x: 0, y: 0, width: w, height: Math.min(1200, w === 390 ? 844 : 900) } });
  }
  await p.close();
}
await b.close();
