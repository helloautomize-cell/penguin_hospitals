# Phase 2: global shell

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/docs/site-plan.md`
- `resources/content/00-plan.md`
- `resources/reference/main-pages/README.md`
- `resources/reference/main-pages/shell.css`
- `resources/reference/main-pages/pages.css`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-2` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

Build the global shell exactly as in `main-pages/` (header pill, mega menus, mobile sheet, footer, mobile action bar, WhatsApp button; port `shell.css`), following plan section 3, on every route, with a temporary placeholder page for each URL in `site-plan.md` (H1 only) so navigation can be tested.

1. `lib/nav.ts` from site-plan section 8. Hidden pages are never in it.
2. Utility bar (desktop), pill header (glass on dark over a dark hero, solid white after; a `data-header-theme` attribute set per page), Radix mega menu with explicit grid widths per panel and doctor mini cards, full-screen mobile menu with accordions.
3. Mobile action bar (Book, Call sheet, WhatsApp with `lib/whatsapp.ts` prefill), hidden while a form field has focus and on `/thank-you/`. Floating WhatsApp on desktop.
4. Footer exactly as the plan (night, NAP once, hours, link columns, legal, PCPNDT line, © line, Cookie settings). Mobile accordions.
5. Cookie banner and `lib/consent.ts` (essential vs analytics, stored choice, `useSyncExternalStore` with a cached snapshot). No analytics yet; just the store and the UI.
6. Breadcrumbs component with BreadcrumbList JSON-LD.
7. Redirect map from site-plan section 9 in `next.config.ts`, with `trailingSlash: true`.
8. Playwright: no nested interactives on all routes; mega menu panels inside the viewport at 1024 and 1440 with no overlapping links; mobile menu opens, traps focus, closes with Esc; every redirect returns 301 or 308 to the right URL; no overflow at 360, 390, 768, 1024, 1440.

Acceptance: header, open mega menus, mobile sheet and footer match `main-pages/` side by side at 1440 and 390; keyboard-only walk through the header and menus works; Lighthouse accessibility 100 on two placeholder pages.

## Report
- What was built, by part; deviations and why
- Screenshots: header and open mega menus at 1440; header, open mobile menu, call sheet and footer at 390
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 3.
