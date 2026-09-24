import { IS_LIVE } from "./config";
import { MOCK_PRODUCTS } from "./mock";
import { normalizeProduct } from "./normalize";
import { PRODUCTS_QUERY, PRODUCT_QUERY } from "./queries";
import { storefront } from "./storefront";
import type { Product } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getProducts(): Promise<Product[]> {
  if (!IS_LIVE) return MOCK_PRODUCTS;
  try {
    const data = await storefront<{ products: { nodes: any[] } }>(PRODUCTS_QUERY, { first: 24 });
    const list = data.products.nodes.map(normalizeProduct);
    return list.length ? list : MOCK_PRODUCTS;
  } catch (e) {
    console.error("[commerce] getProducts failed, using mock catalogue", e);
    return MOCK_PRODUCTS;
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!IS_LIVE) return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  try {
    const data = await storefront<{ product: any | null }>(PRODUCT_QUERY, { handle });
    return data.product ? normalizeProduct(data.product) : null;
  } catch (e) {
    console.error("[commerce] getProduct failed", e);
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
}
