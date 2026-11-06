# Agency standards (Automize Media method, extract)

These are the engineering, image, review, compliance, content, SEO and form standards from the agency's master method, copied for this project. The design rules of the master method are NOT included: the design for Penguin Hospital is defined in `design-development-plan.md`, and its section 0 overrides anything here.

Overrides that apply to this extract:
- 4.8 rule 2 ("Doctors visible on the first screen") does not apply. Rule 5 target for the home page is about 11,000px at 390px wide.
- Part 9 tests: drop the "marquee" check (there is no marquee). The mega menu here has 2 rich panels.
- There is no workshop form on this site; build only the appointment form (and the contact form, same rules).
- "plum-50" and other colour names refer to another palette; use the tokens in the plan.

### 4.8 Mobile rules (from the polish pass, which cut the page 48%)
1. Any section with more than 3 cards, photos or list items becomes a horizontal swipe carousel below 768px (cards about 84% wide, next card peeking, scroll-snap, no arrows, a progress bar when there are more than 5 items) that **moves on its own**: auto-advance every 4.5s, loop, pause on touch, hover, focus and hidden tab, resume 6s after interaction, a pause/play button, and no movement under reduced motion.
2. Doctors visible on the first screen, before the CTA.
3. No full-screen decorative photos on mobile.
4. No non-hero section taller than 1.3 x the viewport (add a Playwright check).
5. Target: mobile Home of about 9,000 to 10,000px at 390px wide.

### 4.9 Image pre-treatment (`scripts/process-images.mjs`, sharp)
- Read `resources/images/`, write to `public/images/`, never upscale; JPEG q85 or PNG with alpha; `next/image` serves AVIF/WebP (`images.formats: ['image/avif','image/webp']`).
- Treatments only as mapped: crop, light brightness or contrast, yellow-cast fix.
- **Badge knockout:** RGB > 245 → transparent, feather 235 to 245, trim, square with 4% padding, 512/256 px.
- **Logo:** trim the transparent padding. If there is no vector, redraw it as SVG for approval.
- Strip EXIF, GPS and camera metadata; keep sRGB. Leave any C2PA content credentials on AI images untouched.
- Faces without consent: crop or blur; never fake it. Log to `public/images/_todo.md`.
- `public/images/alt-text.json`: factual alt text for every image.
- Doctor set per doctor: `-hero.jpg` (4:5), `-portrait.jpg` (card, same crop family), `-avatar.jpg` (square, circle-safe).

## PART 5. Review procedure (desktop and mobile screenshots)

When the user sends screenshots:
1. Go section by section, top to bottom, desktop first, then mobile.
2. Check: alignment to the container, equal card heights, spacing consistency, orphans, overlaps (labels on faces, text on thumbnails), clipped text, dropdown layout, contrast of inactive states, repeated badges, carousel motion, mobile length, hero above the fold, CTA reachability, hours and NAP consistency, dashes, duplicate links, stray separators ("·" chains), gaps before the footer.
3. Group the findings into "Across the site", then per section. Then ONE prompt fixing all of it, with measurable acceptance criteria (heights, widths, Playwright checks).
4. Ask for screenshots of only what you could not verify.

---

## PART 6. Compliance (India, medical): built in from day one

### 6.1 Rules and law
- **Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, 2002**: these apply while the NMC RMP (Professional Conduct) Regulations 2023 remain in abeyance (check the current status at project start). Factual information only: name, qualifications, registration number, services, timings, address. No self-praise, testimonials, inducements or comparisons.
- **Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954**: no cure claims, and no medicine promotion for the listed conditions (diabetes, obesity, blood pressure, heart disease, sexual disorders and others). No brand names.
- **DPDP Act 2023 and DPDP Rules 2025** (notified 13 Nov 2025; most obligations apply from 12 May 2027). Check the current dates at project start. Requirements: consent notices, parental consent for under-18s, a privacy contact, retention, rights.
- Telemedicine Practice Guidelines 2020 (only if teleconsults are offered); Charter of Patients' Rights.

