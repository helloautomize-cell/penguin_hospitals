# Launch runbook — penguinhospitals.com

The agency decides when to go live. This file lists the steps, in order.
Do not flip `SITE_INDEXABLE` or point DNS until `npm run launch-check` is
clean and the client has approved the preview.

## 0. Pre-flight (before anything public)

- [ ] `npm run launch-check` prints READY TO LAUNCH
  - all [CONFIRM] markers resolved with the client
  - all ★ blockers in `client-answers.md` answered
  - no em/en dashes in rendered output
- [ ] `npm run build` clean; `npm test` green
- [ ] Lighthouse medians (3 runs, mobile) on the Vercel preview meet budget
      (Perf >= 90, A11y 100, BP 100; SEO ~69 expected while noindex)

## 1. Vercel production settings

- Project region: `bom1` (Mumbai)
- Env vars (Production scope):
  - `RESEND_API_KEY`, `RESEND_FROM`, `CLINIC_EMAIL`
  - `NEXT_PUBLIC_GA4_ID`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
  - `SITE_INDEXABLE=false` still (flip in step 5)
- Confirm preview deploys keep `SITE_INDEXABLE=false` forever —
  `middleware.ts` also sends `X-Robots-Tag: noindex` on `*.vercel.app`.

## 2. DNS (registrar: [CONFIRM], MX provider: [CONFIRM])

- Apex `penguinhospitals.com` → A record `76.76.21.21` (Vercel)
- `www` → CNAME `cname.vercel-dns.com`
- **NEVER touch MX, SPF, DKIM, DMARC mail records** — email stays where it is.
- TTL 300 during cutover; raise afterwards.
- Keep the old WordPress host live and untouched for 30 days (rollback).

## 3. Email sending (Resend)

- Add domain `penguinhospitals.com` in Resend → get SPF + DKIM records.
- Add those TXT records to DNS. Wait for "Verified".
- DMARC: add `_dmarc` TXT `v=DMARC1; p=quarantine; rua=mailto:postmaster@penguinhospitals.com` [CONFIRM address]
- Set `RESEND_FROM=website@penguinhospitals.com`, redeploy, send a test form.

## 4. Domain on Vercel

- Project → Settings → Domains → add `penguinhospitals.com` and `www`.
- Choose redirect www → apex (or the agency's preference).
- Verify SSL issued; load https://penguinhospitals.com/ manually.

## 5. Go indexable

- Vercel env: set `SITE_INDEXABLE=true`, redeploy.
- Check: `curl -I https://penguinhospitals.com/` → no `X-Robots-Tag`,
  no `noindex` meta. `curl https://penguinhospitals.com/robots.txt` →
  allows listed bots + sitemap line.
- `curl https://penguin-hospitals.vercel.app/ -I` → still `X-Robots-Tag: noindex`.

## 6. Search Console + Bing

- Add property `https://penguinhospitals.com/` (DNS or file verification).
- Submit `https://penguinhospitals.com/sitemap.xml`.
- URL Inspection → Request indexing for the top 10 pages:
  `/`, `/pregnancy-care/`, `/doctors/`, both doctor profiles,
  `/bypass-surgery/`, `/heart-and-vascular-surgery/`,
  `/obstetrics-gynaecology/`, `/plan-your-visit/`, `/book/`.
- Bing Webmaster Tools: import from GSC or verify separately, submit sitemap.

## 7. Google Business Profile

- Hours must match `docs/entity-facts.md` exactly (OPD + emergency).
- Primary category: Hospital. Additional: Obstetrician-gynecologist,
  Cardiovascular surgeon.
- Website link:
  `https://penguinhospitals.com/?utm_source=gbp&utm_medium=organic`
- Appointment link:
  `https://penguinhospitals.com/book/?utm_source=gbp&utm_medium=organic`
- Upload the new photos (facade, doctors, interior).
- No keyword-stuffed name — use exactly "Dr. Lakshmi's Penguin Hospital".

## 8. IndexNow

- `public/indexnow-key.txt` already ships the key.
- After each deploy: `SITE_INDEXABLE=true node scripts/indexnow.mjs`.

## 9. Post-launch checks (day 1)

- [ ] Forms deliver to clinic inbox; Turnstile passes/fails correctly
- [ ] GA4 receives events only after cookie Accept
- [ ] `curl -s https://penguinhospitals.com/llms.txt` returns content
- [ ] Rich Results Test on home, `/pregnancy-care/`, `/bypass-surgery/`,
      both doctor pages, one library post — no errors
- [ ] 301 table re-verified on the live domain (docs redirect table)
- [ ] Lighthouse medians on production

## 10. Rollback plan

- If anything critical breaks in the first 30 days:
  1. Re-point DNS A/CNAME back to the old WordPress host (kept running).
  2. Set `SITE_INDEXABLE=false` in Vercel, redeploy.
  3. Keep Vercel preview noindexed; fix offline; repeat from step 2.
- Do not delete or alter the old site for 30 days after launch.

## 11. Remaining [CONFIRM] / launch blockers

See `npm run launch-check` — it prints every open item grouped as
launch blockers, content placeholders, image placeholders and env vars.
