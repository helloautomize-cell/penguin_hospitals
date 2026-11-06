import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { optimizePackageImports: ["lucide-react", "@radix-ui/react-navigation-menu", "@radix-ui/react-accordion"] },
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about/", permanent: true },
      { source: "/contact-us", destination: "/contact/", permanent: true },
      { source: "/obstetrics-care", destination: "/pregnancy-care/", permanent: true },
      {
        source: "/polyendocrine-metabolic-ovarian-syndrome",
        destination: "/pcos/",
        permanent: true,
      },
      {
        source: "/dr-lakshmi-vijay-kalbande",
        destination: "/doctors/dr-lakshmi-vijay-kalbande/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
