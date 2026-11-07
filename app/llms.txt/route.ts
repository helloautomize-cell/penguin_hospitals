import { allPages } from "@/lib/content";
import { site } from "@/lib/site-config";
import { doctors } from "@/lib/doctors";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.shortName}) in ${site.address.locality}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}. Two chapters under one roof: pregnancy and women's health with ${doctors[0].name} ${doctors[0].nameSoft} (MBBS, DNB Obstetrics and Gynaecology, ultrasound fellowship) and heart and vascular surgery with ${doctors[1].name} ${doctors[1].nameSoft} (MBBS, MS, MCh CTVS). Emergency open day and night. Phone ${site.phone.display}, landline ${site.landline.display}.`,
    "",
    "## Pages",
    "",
  ];
  for (const p of allPages()) {
    if (p.hidden || p.url === "/thank-you/") continue;
    const title = p.title.replace(/\s*\|\s*Penguin Hospital\s*$/, "");
    const desc = p.description ? `: ${p.description}` : "";
    lines.push(`- [${title}](https://penguinhospitals.com${p.url})${desc}`);
  }
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
