import type { Metadata } from "next";
import { Figtree, Instrument_Serif, Noto_Sans_Devanagari } from "next/font/google";
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

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600"],
  variable: "--font-devanagari",
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Penguin Hospital, Chinchwad",
    template: "%s | Penguin Hospital",
  },
  description:
    "Dr. Lakshmi's Penguin Hospital in Chinchwad Gaon, PCMC. Pregnancy and delivery, gynaecology and laparoscopy, and heart and vascular surgery. Emergency open day and night.",
  robots: { index: false, follow: false }, // SITE_INDEXABLE switch: noindex until launch
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
      className={`${figtree.variable} ${instrument.variable} ${devanagari.variable}`}
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
