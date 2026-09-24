"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { PaymentBadges } from "./PaymentBadges";
import { FREE_SHIPPING_THRESHOLD, IS_LIVE, formatMoney } from "@/lib/commerce";

export function CartView() {
  const { cart, busy, error, setQty, remove } = useCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="mt-12 rounded-[1.75rem] bg-coal p-12 text-center">
        <p className="font-serif text-4xl italic">Nothing here yet</p>
        <p className="mt-2 text-mute">Fuel your next session.</p>
        <Link href="/products/g-o-a-t-pwo-mango" className="btn btn-primary mt-6">Shop GOAT PWO</Link>
      </div>
    );
  }

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cart.subtotal.amount, 0);
  const progress = Math.min(cart.subtotal.amount / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr]">
      <div>
        <div className="rounded-2xl bg-coal p-5">
          <p className="text-sm" aria-live="polite">{remaining > 0 ? <>Add <b className="text-accent">{formatMoney({ amount: remaining, currencyCode: "NOK" })}</b> for free shipping</> : <b className="text-accent">You&apos;ve unlocked free shipping</b>}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progress * 100}%` }} /></div>
        </div>
        <ul className="mt-2 divide-y divide-line">
          {cart.lines.map((l) => (
            <li key={l.id} className="flex gap-5 py-6">
              <div className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-coal">{l.image && <Image src={l.image.url} alt={l.image.alt} fill sizes="112px" className="object-cover" />}</div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <Link href={`/products/${l.productHandle}`} className="font-semibold hover:text-accent">{l.productTitle}</Link>
                  <b>{formatMoney({ amount: l.price.amount * l.quantity, currencyCode: l.price.currencyCode })}</b>
                </div>
                {l.variantTitle !== "Default Title" && <p className="text-sm text-mute">{l.variantTitle}</p>}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full border border-line">
                    <button aria-label="Decrease quantity" disabled={busy} className="grid size-9 place-items-center hover:text-accent" onClick={() => setQty(l.id, l.quantity - 1)}>−</button>
                    <span className="w-7 text-center text-sm">{l.quantity}</span>
                    <button aria-label="Increase quantity" disabled={busy} className="grid size-9 place-items-center hover:text-accent" onClick={() => setQty(l.id, l.quantity + 1)}>+</button>
                  </div>
                  <button className="text-xs uppercase tracking-widest text-mute hover:text-white" onClick={() => remove(l.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-[1.75rem] bg-coal p-7 md:sticky md:top-40">
        {error && <p role="alert" className="mb-3 text-sm text-red-500">{error}</p>}
        <div className="flex items-baseline justify-between"><span className="text-sm uppercase tracking-widest text-mute">Subtotal</span><span className="font-display text-4xl">{formatMoney(cart.subtotal)}</span></div>
        <p className="mt-2 text-xs text-mute">Taxes and shipping calculated at checkout.</p>
        {IS_LIVE ? <a href={cart.checkoutUrl} className="btn btn-primary mt-6 w-full">Secure checkout</a> : <><button disabled className="btn btn-primary mt-6 w-full">Secure checkout</button><p className="mt-3 text-center text-xs text-mute">Demo mode: connect Shopify keys to enable checkout.</p></>}
        <PaymentBadges className="mt-5 justify-center" />
        <Link href="/shop" className="mt-5 block text-center text-xs uppercase tracking-widest text-mute hover:text-white">Continue shopping</Link>
      </aside>
    </div>
  );
}
