# Phase 7: desktop and mobile polish, performance

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/docs/agency-standards.md`
- `resources/reference/main-pages/README.md`
- `resources/reference/main-pages/shell.css`
- `resources/reference/main-pages/pages.css`
- `resources/reference/home-hero/index.html`
- `resources/reference/home-sections/index.html`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-7` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

1. Review every template at 390 and 1440 against `main-pages/` (side by side, page for page), the plan and the other references (agency-standards Part 5 review procedure). Fix spacing rhythm, type wrapping (no orphans in headings), image crops, card alignment, hover and focus states, motion timing.
2. Mobile rules (agency-standards 4.8 with the plan's overrides): sections with more than 3 items become self-moving swipe carousels; no non-hero section taller than 1.3 times the viewport; home under 11,000px at 390.
3. Performance: check the JS budget (under 120 KB gzipped on home), image sizes, font loading, no `content-visibility` above the fold, no layout shift from the header or cookie banner.
4. Reduced-motion pass: every animated component checked with reduced motion on.
5. Write `public/images/_todo.md` up to date.

Acceptance: before and after screenshots for every change; Lighthouse medians (mobile, 5 runs) for home and 3 inner pages meeting plan section 11.

## Report
- What was built, by part; deviations and why
- Screenshots: before and after at 390 and 1440 for each fix; the Lighthouse table
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 8.
