#!/usr/bin/env node
// Crawl every internal link from the homepage and report non-200s.
// Usage: BASE=http://localhost:3000 node scripts/link-crawl.mjs
const BASE = process.env.BASE ?? "http://localhost:3105";
const seen = new Set();
const queue = ["/"];
const broken = [];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  let html = "", status = 0;
  try {
    const res = await fetch(BASE + path, { redirect: "follow" });
    status = res.status;
    if (res.headers.get("content-type")?.includes("html")) html = await res.text();
  } catch (e) {
    status = 0;
  }
  if (status !== 200) broken.push(`${status}  ${path}`);
  for (const m of html.matchAll(/href="([^"#]+)"/g)) {
    const href = m[1];
    if (!href.startsWith("/") || href.startsWith("/_next") || href.startsWith("/icons") || href.startsWith("/images") || /\.(png|jpg|webp|svg|ico|txt|xml|webmanifest|woff2?)$/.test(href)) continue;
    if (!seen.has(href)) queue.push(href);
  }
}
console.log(`crawled ${seen.size} routes from ${BASE}`);
broken.length ? (console.log("BROKEN:\n" + broken.join("\n")), process.exit(1)) : console.log("all 200 OK");
