# Penguin Hospital website: developer handoff

> **Version 3 (2 Nov 2026).** Adds 35 new AI photos to `resources/images/_source/ai-photos/` (W1 to W19, H2 to H9, C2, C3, C5, S1 to S3, S5, S6) and a new prompt, `prompts/phase-2b-icons-and-badges.md`, in which the agent draws every icon and service badge as SVG. Run 2b after Phase 2, or now if you are further along. **Already building?** Copy `resources/images/_source/ai-photos/` and `prompts/phase-2b-icons-and-badges.md` into the repo, then paste the 2b prompt.
>
> **Version 2 (2 Nov 2026).** Adds the approved 14-page preview in `resources/reference/main-pages/` as the main visual reference, and updates the plan, agent brief and prompts to require matching it. **Already started with version 1?** Copy this pack over the repo (keep your code), then paste `prompts/FIX-match-the-preview.md` before continuing with the next phase.

Everything the coding agent needs to build the new site, in one folder. Prepared by Automize Media, 2 November 2026.

## What is inside

| Path | What it is |
|---|---|
| `CLAUDE.md`, `AGENTS.md` | Standing instructions for the agent (same as `AGENT-BRIEF.md`). They sit at the repo root so the agent reads them every session |
| `prompts/phase-1` to `phase-8` | One prompt per phase. Paste them one at a time |
| `prompts/phase-2b-icons-and-badges.md` | Icons and the 31 service badges, drawn as SVG. Run after Phase 2 |
| `resources/docs/design-development-plan.md` | The design and build plan. Section 0 overrides everything |
| `resources/docs/agency-standards.md` | Engineering, SEO, compliance, form and test standards |
| `resources/docs/site-plan.md` | 53 pages, URLs, navigation, redirects, home order |
| `resources/docs/IMAGE-GUIDE.md`, `hero-image-prompts.md` | Images we have, images still to make, AI prompts, badge brief |
| `resources/docs/current-website-audit.md`, `client-answers.md` | Background |
| `resources/content/` | Final copy for every page (00 to 05). Source of truth for every word |
| `resources/reference/main-pages/` | **The approved 14-page preview: the look the site must match.** Read its README; screenshots included |
| `resources/reference/home-hero/` | The approved home hero. Open `index.html` in a browser |
| `resources/reference/home-sections/` | The approved home sections below the hero. Open `index.html`. Ignore its hero and its "two doors" section |
| `resources/images/_source/` | Logo, real hospital photos, AI photos. See its README |

## How to run it

1. Create an empty GitHub repository (suggested name: `penguin-hospital-website`) and a Vercel project linked to it, region `bom1`.
2. Unzip this folder's contents into the repository root, so `CLAUDE.md` and `resources/` are at the top level. Commit to `main`.
3. Open your coding agent in the repository.
4. Paste `prompts/phase-1-foundation-styleguide.md`. Wait for its report.
5. Review the preview link and screenshots. When you are happy, merge the branch to `main` and paste the next prompt. If not, reply with fixes on the same branch.
6. After Phase 2, paste `phase-2b-icons-and-badges.md`. Then repeat until Phase 8. Do not skip phases or paste two at once.

## Before launch (not needed to start building)

- Client answers for every ★ item in `resources/content/05-confirm-and-doctor-questionnaire.md`. `npm run launch-check` lists what is still open.
- A clinic domain email, verified in Resend, for the form emails.
- Doctor portrait shoot and the remaining images in the image guide.
- Doctors sign off the pages they review, and a legal review of the 7 legal pages.
