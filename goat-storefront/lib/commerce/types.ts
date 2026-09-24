/** Platform-agnostic commerce types. Shared by the website and the future GOAT app. */
export type Money = { amount: number; currencyCode: string };
export type Img = { url: string; alt: string; width?: number; height?: number };

export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImage: Img;
  images: Img[];
  variants: Variant[];
};

export type CartLine = {
  id: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
  price: Money;
  compareAtPrice: Money | null;
  productHandle: string;
  productTitle: string;
  image: Img | null;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: Money;
  lines: CartLine[];
};

export type LineInput = { variantId: string; quantity: number };
