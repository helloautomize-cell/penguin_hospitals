# Phase 2b: icons and service badges, drawn in code (SVG)

Run this after Phase 2 (the shell exists). If the site is already further along, run it now on its own branch; it only adds components and swaps placeholders.

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `resources/docs/design-development-plan.md` (section 2 tokens, section 2.4 icons)
- `resources/docs/IMAGE-GUIDE.md` (section 5, badge subjects)
- `resources/reference/main-pages/README.md`
- `resources/reference/main-pages/pages.css` (`.badge`, `.card`, `.cover`, `.sign`)
- `resources/reference/main-pages/shell.css` (`.ico`)
- `resources/reference/main-pages/index.html` (the inline `<svg>` sprite at the top of `<body>`)

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `phase-2b`. Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` in full. Plan tokens only. No text inside any SVG. No icon libraries other than Lucide. Never copy icons or illustrations from any website, icon pack, or stock site; draw every badge yourself from the specs below.

**Decision:** the 31 service and doctor badges in IMAGE-GUIDE section 5 are no longer AI PNGs. You draw them as hand-written SVG React components. This replaces "illustrated PNGs" in plan section 2.4. Note it under Deviations.

---

## Part A. UI icons (small, functional)

1. Port every `<symbol>` from the sprite in `main-pages/index.html` into `components/icons/` as typed React components (`<Icon name="phone" />`), keeping the path data exactly. Names: `cal, phone, arrow, alert, menu, wa, pin, plus, chev, check, shield, heart, pulse, drop, baby, sun, home, cycle, seed, scope, lungs, leg, arm, wave, gauge, bump, dot, dots, clock, doc, lock, users, moon, car` plus any others present in the sprite.
2. Rendering rules, matching `.ico` in `shell.css`: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.7"`, round caps and joins, `aria-hidden="true"`, `focusable="false"`. Size by prop: 18 default, 20, 22, 24, 26, 28.
3. For any UI icon the sprite does not have, use the matching Lucide icon with `strokeWidth={1.7}` so it looks the same. Never mix in filled icons.
4. The WhatsApp glyph stays the simple outline in the sprite. Do not use the WhatsApp logo file. Do not use brand logos for anything.

## Part B. Service badges (the illustrated set)

### B1. What a badge is

A badge has two layers:

1. **The frame.** This is the existing `.badge` circle from `pages.css`: a frost radial fill with a thin conic gradient ring (blue-5, coral, navy). Build it as `<BadgeFrame size="sm|md|lg|xl">`, ported exactly from the CSS. Sizes: sm 52px (sign cards), md 64px (service cards), lg 96px (service hero), xl 160px (library covers and the dev sheet).
2. **The art** inside it. This is one SVG per service, written by you, as specified below.

`<ServiceBadge slug="pregnancy" size="md" />` renders the frame plus the art. Art size: sm 26px, md 32px, lg 52px, xl 92px.

### B2. Art drawing system (apply to every badge)

- **Grid:** `viewBox="0 0 48 48"`. Keep everything inside a 40 x 40 live area (4px margin). Optically centre the subject: round shapes may touch the live area edge; tall shapes sit 1px high.
- **Style:** a clean, continuous medical line drawing. Gentle curves, few nodes, no hatching, no shading, no gradients inside the art, and no filters. Premium and calm, never cartoonish. No faces with features: heads are plain circles or soft profile curves with no eyes, mouth or nose (except the "calm face" in epidural, which uses two closed-eye arcs only).
- **Layers and colours** (all through CSS variables so they theme on dark):
  - **Main stroke:** `stroke="var(--badge-main, #17407E)"`, width **2.25**, round caps and joins, no fill. Carries 80% of the drawing.
  - **Depth stroke:** `stroke="var(--badge-depth, #001F43)"`, width **2.25**, used for one secondary element (a tube, an instrument shaft, a ground line). Optional.
  - **Warm accent:** exactly **one** accent element per badge. Either a fill `var(--badge-accent-fill, #F9C9B6)` at full opacity behind the line work, or a stroke `var(--badge-accent, #F4978E)` at width 2.25. The accent marks the meaning: the heart, the baby, the growth, the drop, the breath.
  - **Sparkles:** one or two small plus signs (arm length 2.5 to 3, stroke 1.5, colour `var(--badge-accent)`), placed in empty corners. Never more than two, and none on the doctor badges.
