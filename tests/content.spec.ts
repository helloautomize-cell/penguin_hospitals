import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { allPageSlugs } from "../lib/nav";
import { allPages } from "../lib/content";

const BANNED = readFileSync("scripts/banned-words.txt", "utf8")
  .split("\n").map((s) => s.trim()).filter(Boolean);
const PREG = /pregnancy|delivery|postnatal|preeclampsia|scan|newborn|pap|termination|week/;

test.describe.configure({ mode: "parallel" });
test.setTimeout(120000);

test("every site-plan URL returns 200", async ({ request }) => {
  for (const u of allPageSlugs) {
    const res = await request.get(u);
    expect(res.status(), u).toBe(200);
  }
});

test("hidden pages render in dev, not in nav", async ({ page }) => {
  const hidden = allPages().filter((p) => p.hidden);
  for (const p of hidden) {
    const res = await page.goto(p.url);
    expect(res?.status(), p.url).toBe(200);
    await expect(page.getByText("Hidden page")).toBeVisible();
  }
});

test("every pregnancy and scan page has the PCPNDT line", async ({ page }) => {
  const urls = allPageSlugs.filter((u) => PREG.test(u));
  for (const u of urls) {
    await page.goto(u);
    await expect(page.getByText(/PCPNDT Act/).last(), u).toBeVisible();
  }
});

test("banned words absent from rendered pages", async ({ request }) => {
  for (const u of ["/", "/obstetrics-gynaecology/", "/high-risk-pregnancy/", "/heart-and-vascular-surgery/", "/emergency/", "/book/", "/privacy-policy/", "/doctors/"]) {
    const html = await (await request.get(u)).text();
    const text = html
      .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .toLowerCase();
    for (const w of BANNED) {
      const re = new RegExp("\\b" + w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
      expect(re.test(text), `${u} contains "${w}"`).toBe(false);
    }
  }
});

test("every medical page has a reviewer box", async ({ page }) => {
  const urls = allPageSlugs.filter(
    (u) => /care|delivery|pcos|periods|fibroids|cysts|endometriosis|menopause|surgery|fertility|heart|veins|artery|fistula|lung|chest/.test(u),
  );
  for (const u of urls) {
    await page.goto(u);
    await expect(page.getByText(/Medically reviewed/).last(), u).toBeVisible();
  }
});
