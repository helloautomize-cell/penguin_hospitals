# Penguin Hospital: design and development plan

Version 2, 2 November 2026 (adds the approved 14-page preview as the main visual reference). Prepared by Automize Media for the coding agent.
Client: Dr. Lakshmi's Penguin Hospital, Chinchwad Gaon, Pimpri-Chinchwad, Pune.

Read this file fully before writing any code. Section 0 overrides every other document in this pack.

---

## 0. Overrides and order of authority

When two sources disagree, the higher one wins:

1. **What the agency says in the current phase prompt.**
2. **This file, section 0.**
3. **The approved visual references** in `resources/reference/`:
   - **`main-pages/` (most important): the approved 14-page preview of the whole site** (every page type: home, about, both hubs, a service page, doctor profile, doctors hub, emergency, book, week-by-week tool, health library, blog post, FAQs, legal). The site must look like it. Read `main-pages/README.md` first; it maps each preview page to the template it defines. Where the text of this plan and `main-pages/` disagree on looks, `main-pages/` wins.
   - `home-hero/index.html`: the approved home hero (photo film). Build it as close to this as the stack allows.
   - `home-sections/index.html`: the approved look for the home sections **below the hero** (from `#chapters` downward). **Ignore its hero (the aurora canvas) and its `#doors` section.** The hero is replaced by the photo film, and `#doors` is replaced by the three photo cards in 5.2.
4. **The content files** in `resources/content/`. These are the source of truth for every word. If a reference HTML shows different copy, the content file wins.
5. **The rest of this file** (sections 1 to 14).
6. `resources/docs/agency-standards.md` (engineering, SEO, compliance and test standards from the agency method).
7. `resources/docs/site-plan.md` (page list, URLs, nav, redirects).

**Hard overrides of the agency method** (these replace the generic house style):

- No HeroFan, no two-card doctor fan, no DoctorChip in the hero. The hero is the photo film (5.1).
- Doctors do not need to be on the first mobile screen. They are in section 5.6 and in the mega menu.
- No marquee anywhere.
- No Instrument Serif italic accent words in headings. Headings are Figtree only. The "soft" second half of a heading (lighter colour, same font) is the approved accent. Instrument Serif is used only for big numerals (week number, step numbers, clock digits) and short handwritten-style margin notes.
- Page background: home uses the section colours in the references (night, ice, white, paper). Inner pages use white with ice (`--ice`) panels. No ivory or cream page backgrounds.
- No eyebrow-with-a-line kicker, no taped notes or polaroids, no bobbing chips, no spinning seals, no waterfall photo columns. The small `.tag` pill with a dot, as in the reference, is the eyebrow.
- Service cards on hubs and inner pages look exactly like `.card` in `main-pages/pages.css`: white card, 28px radius, badge circle with a thin gradient ring, title, one line, round arrow. Hover: lift 5px, the ring turns once, the arrow slides. Until illustrated badges exist (IMAGE-GUIDE section 5), use the line icon inside the ring as the preview does.
- Never use, copy or mention any reference website or any other client's work. Do not search for other hospital or clinic sites to imitate.

---

**How to use the references:** port the CSS values and class structure from `main-pages/shell.css`, `main-pages/pages.css` and the inline styles in `main-pages/index.html` faithfully into the project (CSS variables, Tailwind theme, CSS modules or component styles). Rebuild the markup as React components and the inline scripts as client components. Copying exact CSS values is required, not optional. Do not redesign, simplify or "improve" the look.

---

## 1. What we are building

A fast, accessible, compliant website for a family hospital with two specialists:

- **Dr. Lakshmi Vijay Kalbande**: obstetrician, gynaecologist, laparoscopic surgeon, founder.
- **Dr. Ashish A. Baviskar**: cardiothoracic and vascular surgeon.
- Emergency open day and night.

Brand line: **Together through life.** The story: every chapter of a woman's life, and the heart that carries the family.

Scope: 53 pages and 2 launch blog posts (`site-plan.md`). Five pages are built but hidden (`hidden: true`) until the client confirms them: `/newborn-care/`, `/lab-and-scans/`, `/nutrition-and-physiotherapy/`, `/pap-smear-colposcopy/` and `/medical-termination-of-pregnancy/`.

