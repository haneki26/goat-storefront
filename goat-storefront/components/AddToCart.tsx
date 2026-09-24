"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatMoney, savingsPercent } from "@/lib/commerce/format";
import type { Product } from "@/lib/commerce/types";

export function AddToCart({ product, defaultIndex }: { product: Product; defaultIndex?: number }) {
  const { add, busy } = useCart();
  const initial = defaultIndex ?? Math.max(product.variants.findIndex((v) => /popular/i.test(v.title)), 0);
  const [idx, setIdx] = useState(initial);
  const [qty, setQty] = useState(1);
  const v = product.variants[idx];
  const multi = product.variants.length > 1;
  const save = savingsPercent(v.price, v.compareAtPrice);

  return (
    <div>
      {multi && (
        <fieldset className="mb-6">
          <legend className="eyebrow mb-3">Choose your bundle</legend>
          <div className="grid gap-3">
            {product.variants.map((opt, i) => {
              const on = i === idx;
              const s = savingsPercent(opt.price, opt.compareAtPrice);
              return (
                <label key={opt.id} className={`relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${on ? "border-accent bg-accent/10" : "border-line bg-coal hover:border-white/40"}`}>
                  <input type="radio" name="variant" className="sr-only" checked={on} onChange={() => setIdx(i)} />
                  <span className="text-sm font-semibold">{opt.title}</span>
                  <span className="text-right">
                    <b className="block">{formatMoney(opt.price)}</b>
                    {opt.compareAtPrice && <s className="text-xs text-mute">{formatMoney(opt.compareAtPrice)}</s>}
                    {s > 0 && !/save/i.test(opt.title) && <span className="ml-2 text-xs text-accent">Save {s}%</span>}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-[3.1rem] items-center rounded-full border border-line">
          <button aria-label="Decrease quantity" className="grid size-11 place-items-center hover:text-accent" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span className="w-6 text-center text-sm" aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" className="grid size-11 place-items-center hover:text-accent" onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
        <button className="btn btn-primary flex-1" disabled={busy || !v.availableForSale} onClick={() => add([{ variantId: v.id, quantity: qty }])}>
          {!v.availableForSale ? "Sold out" : busy ? "Adding…" : `Add to cart · ${formatMoney({ amount: v.price.amount * qty, currencyCode: v.price.currencyCode })}`}
        </button>
      </div>
      {save > 0 && !multi && <p className="mt-3 text-xs text-accent">You save {save}% today</p>}
    </div>
  );
}
