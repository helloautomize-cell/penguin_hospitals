import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.goto("http://localhost:3000/about/", { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
const trig = p.getByRole("button", { name: "Women and pregnancy" });
await trig.click();
await p.waitForTimeout(500);
const info = await p.evaluate(() => {
  const t = document.querySelector('[data-state="open"], [data-state="closed"]');
  return {
    trigState: t?.getAttribute("data-state"),
    expanded: t?.getAttribute("aria-expanded"),
    panel: !!document.querySelector("[data-mega-panel]"),
    contentCount: document.querySelectorAll("[data-state]").length,
    html: t?.parentElement?.outerHTML?.slice(0, 800),
  };
});
console.log(JSON.stringify({ info, errs }, null, 1));
await b.close();
