import { test, expect } from "@playwright/test";

test.describe("/styleguide", () => {
  test("no horizontal overflow and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/styleguide/", { waitUntil: "networkidle" });

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);

    expect(errors).toEqual([]);
  });
});
