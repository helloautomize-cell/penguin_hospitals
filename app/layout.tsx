import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  preload: true,
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  preload: false,
});

const INDEXABLE = process.env.SITE_INDEXABLE === "true" && process.env.VERCEL_ENV !== "preview";

export const metadata: Metadata = {
  metadataBase: new URL("https://penguinhospitals.com"),
  title: {
    default: "Penguin Hospital, Chinchwad",
    template: "%s | Penguin Hospital",
  },
  description:
    "Dr. Lakshmi's Penguin Hospital in Chinchwad Gaon, PCMC. Pregnancy and delivery, gynaecology and laparoscopy, and heart and vascular surgery. Emergency open day and night.",
  openGraph: {
    siteName: "Dr. Lakshmi's Penguin Hospital",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: INDEXABLE ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#001F43",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CookieBanner, CookieSettingsLink } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { Reveal } from "@/components/Reveal";
import { doctorImageSrcFor } from "@/lib/doctor-images.server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${instrument.variable}`}
    >
      <body suppressHydrationWarning>
        <SiteHeader
          docImgs={[
            doctorImageSrcFor("lakshmi", "Headshot"),
            doctorImageSrcFor("ashish", "Headshot"),
          ]}
        />
        <main id="top">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <FloatingWhatsApp />
        <CookieBanner />
        <CookieSettingsLink />
        <Analytics />
        <Reveal />
      </body>
    </html>
  );
}
