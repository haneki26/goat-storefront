import type { Cart, CartLine, Img, Money, Product } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const money = (m: any): Money => ({ amount: Number(m.amount), currencyCode: m.currencyCode });
const img = (i: any, fallback: string): Img => ({
  url: i?.url ?? "",
  alt: i?.altText ?? fallback,
  width: i?.width ?? undefined,
  height: i?.height ?? undefined,
});

export function normalizeProduct(p: any): Product {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    productType: p.productType,
    tags: p.tags ?? [],
    featuredImage: img(p.featuredImage, p.title),
    images: (p.images?.nodes ?? []).map((i: any) => img(i, p.title)),
    variants: p.variants.nodes.map((v: any) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: money(v.price),
      compareAtPrice: v.compareAtPrice ? money(v.compareAtPrice) : null,
    })),
  };
}

export function normalizeCart(c: any): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: money(c.cost.subtotalAmount),
    lines: c.lines.nodes.map(
      (l: any): CartLine => ({
        id: l.id,
        quantity: l.quantity,
        variantId: l.merchandise.id,
        variantTitle: l.merchandise.title,
        price: money(l.merchandise.price),
        compareAtPrice: l.merchandise.compareAtPrice ? money(l.merchandise.compareAtPrice) : null,
        productHandle: l.merchandise.product.handle,
        productTitle: l.merchandise.product.title,
        image: l.merchandise.image
          ? img(l.merchandise.image, l.merchandise.product.title)
          : l.merchandise.product.featuredImage
            ? img(l.merchandise.product.featuredImage, l.merchandise.product.title)
            : null,
      }),
    ),
  };
}
