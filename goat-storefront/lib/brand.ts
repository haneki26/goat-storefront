/** Brand constants shared by website and (later) the GOAT app. */
export const SOCIALS = [
  { key: "instagram", label: "Instagram", handle: "@goat.noglobal", href: "https://www.instagram.com/goat.noglobal/" },
  { key: "tiktok", label: "TikTok", handle: "@goat.supplements", href: "https://www.tiktok.com/@goat.supplements" },
  { key: "youtube", label: "YouTube", handle: "GOAT Supplements", href: "https://www.youtube.com/channel/UCd3uknQz5MkEiPlQjR2MAig" },
  { key: "pinterest", label: "Pinterest", handle: "GOATSUPP", href: "https://www.pinterest.com/GOATSUPP" },
] as const;

/** Official icon files copied from the current store (public/payments). Keep in sync with Shopify checkout settings. */
export const PAYMENTS = [
  { name: "Vipps", file: "vipps" },
  { name: "Visa", file: "visa" },
  { name: "Mastercard", file: "mastercard" },
  { name: "Maestro", file: "maestro" },
  { name: "Apple Pay", file: "apple-pay" },
  { name: "Google Pay", file: "google-pay" },
  { name: "Shop Pay", file: "shop-pay" },
  { name: "American Express", file: "amex" },
] as const;

/** Real logo assets used on the current site. Re-upload to Shopify Files and swap these URLs when convenient. */
export const LOGOS = {
  emblem: "https://cdn.shopify.com/s/files/1/0640/3781/4469/files/ChatGPT_Image_12._feb._2026_15_00_21_ee6db158-ae84-4a8a-a154-0fb7adc4e651.png?v=1770905070",
  wordmark: "https://files.ecomsend.com/prod/87050c3fc2326f1360153f8b0be586d4/202509/a4f0974a29e139638c31802352a6a0c9.png",
};

export const ANNOUNCEMENTS: [string, string][] = [
  ["Free shipping", "over 799 kr"],
  ["Tropical Mango", "is here"],
  ["Get 10% off", "your first order"],
  ["Price-match", "guarantee"],
  ["Hassle-free", "exchange"],
  ["Vegan", "made in Norway"],
  ["GOAT Apparel", "coming soon"],
];
