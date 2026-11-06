# Fix: make the built site match the approved preview

Use this prompt if phases were already run with the first version of this pack (which did not include the 14-page preview).

Before starting, confirm these paths exist and list them:
- `CLAUDE.md` (replace it with the new version from this pack first)
- `resources/docs/design-development-plan.md` (version 2)
- `resources/reference/main-pages/README.md`
- `resources/reference/main-pages/shell.css`
- `resources/reference/main-pages/pages.css`
- `resources/reference/main-pages/index.html`
- `resources/reference/main-pages/screenshots/`

If any is missing, STOP and tell me. Do not substitute another file.
Branch: `fix-match-preview` (from the latest `main`). Deploy a Vercel preview. Do not merge to `main` until I approve.

Non-negotiables: follow `CLAUDE.md` in full. Words only from `resources/content/`. No new features in this task.

## Task
`resources/reference/main-pages/` is the approved look of the whole site. The current build does not match it. Make it match.

1. Serve `resources/reference/main-pages/` (`python3 -m http.server 8080`) and run the current site. Take screenshots of both at 1440 and 390 for: home, about, both hubs, pregnancy care, Dr. Lakshmi, doctors, emergency, book, week by week, health library, the signs of labour post, FAQs, privacy policy.
2. Write `docs/preview-diff.md`: a table per page of every visible difference (layout, section order, colours, fonts and sizes, spacing, radius, shadows, images and crops, hover and motion, mobile layout).
3. Replace the design tokens and base styles with the exact values from `main-pages/shell.css`. Port the block styles from `main-pages/pages.css` and the inline styles of `main-pages/index.html` into the matching components. Rebuild missing blocks as components. Do not redesign or simplify.
4. Rebuild the home page from `main-pages/index.html`: photo film hero, "Under one roof" photo cards, pinned chapters, week dial, heart map, doctors, hours dial, chat FAQ, closing band, with their scripts as client components.
5. Apply the same templates to every other page of the same type (see the page to template map in the README).
6. Re-take the screenshots and update `docs/preview-diff.md` with what is now fixed and anything still different, with the reason.

Acceptance: for each of the 14 pages, side-by-side screenshots (preview left, build right) at 1440 and 390 show the same layout, colours, type and imagery. No console errors. Existing tests still pass.

## Report
- What changed, by page; anything that still differs and why
- Screenshots: the 14 side-by-side pairs at 1440 and 390
- Tests run and results
- Remaining issues

STOP after this. Do not start the next phase.
