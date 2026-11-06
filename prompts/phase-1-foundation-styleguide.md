# Phase 1: foundation and styleguide

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/docs/agency-standards.md`
- `resources/docs/IMAGE-GUIDE.md`
- `resources/reference/main-pages/README.md`
- `resources/reference/main-pages/shell.css`
- `resources/reference/main-pages/pages.css`
- `resources/reference/home-hero/index.html`
- `resources/reference/home-sections/index.html`
- `resources/images/_source/README.md`
- `resources/images/_source/brand/logo-penguin-hospital.png`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-1` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

Read the plan fully (section 0 overrides everything). Serve `resources/reference/main-pages/` (see its README) and open all 14 pages at 1440 and 390 wide. That preview is the approved look; your components must match it exactly.

1. Create the Next.js app (App Router, TypeScript strict, Tailwind v4, ESLint, Prettier) at the repo root, next to `resources/`, without changing anything inside `resources/`. Add `CLAUDE.md` and `AGENTS.md` (copies of the agent brief) if not already there.
2. Port every token and base style from `main-pages/shell.css` (and plan section 2) as CSS variables and a Tailwind v4 `@theme`. Load Figtree, Instrument Serif and Noto Sans Devanagari with `next/font` as the plan says (preload Figtree only).
3. Create `lib/site-config.ts` with NAP, phones, email, hours (OPD per weekday as data, marked `[CONFIRM]`), areas served, `legalLastUpdated` and a `TODO_CONFIRM` list. Values from `resources/content/00-plan.md` 0.5.
4. Write `scripts/process-images.mjs` (agency-standards 4.9) and run it: trim the logo, process real and AI photos into `public/images/` at sensible widths without upscaling, strip metadata, keep C2PA. Write `public/images/alt-text.json` and `public/images/_todo.md` (every missing image from IMAGE-GUIDE with its prompt code, every placeholder in use). Also draft an SVG redraw of the logo for approval at `public/brand/logo-draft.svg` (do not use it on pages yet).
5. Build `/styleguide` (noindex, excluded from sitemap) showing:
   - colour swatches with their contrast ratios on white and on night
   - the type scale with real headings from the content
   - all buttons (primary gradient, secondary, glass on dark, WhatsApp, emergency), BookButton, CallSheet
   - Tag, Chip, ConfirmChip, EmergencyCallout, ReviewerBox, CtaBand, PcpndtLine
   - BadgeCard (with placeholder badges), PhotoCard (with the three AI hub photos), DoctorCard (both doctors, placeholder portraits with the CONFIRM chip), DoctorMiniCard
   - Accordion, ChatFaq (the 4 home questions), StepTracker (desktop and mobile), SwipeCarousel with auto-advance and pause
   - the line-icon set in use
   - the mobile action bar in a phone frame
6. Reduced motion, focus styles (2px `--blue` ring, `--sky` on dark) and 48px targets everywhere.
7. Add Playwright with a first test: `/styleguide` has no horizontal overflow at 390 and 1440 and no console errors.

Acceptance: each styleguide component visually identical to the same block in `main-pages/` (show pairs side by side); screenshots of `/styleguide` at 390 and 1440; Lighthouse accessibility 100 on `/styleguide`; no console errors; `npm run build` passes.

## Report
- What was built, by part; deviations and why
- Screenshots: `/styleguide` full page at 390 and 1440
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 2.
