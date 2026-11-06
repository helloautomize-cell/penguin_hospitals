import { test, expect, type Page } from "@playwright/test";

test.setTimeout(90000);

async function fillBase(page: Page) {
  await page.goto("/book/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Accept" }).click().catch(() => {});
  await page.waitForTimeout(3500); // >3s minimum fill time
  await page.getByLabel("Patient name").fill("Test Patient");
  await page.getByLabel("Mobile").fill("9876543210");
}

test("validation errors show summary and keep data", async ({ page }) => {
  await page.goto("/book/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  await page.getByLabel("Mobile").fill("123");
  await page.getByRole("button", { name: "Request an appointment" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
  await expect(page.getByLabel("Mobile")).toHaveValue("123");
});

test("under-18 unticked is blocked", async ({ page }) => {
  await fillBase(page);
  await page.getByLabel("Age").fill("10");
  await page.getByRole("checkbox", { name: /agree that Penguin Hospital/ }).check();
  const b1 = page.getByRole("button", { name: "Request an appointment" });
  await b1.scrollIntoViewIfNeeded(); await b1.click();
  await expect(page.getByRole("alert").first()).toContainText("guardian consent", { timeout: 15000 });
});

test("under-18 ticked without guardian name is blocked", async ({ page }) => {
  await fillBase(page);
  await page.getByLabel("Age").fill("10");
  await page.getByRole("checkbox", { name: /patient is under 18/i }).check();
  await page.getByRole("checkbox", { name: /agree that Penguin Hospital/ }).check();
  const b1 = page.getByRole("button", { name: "Request an appointment" });
  await b1.scrollIntoViewIfNeeded(); await b1.click();
  await expect(page.getByRole("alert").first()).toContainText("Guardian name is required", { timeout: 15000 });
});

test("honeypot blocks submission", async ({ page }) => {
  await fillBase(page);
  await page.locator('input[name="company"]').fill("spam");
  await page.getByRole("button", { name: "Request an appointment" }).click();
  await page.waitForTimeout(1500);
  await expect(page).not.toHaveURL(/thank-you/);
});

test("success submits and lands on /thank-you/", async ({ page }) => {
  await fillBase(page);
  await page.getByLabel("Age").fill("28");
  await page.getByRole("checkbox", { name: /agree that Penguin Hospital/ }).check();
  const b2 = page.getByRole("button", { name: "Request an appointment" });
  await b2.scrollIntoViewIfNeeded(); await b2.click();
  await expect(page).toHaveURL(/thank-you.*type=appointment/, { timeout: 30000 });
});

test("no GA or third-party requests before consent", async ({ page }) => {
  const third: string[] = [];
  page.on("request", (r) => {
    const u = r.url();
    if (/googletagmanager|google-analytics|youtube|maps\.google/.test(u)) third.push(u);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  expect(third).toEqual([]);
});
