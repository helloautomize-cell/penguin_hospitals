// Round-2 verification shots: 6 areas at 390 + spot-checks at 360/430.
import { chromium } from "playwright";

const BASE = "http://localhost:3107";
const OUT = "shots-mobile-r2";

const browser = await chromium.launch();
const errors = [];

async function shot(name, url, { width = 390, height = 844, actions } = {}) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("console", (m) => {
    if (m.type() === "error" && !/chrome\.devtools|favicon/.test(m.text()))
      errors.push(`${name}: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));
  await page.addInitScript(() => {
    try { localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})); } catch {}
  });
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  if (actions) await actions(page);
  // horizontal scroll check
  const hsw = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (hsw > 0) errors.push(`${name}: horizontal scroll ${hsw}px`);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  return page;
}

await shot("1-hero-f1", "/", { actions: async (p) => p.waitForTimeout(1400) });
// hero frame 2 + 3 via reel tabs
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  const tabs = p.locator(".phs .rb");
  await tabs.nth(1).click();
  await p.waitForTimeout(1900);
  await p.screenshot({ path: `${OUT}/1-hero-f2.png` });
  await tabs.nth(2).click();
  await p.waitForTimeout(1900);
  await p.screenshot({ path: `${OUT}/1-hero-f3.png` });
  // dock hidden while hero visible?
  const mbar = await p.locator(".mbar");
  const cls = await mbar.getAttribute("class");
  const vis = await mbar.isVisible().catch(() => false);
  errors.push(`dock during hero: class="${cls}" visible=${vis}`);
  await p.close();
}

await shot("2-chapters", "/", {
  actions: async (p) => {
    await p.locator(".lcm").scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
  },
});
// swipe through all four slides
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.locator(".lcm").scrollIntoViewIfNeeded();
  await p.waitForTimeout(600);
  for (let i = 1; i < 4; i++) {
    await p.locator(".ltab").nth(i).click();
    await p.waitForTimeout(1400);
    await p.screenshot({ path: `${OUT}/2-chapters-s${i + 1}.png` });
  }
  // read-more toggle
  await p.locator(".lslide .lmore").nth(3).click();
  await p.waitForTimeout(400);
  await p.close();
}

await shot("3-mothers", "/", {
  actions: async (p) => {
    await p.locator(".mo .wsl").scrollIntoViewIfNeeded();
    await p.waitForTimeout(700);
  },
});
// slider drag w4 -> w40 + vertical timeline
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const sl = p.locator(".mo .wr");
  await sl.scrollIntoViewIfNeeded();
  await sl.fill("4");
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/3-mothers-w4.png` });
  await sl.fill("40");
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/3-mothers-w40.png` });
  await p.locator(".mo .tlw").scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/3-mothers-tl.png` });
  await p.close();
}

await shot("4-heartmap", "/", {
  actions: async (p) => {
    await p.locator(".hm").scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
  },
});
// open each zone
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.locator(".hm .list").scrollIntoViewIfNeeded();
  for (let i = 0; i < 5; i++) {
    await p.locator(".hm .it").nth(i).click();
    await p.waitForTimeout(650);
  }
  await p.screenshot({ path: `${OUT}/4-heartmap-open.png` });
  // toggle close on re-tap
  await p.locator(".hm .it").nth(4).click();
  await p.waitForTimeout(400);
  await p.close();
}

await shot("5-footer-dock", "/", {
  actions: async (p) => {
    await p.locator(".fbrand .facts").scrollIntoViewIfNeeded();
    await p.waitForTimeout(900);
  },
});
// dock visible mid-page
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.evaluate(() => scrollTo(0, 3000));
  await p.waitForTimeout(300);
  await p.evaluate(() => scrollTo(0, 2200));
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/5-dock-visible.png` });
  await p.close();
}

await shot("6-menu", "/", {
  actions: async (p) => {
    await p.locator(".burger").click();
    await p.waitForTimeout(900);
  },
});
// menu with expanded tile
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => localStorage.setItem("ph-consent-v1", JSON.stringify({analytics:false,decided:true})));
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.locator(".burger").click();
  await p.waitForTimeout(800);
  await p.locator(".mtile").first().click();
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/6-menu-tile.png` });
  await p.close();
}

// dock on pregnancy-care + emergency
await shot("dock-preg", "/pregnancy-care/", {
  actions: async (p) => {
    await p.evaluate(() => scrollTo(0, 1500));
    await p.waitForTimeout(300);
    await p.evaluate(() => scrollTo(0, 1100));
    await p.waitForTimeout(800);
  },
});
await shot("dock-emg", "/emergency/", {
  actions: async (p) => {
    await p.evaluate(() => scrollTo(0, 1500));
    await p.waitForTimeout(300);
    await p.evaluate(() => scrollTo(0, 1100));
    await p.waitForTimeout(800);
  },
});

// width spot checks
for (const w of [360, 430]) {
  await shot(`w${w}-hero`, "/", { width: w, actions: async (p) => p.waitForTimeout(1200) });
  await shot(`w${w}-menu`, "/", {
    width: w,
    actions: async (p) => {
      await p.locator(".burger").click();
      await p.waitForTimeout(800);
    },
  });
}

// desktop regression spot check
await shot("desktop-home", "/", {
  width: 1440,
  height: 900,
  actions: async (p) => p.waitForTimeout(1200),
});

console.log(errors.length ? errors.join("\n") : "ALL_CLEAN");
await browser.close();
