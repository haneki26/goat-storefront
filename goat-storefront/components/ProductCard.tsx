import Image from "next/image";
import Link from "next/link";
import { formatMoney, savingsPercent } from "@/lib/commerce/format";
import type { Product } from "@/lib/commerce/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const lowest = product.variants.reduce((m, v) => (v.price.amount < m.price.amount ? v : m), product.variants[0]);
  const save = Math.max(...product.variants.map((v) => savingsPercent(v.price, v.compareAtPrice)));
  const multi = product.variants.length > 1;

  return (
    <Link href={`/products/${product.handle}`} className="group block overflow-hidden rounded-[1.5rem] bg-coal transition duration-500 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={product.featuredImage.url} alt={product.featuredImage.alt} fill priority={priority} sizes="(min-width:768px) 40vw, 92vw" className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105" />
        {save > 0 && <span className="absolute left-4 top-4 rounded-full bg-[#db2777] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-[#fff]">Save {save}%</span>}
      </div>
      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <p className="eyebrow">{product.productType || "GOAT"}</p>
          <h3 className="font-display mt-1 text-3xl">{product.title}</h3>
        </div>
        <p className="text-right text-sm">
          {multi && <span className="block text-xs text-mute">From</span>}
          <b className="text-lg">{formatMoney(lowest.price)}</b>
        </p>
      </div>
    </Link>
  );
}
