# Tone sweep log (agency-standards 7.3)

Swept rendered copy for the AI-tone blacklist. Method: grep of every page
frontmatter + body in `resources/content/`, plus component copy in
`components/` and `lib/site-config.ts`, for the banned patterns.

## Banned patterns checked

| Pattern | Hits | Action |
|---|---|---|
| em dash / en dash in rendered HTML + JSON-LD | 0 | enforced by `launch-check` dash scan |
| "best", "top", "leading", "world-class", "state-of-the-art" | 0 | none in content |
| testimonials, ratings, patient or surgery counts, prices | 0 | none |
| "cutting-edge", "comprehensive solutions", "your health is our priority" | 0 | none |
| "delve", "realm", "landscape" (LLM filler) | 0 | none |
| exclamation marks in body copy | 0 | none |
| "we understand that" / empathy-openers | 0 | none |

## Notes

- `|` separators are used in title tags instead of dashes (also avoids the
  dash ban).
- Ranges use "to" per 00-plan 0.3 ("4 pm to 6 pm").
- `[CONFIRM]` chips remain in dev output by design and fail launch-check.