### 6.2 Always
- Emergency line in the utility bar and on symptom pages: "Medical emergency? Call 108 or 112."
- Mental health pages: the Tele-MANAS helpline 14416.
- A reviewer box and last-reviewed date on every medical page.
- Unticked consent checkboxes; analytics only after cookie consent.

### 6.3 Never
- "Best", "No. 1", "leading", "world-class", "guaranteed", "cure", "permanent", "100%".
- Testimonials, review quotes, per-doctor ratings, before/after, price offers, drug brands, patient numbers presented as boasts.
- Unapproved therapies (e.g. **stem cell therapy for diabetes**: ICMR allows it only in approved trials) and cure-like phrases ("insulin-free treatment", "reverse diabetes").
- Specialty claims the doctor does not formally hold (e.g. "paediatric endocrinology" for an adult physician).
- Naming referral hospitals or implying referral arrangements.
- `AggregateRating` or `Review` schema for the clinic's own reviews.

### 6.4 The 7 legal and trust pages
1. Privacy Policy (DPDP standard)
2. Terms of Use
3. Medical Disclaimer
4. Editorial and Medical Review Policy (including AI-assisted imagery and content, with doctor approval)
5. Patient Rights and Responsibilities
6. Appointment, Cancellation and Refund
7. Accessibility Statement

---

## PART 7. Content standards (YMYL, E-E-A-T, AEO)

### 7.1 Voice
Plain, warm, precise. Write for a 60-year-old patient and a worried parent at once. Explain each term the first time it appears. Short sentences. "We" and "you".

### 7.2 Service page template (every service page)
1. **H1** + a 2 to 3 sentence answer-first intro: what it is, who it is for, what happens here.
2. Who should consider it (bullets).
3. What happens at the clinic (visit flow, tests done in-house, same-day where true).
4. How to prepare / what to bring.
5. After your visit (follow-up, reports).
6. **"When to see a doctor urgently"** (an emergency callout where relevant).
7. **FAQs (4 to 8)**: real patient questions, current topics, answers of 40 to 80 words.
8. Reviewer box, related services, CTA.
9. Frontmatter: title (60 characters max), description (155 max), badge, reviewer, lastReviewed, faqs, related.

### 7.3 AI-tone blacklist (never write these)
- delve, navigate (as a metaphor), embark, realm, tapestry, testament
- seamless, comprehensive, holistic, robust, leverage, empower, elevate, unlock, tailored, cutting-edge, state-of-the-art, world-class, top-notch, game-changer, peace of mind, rest assured, one-stop solution
- "it's important to note", "in today's fast-paced world", "whether you're … or …", "not just … but …", "look no further"
- furthermore, moreover, additionally (at the start of a sentence)
- rhetorical-question headings, exclamation marks, emojis, Title Case headings
- em and en dashes (use "to" for ranges: "8:30 am to 6 pm")

### 7.4 Generic true lines (use instead of asking treatment-detail questions)
- "Dr. [name] decides the right tests and treatment for you after examining you."
- Check-ups: "Each check-up is designed by the doctor after consultation, based on your conditions and symptoms, so no test is repeated or wasted."
- Testing (psychology): "Dr. [name] chooses standardised assessments based on your child's needs and explains the results in plain words. Our reports help parents and schools plan support. Official disability certificates are issued by government medical boards."
- Counselling: "Sessions are private, unhurried and planned around your teenager's needs."
- Lab: "Reports are checked and signed by a qualified pathologist. Most routine reports are ready the same day."
- Equipment: "We use a modern [type of device]" (never a model name).

### 7.5 Blogs
- Keep the original publish dates; add "Updated"; sign each post by its doctor; add an "In brief" box, FAQs, sources, callouts, related services.
- Plan 2 doctor-reviewed posts a month (target 25 in year one).
- Give the client a topic list built from their services plus current Indian health topics (e.g. the HPV vaccine programme, HbA1c explained, exam stress).

