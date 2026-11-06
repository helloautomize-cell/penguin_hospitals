# Phase 6: forms, email, consent and analytics

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/docs/agency-standards.md`
- `resources/content/01-core.md`
- `resources/content/04-other-legal-utility.md`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-6` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

1. Appointment form on `/book/` and the contact form, exactly per agency-standards 9.1 (no workshop form). Doctor and reason prefilled from `lib/booking-context.ts` via `?doctor=` and `?reason=`. Time of day options from OPD hours in `lib/site-config.ts`.
2. Server Action with Zod, honeypot, 3s minimum fill time, Turnstile when keys are set. Works without JS.
3. Resend email to the clinic per 9.1 (field table, tel and wa.me links, source page, IST time, exact consent text and time). Sender domain is `[CONFIRM]`: when `RESEND_API_KEY` or the verified sender is missing, preview builds log the email and redirect to success, and production builds fail `launch-check`.
4. States: error summary with focus, failure with Call and WhatsApp and kept data, success to `/thank-you/?type=` (noindex).
5. GA4 with Consent Mode v2, loaded only after Accept; events per 9.1; no PII or health data; query strings stripped except `utm_*`. Vercel Speed Insights. Map and any video load only on click.
6. `.env.example` with every variable and a comment for each.
7. Playwright: validation, under-18 guardian rule, success and failure, honeypot, no-JS submit; zero GA, Maps or YouTube requests before consent or click.

Acceptance: one real test email received in a sandbox inbox (or the logged email in preview), all tests green.

## Report
- What was built, by part; deviations and why
- Screenshots: `/book/` empty, with errors, and `/thank-you/` at 390 and 1440; the email as received
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 7.
