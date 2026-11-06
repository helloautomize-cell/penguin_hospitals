// Dev helper: element or full-page screenshots against the dev server.
// node scripts/screenshot.mjs <url> <out.png> [selector] [width] [height]
import { chromium } from "@playwright/test";
const [url, out, selector, w = "1440", h = "900"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url, { waitUntil: "networkidle" });
// scroll through the page so lazy images load
await p.evaluate(async () => {
  await new Promise((done) => {
    let y = 0;
    const step = () => {
      y += 600;
      scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else done();
    };
    step();
  });
});
await p.waitForTimeout(800);
if (selector) {
  const el = p.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(600);
  await el.screenshot({ path: out });
} else {
  await p.screenshot({ path: out, fullPage: true });
}
await b.close();