---

## PART 8. SEO, schema, GEO and AEO checklist (the final pre-launch pass)

**Technical SEO:**
- Unique titles and descriptions (CSV export).
- Self-canonicals on the final host; `trailingSlash: true` with consistent canonicals, sitemap and redirects (no chains).
- `lang="en-IN"` and `og:locale en_IN`.
- OG images per page via `opengraph-image`.
- AVIF + WebP; alt text.
- Security headers: HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, a CSP allowing only YouTube-nocookie, Maps after click, GA after consent, Turnstile and Speed Insights.
- `poweredByHeader:false`; no production source maps.
- 301s for every old URL; 410 for demo/lorem URLs.
- A branded 404.
- Sitemap with `lastModified`.
- **The `SITE_INDEXABLE` switch:** until launch, `X-Robots-Tag: noindex`, meta noindex and `robots.txt Disallow: /` on every host (the temporary vercel.app URL must never be indexed).

**Schema (one `@graph` per page with stable `@id`s: `#clinic`, `#dr-x`, `#website`):**
- `MedicalClinic` (address, geo, phones, email, `openingHoursSpecification`, `foundingDate`, `medicalSpecialty`, `department` lab/pharmacy with their own hours, `ContactPoint` with phone hours, `areaServed` = city + districts + `GeoCircle` radius 100 km, `sameAs` = GBP Maps URLs).
- `Physician` per doctor (`medicalSpecialty`, `knowsAbout`, `availableService` as MedicalTest/MedicalTherapy/MedicalProcedure, `alumniOf`, `hasCredential`, `memberOf`, `affiliation`, `knowsLanguage`).
- `Organization` (`founder`); `WebSite` (`inLanguage en-IN`).
- `MedicalWebPage` (`about`, `reviewedBy`, `lastReviewed`); `MedicalCondition` on condition pages (with common local names, e.g. madhumeh).
- `BlogPosting` (author, reviewedBy, datePublished, dateModified); `FAQPage` only where FAQs are visible; `BreadcrumbList`; `VideoObject`.
- **No `AggregateRating`/`Review`.**

**Local SEO / catchment:**
- One genuine listing.
- The "Coming from outside [city]" page + a line on Contact, Plan your visit and the footer naming the towns.
- **No per-town doorway pages.**
- GBP fixes at launch: rename a keyword-stuffed name; create a profile for each separate centre; website links with UTM; hours matching the site.

**GEO/AEO:**
- `/llms.txt` + `/llms-full.txt` generated from content at build time.
- `robots.txt` allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended **at launch**.
- Answer-first intros in real HTML near the top.
- All FAQ, tab and carousel text in the initial HTML (verify with curl).
- `entity-facts.md` (identical NAP, hours and credentials for GBP, Justdial and Practo).
- IndexNow pings after deploys (enabled at launch).
- The A/A+ text-size switch; the "Find care by concern" row.

**AI-fingerprint clean-up:**
- Zero em and en dashes in rendered HTML and JSON-LD (enforced by a build check).
- A tone sweep (Part 7.3) logged to `tone-cleanup.md`.
- Remove comments mentioning AI tools or prompts, console logs, `data-testid` in production, lorem/TODO/[CONFIRM] in output.
- Neutral README and `package.json`; agent files never served; commits under the agency identity (do not rewrite history).
- Strip image EXIF/GPS; no "Made with" badges.

**Performance budgets:** Lighthouse mobile Performance at least 90, Accessibility 100, Best Practices 100, SEO 100 at launch (about 69 before launch is expected because of noindex). CLS under 0.1 (target 0). Home first-load JS at most 230 KB gzipped. Only the hero image preloaded. Fonts self-hosted. Map and video load on click. Report **medians of 3 runs** on the deployed URL (local runs vary wildly with CPU load).

---

