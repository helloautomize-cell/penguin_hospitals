import type { MetadataRoute } from "next";

const INDEXABLE = process.env.SITE_INDEXABLE === "true";

// Bots we welcome at launch: search + AI answer engines.
const ALLOWED_BOTS = [
  "Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      ...ALLOWED_BOTS.map((bot) => ({ userAgent: bot, allow: "/" })),
      { userAgent: "*", allow: "/", disallow: ["/dev", "/styleguide", "/thank-you"] },
    ],
    sitemap: "https://penguinhospitals.com/sitemap.xml",
  };
}