- **Minimum detail:** every gap between strokes is at least 3 units, and no feature is smaller than 4 units. Test at 26px: if a detail turns to mush, remove it.
- **Medical colour rules:** drops and blood-related shapes use the coral accent, never red. `#E40913` is reserved for emergency and the logo. Nothing graphic: no wounds, no needles in skin, no blood pools, no organs cut open, no nudity. The pregnant silhouette is a modest profile outline.
- **Dark theme:** inside `.cover.c-heart`, `.night` and other dark surfaces, set `--badge-main: #8FB8EA; --badge-depth: #E8F0FA;` and keep the coral accent.
- **Code:** one file per badge in `components/badges/art/`, exported through `lib/service-badges.ts` (slug, title, component). Hand-write the paths; run SVGO (keep the viewBox, keep the CSS variables). Each art file is under 1.5 KB. Every badge root has `aria-hidden="true"`, because the card title is the accessible name.

### B3. The 31 badges

Use the slug as the file name (`art/pregnancy.tsx`). Each row gives the composition on the 48 grid and the accent element.

**Women and pregnancy**

| # | Slug | Service | Draw | Accent |
|---|---|---|---|---|
| 1 | `obg` | Obstetrics and gynaecology hub | Front view of a simplified uterus: a soft rounded inverted pear body centred at (24, 26) about 16 wide, two curved tubes sweeping up and out to small oval ovaries at about (9, 16) and (39, 16), and a short neck down to (24, 38). | A small filled heart (6 wide) inside the body at (24, 25). |
| 2 | `pregnancy` | Pregnancy care | A woman standing in side profile, facing right: a head circle (r 4) at (22, 9), the neck and back as one long curve to the hips, and the front line curving out into a round bump. A hand rests on the bump. Cut off at the knees with a soft fade (end the stroke, do not mask). | The bump filled in peach behind the line. |
| 3 | `high-risk` | High-risk pregnancy | A shield outline (rounded top corners, pointed base), 30 wide and 34 tall, centred. Inside it, a small version of the pregnancy profile (head plus bump curve only). | A peach fill inside the bump. |
| 4 | `blood-pressure` | Preeclampsia | A rounded rectangle cuff band tilted 15 degrees across the upper left, a tube curving down to a round bulb at the lower right, and a small dial circle (r 5) with one needle line on the band. | A small coral-stroke heart beside the dial. |
| 5 | `birth` | Normal delivery | A swaddled newborn lying diagonally: an oval head (r 5) at upper left, a cocoon wrap body with two diagonal fold lines, and a soft wrap edge around the face. | The wrap body filled in peach. |
| 6 | `epidural` | Painless delivery | A calm face in three-quarter view (head outline only) with two closed-eye arcs, resting on a pillow line. Below it, a gentle sine wave (two periods) across the width. | The wave in coral stroke. |
| 7 | `caesarean` | Caesarean delivery | A mother seen from above holding a baby to her chest: two arms forming an oval cradle, the baby's head circle (r 4) and a small wrapped body inside the cradle. The mother's head is a partial arc at the top. No incision. | The baby's wrap filled in peach. |
| 8 | `postnatal` | After birth | A simple house outline (pitched roof, door gap) about 28 wide. Inside it, a small mother-and-baby shape: a head circle, a shoulder curve, and a smaller head circle tucked in. | A small coral heart floating above the roof ridge. |

**Gynaecology**

