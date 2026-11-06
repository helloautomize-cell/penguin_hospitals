# Fix: rebuild the home sections "For mothers-to-be" and "Heart and vessels"

The agency has approved a redesign of these two home sections. Replace both completely. Leave the rest of the home page as it is.

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/reference/sections-v2/index.html` (open it in a browser at 1440 and 390 wide; drag the dial, click every heart hotspot)
- `resources/reference/sections-v2/*.png` (screenshots: `mothers-1440`, `mothers-390`, `heart-1440`, `heart-390`, `heart-zone-3/4/5`, `fruits-sheet`)

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `fix-sections-v2`. Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md`. Copy the CSS values, the SVG path data and the JS logic from the reference exactly. Do not redraw, simplify or restyle the illustrations, and do not swap in icon packs, emoji, stock images or a library. No Framer Motion and no GSAP.

## Section 1: For mothers-to-be

**What it is.** A large white card. On the left is a 40-week dial: trimester arcs, 40 ticks, week numbers, curved trimester labels, and milestone dots at weeks 8, 12, 20, 26, 32, 37 and 40. A drag knob sits on the ring, and in the centre is a hand-drawn fruit that grows with the week. On the right are a trimester chip with "Week N of 40", the headline "Baby is about the size of *a mango*" (the fruit name in Instrument Serif, coral), two cards ("At Penguin, now" in navy and "You may notice" in ice) with check and dot icons, the last-period calculator, and the fine print. Under both runs a milestone timeline: a 4 to 40 week bar shaded by trimester, a navy fill up to the current week, and 7 pins with labels that alternate above and below. The next milestone is highlighted.

**The fruits.** There are 8 SVG symbols in the reference sprite: `fr-seed` (pomegranate seed), `fr-jamun`, `fr-lemon`, `fr-guava`, `fr-mango`, `fr-papaya` (halved, with seeds generated in JS), `fr-coconut` and `fr-watermelon`, plus their gradients and clip paths. Port each symbol into its own React component in `components/fruits/`, keeping the path data and gradient stops exactly. Gradient ids must be unique per page; use `useId()` prefixes. The week ranges, fruit sizes and both lists come from the `FR` array. Move them to `lib/pregnancy-weeks.ts` unchanged.

**Behaviour.**
- Pointer drag on the dial (pointer capture; `touch-action:none` on the dial only). Arrow keys move one week, and Home and End go to weeks 4 and 40. It uses `role="slider"` with `aria-valuetext` "Week N, second trimester".
- When the fruit changes, it pops in (scale and rotate, 0.7s), and the two cards fade up (0.55s). Within a fruit's range, the fruit grows slightly each week.
- The first time the dial is 50% in view, it sweeps once from week 4 to 20 over 1.8s. It does not sweep under reduced motion or if the visitor has already touched it.
- Timeline pins are 48px buttons that set the week. Below 760px, the timeline scrolls sideways inside its own container.
- The calculator is a real `<form>` that works without JS (a server action can return the same sentence). It shows "You are about N weeks and D days. Your due date is around ...", then moves the dial.
- The right column has `aria-live="polite"`.

## Section 2: Heart and vessels (the heart map)

**What it is.** On a night background with a faint grid, a 600 x 600 anatomical heart illustration. It has ribs, two lungs with fissures, a trachea with rings, the superior vena cava, pulmonary arteries, the descending aorta, the aortic arch with three branches, the pulmonary trunk, the heart body with both auricles, coronary arteries (right, LAD with diagonals, circumflex), aortic and pulmonary valve rings, a keyhole incision and an ECG strip. Five numbered hotspots sit on top. On the right is an accordion of 5 items, each with an icon tile, a number, a title and text. Then come three "Beyond the heart" cards with small drawn icons, and two CTAs.

**Behaviour.**
- Choosing a hotspot or an accordion item sets `data-z` on the art (1 to 5). The other zones dim to 28%, and the chosen zone lights up:
  - 1: coronary arteries thicken and glow, and blood flows along them as moving dashes
  - 2: the valve rings get a coral halo
  - 3: the aorta fills with a coral gradient, and blood flows along it
  - 4: the ribs show, plus a coral incision, a dashed access line and the "SMALL SIDE CUT" label
  - 5: the lungs tint coral and breathe
- Hotspot and item states stay in sync (`aria-pressed`). Only one item is open at a time, and opening uses the grid-rows transition.
- Ambient motion: the heart beats (1.2s), the ECG trace runs, and the hotspots ping. Keep the "Pause motion" button: it pauses every animation in the art and is required by our motion rules. Under reduced motion, nothing animates and the button is hidden.
- The hotspots are real buttons (48px tap area) with an `aria-label`. The SVG is `aria-hidden`. All text lives in the accordion.

**Build notes.** `HeartMap` (client) and `HeartArt` (the SVG as a component, path data copied exactly). Keep the drawing order from the reference: vessels behind the heart, the pulmonary trunk in front of the aorta. The `beat` transform origin is `310px 350px`. Copy for the five items and the CTAs comes from `resources/content/` (the reference uses the approved wording).

## Acceptance

- At 1440 wide, both sections match `mothers-1440.png` and `heart-1440.png`. At 390 they match the two `-390` screenshots. Zone states 3, 4 and 5 match `heart-zone-*.png`. All 8 fruits match `fruits-sheet.png`.
- No horizontal page scroll from 320 to 1920 (only the timeline scrolls, inside its own container).
- Every text and background pair passes 4.5:1. Every control is at least 48px.
- The dial works with mouse, touch and keyboard, and the screen reader announces the week.
- Lighthouse mobile performance on home does not drop by more than 2 points against `main`.

## Report
- What was built; deviations and why
- Screenshots side by side with the reference (each one listed above)
- Tests run and results
- Remaining issues

STOP after this.
