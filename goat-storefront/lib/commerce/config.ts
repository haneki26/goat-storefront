export const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
export const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
export const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2025-07";
export const FREE_SHIPPING_THRESHOLD = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 799);

/** When no Shopify credentials are set the storefront runs on a local mock catalogue. */
export const IS_LIVE = Boolean(SHOP_DOMAIN && STOREFRONT_TOKEN);
