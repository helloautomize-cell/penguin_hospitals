import { test, expect } from "@playwright/test";
import { allPageSlugs } from "../lib/nav";

const ROUTES = allPageSlugs;

test.describe("nested interactives", () => {
  for (const route of ROUTES) {
    test(`${route} has no link/button inside a link/button`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const bad = await page.evaluate(
        () =>
          document.querySelectorAll("a a, a button, button a, a summary, summary a, summary button")
            .length,
      );
      expect(bad).toBe(0);
    });
  }
});

test.describe("no horizontal overflow", () => {
  const pages = ["/", "/pregnancy-care/", "/contact/"];
  for (const w of [360, 390, 768, 1024, 1440]) {
    test(`width ${w}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      for (const route of pages) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route} at ${w}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe("mega menu", () => {
  for (const w of [1024, 1440]) {
    test(`panels inside viewport at ${w}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto("/about/", { waitUntil: "networkidle" });
      await page.waitForTimeout(800); // hydration
      for (const label of ["Women and pregnancy", "Heart and vessels"]) {
        const trigger = page.getByRole("button", { name: label });
        const panel = page.locator("[data-mega-panel]").first();
        // click may land before hydration; retry until the panel mounts
        for (let i = 0; i < 5; i++) {
          await trigger.click();
          if (await panel.isVisible().catch(() => false)) break;
          if (i === 4) await panel.waitFor({ state: "visible" });
          else await page.waitForTimeout(400);
        }
        const box = await page.locator("[data-mega-panel]:visible").first().boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(w);
        }
        const overlaps = await page.evaluate(() => {
          const links = Array.from(
            document.querySelectorAll<HTMLElement>(
              '[data-radix-navigation-menu-viewport] a, [data-radix-navigation-menu-viewport] button',
            ),
          ).filter((el) => el.offsetParent !== null);
          for (let i = 0; i < links.length; i++) {
            for (let j = i + 1; j < links.length; j++) {
              const a = links[i].getBoundingClientRect();
              const b = links[j].getBoundingClientRect();
              const x = Math.min(a.right, b.right) - Math.max(a.left, b.left);
              const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
              if (x > 2 && y > 2) return [links[i].textContent, links[j].textContent];
            }
          }
          return null;
        });
        expect(overlaps).toBeNull();
        await page.keyboard.press("Escape");
      }
    });
  }
});

test("mobile menu opens, traps focus, Esc closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800); // let hydration finish so the click handler is live
  const burger = page.getByRole("button", { name: "Open menu" });
  await burger.click();
  if (!(await page.getByRole("dialog", { name: "Menu" }).isVisible())) await burger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  // Tab forward and back a few times; focus must stay inside the dialog
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  const inside = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"][aria-label="Menu"]');
    return !!d && d.contains(document.activeElement);
  });
  expect(inside).toBe(true);
  for (let i = 0; i < 12; i++) await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("redirects return 301 or 308 to the right URL", async ({ request }) => {
  const cases: [string, string][] = [
    ["/about-us", "/about/"],
    ["/contact-us", "/contact/"],
    ["/obstetrics-care", "/pregnancy-care/"],
    ["/polyendocrine-metabolic-ovarian-syndrome", "/pcos/"],
    ["/dr-lakshmi-vijay-kalbande", "/doctors/dr-lakshmi-vijay-kalbande/"],
  ];
  for (const [from, to] of cases) {
    // trailingSlash normalisation adds one hop before the custom 301 fires
    const res = await request.get(from, { maxRedirects: 3 });
    expect(new URL(res.url()).pathname, from).toBe(to);
    expect(res.status(), from).toBe(200);
  }
});

test("old demo URLs are gone", async ({ request }) => {
  expect((await request.get("/blog-post-title", { maxRedirects: 3 })).status()).toBe(410);
  expect((await request.get("/?page_id=5", { maxRedirects: 3 })).status()).toBe(410);
});

test("styleguide is not linked from nav", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(await page.locator('nav a[href="/styleguide/"]').count()).toBe(0);
});
