import type { MetadataRoute } from "next";
import { allPages, allPosts } from "@/lib/content";
import { allPageSlugs } from "@/lib/nav";

const ORIGIN = "https://penguinhospitals.com";
const SKIP = new Set(["/dev", "/styleguide", "/blog-post-title", "/thank-you/"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = new Map(allPages().map((p) => [p.url, p]));
  const urls = new Set<string>([...allPageSlugs, ...allPosts().map((p) => p.url)]);
  return [...urls]
    .filter((u) => u.startsWith("/") && !SKIP.has(u) && !docs.get(u)?.hidden)
    .map((u) => ({
      url: `${ORIGIN}${u}`,
      lastModified: docs.get(u)?.lastReviewed,
      changeFrequency: "monthly" as const,
      priority: u === "/" ? 1 : u.split("/").length <= 2 ? 0.8 : 0.7,
    }));
}
