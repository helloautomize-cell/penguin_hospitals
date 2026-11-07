import { allPages, allPosts } from "@/lib/content";
import { site } from "@/lib/site-config";

export const dynamic = "force-static";

export function GET() {
  const parts: string[] = [
    `# ${site.name}: full site text`,
    `Generated at build time from the site's published content. Base URL: https://penguinhospitals.com`,
    "",
  ];
  for (const p of [...allPages(), ...allPosts()]) {
    if (p.hidden || p.url === "/thank-you/") continue;
    const title = p.title.replace(/\s*\|\s*Penguin Hospital\s*$/, "");
    const body = p.body
      .replace(/\*\*H1:[^*]+\*\*/g, "")
      .replace(/\[(Reviewer box|Related[^\]]*|CONFIRM[^\]]*)\]/g, "")
      .replace(/\r/g, "")
      .trim();
    parts.push(`## ${title}\nURL: https://penguinhospitals.com${p.url}\n`, body, "");
  }
  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
