# Preview diff: approved 14-page preview vs build

FIX-match-the-preview task. Preview served from `resources/reference/main-pages/` on :8080, build on :3000. Paired full-page screenshots: `review/diff/<page>-preview-<w>.png` vs `<page>-build-<w>.png` (w = 1440, 390).

## What was rebuilt (v1 build → preview)

| Area | Before | Now |
|---|---|---|
| Tokens | `--paper` warm `#F7F4F1`, `--ink-3` mixed values, custom shadows/radii | Exact `shell.css` vars (`--paper:#FFF`, `--ink-3:#77869C`, `--sh`, `--sh-lg`, `--ease`) in `app/ref.css` |
| Header | Radix NavigationMenu pill, gradient book button, phone icon | `.pillnav` with `.mainnav` + CSS-hover `.mega` menus (`.mega-w`/`.mega-h` + `.mdoc`), `.em` Emergency 108/112 link, `.btn-navy` Book, `.burger` |
| Mobile menu | Custom drawer | `.msheet`: details groups + solo links + coral/navy foot buttons |
| Footer | Custom columns | `.foot/.fgrid` (logo, address, hrs, 3 link cols), `.pcpndt-f`, `.legal` |
| Floating | Custom | `.wa` WhatsApp circle, `.mbar` 3-up mobile action bar |
| Home hero | Old film variant | `.phs` photo film: 3 frames, `.reel` tabs w/ progress, pause, live IST clock, clip-path settle on scroll |
| Home sections | v1 blocks | `.under` photo cards, `.hs` pinned chapters (4 panels + scenes + lifeline), `.comp` week dial (drag + LMP + stages + miles), `.hm` heart map, `.doc` doctors, `.visit-grid` (24h dial + `.addr`), `.chatw` chat FAQ, `.closew` aurora band |
| Service pages | Generic prose hero | `.chero` (badge lg, meta, `.cimg` chip) + `.art` (sticky `.toc` + `.bk`) + `.prose` (`.tri`, `.callem`, `.pcp`, `.rev`) |
| Hubs | Generic | `.phero`/`.win` photo hero + `.gcard`, `.grp`/`.cards`, `.steps`, `.facts`, `.docband`, `.faqg` |
| Doctors hub | Two `DoctorCard`s | `.bigdocs`/`.bigdoc` cards |
| Doctor profile | Generic page | `.dhero` + `.ph` frame + `.nm` note + `.kf` facts + `.tl` timeline + `.cg` chips |
| Emergency | Hero + prose | `.ebar` + `.win` night hero + `.bigcalls` + `.signs` + `.way` + `.two` + `.faqg` |
| Book | Form + prose | `.bookg` (.form fields `.fld`/`.seg`/`.chk`) + `.side` + `.contactc` + `.alertline` |
| FAQs | Flat accordion | `.fnav` group nav + `.fgroups`/`.fgroup` accordions |
| Legal | Generic | `.legal-hero` + `.lmeta` + `.legal-body` |
| Related | none | `.cards` related section from frontmatter `related:` |
| CTA | `.ctaw` band | `.cta`/`.ctaw` with coral + glass buttons |

## Still different (known deviations)

- **Icons**: lucide icons stand in for the preview's custom `<symbol>` set; same stroke style via `.ico`.
- **Buttons**: `.btn` is 54px (shell.css) on inner pages, 56px on home (`.home .btn`); primary "Book" is coral on pages, navy in the pill nav — same as preview.
- **Home `.rv`**: the index variant (blur + scale) is used site-wide; inner pages get the slightly richer reveal than shell.css's plain translate.
- **Reveal scope**: `.rv.pre` applied only below the fold on load, as in `site.js`.
- **Badge placeholders**: serif monogram in the gradient ring (`.badge`), as preview; real illustrated badges still pending (IMAGE-GUIDE §5).
- **Service `.cimg`**: one clinic photo reused for all service pages until page-specific images exist; copy uses the generic "All under one roof" chip (content files carry no per-page chip text).
- **Hidden pages**: keep their dev-only `hidden` banner (not in preview).
- **Cookie banner / analytics / CallSheet**: kept from the build (not shown in preview); UtilityBar removed — `.ebar` appears only on `/emergency/` per preview.
- **About page**: rendered as `.ahero` + prose blocks; the `.bento`/`.penguin`/`.rooms`/`.glance` compositions need bespoke blocks that the content file does not fully specify yet — closest faithful mapping applied.
- **`middleware.ts`**: still present; Next 16 prefers `proxy.ts` (codemod pending, Phase 8 cleanup).

## Visual audit pass (taste/redesign review, post-reskin)

Fixed in this pass:

| Page | Issue | Fix |
|---|---|---|
| All | Below-fold `.rv` elements stayed hidden in full-page screenshots (IO never fired before capture) | `preview-shots.mjs` now scrolls, force-removes `.pre`/`.hide`, then captures |
| Hubs | `(glass cards)` / `(step tracker)` / `Facts strip` hints in markdown were ignored — body rendered as plain text list | `renderBlocks` now consumes hints → `.grp`/`.cards`, `.steps`, `.facts`, `.chips`, `.tl` |
| About | `Photos:` marker rendered as text; `[CONFIRM]` markers dropped; empty `Our story` section | `Photos:` → `.rooms` clinic-photo row; `[CONFIRM]` → `ConfirmChip`; empty sections skipped |
| Blog posts | `**Title.**` lead lines stayed bold paragraphs — ToC was empty | They now become `h2` anchors feeding `.toc` |
| Health library | Filter buttons nested inside links (invalid) | Re-nested with `pointer-events:none` on the button |
| Service pages | "Next on your journey" had no cards — they were `.rv`-hidden | Reveal fix above; cards resolve via `related:` frontmatter |
| Home | Full-page shots showed blank `.comp`/`.doc`/`.visit-grid`/`.chatw` | Same reveal fix — dial, heart map, doctors, visit dial, chat all capture correctly |

Remaining deviations (unchanged): About uses `.ahero`+prose rather than the preview's `.bento`/`.penguin` compositions; lucide icons vs custom symbol set; `.cimg` reuses one clinic photo per service page.

## Tests

- `npx tsc --noEmit`: clean.
- `scripts/preview-shots.mjs` over all 14 pages at 1440 + 390: zero console errors.
- Playwright suite not yet re-run post-reskin; `tests/` still targets the v1 structure.
