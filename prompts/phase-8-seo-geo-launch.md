# Phase 8: SEO, schema, GEO/AEO and launch readiness (run LAST)

**When to run this:** only after `fix-mobile-polish` (and every other open FIX branch) is merged to `main` and I have approved the preview. This phase checks the finished site, so it must see the final pages.

Branch: `phase-8` from the latest `main`. Deploy a Vercel preview. Do not merge to `main` until I approve. Do not start the launch itself. The agency decides when to go live.

Before starting, confirm these exist and list them. If any is missing, STOP and tell me:
- `CLAUDE.md`
- `resources/docs/agency-standards.md` (Part 8 is the checklist for this phase)
- `resources/docs/site-plan.md` (section 9 is the redirect table)
- `resources/docs/current-website-audit.md` (old URLs)
- `resources/content/05-confirm-and-doctor-questionnaire.md`
- `lib/site-config.ts`

Non-negotiables from `CLAUDE.md` still apply: words only from `resources/content/`; no testimonials, ratings, "best", patient counts, prices, cure claims, drug or brand names; no em or en dashes; PCPNDT line on pregnancy pages; "Call 108 or 112"; `[CONFIRM]` stays as a chip in dev and fails `launch-check`; never remove `hidden: true`.

---

## A. Bugs I found on the live preview today (fix first)
I checked https://penguin-hospitals.vercel.app on 7 Nov 2026:
1. **`/robots.txt` and `/sitemap.xml` return 404.** The catch-all `[slug]` route is catching them (the 404 HTML shows `"k":"robots.txt"` and `"k":"sitemap.xml"` as slugs). Add `app/robots.ts` and `app/sitemap.ts`, and make the catch-all call `notFound()` only for unknown content slugs, never for files. Also exclude `dev`, `styleguide` and `blog-post-title` from `generateStaticParams`.
2. **`/llms.txt` returns 404.** Build it (section E).
3. **Duplicate brand in titles.** `/pregnancy-care/` title is "Pregnancy care in Chinchwad | Antenatal check-ups | Penguin Hospital | Penguin Hospital". The page title already ends with the brand and the root `title.template` adds it again. Strip the brand from content titles or drop the template suffix where the title already has it. Keep every title under 60 characters.
4. **Mixed schema types.** The home page outputs two `MedicalClinic` nodes and one `Hospital` node. There must be one entity, `@id: https://penguinhospitals.com/#clinic`, typed `["Hospital","MedicalClinic"]`, referenced by `@id` everywhere else.
5. **Old redirects use 308.** `/about-us/` answers 308. That is fine for Google, but set `statusCode: 301` in `next.config` redirects so Bing and older crawlers treat them as permanent. `/blog-post-title/` correctly answers 410; keep it.
6. **No web manifest.** `app/manifest.ts` comes from the mobile drop. Check it is served at `/manifest.webmanifest`.
7. **`/newborn-care/`** is linked but 404 (the mobile drop repoints the link). Make sure no internal link anywhere points to a 404: crawl every page and list broken links.

## B. Technical SEO (agency-standards Part 8, "Technical SEO")
- `metadataBase: new URL('https://penguinhospitals.com')`, self-canonical on every page with a trailing slash, matching the sitemap URLs exactly.
- Unique title (≤60) and description (≤155) on every route. Export them to `docs/seo-titles.csv` (route, title, length, description, length) so I can review.
- `lang="en-IN"`, `og:locale` `en_IN`, `og:site_name` "Dr. Lakshmi's Penguin Hospital".
- Open Graph images per page with `opengraph-image.tsx`: navy card, the page H1 in Figtree 700, the page's hero photo on the right, the new site icon bottom left. 1200×630. Twitter card `summary_large_image`.
- `sitemap.ts`: every public route with `lastModified` from content frontmatter (`lastReviewed`), no hidden pages, no `dev`, `styleguide` or 410 URLs.
- **`SITE_INDEXABLE` switch** (env var). While false (now): `X-Robots-Tag: noindex, nofollow` header, meta noindex, and `robots.txt` with `Disallow: /`. The vercel.app host must stay noindex for ever, even after launch (check `VERCEL_ENV` and the host).
- Security headers in `next.config`: HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic, geolocation off), `X-Frame-Options: SAMEORIGIN`, and a CSP that allows only self, Google Maps embed (after click), YouTube-nocookie, GA4 after consent, Turnstile and Vercel Speed Insights. `poweredByHeader: false`, no production source maps.
- Images: AVIF and WebP, every `<img>` has real alt text (decorative ones `alt=""`), EXIF and GPS stripped.
- Heading structure: one H1 per page, no skipped levels. List any page that breaks this.
- Branded 404 (from the mobile drop) returns status 404, not 200.

