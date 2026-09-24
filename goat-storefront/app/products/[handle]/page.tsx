import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { PaymentBadges } from "@/components/PaymentBadges";
import { SpecTiles } from "@/components/SpecTiles";
import { StickyBuy } from "@/components/StickyBuy";
import { PwoFacts, PwoIntro } from "@/components/ProductDetails";
import { isPwo } from "@/lib/productInfo";
import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { formatMoney, getProduct, getProducts } from "@/lib/commerce";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const p = await getProduct((await params).handle);
  return p ? { title: p.title, description: p.description.slice(0, 155), openGraph: { images: [p.featuredImage.url] } } : {};
}

const INGREDIENTS = ["Beta-Alanine", "L-Citrulline Malate", "L-Arginine Alpha-Ketoglutarate", "Acetyl L-Carnitine HCl", "L-Tyrosine", "Taurine", "L-Alanine", "Sodium Chloride", "Tripotassium Citrate", "Caffeine (230 mg)", "L-Theanine"];

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const [product, all] = await Promise.all([getProduct(handle), getProducts()]);
  if (!product) notFound();
  const others = all.filter((p) => p.id !== product.id);
  const pwo = isPwo(product);
  const sentences = product.description.split(/(?<=[.!?])\s+/);
  const short = sentences.slice(0, 2).join(" ");
  const rest = sentences.slice(2).join(" ");
  const low = product.variants.reduce((m, v) => (v.price.amount < m.price.amount ? v : m));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "GOAT Supplements" },
    offers: { "@type": "Offer", priceCurrency: low.price.currencyCode, price: low.price.amount, availability: low.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:pt-48">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start"><Gallery images={product.images.length ? product.images : [product.featuredImage]} /></div>
        <div>
          <p className="eyebrow">{product.productType === "BUNDLE" ? "Bundle & save" : "Pre-workout"}</p>
          <h1 className="font-display mt-3 text-6xl md:text-8xl">{product.title}</h1>
          <p className="mt-4 inline-flex rounded-full border border-current px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent">The GOAT of pre-workouts</p>
          <p className="mt-5 flex items-baseline gap-3">
            <b className="font-display text-4xl">{product.variants.length > 1 ? `From ${formatMoney(low.price)}` : formatMoney(low.price)}</b>
            {low.compareAtPrice && <s className="text-mute">{formatMoney(low.compareAtPrice)}</s>}
          </p>
          {pwo ? (
            <PwoIntro full={product.description} />
          ) : (
            <div className="mt-6 max-w-lg">
              <p className="leading-relaxed text-mute">{short}</p>
              {rest && (
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.2em] text-mute [&::-webkit-details-marker]:hidden">Read more <span aria-hidden className="text-accent">+</span></summary>
                  <p className="mt-3 leading-relaxed text-mute">{rest}</p>
                </details>
              )}
            </div>
          )}
          <div className="mt-8"><AddToCart product={product} /></div>

                    <PaymentBadges className="mt-4" />

          {!pwo && <details className="group mt-8 border-t border-line py-5" open>
            <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-2xl italic [&::-webkit-details-marker]:hidden">Key ingredients<span aria-hidden className="text-accent transition group-open:rotate-45">+</span></summary>
            <ul className="mt-4 flex flex-wrap gap-2">{INGREDIENTS.map((i) => <li key={i} className="rounded-full border border-line px-3 py-1 text-sm text-mute">{i}</li>)}</ul>
            <p className="mt-3 text-xs text-mute">Always check the label on your tub for the full ingredient list and directions.</p>
          </details>}
        </div>
      </div>

      {pwo && <PwoFacts />}
      <div className="-mx-5 mt-16"><SpecTiles /></div>
      <StickyBuy product={product} />

      {others.length > 0 && (
        <section className="mt-28" aria-labelledby="more">
          <h2 id="more" className="h-mix text-5xl">More from <em>GOAT</em></h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{others.slice(0, 2).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  );
}