Design feeling: cinematic and warm at the top (real-looking photography, slow motion), then calm, clear and useful below (interactive tools that actually help a patient: the week dial, due-date calculator, heart map, live opening dial). Premium comes from restraint, big confident type, real photography and precise motion, never from decoration.

---

## 2. Design tokens

Implement as CSS variables in `app/globals.css` and expose them to Tailwind v4 with `@theme`.

### 2.1 Colour

| Token | Value | Use |
|---|---|---|
| `--night` | `#000E24` | Hero, dark sections, footer |
| `--navy` | `#001F43` | Headings on light, primary dark surface |
| `--deep` | `#0A2B57` | Dark cards on night |
| `--blue` | `#17407E` | Primary brand, links, primary buttons |
| `--blue-5` | `#2A5BA8` | Hover, gradient start |
| `--sky` | `#8FB8EA` | Text accents on dark, focus ring on dark |
| `--ice` | `#F4F8FC` | Light section background |
| `--frost` | `#E8F0FA` | Chips, tabs, washes |
| `--line` | `#DFE7F1` | Hairlines, card borders |
| `--paper` | `#F7F4F1` | Warm light panel (use sparingly, max one per page) |
| `--ink` | `#0B1A30` | Body text on light |
| `--ink-2` | `#4A5970` | Secondary text |
| `--ink-3` | `#77869C` | Captions, fine print (check 4.5:1 at the size used) |
| `--mist` | `rgba(255,255,255,.78)` | Secondary text on dark |
| `--coral` | `#F4978E` | Warm accent: icons, rings, progress, illustration. Never body text on white |
| `--coral-d` | `#E77A70` | Coral hover |
| `--peach` | `#F9C9B6` | Illustration fill, soft glows |
| `--blush` | `#FDEDE8` | Warm wash behind pregnancy tools |
| `--alert` | `#E40913` | Emergency only (and the logo heart) |
| `--alert-dark-bg` | `#FF6B63` | Emergency text on night backgrounds |
| `--ok` | `#2F7D5B` | "Open now" on light |
| `--ok-dark-bg` | `#3DDC97` | "Open now" dot on night |
| `--wa` | `#1F7A55` | WhatsApp button (accessible green) |
| `--confirm-bg` | `#FFF1B8` | `[CONFIRM]` chip in development |

Gradients:
- `--grad-brand: linear-gradient(90deg, #17407E, #001F43)` for the Book button and mobile bar.
- `--grad-warm: linear-gradient(135deg, #F9C9B6, #F4978E)` for illustration and progress only.
- Max one gradient surface per viewport.

### 2.2 Type

- **Figtree** for everything (400, 500, 600, 700, 800). Preload it.
- **Instrument Serif** (regular and italic) for numerals and margin notes only. Do not preload.
- **Noto Sans Devanagari** (500, 600) for the "नमस्कार" hero greeting only. Subset to Devanagari, `display: swap`, not preloaded.
- All three load with `next/font/google`, self-hosted at build.

| Role | Size | Weight / line-height / tracking |
|---|---|---|
| Hero H1 | `clamp(52px, 7.2vw, 118px)`; mobile `clamp(50px, 14vw, 72px)` | 700 / .92 / -0.05em |
| Section H2 (home) | `clamp(38px, 4.4vw, 68px)` | 700 / .98 / -0.045em |
| Page H1 (inner) | `clamp(38px, 4.6vw, 64px)` | 700 / 1.0 / -0.04em |
| H2 (inner) | `clamp(28px, 2.6vw, 40px)` | 700 / 1.08 / -0.03em |
| H3 | 22px to 24px | 650 / 1.2 / -0.015em |
| Lede | 19px to 20px | 400 / 1.55 |
| Body | 17px minimum (18px on article pages) | 400 / 1.65, max 68ch |
| Small / UI | 15px | 500 |
| Fine print | 14px minimum | 400 |

Headings use `text-wrap: balance`, body uses `text-wrap: pretty`. Sentence case everywhere.

### 2.3 Space, radius, shadow, motion

