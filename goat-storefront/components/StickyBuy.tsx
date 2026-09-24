"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/commerce/format";
import type { Product } from "@/lib/commerce/types";

/** Mobile-only bar that appears once the main buy button scrolls out of view. */
export function StickyBuy({ product }: { product: Product }) {
  const { add, busy } = useCart();
  const [show, setShow] = useState(false);
  const v = product.variants.find((x) => /popular/i.test(x.title)) ?? product.variants[0];

  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-void px-4 py-3 transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!show}>
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{product.title}</p>
          <p className="text-xs text-mute">{formatMoney(v.price)}</p>
        </div>
        <button tabIndex={show ? 0 : -1} className="btn btn-primary" disabled={busy || !v.availableForSale} onClick={() => add([{ variantId: v.id, quantity: 1 }])}>Add to cart</button>
      </div>
    </div>
  );
}