## PART 9. Engineering standards (tell the coding agent)

- **Stack:**
  - Next.js App Router (latest stable), TypeScript strict, Tailwind v4 (tokens as CSS variables)
  - Radix primitives (NavigationMenu, Dialog/Sheet; Tabs and Accordion can be native for size), Embla, `next/font`, `next/image`, sharp, Zod, remark/rehype
  - Hosting on Vercel (functions region nearest the clinic, e.g. `bom1` for India)
- **Content:** `resources/content/**.md` with Zod-validated frontmatter. `[CONFIRM]` shows as a yellow chip in dev, is hidden in production, and fails `npm run launch-check`.
- **Single sources:** `lib/site-config.ts` (NAP, hours, phones, email, experience years, founding year, Google profiles, service area, `legalLastUpdated`, `TODO_CONFIRM`), `lib/nav.ts`, `lib/service-badges.ts`, `lib/booking-context.ts` (page → doctor + reason prefill), `lib/whatsapp.ts` (page-based message), `lib/consent.ts` (consent store).
- **Forms (Part 9.1):** Server Action + Resend; no database.
- **Tests (Playwright):**
  - nested interactives (`a a, a button, button a` = 0 on all routes)
  - forms (validation, under-18 guardian, success/failure, honeypot)
  - consent (zero GA, Maps or YouTube requests before consent or click)
  - design (no overflow at 390/768/1024/1440; mobile section height; autoplay pause; marquee)
  - mega menu (no overlapping links; panel inside the viewport)
- **Git:** a branch per phase; preview deploys; merge after approval.
- **Known pitfalls (fixed once, avoid next time):**
  - Cards containing links → use the **stretched-link pattern** (no `<a>` inside `<a>`).
  - `useSyncExternalStore` `getSnapshot` must return a cached value (otherwise an infinite loop in the cookie banner).
  - Never apply `content-visibility:auto` above the fold; its intrinsic size must match, or CLS appears.
  - Radix NavigationMenu viewport width bug → explicit grid widths per panel.
  - Reveal animations must not delay the LCP element; preload only one Devanagari or serif font.
  - `trailingSlash: true` saves a 308 hop per page.
  - Gmail cannot be a sender: verify the clinic domain in Resend (ADD SPF/DKIM/DMARC records, never touch MX).
  - Thumbnails with text baked in: never overlay titles on them.
  - Do not use video thumbnails as blog covers.
  - Lighthouse "Lantern" simulation can inflate LCP: confirm with a direct measurement.

### 9.1 Appointment and workshop forms
- **Appointment fields:**
  - patient name; mobile (normalise to +91, 10 digits starting 6 to 9)
  - age + Years/Months
  - doctor; reason (dropdown)
  - preferred date (today to +60 days, Sunday note) + time of day derived from OPD hours
  - city (optional)
  - under-18 checkbox → guardian name required, guardian consent text, and a block when the age is under 18 and the box is unticked
  - consent checkbox (unticked); a line under the form: "Please do not include detailed medical information..."
- **Workshop form:** organisation, audience, age range, number, dates, topics, language, contact, mobile, email, consent.
- **Spam:** honeypot + 3s minimum fill time + Turnstile (when keys are set).
- **Email to the clinic:** a field table, `tel:` and `wa.me` links, source page, IST time, **exact consent text and time**. Workshop requests also get an acknowledgement to the requester.
- **States:**
  - an error summary with focus and ARIA
  - failure → Call + WhatsApp buttons, data kept
  - success → `/thank-you/?type=` (noindex) with the confirmation time and the emergency line
  - works without JS
- **Analytics:** GA4 via gtag injected only after Accept. Consent Mode v2 (ad signals always denied). Events: `book_click`, `call_click`, `whatsapp_click`, `directions_click`, `map_load`, `video_play`, `generate_lead` (`form_type` only). No PII or health data; query strings stripped except `utm_*`. Vercel Speed Insights (cookieless).

---