- Section padding: `clamp(80px, 10vw, 140px)` vertical on home, `clamp(56px, 7vw, 96px)` on inner pages. Content max width 1320px. Gutter 24px desktop, 16px mobile.
- Radius: 8 (chips), 14 (inputs, small cards), 24 (cards), 36 (hero frame when it settles), 999 (pills).
- Shadow: `0 1px 2px rgba(0,31,67,.06), 0 12px 32px -12px rgba(0,31,67,.18)`. Hover adds `0 24px 48px -20px rgba(0,31,67,.28)`.
- Ease: `--ease: cubic-bezier(.22, 1, .36, 1)`. Durations: 200ms (hover), 500ms (reveal), 900ms (crossfade).
- Reveal: fade up 16px, once, 60ms stagger, content visible without JS. Never on the LCP element.
- Every animation has a `prefers-reduced-motion: reduce` path that shows the final state with no movement.

### 2.4 Icons and illustration

- Line icons: Lucide, 1.75 stroke, 20px to 24px, UI only.
- Service badges: hand-drawn SVG components, one per service, built in phase 2b (`prompts/phase-2b-icons-and-badges.md`). Before phase 2b, use the line icon inside the ring as the preview does.
- Inline SVG illustrations from the reference (cycle ring, trimester arcs, heart map, dial) are rebuilt as React components, not pasted HTML.
- The penguin mark in the reference (`#pg` symbol) is a placeholder. Use the real logo from `resources/images/_source/brand/` (trimmed, plus an SVG redraw for approval in Phase 1).

---

## 3. Global shell

| Element | Spec |
|---|---|
| Utility bar (desktop, at least 1024px) | Thin `--night` bar. Left: "Medical emergency? Call 108 or 112" in `--alert-dark-bg`, then "Emergency open day and night". Right: Plan your visit, Health library, phone link, WhatsApp link. Hidden on the home page while the hero is in view, shown after. |
| Header | Pill-shaped, sticky, glass on dark over the hero (white text), solid white with a hairline after the hero. 76px tall, 64px on scroll, 60px on mobile. Logo left (max 40px tall on mobile). Menu: Women and pregnancy, Heart and vessels, Doctors, Emergency, Plan your visit. Right: Book a visit (gradient pill) and a phone icon button. |
| Mega menu | Radix NavigationMenu. Solid white panels (no see-through), 24px radius, explicit CSS grid per panel. Women panel: 3 link columns (Pregnancy and birth, Gynaecology, Surgery and fertility) plus a doctor card. Heart panel: 2 columns plus a doctor card. Doctor card: 48px photo, name, one line, "View profile". Hover intent 120ms. Keyboard and Esc work. |
| Mobile menu | Full-screen white sheet. Accordion groups, all closed. 48px rows, 17px text. Fixed footer with Book and Call, and "Emergency open day and night". |
| Mobile action bar | Below 1024px on every page: `--grad-brand` at 92% with glass blur, top corners 16px, safe-area padding. Three buttons: Book, Call (opens a sheet: mobile or landline), WhatsApp (prefill from `lib/whatsapp.ts`). Hidden while typing in a form and on `/thank-you/`. `main` gets 80px bottom padding. |
| Floating WhatsApp | Desktop only, 56px `--wa` circle, bottom right. |
| Footer | `--night`. "Together through life." line. Logo, NAP once, hours, phones, obfuscated email, Get directions. Link columns: Women and pregnancy, Heart and vessels, Patient info, Legal (7). PCPNDT line. © line with the education disclaimer and "Cookie settings". Mobile: link columns as accordions, contact block open. |
| Cookie banner | Small white card bottom left (above the mobile bar). Essential vs analytics. Accept, Decline, Settings. Nothing loads before consent. |
| Breadcrumbs | Every inner page, with BreadcrumbList JSON-LD. |
| Emergency strip | On `/emergency/`, pregnancy pages and heart pages: the emergency callout component (content `00-plan.md` 0.5). |

---

## 4. Templates

All copy comes from `resources/content/`. Every template is server-rendered HTML first; interactivity is progressive.

