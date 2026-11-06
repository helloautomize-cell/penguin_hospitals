import { chromium } from "@playwright/test";
const b = await chromium.launch();
const shots = [
  ["http://localhost:3000/obstetrics-gynaecology/", 390, "review/p2b-hub-390.png"],
  ["http://localhost:3000/pregnancy-care/", 1440, "review/p2b-hero-1440.png"],
  ["http://localhost:3000/health-library/", 1440, "review/p2b-library-1440.png"],
];
for (const [url, w, out] of shots) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(url, { waitUntil: "networkidle" });
  await p.evaluate(async () => { await new Promise(r => { let y = 0; const s = () => { scrollTo(0, y); y += 400; if (y < document.body.scrollHeight) setTimeout(s, 40); else r(); }; s(); }); });
  await p.evaluate(() => document.querySelectorAll(".pre,.hide").forEach(e => e.classList.remove("pre", "hide")));
  await p.waitForTimeout(120);
  await p.screenshot({ path: out, fullPage: true });
  await p.context().close();
  console.log("ok", out);
}
await b.close();
