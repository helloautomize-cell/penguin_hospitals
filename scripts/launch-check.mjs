#!/usr/bin/env node
// launch-check: grouped pre-launch gate.
//   1. Launch blockers (★ items still open in client-answers.md)
//   2. Content placeholders ([CONFIRM] markers, page + text)
//   3. Image placeholders (public/images/_todo.md)
//   4. Missing environment variables
//   5. Em/en dash check in rendered HTML + JSON-LD (.next output)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");
const out = (h) => console.log(`\n== ${h} ==`);
let fail = 0;

/* 1. Launch blockers */
out("Blocks launch (open items in client-answers.md)");
const answers = read(path.join(root, "resources/docs/client-answers.md")).split("\n");
const blockers = answers.filter((l) => /★/.test(l) && !/✅/.test(l));
if (!blockers.length) console.log("  none");
blockers.forEach((l) => console.log("  " + l.trim().slice(0, 140)));
fail += blockers.length;

/* 2. Content placeholders */
out("Content placeholders ([CONFIRM] must stay visible until the client confirms)");
const dirs = [path.join(root, "resources/content/pages"), path.join(root, "resources/content/posts")];
const files = [
  ...dirs.flatMap((d) => (existsSync(d) ? readdirSync(d).map((f) => path.join(d, f)) : [])),
  path.join(root, "lib", "site-config.ts"),
  path.join(root, "lib", "doctors.ts"),
];
let confirms = 0;
for (const f of files) {
  const rel = path.relative(root, f);
  const src = read(f);
  const hidden = /hidden:\s*true/.test(src.split("---")[1] ?? "");
  src.split("\n").forEach((line, i) => {
    if (/\[CONFIRM|\bCONFIRM\b|placeholder/i.test(line) && !line.trim().startsWith("//")) {
      console.log(`${hidden ? "  [hidden]" : "  "} ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      if (!hidden) confirms++;
    }
  });
}
console.log(`  ${confirms} markers on visible pages.`);
fail += confirms;

/* 3. Image placeholders */
out("Image placeholders");
const todo = read(path.join(root, "public", "images", "_todo.md")).split("\n");
const imgLines = todo.filter((l) => l.trim() && !l.trim().startsWith("#"));
if (!imgLines.length) console.log("  none listed");
imgLines.forEach((l) => console.log("  " + l.trim().slice(0, 120)));
fail += imgLines.length;

/* 4. Environment variables */
out("Environment variables");
const envs = [
  ["RESEND_API_KEY", "email delivery for forms"],
  ["RESEND_FROM", "verified sender address"],
  ["CLINIC_EMAIL", "form recipient inbox"],
  ["NEXT_PUBLIC_GA4_ID", "analytics after consent"],
  ["NEXT_PUBLIC_TURNSTILE_SITE_KEY", "spam protection"],
  ["TURNSTILE_SECRET_KEY", "spam protection"],
  ["SITE_INDEXABLE", 'must be "true" only at launch'],
];
let missing = 0;
for (const [k, why] of envs) {
  const set = !!process.env[k];
  if (!set) {
    console.log(`  MISSING ${k}  (${why})`);
    missing++;
  }
}
if (!missing) console.log("  all set");
fail += missing;

/* 5. Dash check on rendered output */
out("Em/en dash check (rendered HTML and JSON-LD)");
const htmlRoot = path.join(root, ".next", "server", "app");
let dashes = 0;
const scan = (dir) => {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (/\.(html|rsc|body|meta|json)$/.test(e.name)) {
      read(p).split("\n").forEach((line, i) => {
        if (/[\u2013\u2014]/.test(line)) {
          console.log(`  ${path.relative(root, p)}:${i + 1}`);
          dashes++;
        }
      });
    }
  }
};
if (!existsSync(htmlRoot)) {
  console.log("  skipped (run `next build` first)");
} else {
  scan(htmlRoot);
  console.log(dashes ? `  ${dashes} dash violations` : "  clean");
}
fail += dashes;

console.log(`\n${fail ? `LAUNCH BLOCKED: ${fail} open item(s)` : "READY TO LAUNCH"}`);
process.exit(fail ? 1 : 0);
