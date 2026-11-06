import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/about/", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const trigger = p.getByRole("button", { name: "Women and pregnancy" });
await trigger.click();
const ok1 = await p.locator("[data-mega-panel]").first().isVisible({ timeout: 2500 }).catch(() => "TIMEOUT");
console.log("after click:", ok1);
if (ok1 !== true) {
  await trigger.hover();
  const ok2 = await p.locator("[data-mega-panel]").first().isVisible({ timeout: 3000 }).catch(() => "TIMEOUT");
  console.log("after hover:", ok2);
}
const st = await p.evaluate(() => ({
  trig: document.querySelector('[data-state]')?.getAttribute("data-state"),
  panel: !!document.querySelector("[data-mega-panel]"),
  rect: document.querySelector("[data-mega-panel]")?.getBoundingClientRect(),
}));
console.log(JSON.stringify(st));
await b.close();
