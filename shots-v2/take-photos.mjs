// Screenshots for the doctor-photos drop report.
// Usage: node shots-v2/take-photos.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const shots = [
  // [name, url, scrollY (px), viewport]
  ["doc-lakshmi", "/doctors/dr-lakshmi-vijay-kalbande/", 0],
  ["doc-lakshmi-mid", "/doctors/dr-lakshmi-vijay-kalbande/", 1400],
  ["doc-ashish", "/doctors/dr-ashish-baviskar/", 0],
  ["doc-ashish-mid", "/doctors/dr-ashish-baviskar/", 1400],
  ["doctors-hub", "/doctors/", 0],
  ["book", "/book/", 0],
  ["plan-visit", "/plan-your-visit/", 0],
  ["plan-visit-fig", "/plan-your-visit/", "bottom"],
  ["preg-care", "/pregnancy-care/", 0],
  ["home-two-spec", "/", "docsec"],
  ["about", "/about/", 0],
  ["about-fig", "/about/", "bottom"],
];

const browser = await chromium.launch();
for (const w of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  for (const [name, url, y] of shots) {
    await page.goto(base + url, { waitUntil: "networkidle" });
    if (y === "bottom") {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    } else if (y === "docsec") {
      const el = await page.$(".dfig.together, figure.together, [class*='together']");
      if (el) await el.scrollIntoViewIfNeeded();
      else await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
    } else {
      await page.evaluate((v) => window.scrollTo(0, v), y);
    }
    await page.waitForTimeout(900);
    await page.screenshot({ path: `shots-v2/doc-${name}-${w}.png` });
    console.log(`shots-v2/doc-${name}-${w}.png`);
  }
  await page.close();
}
await browser.close();
