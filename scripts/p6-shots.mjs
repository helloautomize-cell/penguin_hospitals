import { chromium } from "@playwright/test";
const b = await chromium.launch();
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:3000/book/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(1200);
  await p.getByRole("button", { name: "Accept" }).click().catch(() => {});
  await p.screenshot({ path: `review/p6-book-empty-${w}.png`, fullPage: true });
  await p.waitForTimeout(3000);
  await p.getByLabel("Mobile").fill("123");
  const btn = p.getByRole("button", { name: "Request an appointment" });
  await btn.scrollIntoViewIfNeeded(); await btn.click();
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `review/p6-book-errors-${w}.png`, fullPage: true });
  await p.goto("http://localhost:3000/thank-you/?type=appointment", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `review/p6-thankyou-${w}.png`, fullPage: true });
  await p.close();
}
await b.close();
