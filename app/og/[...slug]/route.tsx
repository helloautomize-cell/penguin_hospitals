import { ogImage } from "@/lib/og-image";
import { getPage } from "@/lib/content";

export const dynamic = "force-static";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const url = "/" + (slug ?? []).join("/") + "/";
  const doc = getPage(url);
  const title = (doc?.title ?? "Penguin Hospital").replace(/\s*\|\s*Penguin Hospital\s*$/, "");
  const kicker = url.startsWith("/doctors/")
    ? "Doctors"
    : /pregnancy|delivery|pcos|menopause|fertil|period|fibroid|cyst|endometriosis|laparoscop|obstetr|gynaecol/.test(url)
      ? "Women's health"
      : /heart|bypass|valve|vein|artery|fistula|lung|vascular/.test(url)
        ? "Heart and vascular"
        : "Penguin Hospital";
  const img = url.includes("dr-lakshmi")
    ? "images/clinic/dr-lakshmi-portrait.jpg"
    : url.includes("dr-ashish")
      ? "images/clinic/dr-ashish-portrait.jpg"
      : "images/real/real-facade.jpg";
  return ogImage(title, kicker, img);
}
