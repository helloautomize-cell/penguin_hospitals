import React from "react";
import Link from "next/link";
import { ConfirmChip } from "@/components/Tag";

/*
  Lightweight renderer for the house markdown dialect:
  ###/##/#### headings (with ids for the ToC), paragraphs, **bold**, *italic*,
  - and 1. lists, links [text](href), [CONFIRM] / [CONFIRM: x] chips.
  No raw HTML is ever emitted.
*/

export type Section = { id: string; level: number; title: string };

function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/\[confirm[^\]]*\]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function inline(text: string, keyBase = 0): React.ReactNode[] {
  // split on links and CONFIRM markers first, then emphasis inside chunks
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\[CONFIRM[^\]]*\])/g);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      const cls = "text-blue underline underline-offset-2";
      return href.startsWith("/") ? (
        <Link key={key} href={href} className={cls}>{link[1]}</Link>
      ) : (
        <a key={key} href={href} className={cls}>{link[1]}</a>
      );
    }
    const conf = part.match(/^\[CONFIRM(?::\s*([^\]]+))?\]$/);
    if (conf) return <ConfirmChip key={key} note={conf[1]?.trim()} />;
    // emphasis **b** then *i*
    const segs = part.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return segs.map((s, j) => {
      if (s.startsWith("**")) return <b key={`${key}-${j}`} className="font-semibold text-ink">{s.slice(2, -2)}</b>;
      if (s.startsWith("*") && s.endsWith("*") && s.length > 2)
        return <em key={`${key}-${j}`}>{s.slice(1, -1)}</em>;
      return <React.Fragment key={`${key}-${j}`}>{s}</React.Fragment>;
    });
  });
}

