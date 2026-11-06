import { test, expect } from "@playwright/test";
import { allPages } from "../lib/content";
import { badges, badgeArt, slugFor } from "../lib/service-badges";

// Every service page with a `badge:` frontmatter must resolve to drawn art,
// and every badge-slugged page must have a registry entry.
test("every service page has a badge", () => {
  const missing: string[] = [];
  for (const p of allPages()) {
    if (!p.badge) continue; // non-service pages legitimately have none
    if (!badgeArt(p.badge)) missing.push(`${p.url} (badge: ${p.badge})`);
  }
  expect(missing).toEqual([]);
});

test("related-service card titles resolve to badges", () => {
  for (const p of allPages()) {
    if (!p.badge) continue;
    const slug = p.url.split("/").filter(Boolean).pop()!;
    // URL slug must resolve to a badge for card rendering
    const resolved = slugFor(slug) ?? slugFor(p.title.split("|")[0]);
    expect(resolved, `${p.url} does not resolve to a badge`).toBeTruthy();
  }
});
