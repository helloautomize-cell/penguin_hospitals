# Phase 3: content pipeline and inner page templates

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/content/00-plan.md`
- `resources/content/01-core.md`
- `resources/content/02a-women-pregnancy.md`
- `resources/content/02b-women-gynaecology.md`
- `resources/content/03-heart.md`
- `resources/content/04-other-legal-utility.md`
- `resources/content/05-confirm-and-doctor-questionnaire.md`
- `resources/docs/site-plan.md`
- `resources/reference/main-pages/README.md`
- `resources/reference/main-pages/shell.css`
- `resources/reference/main-pages/pages.css`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-3` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

1. Write `scripts/split-content.mjs` that splits the content files into `resources/content/pages/<slug>.md` (one per page, keeping frontmatter) and `resources/content/posts/<slug>.md`. Do not edit wording. Commit the split files. Keep the original files untouched.
2. Zod frontmatter schema (plan section 7). The build fails on invalid frontmatter.
3. remark and rehype rendering with components for: emergency callout, info callout, FAQ section (to Accordion plus FAQPage JSON-LD), step lists (to StepTracker), CTA band, reviewer box. Headings get ids for the table of contents.
4. `[CONFIRM]` handling: ConfirmChip in dev and preview, removed in production. `npm run launch-check` lists every remaining marker by file and line (pages, `lib/site-config.ts`, placeholder images, placeholder portraits) and exits 1 if any remain on non-hidden pages.
5. Hidden pages: rendered in dev and preview with a "Hidden page" banner, `notFound()` in production, never in nav, sitemap or related links.
6. Build these templates **to match `main-pages/` exactly** (see the page to template map in its README; port `pages.css`) and render every inner page from content: hub, service (with sticky ToC on desktop), doctor profile, doctors hub, book and contact (form UI only, no submit yet; the submit comes in Phase 6), info pages, emergency, legal (with ToC and print styles), thank-you, 404. Home and the week-by-week tool page stay placeholders.
7. `lib/service-badges.ts`, `lib/booking-context.ts`, `lib/whatsapp.ts` filled for every page.
8. Metadata per page (title, description, canonical, Open Graph) from frontmatter. JSON-LD: MedicalWebPage with reviewedBy and lastReviewed on service pages, Physician on doctor pages.
9. Playwright: every URL in site-plan returns 200 (hidden pages 404 in a production build); every pregnancy and scan page contains the PCPNDT line; the banned-words scan (`scripts/banned-words.txt` from `00-plan.md` 0.3) finds nothing in rendered HTML; every medical page has a reviewer box.

Acceptance: `/about/`, both hubs, `/pregnancy-care/`, `/doctors/dr-lakshmi-vijay-kalbande/`, `/emergency/` and `/book/` match their `main-pages/` preview side by side at 1440 and 390, with any difference explained; `npm run launch-check` runs and prints the CONFIRM list; all tests green.

## Report
- What was built, by part; deviations and why
- Screenshots: at 390 and 1440: `/obstetrics-gynaecology/`, `/high-risk-pregnancy/`, `/heart-and-vascular-surgery/`, `/keyhole-heart-surgery/`, `/doctors/dr-lakshmi-vijay-kalbande/`, `/emergency/`, `/book/`, `/privacy-policy/`
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 4.
