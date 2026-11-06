# Fix: rebuild the home section "A life, in chapters"

The agency has approved a redesign of this one home section. Replace the current section completely. Leave the rest of the home page as it is.

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/reference/chapters-v2/index.html` (the approved section; open it in a browser and scroll through it at 1440 x 900 and at 390 wide)
- `resources/reference/chapters-v2/img/` (the cropped chapter photos)
- `resources/reference/chapters-v2/s1.png` to `s4.png` (desktop) and `m1.png`, `m4.png` (mobile)

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `fix-chapters-v2`. Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md`. Copy the CSS values, the geometry and the JS logic from the reference exactly. Do not redesign it, simplify it, or replace it with a library. No Framer Motion and no GSAP.

## What the section is

There is an intro panel with the headline and four photo bubbles that act as a chapter index. Then four chapters follow. Each chapter is **a real photo inside a precise medical instrument**, and the instrument moves as the visitor scrolls:

| Chapter | Photo | Instrument | Readout |
|---|---|---|---|
| 1. Growing up (13+) | `ch1.jpg` | A 28-day cycle dial with 4 phase arcs (Period, Follicular, Ovulation, Luteal), 28 ticks (long tick every 7th), day numbers 1, 7, 14, 21, 28 and curved phase labels | "Day 14 · Ovulation" |
| 2. Nine months (40) | `ch2.jpg` | A 40-week dial with 3 trimester arcs, 40 ticks (long tick every 4th), milestone dots at weeks 12, 20, 28 and 36, and curved trimester labels | "Week 22 · Second trimester" |
| 3. First breath (Day 1) | `ch3.jpg` | A first-hour dial: 60 minute ticks with segments for First cry, First check, Skin to skin and First feed | "Minute 29 · Skin to skin" |
| 4. The heart (Always, dark) | `ch4.jpg` | An ECG trace wrapped around the photo (9 beats). A bright coral segment with a glowing head travels around the trace as you scroll. Service labels sit around the ring | "24 hours · Every day" |

The SVG geometry is built in JS from the formulas in the reference (`pt`, `arc`, `label`, `ticks`, `segs`, `marker`, `inst.*`). Port these functions as they are into a typed `lib/chapter-instruments.ts` and render them into a `<svg viewBox="0 0 600 600">` per chapter. All the numbers are exact: centre 300, ring radius 206, ticks at 230, numbers at 256, labels at 284. Do not eyeball them. Labels on the lower half of a ring are drawn on a reversed path so they read upright. Keep that.

## Behaviour

- **Desktop (wider than 900px, motion allowed):** the section is `602vh` tall with a sticky `100svh` pin, and a 5-panel track moves sideways. Each panel **dwells** for 0.62 viewport heights while its instrument runs from 0 to 1, then **travels** for 0.48 viewport heights to the next panel with a cubic ease. Port `frame()` exactly. The counter (01 / 04) and the ECG lifeline at the bottom update from the same frame. The counter, lifeline and labels switch to their dark styles on chapter 4. The index bubbles and lifeline labels jump to the right chapter.
- **900px and narrower, or reduced motion:** there is no pin and no sideways scroll. The panels stack vertically. Each instrument counts up once when 45% of it is in view (1.6 seconds), and under reduced motion it shows its resting value straight away. Resting values: 0.48, 0.55, 0.40 and 0.60.
- All motion is scroll-driven or plays once, so no pause control is needed. Nothing moves on its own.
- One rAF-throttled passive scroll listener. No layout reads inside the loop apart from `offsetTop` and `innerHeight`.

## Build notes

- Components: `LifeChapters` (section, pin, track, counter, lifeline), `ChapterPanel`, `ChapterInstrument` (client component, `kind: 'cycle' | 'weeks' | 'hour' | 'heart'`), and `ChapterIndex`.
- The text, links and doctor line stay server-rendered real HTML (h2 for the section, h3 per chapter). The instruments, readouts and lifeline are `aria-hidden`.
- Photos: use `next/image` with the files in `resources/reference/chapters-v2/img/` (copy them to `public/images/chapters/`), `sizes="(max-width:900px) 88vw, 600px"`, lazy-loaded, circular crop through CSS.
- Copy comes from `resources/content/` where it exists. The readout and instrument labels are fixed UI microcopy (as in the reference).
- Links: Chapter 1 goes to PCOS, Heavy periods, Irregular periods and Fibroids. Chapter 2 goes to Pregnancy week by week, High-risk pregnancy and Preeclampsia. Chapter 3 goes to Normal delivery, Painless delivery and Newborn care. Chapter 4 goes to the heart hub (heart map), Keyhole heart surgery and Varicose veins.
- Remove the old section's CSS, JS and SVGs completely, including the snowman-style baby, the beanie shape and the Valentine heart overlay.

## Acceptance

- At 1440 x 900, the four chapter screenshots match `s1.png` to `s4.png`, taken at the middle of each dwell. At 390 wide, chapters 1 and 4 match `m1.png` and `m4.png`.
- No horizontal page scroll at any width from 320 to 1920. No layout shift when the section enters.
- Text on every panel passes 4.5:1. Every link is at least 48px tall.
- Lighthouse mobile performance on home does not drop by more than 2 points against `main`.

## Report
- What was built; deviations and why
- Screenshots: each chapter at 1440 x 900 (mid-dwell) and at 390, side by side with the reference
- Tests run and results
- Remaining issues

STOP after this.