## C. Schema (one `@graph` per page, stable `@id`s)
Put builders in `lib/schema.ts`. Pull every fact from `lib/site-config.ts`. Anything still `[CONFIRM]` is left out of the schema, never guessed.
- `#website`: `WebSite`, `inLanguage: en-IN`, `publisher: #clinic`.
- `#clinic`: `["Hospital","MedicalClinic"]` with name "Dr. Lakshmi's Penguin Hospital", `alternateName` "Penguin Hospital", logo, image (real facade photo), full `PostalAddress` (Plot No. 59, New Pawana Nagar Society, Bijli Nagar Road, Chinchwad Gaon, Pimpri-Chinchwad, Maharashtra 411033, IN), `geo` from the Maps pin, telephone +91 95189 04156 and 020 2735 1100, `openingHoursSpecification` (emergency 24/7; OPD only once confirmed), `medicalSpecialty` (Obstetric, Gynecologic, Cardiovascular, Surgical), `department` for the in-house pharmacy, `areaServed` (Pimpri-Chinchwad, Chinchwad, Pimpri, Nigdi, Akurdi, Ravet, Moshi, Wakad, Hinjawadi, Punawale, Tathawade, Pune) plus a `GeoCircle` of 100 km, `founder: #dr-lakshmi`, `sameAs` (Google Maps link, Instagram @penguinhospital.pune, Facebook page, YouTube @PenguinHospital-b5l).
- `#dr-lakshmi` and `#dr-ashish`: `Physician` with `medicalSpecialty`, `knowsAbout`, `hasCredential` (MBBS, DNB OBG, ultrasound fellowship / MBBS, MS, MCh CTVS), `memberOf` (Indian Menopause Society, IOTA group), `worksFor: #clinic`, image (headshot), `url` (profile page). Registration number only once the council is confirmed.
- Every content page: `MedicalWebPage` with `about`, `reviewedBy` (the doctor), `lastReviewed`, `BreadcrumbList`.
- Condition pages (PCOS, fibroids, endometriosis, ovarian cysts, preeclampsia, varicose veins, peripheral artery disease, etc.): `MedicalCondition` with `alternateName` where the content gives a local name.
- Procedure pages (caesarean, laparoscopic surgery, bypass, valve, keyhole heart surgery, AV fistula): `MedicalProcedure`.
- `FAQPage` only where the FAQs are visible on that page. Health library posts: `BlogPosting` with author, `reviewedBy`, `datePublished`, `dateModified`.
- **Never** `AggregateRating` or `Review`.
- Validate every template with Google's Rich Results Test and validator.schema.org. Attach the results for home, `/pregnancy-care/`, `/bypass-surgery/`, both doctor pages and one health library post.

## D. Local SEO
- NAP (name, address, phone) identical everywhere: header, footer, Plan your visit, schema, `llms.txt`. Generate `docs/entity-facts.md` with the exact NAP, hours, doctor credentials and links, to paste into Google Business Profile, Justdial and Practo.
- The "Families come to us from" line (Plan your visit and footer) names the areas. **No per-area doorway pages.**
- Google Business Profile tasks for launch go in `docs/LAUNCH.md`: hours matching the site, category "Hospital" plus "Obstetrician-gynecologist" and "Cardiovascular surgeon" additional categories, website link with UTM (`?utm_source=gbp&utm_medium=organic`), the new photos, and the booking link to `/book/`.

## E. GEO and AEO (how AI search and answer engines read us)
- `/llms.txt` and `/llms-full.txt` generated at build time from `resources/content/` (a route handler or a build script). `llms.txt`: one-paragraph summary of the hospital, the two doctors with credentials, address and phone, then a link list of every service page with a one-line summary. `llms-full.txt`: the full plain text of every public page.
- `robots.ts` at launch allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended (while `SITE_INDEXABLE` is false everything stays disallowed).
- Every service page opens with an answer-first paragraph (what it is, who it is for, that it is done here in Chinchwad, which doctor) in real HTML near the top, not inside an animation.
- All FAQ, accordion, tab, carousel, chat-bubble and pinned-scene text must be in the initial HTML. Verify with `curl -s <url> | grep "<a sentence from the answer>"` for one FAQ answer on each template, and list the results. Animated sections can hide text visually, but not with conditional rendering.
- Each doctor's name, role and "Reviewed by" line appears in text (not only in images) on every page they review.
- IndexNow: add the key file and a post-deploy ping script, switched off until launch.

## F. Clean-up before launch
- Build check that fails on any em dash (—) or en dash (–) in rendered HTML or JSON-LD.
- Remove console logs, `data-testid` in production, comments that mention AI tools or prompts, lorem or TODO text. Agent files (`CLAUDE.md`, `AGENTS.md`, `resources/`) must never be served.
- Neutral `README.md` and `package.json` name.

## G. Performance and accessibility (final numbers)
Lighthouse mobile, medians of 3 runs on the deployed preview, for `/`, `/pregnancy-care/`, `/doctors/`, `/book/`, `/emergency/`:
- Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100 once indexable (expect SEO around 69 while noindex is on; that is fine).
- CLS < 0.1 (target 0), LCP < 2.5s, INP < 200ms.
- Home first-load JS ≤ 230 KB gzipped. Only the hero image preloaded. Fonts self-hosted. Map and video load on click.

## H. Redirects
Check every row of site-plan section 9 against the old URLs in the audit, plus every URL the old WordPress sitemap listed. Output a table: old URL, new URL, status code, pass/fail. No redirect chains.

## I. `npm run launch-check`
The output must be grouped as: blocks launch (★ items from `client-answers.md`), content placeholders (`[CONFIRM]` list with page and text), image placeholders, missing environment variables (Resend, Turnstile, GA4, `SITE_INDEXABLE`).

## J. Launch runbook: `docs/LAUNCH.md`
DNS steps for penguinhospitals.com (A/CNAME to Vercel; **never touch MX**), Resend domain records (SPF, DKIM, DMARC), Vercel production settings (region `bom1`, env vars), flip `SITE_INDEXABLE`, submit the sitemap in Google Search Console and Bing Webmaster Tools, request indexing for the top 10 pages, Google Business Profile updates, IndexNow on, and the rollback plan (re-point DNS to the old host, keep the WordPress site untouched until 30 days after launch).

---

## Report
- What was done, by section A to J, and anything you could not do and why
- `docs/seo-titles.csv`, the Rich Results results, the curl checks from E, the redirect table, the Lighthouse medians table
- `launch-check` output and the `[CONFIRM]` count
- The Part 8 table from agency-standards with Done, At launch or Clinic for each item

STOP after this.
