import type { Product } from "./types";

/**
 * Local mock catalogue mirroring the live store (prices in NOK, real Shopify CDN imagery).
 * Used automatically until NEXT_PUBLIC_SHOPIFY_* env vars are set.
 */
const CDN = "https://cdn.shopify.com/s/files/1/0640/3781/4469/files";
const nok = (amount: number) => ({ amount, currencyCode: "NOK" });

export const IMAGES = {
  emblem: `${CDN}/ChatGPT_Image_12._feb._2026_15_00_21_ee6db158-ae84-4a8a-a154-0fb7adc4e651.png?v=1770905070`,
  heroGif: `${CDN}/copy_2BB0D288-8523-4DEC-876E-1638CD06FAA2_1.gif?v=1760362913`,
  tubIce: `${CDN}/ChatGPT_Image_17._des._2025_18_40_37.png?v=1765993577`,
  tubIce2: `${CDN}/ChatGPT_Image_17._des._2025_18_44_39.png?v=1765993577`,
  tubMango: `${CDN}/ChatGPT_Image_17._des._2025_18_42_48.png?v=1765993412`,
  gymBag: `${CDN}/IMG_7929.jpg?v=1765993577`,
  sunset: `${CDN}/IMG_7937.jpg?v=1765993577`,
  bundle2: `${CDN}/GOATTropicalMangopre-workoutifokus.png?v=1765898808`,
  bundle3: `${CDN}/ChatGPT_Image_29._mars_2026_20_18_27.png?v=1774808332`,
};

const img = (url: string, alt: string) => ({ url, alt });

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/mock-pwo",
    handle: "g-o-a-t-pwo-mango",
    title: "G.O.A.T PWO MANGO",
    description:
      "Premium pre-workout powder in Tropical Mango. Vegan and made in Norway. Each 15 g serving delivers 230 mg caffeine, L-theanine for smooth focus, performance amino acids and electrolytes for hydration and pump.",
    productType: "PWO",
    tags: ["PWO"],
    featuredImage: img(IMAGES.tubIce, "GOAT PWO Tropical Mango tub on ice"),
    images: [
      img(IMAGES.tubIce, "GOAT PWO Tropical Mango tub on ice"),
      img(IMAGES.tubIce2, "GOAT PWO Tropical Mango tub, studio"),
      img(IMAGES.gymBag, "GOAT PWO in a gym bag with mango"),
      img(IMAGES.sunset, "GOAT PWO at sunset"),
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-pwo-1",
        title: "Default Title",
        availableForSale: true,
        price: nok(489),
        compareAtPrice: nok(600),
      },
    ],
  },
  {
    id: "gid://shopify/Product/mock-bundle",
    handle: "goat-holiday-bundle-2x-goat-pwo",
    title: "GOAT Bundle",
    description:
      "Stock up on GOAT PWO Tropical Mango. Clean energy and focus, enhanced pump and endurance, hydration and electrolytes, in a multi-tub bundle that saves you money.",
    productType: "BUNDLE",
    tags: [],
    featuredImage: img(IMAGES.bundle2, "Two GOAT PWO tubs with mango"),
    images: [
      img(IMAGES.bundle2, "Two GOAT PWO tubs with mango"),
      img(IMAGES.bundle3, "Three GOAT PWO tubs on ice"),
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-bundle-2",
        title: "2 Tubs (Save 20%)",
        availableForSale: true,
        price: nok(694),
        compareAtPrice: nok(798),
      },
      {
        id: "gid://shopify/ProductVariant/mock-bundle-3",
        title: "3 Tubs (Save 30% – MOST POPULAR)",
        availableForSale: true,
        price: nok(894),
        compareAtPrice: nok(1190),
      },
    ],
  },
];
