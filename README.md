# Penguin Hospital website

Marketing site for Dr. Lakshmi's Penguin Hospital, Chinchwad Gaon,
Pimpri-Chinchwad. Next.js App Router, static-first, deployed on Vercel.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm test` | Playwright |
| `npm run launch-check` | Pre-launch gate (placeholders, env, dashes) |
| `node scripts/seo-titles.mjs` | Regenerate `docs/seo-titles.csv` |
| `node scripts/link-crawl.mjs` | Crawl for broken links (set `BASE`) |
| `node scripts/indexnow.mjs` | IndexNow ping (launch only) |

## Layout

- `app/` — routes, metadata routes (robots, sitemap, llms, manifest, og)
- `components/` — shell, home, page templates
- `lib/` — content loader, site config (NAP source of truth), schema builders
- `resources/content/` — page copy (frontmatter + markdown)
- `docs/` — entity facts, launch runbook, seo titles export
- `scripts/` — build, image and launch tooling

See `docs/LAUNCH.md` for the launch runbook.