| # | Slug | Service | Draw | Accent |
|---|---|---|---|---|
| 9 | `pcos` | PCOS | A single large oval ovary (22 x 16) on the left with four small circles (r 2 to 2.5) inside, spaced at least 3 apart. At the right, a small balance scale (a stand with a beam and two hanging pans). | The ovary filled in peach behind its outline. |
| 10 | `cycle` | Irregular periods | A circular calendar: an outer ring (r 15) with 8 short tick marks, and one gap in the ring with a small arrowhead, so it reads as a cycle. | A drop shape (8 tall) at the centre in coral fill. |
| 11 | `heavy-bleeding` | Heavy periods | A hot water bag (a rounded rectangle with a neck and cap, three ripple lines) tilted 10 degrees at the right, with a drop at the left. | The drop in coral fill. |
| 12 | `fibroid` | Uterine fibroids | The same uterus as `obg` (reuse its paths, scaled to 90%). | A small round growth (r 4) on the upper right wall of the uterus, in peach fill with a main-colour outline. |
| 13 | `ovary` | Ovarian cysts | One fallopian tube curving from the left edge, with fringed fimbriae (three short strokes) ending near a large oval ovary at the right. | One cyst (r 4.5) on the ovary in peach fill. |
| 14 | `endometriosis` | Endometriosis | The uterus as in `obg`, scaled to 80%. | Five small dots (r 1.6) scattered outside the uterus in coral fill, at least 4 apart. |
| 15 | `menopause` | Menopause care | A woman's head and shoulders in side profile facing left, with a soft bun hairline, at the left two-thirds. At the upper right, a crescent moon overlapping half of a small sun with short rays. | The sun in coral stroke. |
| 16 | `laparoscopy` | Laparoscopic surgery | A slim laparoscope: a long thin shaft drawn diagonally from the lower left to the upper right, a handle with two finger rings at the lower left, and a small tip. | Three small dots (r 1.8) in a gentle arc beside the tip, in coral fill (the three small cuts). |
| 17 | `fertility` | Fertility evaluation | Two cupped hands rising from the bottom, the thumbs meeting to form a heart outline. | A small seed with two leaves (`i-seed` shape) at the centre, the leaves in coral stroke. |
| 18 | `screening` | Pap smear and colposcopy | A magnifying glass (lens r 10, handle to the lower right). Inside the lens, a simple cervix outline: a soft circle with a small central oval opening. | The lens glass as a peach fill at 60% opacity. |
| 19 | `mtp` | Medical termination of pregnancy (build it, but hide it unless the content file lists the service) | A calendar page with binder rings at the top and three rows of small squares. | A small rounded shield overlapping the lower right corner, in peach fill. |
| 20 | `newborn` | Newborn care | Two tiny baby feet seen from below, side by side and slightly toed in, each with five small toe circles (r 1.4, gaps of at least 1.2), cradled by one curved palm line underneath. | The feet filled in peach. |

**Heart and vessels**

