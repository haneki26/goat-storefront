import { IS_LIVE } from "./config";
import { MOCK_PRODUCTS } from "./mock";
import { normalizeCart } from "./normalize";
import { CART_ADD, CART_CREATE, CART_QUERY, CART_REMOVE, CART_UPDATE } from "./queries";
import { storefront } from "./storefront";
import type { Cart, LineInput } from "./types";

/**
 * Cart API. Same surface in live mode (Shopify Storefront API) and demo mode (localStorage),
 * so UI code never branches. The future GOAT app can import this file unchanged.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const KEY = "goat.cart.v1";

// ---------- live ----------
async function run(query: string, variables: Record<string, unknown>, field: string): Promise<Cart> {
  const data = await storefront<any>(query, variables, { revalidate: 0 });
  const payload = data[field];
  if (payload.userErrors?.length) throw new Error(payload.userErrors[0].message);
  return normalizeCart(payload.cart);
}

// ---------- demo ----------
function readDemo(): Cart | null {
  try {
    const raw = localStorage.getItem(KEY + ".demo");
    return raw ? (JSON.parse(raw) as Cart) : null;
  } catch {
    return null;
  }
}
function writeDemo(cart: Cart): Cart {
  const lines = cart.lines.filter((l) => l.quantity > 0);
  const next: Cart = {
    ...cart,
    lines,
    totalQuantity: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal: { amount: lines.reduce((s, l) => s + l.price.amount * l.quantity, 0), currencyCode: "NOK" },
  };
  try {
    localStorage.setItem(KEY + ".demo", JSON.stringify(next));
  } catch {}
  return next;
}
function demoLine(input: LineInput) {
  for (const p of MOCK_PRODUCTS) {
    const v = p.variants.find((x) => x.id === input.variantId);
    if (v)
      return {
        id: `line-${v.id}`,
        quantity: input.quantity,
        variantId: v.id,
        variantTitle: v.title,
        price: v.price,
        compareAtPrice: v.compareAtPrice,
        productHandle: p.handle,
        productTitle: p.title,
        image: p.featuredImage,
      };
  }
  throw new Error("Unknown variant");
}
function demoAdd(cart: Cart | null, inputs: LineInput[]): Cart {
  const base: Cart = cart ?? {
    id: "demo-cart",
    checkoutUrl: "#demo-checkout",
    totalQuantity: 0,
    subtotal: { amount: 0, currencyCode: "NOK" },
    lines: [],
  };
  const lines = [...base.lines];
  for (const input of inputs) {
    const existing = lines.find((l) => l.variantId === input.variantId);
    if (existing) existing.quantity += input.quantity;
    else lines.push(demoLine(input));
  }
  return writeDemo({ ...base, lines });
}

// ---------- public API ----------
export async function loadCart(): Promise<Cart | null> {
  if (!IS_LIVE) return readDemo();
  try {
    const id = localStorage.getItem(KEY);
    if (!id) return null;
    const data = await storefront<any>(CART_QUERY, { id }, { revalidate: 0 });
    return data.cart ? normalizeCart(data.cart) : null;
  } catch {
    return null;
  }
}

export async function addToCart(cart: Cart | null, inputs: LineInput[]): Promise<Cart> {
  if (!IS_LIVE) return demoAdd(cart, inputs);
  const next = cart
    ? await run(CART_ADD, { id: cart.id, lines: inputs.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity })) }, "cartLinesAdd")
    : await run(CART_CREATE, { lines: inputs.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity })) }, "cartCreate");
  try {
    localStorage.setItem(KEY, next.id);
  } catch {}
  return next;
}

export async function setLineQuantity(cart: Cart, lineId: string, quantity: number): Promise<Cart> {
  if (!IS_LIVE) return writeDemo({ ...cart, lines: cart.lines.map((l) => (l.id === lineId ? { ...l, quantity } : l)) });
  if (quantity <= 0) return run(CART_REMOVE, { id: cart.id, lineIds: [lineId] }, "cartLinesRemove");
  return run(CART_UPDATE, { id: cart.id, lines: [{ id: lineId, quantity }] }, "cartLinesUpdate");
}

export async function removeLine(cart: Cart, lineId: string): Promise<Cart> {
  return setLineQuantity(cart, lineId, 0);
}
