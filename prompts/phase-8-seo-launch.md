# Phase 8: SEO, schema, GEO and AEO pass, launch readiness

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/docs/agency-standards.md`
- `resources/docs/site-plan.md`
- `resources/docs/current-website-audit.md`
- `resources/content/05-confirm-and-doctor-questionnaire.md`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-8` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

1. Run the full Part 8 checklist in agency-standards and fix every item that can be fixed in code: metadata, canonicals, sitemap (no hidden pages, no styleguide), robots, `llms.txt`, Open Graph images, all JSON-LD validated, internal links, image alt text, heading structure, answer-first openings present, reviewer boxes, dates.
2. Check every redirect in site-plan section 9 against the old URLs in the audit.
3. `npm run launch-check` output, grouped as: blocks launch (★ items), content placeholders, image placeholders, environment variables.
4. A launch runbook in `docs/LAUNCH.md`: DNS steps, Resend domain records (SPF, DKIM, DMARC, never touch MX), Vercel production settings, Google Search Console and Business Profile steps, and the rollback plan.

Acceptance: Rich Results test passes for home, one service page, one doctor page, one post; `launch-check` output attached.

## Report
- What was built, by part; deviations and why
- Screenshots: none needed beyond the Rich Results results; attach the launch-check output and the Part 8 table with Done, At launch or Clinic for each item
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start the launch itself. The agency decides when to go live.
