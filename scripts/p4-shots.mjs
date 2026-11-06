import { chromium } from "@playwright/test";
const b = await chromium.launch();
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(1200);
  await p.getByRole("button", { name: "Accept" }).click().catch(() => {});
  // scroll through to load lazy images, then back to top
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y); await new Promise(r => setTimeout(r, 90));
    }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `review/p4-home-${w}.png`, fullPage: true });
  // section clips
  const secs = await p.$$("section");
  let i = 0;
  for (const s of secs) {
    const box = await s.boundingBox().catch(() => null);
    if (box && box.height > 100 && box.height < 2500) {
      await s.screenshot({ path: `review/p4-sec${i}-${w}.png` }).catch(() => {});
      i++;
    }
  }
  await p.close();
}
await b.close();