export function renderMarkdown(body: string): { nodes: React.ReactNode[]; sections: Section[] } {
  const lines = body.split("\n");
  const nodes: React.ReactNode[] = [];
  const sections: Section[] = [];
  let key = 0;
  let lastLevel = 1;
  let para: string[] = [];
  let list: string[] | null = null;
  let listOrdered = false;

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ");
    if (/^\*\*H1:/.test(text)) return; // H1 comes from the template, not the body
    if (/^\[(Reviewer box|CTA band)[^\]]*\]$/i.test(text)) {
      para = [];
      return; // rendered by the template
    }
    nodes.push(
      <p key={key++} className="t-body text-ink-2">
        {inline(text.replace(/^\*\*H1:\s*/, ""))}
      </p>,
    );
    para = [];
  };
  const flushList = () => {
    if (!list || !list.length) {
      list = null;
      return;
    }
    const items = list;
    nodes.push(
      listOrdered ? (
        <ol key={key++} className="grid list-decimal gap-2 pl-6 text-[17px] text-ink-2 marker:text-blue">
          {items.map((i, k) => <li key={k}>{inline(i, k)}</li>)}
        </ol>
      ) : (
        <ul key={key++} className="grid gap-2 text-[17px] text-ink-2">
          {items.map((i, k) => (
            <li key={k} className="flex gap-2.5">
              <span aria-hidden className="mt-[11px] size-1.5 flex-none rounded-full bg-coral" />
              <span>{inline(i, k)}</span>
            </li>
          ))}
        </ul>
      ),
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const h = line.match(/^(#{2,4})\s+(.+)/);
    if (h) {
      flushPara();
      flushList();
      const rawLevel = h[1].length;
      const level = Math.min(rawLevel, lastLevel + 1);
      lastLevel = level;
      const title = h[2].replace(/\*\*/g, "").replace(/\[CONFIRM[^\]]*\]/g, "").trim();
      const id = slugify(title);
      if (level <= 3) sections.push({ id, level, title });
      const confirm = h[2].match(/\[CONFIRM[^\]]*\]/)?.[0];
      nodes.push(
        React.createElement(`h${Math.min(level, 4)}`, {
          key: key++,
          id,
          className:
            level === 2
              ? "t-h2-inner mt-12 mb-4 text-navy scroll-mt-28"
              : level === 3
                ? "t-h3 mt-8 mb-3 text-navy scroll-mt-28"
                : "text-[18px] font-semibold mt-6 mb-2 text-navy scroll-mt-28",
        }, [
          inline(h[2].replace(/\*\*/g, ""), 0),
          confirm ? <ConfirmChip key="c" note={confirm.replace(/[\[\]]/g, "").replace("CONFIRM:", "").replace("CONFIRM", "").trim() || undefined} /> : null,
        ]),
      );
      continue;
    }
    if (/^\s*$/.test(line)) {
      flushPara();
      flushList();
      continue;
    }
    const ul = line.match(/^\s*-\s+(.+)/);
    const ol = line.match(/^\s*\d+\.\s+(.+)/);
    if (ul || ol) {
      flushPara();
      const ordered = !!ol;
      if (!list || listOrdered !== ordered) flushList();
      listOrdered = ordered;
      (list ??= []).push((ul ?? ol)![1]);
      continue;
    }
    if (line.startsWith("<!--")) continue;
    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();
  return { nodes, sections };
}

/* ---------- structured block renderer (approved preview templates) ---------- */

export type Block =
  | { kind: "h2"; id: string; title: string; confirm?: string }
  | { kind: "h3"; title: string }
  | { kind: "p"; nodes: React.ReactNode[] }
  | { kind: "ul"; items: React.ReactNode[][] }
  | { kind: "ol"; items: React.ReactNode[][] }
  | { kind: "tri"; rows: { b: string; p: string }[] }
  | { kind: "callem"; nodes: React.ReactNode[] }
  | { kind: "pcp" }
  | { kind: "cards"; group: string | null; cards: { title: string; text: string; href?: string }[] }
  | { kind: "steps"; steps: { title: string; text: string }[] }
  | { kind: "facts"; items: string[] }
  | { kind: "chips"; items: string[] }
  | { kind: "tl"; items: string[] }
  | { kind: "faq"; items: { q: string; a: string }[] }
  | { kind: "rooms" }
  | { kind: "confirm"; text: string }
  | { kind: "marker"; name: string };

const slug = (t: string) =>
  t.toLowerCase().replace(/\[confirm[^\]]*\]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const EMERGENCY = /call 108|108 or 112|emergency entrance|straight away/i;
const PCPNDT = /sex determination|PCPNDT/i;
const LINK_SLUGS: Record<string, string> = {};

export function pageUrl(title: string): string | undefined {
  return LINK_SLUGS[title.toLowerCase().trim()];
}
export function registerSlug(title: string, url: string) {
  LINK_SLUGS[title.toLowerCase().trim()] = url;
}

/** Parse the content-file dialect into typed blocks for the preview templates. */
export function renderBlocks(body: string): {
  intro: string;
  blocks: Block[];
  faqs: { q: string; a: string }[];
  h1: string;
} {
  const lines = body.split("\n").map((l) => l.trimEnd());
  let h1 = "";
  let intro = "";
  const blocks: Block[] = [];
  const faqs: { q: string; a: string }[] = [];
  let curUl: string[] | null = null;
  let curOl: { title: string; text: string }[] | null = null;
  let curTri: { b: string; p: string }[] | null = null;
  let inFaq = false;
  let hint: string | null = null;
  let curCards: { title: string; text: string }[] | null = null;
  let curSteps: { title: string; text: string }[] | null = null;
  let grpLabel: string | null = null;

  const flush = () => {
    if (curTri?.length) blocks.push({ kind: "tri", rows: curTri });
    curTri = null;
    if (curCards?.length) blocks.push({ kind: "cards", group: grpLabel, cards: curCards });
    curCards = null;
    if (curSteps?.length) blocks.push({ kind: "steps", steps: curSteps });
    curSteps = null;
    if (curUl?.length) {
      if (hint && /chips/i.test(hint))
        blocks.push({ kind: "chips", items: curUl.map((i) => i.replace(/\*\*/g, "")) });
      else blocks.push({ kind: "ul", items: curUl.map((i) => inline(i)) });
    }
    curUl = null;
    if (curOl?.length) {
      if (hint && /step tracker|steps/i.test(hint))
        blocks.push({ kind: "steps", steps: curOl });
      else blocks.push({ kind: "ol", items: curOl.map((i) => inline(i.text)) });
    }
    curOl = null;
    hint = null;
    grpLabel = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("<!--") || line === "---") continue;

    const h1m = line.match(/^\*\*H1:\s*(.+?)\*\*$/);
    if (h1m) {
      h1 = h1m[1];
      continue;
    }
    const hm = line.match(/^###\s+(.+)/);
    if (hm) {
      flush();
      const rawTitle = hm[1].replace(/\*\*/g, "").replace(/\[CONFIRM[^\]]*\]/g, "").trim();
      const hintM = rawTitle.match(/\(([^)]*)\)\s*$/);
      const title = rawTitle.replace(/\s*\([^)]*\)\s*$/, "").trim();
      inFaq = /^FAQs?$/i.test(title);
      if (inFaq) continue;
      hint = hintM ? hintM[1] : null;
      if (hint && /glass cards/i.test(hint)) {
        grpLabel = title;
        curCards = [];
        hint = null;
        continue;
      }
      if (hint && /step tracker|steps|timeline/i.test(hint)) {
        curSteps = [];
        if (/timeline/i.test(hint)) curSteps.push({ title: "__tl__", text: "" });
        continue;
      }
      if (/facts strip/i.test(rawTitle)) {
        blocks.push({ kind: "h2", id: slug(title), title });
        continue;
      }
      blocks.push({ kind: "h2", id: slug(title), title });
      continue;
    }
    if (inFaq) {
      const fm = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)$/);
      if (fm) {
        faqs.push({ q: fm[1].replace(/\*\*/g, "").trim(), a: fm[2].trim() });
        continue;
      }
      if (faqs.length && !line.startsWith("[")) continue;
    }

    const marker = line.match(/^\[([^\]]+)\](?:\s*\[([^\]]+)\])?(?:\s*\[([^\]]+)\])?$/);
    if (marker) {
      flush();
      [marker[1], marker[2], marker[3]]
        .filter(Boolean)
        .forEach((m) => {
          const c = m!.match(/^CONFIRM[::]\s*(.+)$/i) || m!.match(/^CONFIRM$/i);
          blocks.push(c ? { kind: "confirm", text: c[1] ?? "" } : { kind: "marker", name: m! });
        });
      continue;
    }
    if (/^Photos?:/i.test(line)) {
      flush();
      blocks.push({ kind: "rooms" });
      continue;
    }

    const factsHead = /^Facts strip$/i.test(line);
    if (factsHead) {
      flush();
      continue;
    }
    if (/·/.test(line) && blocks[blocks.length - 1]?.kind === "h2") {
      flush();
      blocks.push({ kind: "facts", items: line.split("·").map((s) => s.trim()).filter(Boolean) });
      continue;
    }

    const um = line.match(/^-\s+(.+)/);
    const om = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)/);
    if (um) {
      curTri = null;
      if (curCards !== null) {
        const cm = um[1].match(/^\*\*(.+?)\.?\*\*\s*(.*)$/);
        curCards.push({ title: (cm ? cm[1] : um[1]).trim(), text: (cm ? cm[2] : "").trim() });
        continue;
      }
      curUl = curUl ?? [];
      curUl.push(um[1]);
      continue;
    }
    if (om) {
      curUl = null;
      curTri = null;
      if (curSteps !== null) {
        curSteps.push({ title: om[1].trim(), text: om[2].trim() });
        continue;
      }
      curOl = curOl ?? [];
      curOl.push({ title: om[1].trim(), text: om[2].trim() });
      continue;
    }
    if (curCards !== null || curSteps !== null) {
      flush();
      hint = null;
      if (/^###/.test(line)) continue;
    }

    const tri = line.match(/^\*\*(.+?)\*\s*(.+)$/);
    const triExact = line.match(/^\*\*(.+?)\.\*\*\s*(.+)$/);
    if (triExact && !line.startsWith("**H1")) {
      if (PCPNDT.test(line)) {
        flush();
        blocks.push({ kind: "pcp" });
        continue;
      }
      if (EMERGENCY.test(line)) {
        flush();
        blocks.push({ kind: "callem", nodes: inline(line) });
        continue;
      }
      curUl = null;
      curTri = curTri ?? [];
      curTri.push({ b: triExact[1].trim(), p: triExact[2].trim() });
      continue;
    }

    if (PCPNDT.test(line) || /^Fine print:/.test(line)) {
      flush();
      blocks.push({ kind: "pcp" });
      continue;
    }
    if (EMERGENCY.test(line) && /^When to get help|^If you think/.test(line)) {
      flush();
      blocks.push({ kind: "callem", nodes: inline(line) });
      continue;
    }

    flush();
    if (!intro && !h1) intro = line;
    else if (!intro) intro = line;
    else blocks.push({ kind: "p", nodes: inline(line) });
  }
  flush();
  return { intro, blocks, faqs, h1 };
}