| Template | Structure |
|---|---|
| **Hub** (`/obstetrics-gynaecology/`, `/heart-and-vascular-surgery/`) | Breadcrumb. Photo hero (hub AI image, 60vh desktop, 4:5 crop on mobile, night gradient at the bottom, H1 and answer-first intro on the photo, Book and Call). Service groups as badge cards (grid on desktop, self-moving swipe carousel on mobile). "What your care looks like" step tracker with 4 to 6 steps from the content. Doctor block. FAQs. Reviewer box. Related posts. CTA band. |
| **Service** (all service pages) | Breadcrumb. Compact hero on `--ice`: badge `lg`, H1, answer-first opening (real text, not an image), Book and WhatsApp. Desktop: sticky table of contents on the left with a small Book card. Sections from the content file. Emergency callout where the content has one. FAQs (accordion plus FAQPage JSON-LD). Reviewer box. Related services (3 badge cards). CTA band. |
| **Doctor profile** | Split hero: portrait 4:5 left, facts card right (qualifications, experience, languages, registration, OPD timings). About. Education timeline. Roles and memberships. "How I work" three principles (numbered with Instrument Serif numerals i., ii., iii.). Non-clickable chip groups of conditions and services (desktop all; mobile 6 per group and "Show all (n)"). Pages they review. Book CTA. Physician JSON-LD. |
| **Doctors hub** | Both doctors side by side, same card design as home 5.6, with full facts. |
| **Book / Contact** | Form (agency-standards 9.1) beside a real hospital photo with info cards (address, hours, phones). `#book` anchor. Contact has the click-to-load map (static image first, Google embed only on click). |
| **Tool page** (`/pregnancy-week-by-week/`) | Full-size week dial and due-date calculator (5.4), plus a week-by-week table for all 37 weeks (4 to 40) as real HTML, grouped by trimester, so search and AI answers can read it. Shareable `?week=` param. PCPNDT line. |
| **Info pages** (About, Plan your visit, Emergency, Patients from PCMC, FAQs) | Breadcrumb, compact hero, content sections, real photos where mapped (`00-plan.md` 0.6). Emergency page: the "Call 108 or 112 first" banner at the very top, above the H1, in `--alert`. |
| **Legal** (7) | Left table of contents (sticky on desktop), "Last updated" from `lib/site-config.ts`, print styles. |
| **Health library** | Category chips, newest first, cards with designed covers (gradient plus badge), author avatar, date, reading time. |
| **Blog post** | Title, author chip, Published and Updated dates, "In brief" box (`--frost`), body 68ch, callouts, FAQ plus JSON-LD, reviewer box, 3 related service cards, 2 related posts. |
| **Utility** | `/thank-you/` (noindex, shows the request time and the emergency line), 404 (links to the two hubs, Emergency and Book). |
| **Hidden pages** | Any page with `hidden: true` (five at draft, see section 1): built from content, `hidden: true` means not in nav, sitemap or internal links, and `notFound()` in production until the flag is removed. |

---

## 5. Home page, section by section

Order is fixed (site-plan section 10). Use the content file `01-core.md` section 1 for every word.

### 5.1 Photo film hero (reference: `home-hero/index.html`)

- Full-bleed `--night` stage, 100svh (min 640px, max 980px).
- Three chapters, each a full-bleed photo frame: `hero-mother-newborn` (A new life), `heart-walk` (A strong heart), `night-corridor` (Every night).
- Each frame crossfades (900ms) and has a slow Ken Burns zoom from scale 1.12 to 1 over 9s. Transform and opacity only.
- 7 seconds per chapter. A reel of three buttons (thumbnail, kicker, chapter name, progress bar) switches chapters; `role="tablist"`, arrow keys work. A pause button (WCAG 2.2.2). Pauses when the tab is hidden and when off screen.
- Copy, bottom left: greeting "नमस्कार · Dr. Lakshmi's Penguin Hospital, Chinchwad", H1 "Together through life.", then the per-chapter paragraph and "With Dr. ..." line, crossfading with the frame. Buttons: Book a visit (gradient), Call 95189 04156 (glass).
- Live card (desktop, bottom right): IST clock, "Open now" dot, "Emergency and OPD" or "Emergency only, OPD at 4 pm". Hours come from `lib/site-config.ts` (OPD hours are `[CONFIRM]`; the reference uses Sunday 4 to 6 pm and other days 24 hours as the working assumption). Render a server fallback ("Emergency open day and night") so there is no blank state.
- Scroll: as the hero leaves, the frame insets and rounds to 36px (clip-path inset driven by scroll position, rAF throttled). Off under reduced motion.
- Mobile (below 720px): photo takes the top 72% of the stage, copy sits at the bottom on night, live card hidden, the two buttons in one row, reel as three small tabs.
- Performance: the first frame is the LCP image. `priority`, `fetchPriority="high"`, sized `sizes="100vw"`, AVIF. Frames 2 and 3 load after first paint. No reveal animation on the H1 or first image. Target LCP under 2.0s on 4G mobile.
- Reduced motion: no zoom, no auto-advance, chapter 1 shown, tabs still switch instantly.

