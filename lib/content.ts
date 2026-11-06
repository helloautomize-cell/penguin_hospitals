import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const PAGES_DIR = path.join(process.cwd(), "resources", "content", "pages");
const POSTS_DIR = path.join(process.cwd(), "resources", "content", "posts");

export const frontmatterSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().max(300).optional(),
  reviewer: z.string().nullable().optional(),
  badge: z.string().optional(),
  related: z.array(z.string()).optional(),
  hidden: z.boolean().optional(),
  lastReviewed: z.string().optional(),
  author: z.string().optional(),
  published: z.string().optional(),
  category: z.string().optional(),
  readingTime: z.string().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type PageDoc = Frontmatter & { body: string; file: string };

function parse(file: string, dir: string): PageDoc {
  const raw = readFileSync(path.join(dir, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No frontmatter in ${file}`);
  const yaml: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v: unknown = kv[2].trim();
    if (v === "true") v = true;
    else if (v === "false") v = false;
    else if (v === "null" || v === "") v = null;
    else if (kv[1] === "related" && /^\[.*\]$/.test(v as string))
      v = (v as string).slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    yaml[kv[1]] = v;
  }
  const fm = frontmatterSchema.parse(yaml);
  return { ...fm, body: m[2].trim(), file };
}

let cache: PageDoc[] | null = null;
export function allPages(): PageDoc[] {
  if (!cache) {
    cache = readdirSync(PAGES_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => parse(f, PAGES_DIR));
  }
  return cache;
}

export function getPage(url: string): PageDoc | undefined {
  const norm = url.endsWith("/") ? url : url + "/";
  return allPages().find((p) => p.url === norm);
}

export function allPosts(): PageDoc[] {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f, POSTS_DIR));
}

/** Template dispatch by URL (plan section 4). */
export function templateFor(url: string): string {
  const u = url.replace(/\/+$/, "");
  if (u === "/obstetrics-gynaecology" || u === "/heart-and-vascular-surgery") return "hub";
  if (u === "/doctors") return "doctors-v2";
  if (u.startsWith("/doctors/")) return "doctor";
  if (u === "/book" || u === "/contact") return "form";
  if (u === "/emergency") return "emergency";
  if (
    ["/privacy-policy", "/terms", "/medical-disclaimer", "/editorial-policy", "/patient-rights", "/appointment-policy", "/accessibility"].includes(u)
  )
    return "legal";
  if (u === "/thank-you") return "thankyou";
  if (u === "/health-library" || u === "/services") return "hub";
  if (u === "/faqs") return "faqs";
  if (u === "/about") return "about-v2";
  if (u === "/plan-your-visit") return "visit-v2";
  if (u === "/patients-from-pcmc") return "info";
  return "service";
}
