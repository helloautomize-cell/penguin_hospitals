# Fix: home page sections v2 (run this one prompt)

The agency has approved a redesign of three home sections. It also wants the site ready for a new set of doctor photos that will arrive later. Do the work below in this order, on one branch.

Before starting, confirm these paths exist and list them:
- `CLAUDE.md`
- `prompts/FIX-life-in-chapters.md` and `resources/reference/chapters-v2/`
- `prompts/FIX-mothers-and-heart-map.md` and `resources/reference/sections-v2/`
- `resources/docs/DOCTOR-IMAGES.md`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `fix-home-v2`. Deploy a Vercel preview. Do not merge to `main` until I approve.

## Part 1. "A life, in chapters"
Follow `prompts/FIX-life-in-chapters.md` in full. Treat its branch name as replaced by `fix-home-v2`.

## Part 2. "For mothers-to-be" and "Heart and vessels"
Follow `prompts/FIX-mothers-and-heart-map.md` in full, on the same branch.

## Part 3. Doctor image slots (ready for photos that come later)

The doctors' new photos are not ready yet. Set the site up now, so that adding the real files later is a file drop with no code change.

1. Create `lib/doctor-images.ts`, a single map of every doctor image slot in `resources/docs/DOCTOR-IMAGES.md`. Each entry holds the slot id, file name, aspect ratio, alt text, the pages that use it, and the current fallback. For example:
   `lakshmiHero: { file: 'dr-lakshmi-hero.jpg', ratio: '4/5', alt: 'Dr. Lakshmi Vijay Kalbande, obstetrician and gynaecologist', fallback: 'dr-lakshmi-portrait.jpg' }`
2. Create a `DoctorImage` component that takes a slot id. It renders `public/images/doctors/<file>` when the file exists at build time, and the fallback when it does not. The fallback uses the correct crop for the slot ratio (`object-fit: cover`, with the face kept in frame through `object-position`). A small `[CONFIRM photo]` chip shows in development only.
3. Wire every place a doctor appears to a slot. Hard-code no doctor image paths anywhere else. The map in `DOCTOR-IMAGES.md` lists where each slot goes. The main ones are:
   - the doctor page hero and the Doctors page cards
   - the headshots in the "With Dr." chips, mega menu cards, reviewer boxes and blog author lines (this includes the "by" line in the new chapters section)
   - the consultation photos on the Book page and on Step 3 of "Your first visit"
   - the "note from the doctor" blocks
   - the together photo on the About page and in the home "two specialists" block
4. Slots marked "nice to have" with no file and no sensible fallback render nothing. Never show a placeholder box on a live page.
5. Add `npm run images:doctors`. It prints a table of all slots: the file name, whether the file is present, and its size and ratio. Ratio mismatches over 3% are flagged.
6. Process doctor images with the existing image script (sharp, AVIF and WebP, `next/image`). Never edit faces in code, and never upscale.

## Acceptance
- All acceptance points in both FIX prompts pass.
- With no new doctor files present, every page looks as it does now (fallbacks), and `npm run images:doctors` lists 19 slots as missing.
- Test the file drop: copy any portrait into `public/images/doctors/dr-lakshmi-hero.jpg` and rebuild. It appears on her doctor page and on the Doctors page with no code change. Then remove it again before you commit.

## Report
- Parts 1 to 3: what was built; deviations and why
- Screenshots listed in both FIX prompts, plus the doctor page and the Doctors page showing the fallbacks
- Output of `npm run images:doctors`
- Tests run and results
- Remaining issues

STOP after this.