### 5.2 Every chapter, under one roof (new, replaces `#doors`)

- `--ice` background. H2 and intro paragraph from content.
- Three tall photo cards (4:5), each a stretched link: Nine months (`pregnant-window`, to `/pregnancy-care/`), Day one (`newborn-hand`, to `/normal-delivery/`), The years after (`heart-grandfather`, to `/heart-and-vascular-surgery/`).
- Card: photo, night gradient at the bottom, title and one line on the photo, a round arrow button. Hover: photo scale 1.04 over 600ms, arrow slides 4px.
- Desktop: the three cards in a row with the middle one offset 48px down. Mobile: swipe carousel, cards 84% wide.

### 5.3 A life, in chapters (reference `#chapters`)

- Pinned horizontal story: a 460vh tall section with a sticky 100vh stage; vertical scroll moves a track of an intro panel plus four chapter panels sideways.
- Each chapter panel: big number or label in Instrument Serif (13+, 40, Day 1, Always), chapter name, sub-heading, paragraph, link chips, "With Dr. ..." line, and an animated SVG scene (cycle ring, trimester arcs, mother and baby, heart line).
- A heartbeat "lifeline" path along the bottom draws as you progress; a counter "01 / 04" and chapter labels below it.
- Mobile (below 900px) and reduced motion: no pinning. The panels stack vertically as normal sections, scenes static.
- Must not break keyboard scrolling or the browser find function. All text is real HTML.

### 5.4 For mothers-to-be (reference `#mothers`)

- `--blush` wash. H2 "Your pregnancy, week by week."
- Week dial (SVG, `role="slider"`, weeks 4 to 40, arrow keys step by 1, Page Up and Page Down by 4, Home and End). Trimester arcs, a progress arc, ticks, the simple baby symbol growing with the week, the week number in Instrument Serif.
- Side panel for the chosen week: size comparison (fruit or object), what happens at Penguin Hospital at this stage, what you might feel. Data lives in `lib/pregnancy-weeks.ts`, written from `02a-women-pregnancy.md`; general and true, no medicines or doses.
- Due-date calculator: date input "First day of your last period", "Work it out" button, shows due date (Naegele: LMP plus 280 days) and current week, and moves the dial. Validation: not in the future, not more than 44 weeks ago. Runs fully in the browser; nothing is sent or stored.
- Fine print: "A general guide for healthy pregnancies. Dr. Lakshmi sets your own schedule after your first visit." Link to `/pregnancy-week-by-week/`.
- PCPNDT line below.

### 5.5 Heart map (reference `#heart`)

- Night section. H2 and lede from content.
- An SVG heart with 5 numbered hotspots (coronary arteries, valves, aorta, keyhole access, lungs and chest). Clicking or focusing a hotspot highlights the region and shows its panel; the list beside the heart is the same buttons, so it works without the SVG. `aria-pressed` on the active one.
- "Beyond the heart" chips link to varicose veins, leg arteries and AV fistula pages. Buttons: Book with Dr. Ashish, Heart check-up.

### 5.6 Meet your doctors (reference `#doctors`)

- White. H2 "Two names on the door. The same two in the room."
- Two identical cards: portrait 4:5 (same crop family), margin note in Instrument Serif italic (approved exception), name, role, facts list (qualifications, experience, registration, memberships, languages), three principles (i., ii., iii.), Book with Dr. X and Doctor profile.
- Portraits: the current photos are placeholders (they have a wall of patient photos behind them, which cannot be published). Until the shoot, show the placeholder with a `[CONFIRM: new portrait]` chip in development; `launch-check` fails while the placeholder is in use.
- Mobile: stacked, photo 120px left of the name, facts collapsed behind "More about Dr. X".

### 5.7 Visit (reference `#visit`)

- `--ice`. H2 "Open when you need us. Which is any hour."
- 24-hour dial (SVG): emergency ring full, OPD ring per day from `lib/site-config.ts`, a hand at the current IST time. Day picker (7 chips, today selected). Text equivalent under the dial for screen readers ("Today, Monday: emergency open all day; OPD ...").
- Address card with NAP, phones, email, areas served chips, Get directions, WhatsApp. Static map image with "Show map" (Google embed only after click).

