# Phase 4: home page

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md`
- `resources/reference/main-pages/index.html`
- `resources/reference/main-pages/README.md`
- `resources/reference/home-hero/index.html`
- `resources/reference/home-sections/index.html`
- `resources/content/01-core.md`
- `resources/content/02a-women-pregnancy.md`
- `resources/images/_source/ai-photos/hero-mother-newborn.jpg`
- `resources/images/_source/ai-photos/heart-walk.jpg`
- `resources/images/_source/ai-photos/night-corridor.jpg`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-4` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` (the agent brief) in full. In short: Figtree only (Instrument Serif for numerals and margin notes, Devanagari for the greeting); plan tokens only; one gradient surface per viewport; body 17px, tap targets 48px, contrast 4.5:1; reduced motion everywhere with pause controls; words only from `resources/content/`; no testimonials, ratings, "best", counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip; never remove `hidden: true`; images only from `resources/images/_source/`; no copying any other website.

Build the home page exactly as plan section 5, sections 5.1 to 5.9, in that order. `main-pages/index.html` is the approved home page (hero, photo cards and all sections already combined): match it exactly, porting its inline CSS and rebuilding its scripts as client components; `01-core.md` section 1 is the copy.

1. `HeroFilm` (5.1): three chapters, crossfade plus Ken Burns, 7s each, reel tabs with progress, pause button, live IST card with a server fallback, scroll inset to 36px radius, mobile layout, reduced motion path. The first frame is the LCP image with priority; frames 2 and 3 load after first paint.
2. Photo cards (5.2), replacing the reference's `#doors` section.
3. `ChapterStory` (5.3): pinned horizontal story at 1024px and up; stacked under 900px and under reduced motion. Lifeline path and counter.
4. `WeekDial` and `DueDateCalculator` (5.4) with `lib/pregnancy-weeks.ts` (weeks 4 to 40, size, what happens at Penguin Hospital, what you might feel; general and true, from `02a-women-pregnancy.md`). Accessible slider semantics.
5. `HeartMap` (5.5) with 5 hotspots and a matching button list.
6. Doctors (5.6), Visit with `HoursDial` (5.7), ChatFaq (5.8), closing band (5.9).
7. Home JSON-LD: Hospital with MedicalClinic departments, FAQPage for the 4 questions.
8. Playwright: hero auto-advances and pauses; reduced motion shows chapter 1 with no transform; dial keyboard control; calculator gives the right due date for 3 fixed LMP dates and rejects a future date; heart map buttons; hours with mocked IST (Sunday 3 pm closed, Sunday 5 pm open); no overflow at 360 to 1440; home height at 390 under 11,000px.
9. Lighthouse mobile, median of 5: LCP under 2.0s, CLS under 0.05, Performance 90 or more, Accessibility 100.

Acceptance: side-by-side screenshots of each section next to the reference at 1440 and 390, with any differences explained.

## Report
- What was built, by part; deviations and why
- Screenshots: full home page at 390 and 1440, plus each section next to the reference
- Tests run and results; Lighthouse medians where asked
- `[CONFIRM]` count and the list of placeholders used
- Remaining issues

STOP after this. Do not start Phase 5.
