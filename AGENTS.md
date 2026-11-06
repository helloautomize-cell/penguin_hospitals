# Agent brief: Penguin Hospital website

Standing instructions for the coding agent. Copy this file to the repo root as `CLAUDE.md` (and `AGENTS.md` for other agents). Every phase prompt assumes you have read it.

## The project

New website for **Dr. Lakshmi's Penguin Hospital**, Chinchwad Gaon, Pimpri-Chinchwad, Pune. Built by Automize Media. 53 pages and 2 launch blog posts, Next.js on Vercel.

## Read first, in this order

1. `resources/docs/design-development-plan.md` (section 0 overrides everything)
2. `resources/reference/main-pages/README.md`, then serve `resources/reference/main-pages/` and open all 14 pages at 1440 and 390 wide (or read `main-pages/screenshots/`). **This preview is the approved look of the whole site. What you build must match it.** Port its CSS values exactly and rebuild its markup as React components. `home-hero/` and `home-sections/` are the earlier home references; `main-pages/index.html` already combines them.
3. `resources/docs/site-plan.md`
4. `resources/content/00-plan.md`, then the content file for the pages in your current phase
5. `resources/docs/agency-standards.md`
6. `resources/docs/IMAGE-GUIDE.md` and `resources/images/_source/README.md`

Background only (do not build from): `resources/docs/current-website-audit.md`, `resources/docs/client-answers.md`.

## How you work

- One phase at a time. Each phase prompt lists the paths it needs. Confirm they exist first. If one is missing, STOP and say so. Never substitute another file.
- Branch per phase (`phase-1`, `phase-2`, ...). Push, deploy a Vercel preview, report. Never merge to `main` until the agency approves.
- End every phase with the report in the prompt footer, then STOP. Do not start the next phase.
- Never touch `resources/` except where a phase prompt says to (Phase 3 splits content into `resources/content/pages/`).
- When something is unclear, choose the option that matches the references and the content, note it under "Deviations" in the report, and keep going. Ask only when a choice would change the design or the content.

## Non-negotiables (repeat in every phase)

**Design**
- Match `resources/reference/main-pages/` page for page. Every phase report includes side-by-side screenshots against `main-pages/screenshots/`. Do not redesign.
- Fonts: Figtree for everything. Instrument Serif only for numerals and margin notes. Noto Sans Devanagari only for the hero greeting. No italic serif accent words in headings.
- Tokens exactly as in plan section 2. Ink is never pure black. Coral is never body text on white. Red only for emergency and the logo.
- At most one gradient surface per viewport.
- No marquee, no HeroFan, no ivory backgrounds, no eyebrow-with-a-line, no taped notes or polaroids, no bobbing chips, no spinning seals, no waterfall photo columns.
- Never copy or imitate any other website. Do not browse other hospital or clinic sites for ideas.

**Accessibility and motion**
- Body text at least 17px. Tap targets at least 48px. Contrast at least 4.5:1, including text on photos.
- Every animation respects `prefers-reduced-motion`. Every auto-moving thing has a pause control.
- Works without JS for reading and for forms.

**Copy and compliance (Indian medical advertising law)**
- Words come from `resources/content/`. Do not write new marketing copy. UI microcopy you add follows `00-plan.md` 0.3.
- No testimonials, review quotes, star ratings, "best", "top", "leading", success rates, patient or surgery counts, prices, cure claims, drug or brand names, equipment model names, before and after images.
- No em or en dashes in any UI copy. Ranges use "to".
- PCPNDT line on every pregnancy and scan page and in the footer: "Sex determination of the foetus is a crime under the PCPNDT Act. We do not disclose the sex of the baby."
- Emergency line: "Medical emergency? Call 108 or 112".
- `[CONFIRM]` markers stay visible as yellow chips in development and fail `npm run launch-check`. Never invent a fact to remove one.
- Never remove a `hidden: true` flag.

**Images**
- Only images from `resources/images/_source/`. Never download stock photos or images from the web. Never generate or alter faces.
- The old doctor desk photos are reference only and never ship.

**Engineering**
- Next.js App Router, TypeScript strict, Tailwind v4, Radix, Embla, `next/font`, `next/image`, sharp, Zod, remark and rehype, Resend via Server Actions, Playwright. Vercel region `bom1`.
- No Framer Motion, GSAP or Lenis. CSS, `IntersectionObserver` and `requestAnimationFrame` only.
- No link inside a link (stretched-link pattern). `trailingSlash: true`.
- No database. No third-party scripts before cookie consent.

## Report format (end of every phase)

```
## Report
- What was built, by part; deviations and why
- Screenshots: the list in the phase prompt, at 390 and 1440 wide
- Tests run and results; Lighthouse medians where asked
- [CONFIRM] count and the list of placeholders used
- Remaining issues
```
Then STOP.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