### 5.8 Quick answers (reference `#faq`)

- White. Emergency banner on top in `--alert`: "Medical emergency? Call 108 or 112 first."
- Chat-style thread: the question as a patient bubble (right), the answer as a "Penguin Hospital" bubble (left). Built as a native `<details>` list styled as chat, so it works without JS and passes FAQPage JSON-LD.
- 4 questions from content, then See all questions (`/faqs/`) and Ask us on WhatsApp.

### 5.9 Closing band and footer

- Night band: "Together through life." plus the line from content, Book a visit, Call, WhatsApp. Then the footer.

Mobile target: the home page is no more than about 11,000px tall at 390px wide (the pinned story stacks, so allow more than the agency default).

---

## 6. Components to build (shared library)

`Button` (primary gradient, secondary, glass-on-dark, WhatsApp, emergency), `BookButton`, `CallSheet`, `WhatsAppLink`, `Tag`, `Chip`, `ConfirmChip`, `BadgeCard`, `PhotoCard`, `DoctorCard`, `DoctorMiniCard` (mega menu), `FactsList`, `Principles`, `StepTracker` (desktop sticky rail plus mobile swipe), `SwipeCarousel` (Embla, auto-advance 4.5s, pause on hover, focus, touch, hidden tab and off-screen, pause button, off under reduced motion), `Accordion`, `ChatFaq`, `EmergencyCallout`, `ReviewerBox`, `CtaBand`, `Breadcrumbs`, `Toc`, `MapFacade`, `CookieBanner`, `MobileActionBar`, `HeroFilm`, `ChapterStory`, `WeekDial`, `DueDateCalculator`, `HeartMap`, `HoursDial`, `LiveClock`, `PcpndtLine`.

Cards with links use the stretched-link pattern (never a link inside a link).

---

## 7. Content pipeline

- Split the 6 content files into `resources/content/pages/<slug>.md`, one per page, keeping the yaml frontmatter as written. Blog posts go to `resources/content/posts/`.
- Zod schema for frontmatter: `title`, `url`, `description` (max 160 chars), `reviewer` (doctor slug or null), `badge`, `related` (slugs), `hidden` (bool), `lastReviewed` (date, `[CONFIRM]` allowed in dev), `faqs` (parsed from the FAQ section).
- Render with remark and rehype. Custom directives or simple conventions for: emergency callout, info callout, FAQ section, step lists, CTA band.
- `[CONFIRM: ...]` and `[CONFIRM]` markers render as a yellow `ConfirmChip` in development and preview builds, are removed in production, and are counted by `npm run launch-check`, which exits 1 if any remain in non-hidden pages or in `lib/site-config.ts`.
- Single sources: `lib/site-config.ts` (NAP, hours, phones, email, founding year, Google profile URL, areas served, `legalLastUpdated`, `TODO_CONFIRM`), `lib/nav.ts`, `lib/service-badges.ts`, `lib/booking-context.ts` (page to doctor and reason prefill), `lib/whatsapp.ts`, `lib/consent.ts`, `lib/pregnancy-weeks.ts`.
- Do not rewrite content. If something reads wrong, flag it in the phase report.

---

## 8. Images

- Sources in `resources/images/_source/` (see its README). Processed output in `public/images/` via `scripts/process-images.mjs` (agency-standards 4.9).
- Real hospital photos: crop, light brightness and contrast, fix colour cast, remove visible brand stickers only by cropping. Never invent or add content to a real photo. They are low resolution; serve them at sizes that do not exceed their real pixels (never upscale in code). The client will supply AI-upscaled versions later (IMAGE-GUIDE section 1).
- AI photos are placeholders. Keep C2PA credentials. List each in `public/images/_todo.md` with the IMAGE-GUIDE prompt code for its final version.
- Images still missing (W1 to W19, H1 to H9, C1 to C5, S1 to S6, badges): use a tasteful placeholder (tinted panel with the prompt code in development only) and list them in `_todo.md`. Never ship a stock photo or an image from the web.
- `public/images/alt-text.json`: factual alt text for every image.
- Never use the old doctor desk photos in production (patient photo collage behind them).

