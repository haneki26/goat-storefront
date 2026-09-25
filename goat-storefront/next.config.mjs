/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "files.ecomsend.com" },
      { protocol: "https", hostname: "goatpeakperformance.com", pathname: "/cdn/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Keep old Shopify-theme URLs (already indexed by Google, saved in ads/emails) working after the domain switch.
  // Product URLs (/products/<handle>) are unchanged — same Shopify backend — so they need no redirect.
  async redirects() {
    return [
      { source: "/policies/refund-policy", destination: "/returns", permanent: true },
      { source: "/policies/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/policies/terms-of-service", destination: "/terms", permanent: true },
      { source: "/policies/contact-information", destination: "/contact", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/faq/:slug*", destination: "/#faq", permanent: true },
      { source: "/collections/all", destination: "/shop", permanent: true },
      { source: "/collections/:slug*", destination: "/shop", permanent: true },
    ];
  },
};
export default config;
