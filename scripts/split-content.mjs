#!/usr/bin/env node
/*
  Splits resources/content/{01,02a,02b,03,04}-*.md into one file per page:
    resources/content/pages/<slug>.md
    resources/content/posts/<slug>.md   (pages under /health-library/)
  The yaml block after each page heading becomes the file frontmatter.
  Originals are never edited. Run: node scripts/split-content.mjs
*/
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(root, "resources", "content");
const OUT_PAGES = path.join(SRC, "pages");
const OUT_POSTS = path.join(SRC, "posts");

const FILES = ["01-core.md", "02a-women-pregnancy.md", "02b-women-gynaecology.md", "03-heart.md", "04-other-legal-utility.md"];

mkdirSync(OUT_PAGES, { recursive: true });
mkdirSync(OUT_POSTS, { recursive: true });

let written = 0;
for (const file of FILES) {
  const text = readFileSync(path.join(SRC, file), "utf8");
  const lines = text.split("\n");
  // find page starts: "## " line followed (within 4 lines) by ```yaml containing "url:"
  const starts = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith("## ")) continue;
    const window = lines.slice(i, i + 6).join("\n");
    if (/```yaml[\s\S]*?url:/.test(window)) starts.push(i);
  }
  for (let s = 0; s < starts.length; s++) {
    const start = starts[s];
    const end = s + 1 < starts.length ? starts[s + 1] : lines.length;
    const section = lines.slice(start, end);
    // heading line + yaml fence
    const heading = section[0].replace(/^##\s+\d+\.\s*|^##\s+| $/g, "").trim();
    const fenceStart = section.findIndex((l) => l.trim() === "```yaml");
    const fenceEnd = section.findIndex((l, i) => i > fenceStart && l.trim() === "```");
    if (fenceStart < 0 || fenceEnd < 0) continue;
    const yaml = section.slice(fenceStart + 1, fenceEnd).join("\n").trim();
    const urlMatch = yaml.match(/^url:\s*(\S+)/m);
    if (!urlMatch) continue;
    const url = urlMatch[1];
    let body = section.slice(fenceEnd + 1).join("\n").trim();
    const slug = url.replace(/^\/+|\/+$/g, "") || "home";
    const isPost = url.startsWith("/health-library/") && url !== "/health-library/";

    // nested "### Launch post" blocks inside a page -> posts/
    const postRe = /###\s+Launch post[^\n]*\n+```yaml\n([\s\S]*?)```\n([\s\S]*?)(?=\n###\s+Launch post|\n##\s|$)/g;
    body = body.replace(postRe, (whole, pyaml, pbody) => {
      const purl = pyaml.match(/^url:\s*(\S+)/m)?.[1];
      if (!purl) return whole;
      const pname = purl.split("/").filter(Boolean).pop();
      writeFileSync(
        path.join(OUT_POSTS, `${pname}.md`),
        `---\n${pyaml.trim()}\n---\n\n${pbody.trim()}\n`,
        "utf8",
      );
      written++;
      console.log(`post  ${purl} -> ${pname}.md`);
      return "\n";
    });

    const name = isPost ? slug.split("/").pop() : slug.replace(/\//g, "__");
    const outDir = isPost ? OUT_POSTS : OUT_PAGES;
    const doc = `---\n${yaml}\n---\n\n<!-- ${heading} -->\n\n${body}\n`;
    writeFileSync(path.join(outDir, `${name}.md`), doc, "utf8");
    written++;
    console.log(`${isPost ? "post" : "page"}  ${url} -> ${name}.md`);
  }
}
console.log(`\nWrote ${written} files.`);
