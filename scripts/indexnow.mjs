#!/usr/bin/env node
// IndexNow ping — run after a production deploy, at launch only.
// Usage: SITE_INDEXABLE=true node scripts/indexnow.mjs
import { readFileSync } from "node:fs";

const HOST = "https://penguinhospitals.com";
const KEY = readFileSync("public/indexnow-key.txt", "utf8").trim();
const KEY_LOCATION = `${HOST}/indexnow-key.txt`;

if (process.env.SITE_INDEXABLE !== "true") {
  console.log("SITE_INDEXABLE is not true; IndexNow is disabled until launch. Nothing sent.");
  process.exit(0);
}

const sitemap = await fetch(`${HOST}/sitemap.xml`).then((r) => r.text());
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: "penguinhospitals.com", key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
});
console.log(`IndexNow: ${res.status} for ${urls.length} URLs`);
