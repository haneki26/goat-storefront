import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/commerce";

export const metadata: Metadata = { title: "Shop" };
export const revalidate = 300;

export default async function Shop() {
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:pt-48">
      <p className="eyebrow">Shop</p>
      <h1 className="h-mix mt-3 text-6xl md:text-8xl">All <em>products</em></h1>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (<Reveal key={p.id} delay={i * 0.06}><ProductCard product={p} priority={i < 2} /></Reveal>))}
      </div>
    </div>
  );
}
