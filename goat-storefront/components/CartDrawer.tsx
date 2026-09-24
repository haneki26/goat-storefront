"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { PaymentBadges } from "./PaymentBadges";
import { FREE_SHIPPING_THRESHOLD, IS_LIVE, formatMoney } from "@/lib/commerce";

export function CartDrawer() {
  const { cart, open, setOpen, busy, error, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const subtotal = cart?.subtotal.amount ?? 0;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog" aria-modal="true" aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-line bg-void"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-serif text-3xl italic">Your Cart</h2>
              <button aria-label="Close cart" className="grid size-10 place-items-center rounded-full border border-line hover:bg-white/10" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="border-b border-line px-6 py-4">
              <p className="text-sm text-white/80" aria-live="polite">
                {remaining > 0 ? <>Add <b className="text-accent">{formatMoney({ amount: remaining, currencyCode: "NOK" })}</b> for free shipping</> : <b className="text-accent">You&apos;ve unlocked free shipping</b>}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
                <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${progress * 100}%` }} transition={{ type: "spring", damping: 26 }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {!cart || cart.lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-serif text-3xl italic">Empty for now</p>
                    <p className="mt-2 text-sm text-mute">Fuel your next session.</p>
                    <Link href="/products/g-o-a-t-pwo-mango" onClick={() => setOpen(false)} className="btn btn-primary mt-6">Shop GOAT PWO</Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {cart.lines.map((l) => (
                    <li key={l.id} className="flex gap-4 py-5">
                      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-coal">
                        {l.image && <Image src={l.image.url} alt={l.image.alt} fill sizes="96px" className="object-cover" />}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <Link href={`/products/${l.productHandle}`} onClick={() => setOpen(false)} className="text-sm font-semibold leading-snug hover:text-accent">{l.productTitle}</Link>
                          <span className="text-sm font-semibold">{formatMoney({ amount: l.price.amount * l.quantity, currencyCode: l.price.currencyCode })}</span>
                        </div>
                        {l.variantTitle !== "Default Title" && <p className="mt-0.5 text-xs text-mute">{l.variantTitle}</p>}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-line">
                            <button aria-label="Decrease quantity" disabled={busy} className="grid size-8 place-items-center hover:text-accent" onClick={() => setQty(l.id, l.quantity - 1)}>−</button>
                            <span className="w-6 text-center text-sm" aria-live="polite">{l.quantity}</span>
                            <button aria-label="Increase quantity" disabled={busy} className="grid size-8 place-items-center hover:text-accent" onClick={() => setQty(l.id, l.quantity + 1)}>+</button>
                          </div>
                          <button className="text-xs uppercase tracking-widest text-mute hover:text-white" onClick={() => remove(l.id)}>Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart && cart.lines.length > 0 && (
              <div className="border-t border-line px-6 py-5">
                {error && <p role="alert" className="mb-3 text-sm text-red-400">{error}</p>}
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-widest text-mute">Subtotal</span>
                  <span className="font-display text-3xl font-bold">{formatMoney(cart.subtotal)}</span>
                </div>
                {IS_LIVE ? (
                  <a href={cart.checkoutUrl} className="btn btn-primary w-full">Secure checkout</a>
                ) : (
                  <>
                    <button className="btn btn-primary w-full" disabled>Secure checkout</button>
                    <p className="mt-3 text-center text-xs text-mute">Demo mode: connect Shopify keys to enable checkout.</p>
                  </>
                )}
                <Link href="/cart" onClick={() => setOpen(false)} className="mt-3 block text-center text-xs uppercase tracking-widest text-mute hover:text-white">View full cart</Link>
                <p className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.16em] text-mute">Taxes and shipping calculated at checkout</p>
                <PaymentBadges className="mt-4 justify-center" />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
