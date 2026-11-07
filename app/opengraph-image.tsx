import { ogImage, OG_SIZE } from "@/lib/og-image";
import { site } from "@/lib/site-config";

export const alt = `${site.name}, ${site.area}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Together through life.", "Chinchwad Gaon, PCMC", "images/hero/hero-mother-newborn.jpg");
}
