import { test, expect } from "@playwright/test";

test.setTimeout(90000);

test("hero auto-advances and pause stops it", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Accept" }).click().catch(() => {});
  const first = page.getByRole("tab", { name: /1|new life/i }).first();
  await expect(first).toHaveAttribute("aria-selected", "true");
  await page.waitForTimeout(7300);
  await expect(page.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "Pause film" }).click();
  await page.waitForTimeout(7500);
  await expect(page.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
});

test("reduced motion shows chapter 1, tabs still switch", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await expect(page.getByRole("tab").first()).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab").nth(2).click();
  await expect(page.getByRole("tab").nth(2)).toHaveAttribute("aria-selected", "true");
});

test("week dial keyboard control", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Accept" }).click().catch(() => {});
  const slider = page.getByRole("slider", { name: "Pregnancy week" });
  await slider.click();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "21");
  await page.keyboard.press("PageUp");
  await expect(slider).toHaveAttribute("aria-valuenow", "25");
  await page.keyboard.press("End");
  await expect(slider).toHaveAttribute("aria-valuenow", "40");
});

test("due date calculator is right and rejects future dates", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200); // hydration
  const lmp = page.getByLabel("First day of your last period");
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const lmpDates = [
    new Date(Date.now() - 100 * 86400000),
    new Date(Date.now() - 60 * 86400000),
    new Date(Date.now() - 200 * 86400000),
  ];
  for (const l of lmpDates) {
    const due = new Date(l);
    due.setDate(due.getDate() + 280);
    await lmp.fill(l.toISOString().slice(0, 10));
    const wb = page.getByRole("button", { name: "Work it out" });
    await wb.scrollIntoViewIfNeeded(); await wb.click();
    await expect(page.locator("[data-due-result]")).toContainText(fmt(due));
  }
  const future = new Date(Date.now() + 20 * 86400000).toISOString().slice(0, 10);
  await lmp.fill(future);
  const wb2 = page.getByRole("button", { name: "Work it out" });
  await wb2.scrollIntoViewIfNeeded(); await wb2.click();
  await expect(page.getByText("That date is in the future.")).toBeVisible();
});

test("heart map buttons switch the panel", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const btn = page.getByRole("button", { name: "Heart valves" });
  await btn.click();
  await expect(btn).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("repaired, or replaced")).toBeVisible();
});

test("hours dial: Sunday OPD 4 to 6 pm", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Sun" }).click();
  await expect(page.locator("[data-hours-text]")).toContainText("Sunday: emergency open all day; OPD 4 pm to 6 pm");
  await page.getByRole("button", { name: "Mon" }).click();
  await expect(page.locator("[data-hours-text]")).toContainText("OPD all day");
});

test("no overflow 360 to 1440 and height under 11000px at 390", async ({ page }) => {
  for (const w of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const over = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(over, `width ${w}`).toBeLessThanOrEqual(0);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(h).toBeLessThan(11000);
});
