import { chromium } from "@playwright/test";
const pages = ["/health-library/","/health-library/signs-of-labour/","/pregnancy-week-by-week/","/faqs/"];
const names = ["library","post","weeks","faqs"];
const b = await chromium.launch();
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (let i = 0; i < pages.length; i++) {
    await p.goto("http://localhost:3400" + pages[i], { waitUntil: "domcontentloaded" });
    await p.waitForTimeout(600);
    await p.getByRole("button", { name: "Accept" }).click().catch(() => {});
    await p.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      scrollTo(0, 0);
    });
    await p.waitForTimeout(400);
    await p.screenshot({ path: `review/p5-${names[i]}-${w}.png`, fullPage: true });
  }
  await p.close();
}
await b.close();