---

## 9. Compliance (built in, tested)

- No testimonials, review quotes, star ratings, "best", "top", "leading", success rates, patient or surgery counts, prices, cure claims, drug or brand names, equipment model names, before and after images.
- PCPNDT line on every pregnancy and scan page and in the footer.
- "Call 108 or 112" in the utility bar, emergency callouts, the home FAQ banner and `/emergency/`.
- Reviewer box on every medical page.
- Forms: consent checkbox unticked, the "do not include detailed medical information" line, no health data in analytics.
- DPDP: cookie consent before any analytics, maps or video; Grievance Officer on the privacy page (`[CONFIRM]`).
- Medical termination of pregnancy and Pap smear pages stay hidden until the client says yes (site-plan section 11). Never remove a `hidden` flag yourself.

---

## 10. Engineering

Follow `agency-standards.md` Part 9 exactly, plus:

- Next.js App Router (latest stable), TypeScript strict, Tailwind v4, ESLint, Prettier.
- Static generation for every page. Server Actions only for forms. No database.
- `trailingSlash: true`. Redirect map from `site-plan.md` section 9 in `next.config.ts`.
- Forms: Server Action, Zod, Resend. Sender on the clinic domain (domain email is `[CONFIRM]`; until then the action logs and returns success in preview only).
- Analytics: GA4 only after consent (Consent Mode v2), events per agency-standards 9.1. Vercel Speed Insights.
- Hosting: Vercel, region `bom1`. Preview deploy per branch.
- JS budget: under 120 KB gzipped on the home page route (excluding Next runtime). No Framer Motion, no GSAP, no Lenis. Use CSS, `IntersectionObserver` and `requestAnimationFrame`.

---

## 11. Performance and quality budgets

| Metric | Target (mobile, 4G, median of 5) |
|---|---|
| LCP | under 2.0s |
| CLS | under 0.05 |
| INP | under 200ms |
| Lighthouse Performance | 90 or more on home, 95 or more on inner pages |
| Lighthouse Accessibility, Best practices, SEO | 100 |
| Home page weight | under 1.2 MB first load at 390px |

---

## 12. Tests (Playwright)

Everything in agency-standards Part 9, plus:

- Hero: auto-advance changes chapter after 7s; pause button stops it; reduced motion shows chapter 1 with no transform.
- Week dial: keyboard changes `aria-valuenow`; calculator gives the right due date for 3 fixed LMP dates; future date shows an error.
- Heart map: each of the 5 buttons shows its panel.
- Hours dial and live card: with a mocked IST time of Sunday 3 pm, OPD shows closed; Sunday 5 pm shows open.
- Compliance scan: build output contains none of the banned words list (`scripts/banned-words.txt`, from content `00-plan.md` 0.3), and every page under the pregnancy group contains the PCPNDT line.
- Hidden pages return 404 in a production build.
- No horizontal overflow at 360, 390, 768, 1024, 1440.

---

## 13. Phases (each ends with a STOP)

| Phase | Prompt file | Output |
|---|---|---|
| 1 | `prompts/phase-1-foundation-styleguide.md` | App, tokens, fonts, image script, `/styleguide` |
| 2 | `prompts/phase-2-shell.md` | Header, mega menu, mobile menu, action bar, footer, cookie banner |
| 3 | `prompts/phase-3-content-pipeline.md` | Content split, schemas, CONFIRM system, launch-check, all inner templates rendering |
| 4 | `prompts/phase-4-home.md` | The home page |
| 5 | `prompts/phase-5-blog-tools-qa.md` | Health library, posts, tool page, QA pass |
| 6 | `prompts/phase-6-forms-consent.md` | Forms, email, consent, analytics |
| 7 | `prompts/phase-7-polish.md` | Desktop and mobile polish, performance |
| 8 | `prompts/phase-8-seo-launch.md` | SEO, schema, GEO and AEO pass, launch checklist |

---

## 14. Known open items (do not block the build)

- All `[CONFIRM]` items in `05-confirm-and-doctor-questionnaire.md`.
- Final doctor portraits, real shoot list and AI images not yet made (IMAGE-GUIDE).
- Service badges not yet made.
- Clinic domain email for Resend.
- GitHub repository and Vercel project (the agency sets these up).
