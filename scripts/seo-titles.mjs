#!/usr/bin/env node
// Exports docs/seo-titles.csv: route,title,title_len,description,description_len
// for every public route. Title shown exactly as rendered (brand suffix applied).
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const fm = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  const o = {};
  if (!m) return o;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) o[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return o;
};

const rows = [["route", "title", "title_len", "description", "description_len"]];
const warn = [];
const add = (url, title, desc) => {
  const full = title.includes("| Penguin Hospital") ? title : `${title} | Penguin Hospital`;
  rows.push([url, full, full.length, desc ?? "", (desc ?? "").length]);
  if (full.length > 60) warn.push(`TITLE >60 (${full.length}): ${url}  ${full}`);
  if (desc && desc.length > 155) warn.push(`DESC  >155 (${desc.length}): ${url}`);
};

rows.push(["/", "Penguin Hospital in Chinchwad | Together through life", 54, "Dr. Lakshmi's Penguin Hospital in Chinchwad Gaon, PCMC. Pregnancy and delivery, gynaecology and laparoscopy, and heart and vascular surgery. Emergency open day and night.", 146]);

for (const dir of ["pages", "posts"]) {
  const d = path.join(root, "resources/content", dir);
  for (const f of readdirSync(d).filter((f) => f.endsWith(".md")).sort()) {
    const meta = fm(readFileSync(path.join(d, f), "utf8"));
    if (meta.hidden === "true" || !meta.url || meta.url === "/") continue;
    add(meta.url, meta.title ?? "(missing)", meta.description);
  }
}

mkdirSync(path.join(root, "docs"), { recursive: true });
const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
writeFileSync(path.join(root, "docs", "seo-titles.csv"), csv + "\n");
console.log(`docs/seo-titles.csv: ${rows.length - 1} routes`);
warn.forEach((w) => console.log("  WARN " + w));
