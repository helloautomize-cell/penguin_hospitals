// Route check for TreatmentHero wiring.
// Loads every route in lib/treatment-heroes.ts and asserts the hero <img>
// src/srcset references /images/services/<mapped file>. Unmapped treatment
// pages must render the badge-tile fallback instead of a photo.
// Run the dev server first (hidden pages render there), then:
//   node scripts/check-treatment-heroes.mjs [baseUrl]
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";

const src = readFileSync(path.join(root, "lib", "treatment-heroes.ts"), "utf8");
const entries = [
  ...src.matchAll(/'(\/[^']*\/)':\s*\{\s*file:\s*'([^']+)'[^}]*variant:\s*'(\w+)'/g),
].map((m) => ({ route: m[1], file: m[2], variant: m[3] }));

// Treatment pages deliberately absent from the map (badge fallback).
const FALLBACK = [
  "/medical-termination-of-pregnancy/",
  "/lab-and-scans/",
  "/nutrition-and-physiotherapy/",
];

// hidden:true pages intentionally 404 in prod (page.tsx) but render in dev.
function isHiddenPage(route) {
  const md = path.join(root, "resources", "content", "pages", route.replace(/\//g, "") + ".md");
  return existsSync(md) && /^hidden:\s*true/m.test(readFileSync(md, "utf8"));
}

function heroImgTag(html) {
  const i = html.search(/thero-ph|class="win"/);
  if (i < 0) return "";
  const m = html.slice(i, i + 20000).match(/<img[^>]+>/);
  return m ? m[0] : "";
}

let fail = 0;
console.log(`Checking ${entries.length} mapped routes + ${FALLBACK.length} fallback routes on ${BASE}\n`);

for (const e of entries) {
  let status, tag = "";
  try {
    const res = await fetch(BASE + e.route);
    status = res.status;
    tag = heroImgTag(await res.text());
  } catch (err) {
    status = `ERR ${err.message}`;
  }
  const decoded = tag.replace(/%2F/gi, "/");
  if (status === 404 && isHiddenPage(e.route)) {
    console.log(`PASS ${e.route.padEnd(38)} ${e.file} (${e.variant}) — hidden page, 404 in prod by design`);
    continue;
  }
  const ok = status === 200 && decoded.includes(`/images/services/${e.file}`);
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"} ${e.route.padEnd(38)} ${e.file} (${e.variant})`);
  if (!ok) console.log(`     status=${status} img=${tag.slice(0, 160) || "none"}`);
}

console.log("");
for (const r of FALLBACK) {
  let status, html = "";
  try {
    const res = await fetch(BASE + r);
    status = res.status;
    html = await res.text();
  } catch (err) {
    status = `ERR ${err.message}`;
  }
  const heroSeg = html.split('class="thero"')[1]?.split("</section>")[0] ?? "";
  let decoded = heroSeg;
  try {
    decoded = decodeURIComponent(heroSeg);
  } catch {}
  if (status === 404 && isHiddenPage(r)) {
    console.log(`PASS ${r.padEnd(38)} badge fallback — hidden page, 404 in prod by design`);
    continue;
  }
  const ok = status === 200 && html.includes("thero-tile") && !decoded.includes("/images/services/");
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"} ${r.padEnd(38)} badge fallback (thero-tile)`);
  if (!ok) console.log(`     status=${status} tile=${html.includes("thero-tile")} servicesImgInHero=${decoded.includes("/images/services/")}`);
}

console.log(`\n${fail === 0 ? "ALL PASS" : fail + " FAILURE(S)"} — ${entries.length + FALLBACK.length} routes checked`);
process.exit(fail ? 1 : 0);
