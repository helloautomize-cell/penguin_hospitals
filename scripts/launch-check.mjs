#!/usr/bin/env node
// launch-check: list every [CONFIRM] marker by file and line; exit 1 if any remain.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dirs = [
  path.join(root, "resources", "content", "pages"),
  path.join(root, "resources", "content", "posts"),
];
const files = [
  ...dirs.flatMap((d) => readdirSync(d).map((f) => path.join(d, f))),
  path.join(root, "lib", "site-config.ts"),
  path.join(root, "lib", "doctors.ts"),
  path.join(root, "public", "images", "_todo.md"),
];
let total = 0;
for (const f of files) {
  const rel = path.relative(root, f);
  const hidden = /hidden:\s*true/.test(readFileSync(f, "utf8").split("---")[1] ?? "");
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (/\[CONFIRM|\bCONFIRM\b|placeholder/i.test(line) && !line.trim().startsWith("//")) {
      console.log(`${hidden ? "[hidden]" : ""}  ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      total += hidden ? 0 : 1;
    }
  });
}
console.log(`\n${total} markers on visible pages.`);
process.exit(total ? 1 : 0);