| # | Slug | Service | Draw | Accent |
|---|---|---|---|---|
| 21 | `heart` | Heart and vascular surgery hub | A simplified anatomical heart: a rounded body tilted left, an aortic arch with two short branches at the top, and a pulmonary trunk stub. Not a Valentine heart. | An ECG line in coral stroke crossing the heart body horizontally, one sharp spike in the middle. |
| 22 | `heart-check` | Heart check-up | A Valentine-style heart outline (the friendly one) at the upper left, with a stethoscope tube looping from the upper right down to a round chest piece at the lower centre. | An ECG strip (short line, spike, line) in coral stroke inside the heart. |
| 23 | `mics` | Keyhole heart surgery | Three curved rib lines on the left side of a chest, and the anatomical heart from `heart` at 70% behind them. | A short curved incision mark (8 long) between two ribs, in coral stroke. |
| 24 | `cabg` | Bypass surgery | The anatomical heart at 85%, with one coronary artery drawn on its surface and a small blockage mark (two short parallel ticks) on it. | A new vessel that loops in a smooth arc from above the blockage to below it, in coral stroke. |
| 25 | `valve` | Heart valve surgery | A circle (r 15) with three leaflets meeting at the centre in a soft "Mercedes" Y of curved lines. | The three leaflet edges as one coral stroke; the rest in the main colour. |
| 26 | `veins` | Varicose veins | The outline of a lower leg and foot from the knee down, standing and slightly angled. | One gently wavy vein running down the calf in coral stroke. Calm and not bulging. |
| 27 | `arteries` | Leg artery disease | A lower leg outline from the knee down with one straight artery line down the centre. Beside the foot, a footprint shape (a sole plus three toe dots). | The artery line in coral stroke. |
| 28 | `fistula` | AV fistula for dialysis | A forearm outline from the elbow to the wrist and palm, held horizontally. An artery and a vein run along it and join with a small loop just before the wrist. | The joining loop in coral stroke. The artery and vein in the main and depth colours. Never red. |
| 29 | `lungs` | Lung and chest surgery | A pair of lungs with a trachea and two bronchi, the left lung slightly smaller (the heart notch). | A soft breath line in coral stroke (a gentle curve with two small wind ticks) above the right lung. |

**Doctors (menu headings only)**

| # | Slug | Use | Draw | Accent |
|---|---|---|---|---|
| 30 | `doctor-female` | Women and pregnancy mega menu heading | Head and shoulders, front view: a head circle (r 6) with a hair outline falling to the shoulders, a white-coat collar with lapels, and a stethoscope around the neck ending in a chest piece. No facial features. | The stethoscope chest piece in coral fill. |
| 31 | `doctor-male` | Heart and vessels mega menu heading | The same build with short hair and a slightly broader shoulder line. | The same accent. |

### B4. Where badges go (replace every placeholder)

- **Service cards (`.card`)** on the home page, hubs, related services and the doctor pages: `md`. This replaces the line icon currently in the ring.
- **Service page hero:** `lg`.
- **"Signs" cards on blog posts (`.sign header .badge`):** `sm`. Use the matching UI icon where the group is not a service.
- **Health library covers (`.cover`):** `xl` on the existing gradient cover. Heart category covers use the dark theme variables.
- **Mega menu column headings:** the doctor badges at 40px, without the frame ring.
- **Hover:** keep the ring's single turn from `.card:hover .badge::after`. The art itself does not animate. Under reduced motion, nothing moves.

## Part C. Review sheet

Add a page at `/dev/badges/` (only in development and preview builds, `noindex`, excluded from the sitemap) that shows:
1. All 31 badges at sm, md, lg and xl on `--ice`.
2. The same set on `--night` with the dark-theme variables.
3. All UI icons at 18 and 24 on light and on dark.
4. A row of three real service cards built with `BadgeCard`, as on the hub.

## Acceptance

- Every badge reads clearly at 26px. Ask yourself: would a patient know it means this service? Redraw any that fail and note which ones.
- Stroke weights look equal across the whole set. No badge looks heavier, busier or more detailed than the others.
- Exactly one warm accent per badge and at most two sparkles. No text, no red, nothing graphic.
- `lib/service-badges.ts` has an entry for every service in `resources/content/`. Add a unit test that fails if a service has no badge.
- Each art file is under 1.5 KB after SVGO. There are no `id` attributes, so nothing collides when a badge repeats on a page.
- All placeholders (initials, line icons in rings) are gone from every template. Remove the badge lines from `public/images/_todo.md`.

## Report
- What was built, by part; deviations and why (including the switch from PNG to SVG)
- Screenshots: `/dev/badges/` light and dark at 1440; the women hub and heart hub service grids at 390 and 1440; one service hero; the health library at 1440
- Tests run and results
- `[CONFIRM]` count and the list of placeholders used
- Badges you think are weakest and why

STOP after this. Do not start the next phase.
