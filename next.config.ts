import type { NextConfig } from "next";

const INDEXABLE = process.env.SITE_INDEXABLE === "true";

const CSP = [
  "default-src 'self'",
  // Next inline hydration + GA4 + Vercel Speed Insights + Turnstile, all consent-gated in code
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "media-src 'self'",
  // Google Maps (click-to-load embed), YouTube-nocookie, Turnstile
  "frame-src https://www.google.com https://maps.google.com https://www.youtube-nocookie.com https://challenges.cloudflare.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  experimental: { optimizePackageImports: ["lucide-react", "@radix-ui/react-navigation-menu", "@radix-ui/react-accordion"] },
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: CSP },
          ...(INDEXABLE ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about/", statusCode: 301 },
      { source: "/contact-us", destination: "/contact/", statusCode: 301 },
      { source: "/obstetrics-care", destination: "/pregnancy-care/", statusCode: 301 },
      {
        source: "/polyendocrine-metabolic-ovarian-syndrome",
        destination: "/pcos/",
        statusCode: 301,
      },
      {
        source: "/dr-lakshmi-vijay-kalbande",
        destination: "/doctors/dr-lakshmi-vijay-kalbande/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
