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
};
export default config;
