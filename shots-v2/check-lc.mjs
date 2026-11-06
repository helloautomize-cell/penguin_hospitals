import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
const info = await p.evaluate(() => {
  const sec = document.querySelector(".lc");
  const r = sec.getBoundingClientRect();
  return { top: r.top + scrollY, h: sec.offsetHeight };
});
for (const [name, u] of [["lc-ch4", 4.9], ["lc-release-early", 5.15], ["lc-release-mid", 5.5], ["lc-release-late", 5.9]]) {
  await p.evaluate((y) => scrollTo(0, y), info.top + u * 900);
  await p.waitForTimeout(800);
  await p.screenshot({ path: `shots-v2/${name}.png` });
  console.log(name);
}
await b.close();
