import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-36 md:pt-48">
      <p className="eyebrow">Cart</p>
      <h1 className="h-mix mt-3 text-6xl md:text-8xl">Your <em>cart</em></h1>
      <CartView />
    </div>
  );
}
