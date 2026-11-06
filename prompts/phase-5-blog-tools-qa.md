# Phase 5: health library, week-by-week tool page, preview QA

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/content/04-other-legal-utility.md`
- `resources/content/02a-women-pregnancy.md`
- `resources/content/01-core.md`
- `resources/reference/main-pages/README.md`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-5` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

0. Match `main-pages/health-library.html`, `signs-of-labour.html`, `pregnancy-week-by-week.html` and `faqs.html` exactly (port `pages.css`).
1. Health library list (category chips, newest first) and the blog post template (plan section 4). Designed covers: soft gradient plus the post's badge placeholder, never photos with text.
2. The 2 launch posts from `04-other-legal-utility.md`, with Article and FAQPage JSON-LD, author and reviewer.
3. `/pregnancy-week-by-week/`: full-size WeekDial and calculator, the week-by-week table for weeks 4 to 40 as real HTML grouped by trimester, `?week=` param, PCPNDT line, FAQ.
4. `/faqs/`: all FAQs grouped, FAQPage JSON-LD.
5. QA pass across every route at 360, 390, 768, 1024, 1440: overflow, broken links, empty states, contrast on photos, focus order, heading order (one H1). Fix what you find.
6. Production-like preview with hidden pages returning 404.

Acceptance: link checker clean; all Playwright tests green; Lighthouse inner pages Performance 95 or more, Accessibility, Best practices and SEO 100.

## Report
- What was built, by part; deviations and why
- Screenshots: `/health-library/`, one post, `/pregnancy-week-by-week/`, `/faqs/` at 390 and 1440; a table of QA issues found and fixed
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 6.
