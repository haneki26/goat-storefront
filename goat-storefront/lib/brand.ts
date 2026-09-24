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

/** Official GOAT logo files (supplied by the brand), served from /public/brand. */
export const LOGOS = {
  emblem: "/brand/emblem.png",
  wordmark: "/brand/wordmark.png",
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
