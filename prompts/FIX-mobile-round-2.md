# Fix: mobile polish, round 2

Branch: keep working on `fix-mobile-polish` (or `fix-mobile-round-2` from it if that is already merged). Deploy a Vercel preview. Do not merge until I approve.

I reviewed the preview on a phone (about 370px wide). The screenshots are in `resources/reference/mobile-round2/`, numbered to match the sections below. Everything here is **phone only** (`max-width: 767px`) unless a section says otherwise. Desktop must not change. The same rules apply as in `FIX-mobile-polish.md`: `--ez` easing, no new libraries, reduced motion respected, palette tokens only, copy unchanged.

---

## 1. Home hero: photos are not centred on the people (screenshot 1)
The three hero photos are 16:9 (1672×941). On a portrait phone only about 26% of the width shows, and right now the crop is centred on the frame, not the people. In the couple-walk chapter the woman is cut off at the right edge, and the headline sits on their bodies.
- Add a mobile focus point per chapter, kept in the hero chapter data (not in CSS), and apply it as `object-position` below 768px:
  - `hero-mother-newborn.jpg`: `74% 38%` (mother's face and the baby together)
  - `heart-walk.jpg`: `64% 22%` (both faces in frame, the couple centred)
  - `night-corridor.jpg`: `60% 50%` (the corridor's vanishing point and the walking figure)
- The Ken Burns zoom must scale around the same point: set `transform-origin` to the same values as `object-position`, otherwise the zoom drifts the people out of frame.
- Layout: the photo fills the full hero (`min-height: 100svh`). The people sit in the top 50%, and the text block (greeting, H1, chapter label, lead, doctor chip) sits in the bottom part on a navy gradient: `linear-gradient(to top, rgba(0,31,67,.96) 0%, rgba(0,31,67,.75) 38%, rgba(0,31,67,0) 62%)`. The H1 must never cover a face. Check all three chapters at 360, 390 and 430.
- The Book and Call buttons are inside the hero, under the lead, and the dock must stay hidden while the hero is on screen. In screenshot 1 the dock is showing over the hero and covers the chapter strip ("Every night" is cut off). Fix the IntersectionObserver so the dock only appears once the hero's bottom edge has passed the top of the dock.
- The chapter strip (A new life / A strong heart / Every night) sits at the very bottom of the hero, above the safe area, 44px tall, never under the dock.
- The pause button: 44px circle, aligned to the right edge of the H1 block, not floating on the photo.

## 2. "A life, in chapters" is too long on a phone (screenshot 2)
Now each of the four chapters is a full-height dial plus text, so the section is about 4 to 5 screens. Keep the idea and the dials, but turn it into **one swipeable story card** on phones:
- Keep the heading and the row of four round avatars (Growing up, Nine months, First breath, The heart). The avatar row becomes the tab bar: the active avatar gets a 2px coral ring and scales to 1.08, the others sit at 0.6 opacity. A thin line under the row fills to show progress.
- Under it, one card area (height about 1.15× the screen width + text, so the whole section fits in about 1.4 screens). Inside it a horizontal scroll-snap track with the four chapters side by side (`scroll-snap-type: x mandatory`, each slide `100%` wide, no visible scrollbar). Each slide holds:
  - the dial at 280px with the photo in the middle (the existing dial component, same animation, triggered when the slide becomes active instead of by vertical scroll)
  - the big serif number and the chapter label (13+ / CHAPTER ONE, GROWING UP) on one line
  - the H3, a two-line clamp of the paragraph with a "Read more" toggle, and the chips row (horizontal scroll if it overflows)
  - the "With Dr. ..." chip
- Swiping or tapping an avatar moves between chapters. Use the scroll position of the track to set the active tab (IntersectionObserver with the track as root, threshold 0.6).
- Auto-advance every 7 seconds while the section is in view, paused on touch and when the pause control is on (reuse the site-wide motion pause). No auto-advance with reduced motion.
- Desktop keeps the current pinned version unchanged.

## 3. "For mothers-to-be": the week slider must sit right under the trimester dial (screenshot 3)
On phones the order is wrong: the week slider is far below the dial, after the info cards and the date calculator.
- New order on phones:
  1. the trimester dial with the fruit
  2. **the week slider, directly under the dial** (16px gap), full width, with the "Week 19 of 40" readout and the trimester chip on the same row above it
  3. "Baby is about the size of..." and the "At Penguin, now" and "You may notice" cards
  4. the "Know your dates?" calculator
  5. the milestone timeline
- Slider: 44px tall touch area, 6px track, 28px thumb with a white border and shadow, the filled part of the track in coral up to the thumb. Dragging updates the dial and cards live (same state as today).
- Date field: use the custom date control from the round 1 prompt, or at least style the native input to 52px with 16px text. The placeholder "dd-mm-yyyy" is fine for India.
- **The milestone timeline overflows**: in screenshot 3 the line runs off the right edge and the labels are cut (Week 8, Week 12, then nothing). On phones make it a **vertical** timeline: a 2px line on the left, a dot per milestone, week label (12px caps) and the milestone name (16px) on the right of each dot. The current week's dot is coral and pulses once when it changes.

## 4. Heart map is collapsing (screenshot 4)
On phones the heading, the paragraph, the open zone card, the list of zones and the heart diagram are all stacked on top of each other: the "01 Coronary arteries" card sits on the paragraph, and the zone rows sit on top of the heart.
These elements are absolutely positioned for desktop and keep that positioning on phones. On phones, put them back in normal document flow, in this order:
1. Eyebrow, H2 and paragraph (normal flow, 24px below the header)
2. **The heart diagram in its own block**: `position: relative; width: 100%; aspect-ratio: 1 / 1.05; max-width: 380px; margin-inline: auto`. The numbered hotspots stay absolutely positioned *inside this block only*, at 44px. The "Pause motion" button sits at the bottom right inside this block.
3. **The zone list below the diagram** as an accordion: rows 56px, icon tile, number, title, plus icon. Tapping a hotspot or a row opens that row (the description expands under the row, `grid-template-rows: 0fr → 1fr`, 0.45s) and highlights the matching zone in the diagram. Only one open at a time. The first one is open by default.
4. The separate floating "zone card" with the X button is not used on phones (the accordion replaces it).
- Make sure no element in this section has a negative margin or an absolute position relative to the section on phones. Check with the heart section at 360, 390 and 430: nothing overlaps.

## 5. Buttons are broken in several places (screenshot 5, also 1, 3, 4)
**Dock** (bottom bar): the coral "Book a visit" is a square-cornered rectangle wedged inside the round dock, and the three items have different heights.
- Dock: `display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 6px; padding: 6px; border-radius: 999px; height: 60px`.
- Every item: `height: 48px; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 8px`, icon 18px, label 14px/600, `white-space: nowrap`.
- Book: coral background, navy text. Call and WhatsApp: transparent background with white text, and `rgba(255,255,255,.08)` background on press.
- Nothing inside the dock may have a square corner, and the items must not touch the dock's edge.

**Footer action row** (Directions / Call / WhatsApp): the three pills overlap each other, "Call" has lost its icon, and the pills are different sizes.
- `display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px`. Each is its own 48px pill (radius 999px), icon 18px plus label, centred, no overlapping and no negative margins.
- Colours: Directions navy `#001F43` with white text, Call coral with navy text, WhatsApp the existing WhatsApp green with white text. All three have the icon.
- Under 360px, the labels drop to 13px; if they still do not fit, show icons only, each with an `aria-label`.

**One shared button component.** These bugs come from each section styling its own buttons. Create (or reuse) one `Button` component with variants `primary` (coral), `navy`, `glass`, `outline`, `whatsapp` and sizes `md` (48px) and `lg` (52px). Replace the hand-made buttons in the hero, dock, footer, menu, CTA band, treatment heroes and book form with it. Check every page at 360px: no button text wraps to two lines, no icon is missing, no clipped corners.

## 6. Menu: the bottom buttons and the logo (screenshot 6)
**Logo.** In the open menu the logo is the navy and red PNG on a navy background, so only the red "Penguin" shows, and its top is cut off.
- In the menu header, show the logo on a white rounded chip: `background: #fff; border-radius: 14px; padding: 6px 10px; height: 48px`, logo image `height: 36px; width: auto; object-fit: contain`. Nothing clipped.
- Do the same check in the main header pill: the logo is `height: 40px; width: auto`, not cropped, and the small "Dr. Lakshmi's" line above "Penguin" is readable. If it is not readable at 40px, use the 240px WebP from round 1 at 2x for sharpness.
- The header pill's background is too see-through: in screenshots 3 and 4 the page text shows through behind the logo. Use `rgba(255,255,255,.88)` with `backdrop-filter: blur(16px) saturate(160%)` and a 1px `rgba(0,31,67,.06)` border once the page has scrolled.

**Bottom of the menu.** Now the status card, a large coral circle ("Book") and a plain "Call" text are squeezed into one row.
- Two rows, inside `padding: 16px 16px calc(16px + env(safe-area-inset-bottom))`:
  1. The status card, full width, 56px: green dot plus "OPD open now" on the left, "Emergency open day and night" on the right in 13px. One line each; wrap the right part under the left on screens under 375px.
  2. Two equal buttons, `grid-template-columns: 1fr 1fr; gap: 10px`: Book (coral, `lg`, calendar icon) and Call (glass, `lg`, phone icon, white text, 1px `rgba(255,255,255,.18)` border). Both 52px pills, the same height and width.
- The department photo tiles: the chevron in the top right becomes a 32px glass circle, and the tile label sits on a bottom gradient with 14px padding. Tapping the tile expands its links under both tiles (full width), not inside the tile.
- The large links (Doctors, Health library, About, Plan your visit) are fine. Keep a 56px row height.

---

## Check before you ask me to review
At 360, 390 and 430 wide, on the home page: all three hero chapters, the chapters story (swipe through all four), the mothers-to-be section (drag the slider from week 4 to 40), the heart map (open each zone), the footer, and the open menu. Then the dock on `/pregnancy-care/` and `/emergency/`.
Post one 390px screenshot of each of the six areas above.
