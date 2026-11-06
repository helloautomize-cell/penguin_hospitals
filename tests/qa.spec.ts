import { test, expect } from "@playwright/test";
import { allPageSlugs } from "../lib/nav";

test.setTimeout(120000);

const ROUTES = [...allPageSlugs, "/health-library/signs-of-labour/", "/health-library/chest-pain-heart/"];

test("internal link checker: every href on every route resolves", async ({ page, request }) => {
  test.setTimeout(300000);
  const sources = new Map<string, Set<string>>();
  for (const u of ROUTES) {
    await page.goto(u, { waitUntil: "domcontentloaded" });
    const hrefs = await page.evaluate(() =>
      [...document.querySelectorAll("a[href]")]
        .map((a) => (a as HTMLAnchorElement).getAttribute("href")!)
        .filter((h) => h.startsWith("/") && !h.startsWith("//")),
    );
    for (const h of hrefs) {
      const clean = h.split("#")[0].split("?")[0];
      if (!clean) continue;
      (sources.get(clean) ?? sources.set(clean, new Set()).get(clean)!).add(u);
    }
  }
  const broken: string[] = [];
  const links = [...sources.keys()];
  for (let i = 0; i < links.length; i += 10) {
    const res = await Promise.all(links.slice(i, i + 10).map((h) => request.get(h)));
    res.forEach((r, j) => {
      if (r.status() >= 400) broken.push(`${[...sources.get(links[i + j])!][0]} -> ${links[i + j]} (${r.status()})`);
    });
  }
  expect(broken).toEqual([]);
});

test("exactly one H1 per route", async ({ page }) => {
  for (const u of ROUTES) {
    await page.goto(u, { waitUntil: "domcontentloaded" });
    const n = await page.locator("h1").count();
    expect(n, u).toBe(1);
  }
});

test("new pages: no horizontal overflow at all widths", async ({ page }) => {
  const urls = ["/health-library/", "/health-library/signs-of-labour/", "/pregnancy-week-by-week/", "/faqs/"];
  for (const w of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const u of urls) {
      await page.goto(u, { waitUntil: "domcontentloaded" });
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(over, `${u} @ ${w}`).toBeLessThanOrEqual(0);
    }
  }
});

test("week tool: ?week= param presets the dial", async ({ page }) => {
  await page.goto("/pregnancy-week-by-week/?week=32", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await expect(page.getByRole("slider", { name: "Week of pregnancy" })).toHaveAttribute(
    "aria-valuenow",
    "32",
  );
});

test("hidden pages 404 in the production build", async ({ request }) => {
  // runs against the prod server only when BASE=prod
  for (const u of ["/newborn-care/", "/lab-and-scans/", "/pap-smear-colposcopy/", "/medical-termination-of-pregnancy/"]) {
    const res = await request.get(u);
    if (process.env.PROD_TEST) {
      expect(res.status(), u).toBe(404);
    } else {
      expect([200, 404], u).toContain(res.status());
    }
  }
});
