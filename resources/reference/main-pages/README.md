# Approved 14-page preview: THE visual reference

This folder is the approved look of the whole site. The built site must look like these pages, side by side, at 1440 and 390 wide.

## How to open it
Links between pages are relative, so serve the folder (do not double-click the file):

```
cd resources/reference/main-pages && python3 -m http.server 8080
# open http://localhost:8080/index.html
```
Fonts load from Google Fonts, so you need internet access. Full-page screenshots of every page are in `screenshots/` (`*-1440.jpg` and `*-390.jpg`) if you cannot run a browser.

## Page to template map

| Preview file | Real URL | Template it defines | Reuse it for |
|---|---|---|---|
| `index.html` | `/` | Home | Home only |
| `about.html` | `/about/` | About | About |
| `obstetrics-gynaecology.html` | `/obstetrics-gynaecology/` | Hub | Both hubs |
| `heart-and-vascular-surgery.html` | `/heart-and-vascular-surgery/` | Hub | Both hubs |
| `pregnancy-care.html` | `/pregnancy-care/` | Service page | All ~25 service pages, hidden pages |
| `dr-lakshmi-vijay-kalbande.html` | `/doctors/dr-lakshmi-vijay-kalbande/` | Doctor profile | Both doctors |
| `emergency.html` | `/emergency/` | Emergency info page | Emergency; same blocks for Plan your visit, Patients from PCMC |
| `book.html` | `/book/` | Form page | Book and Contact |
| `doctors.html` | `/doctors/` | Doctors hub | Doctors hub |
| `pregnancy-week-by-week.html` | `/pregnancy-week-by-week/` | Tool page (due date + week slider + stage table) | Tool page |
| `health-library.html` | `/health-library/` | Article list with filters and designed covers | Health library |
| `signs-of-labour.html` | `/health-library/signs-of-labour/` | Blog post | Both launch posts and all later posts |
| `faqs.html` | `/faqs/` | Grouped FAQ page | Questions and answers |
| `privacy-policy.html` | `/privacy-policy/` | Legal page | All 7 legal pages |

Every page type is now shown. Only small utility pages are not: thank-you and 404 use the compact hero (`.chero`) with buttons, and Services overview reuses the hub card grid (`.cards`).

## Files and how to use them
- `shell.css`: tokens, buttons, tag pill, pill header, mega menu, mobile sheet, footer, mobile action bar. **Port the values exactly** (colours, sizes, radii, shadows, spacing, breakpoints).
- `pages.css`: every inner-page block (`.win` photo hero, `.chero`, `.cards`/`.card`, `.badge`, `.steps`, `.facts`, `.docband`, `.faqg`/`.faq`, `.rev`, `.ctaw`, `.art`/`.toc`/`.prose`, `.tri`, `.callem`, `.pcp`, `.bento`, `.penguin`, `.four`, `.rooms`, `.glance`, `.dhero`/`.kf`, `.tl`, `.cg`, `.signs`, `.way`, `.bigcalls`, `.bookg`/`.form`/`.fld`/`.seg`, `.dmini`, `.bigdoc`, `.tool`/`.range`/`.stg`, `.feat`/`.post`/`.cover`/`.filt`, `.brief`/`.author`, `.fgroup`/`.fnav`, `.lmeta`/`.legal-body` and print styles). Each class becomes a React component with the same styles.
- `index.html`: home. Inline `<style>` holds the approved home section CSS and the photo-hero CSS (prefixed `.phs`). Inline scripts hold the hero film, pinned chapters, week dial, heart map, hours dial and chat FAQ behaviour.
- `site.js`: header shrink, mobile sheet, reveal on scroll, table-of-contents highlight, form demo.
- `images/`: the same files as `resources/images/_source/` (use `_source` for the build).
- The "Preview: 14 pages" pill at bottom left is a review tool. **Do not build it.**
- Doctor portraits are placeholders (CONFIRM chip), as in the preview.

## What "match" means
Same layout, order of sections, colours, type sizes, spacing, radii, imagery and crops, hover and motion. Words come from `resources/content/` (the preview already uses them). Acceptable differences: real links instead of `#`, real badge PNGs once they exist, and accessibility fixes.
