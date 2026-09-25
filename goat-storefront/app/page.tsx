import Image from "next/image";
import Link from "next/link";
import { ApparelSection } from "@/components/ApparelSection";
import { Faq } from "@/components/Faq";
import { Formula } from "@/components/Formula";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SocialFeed } from "@/components/SocialFeed";
import { SpecTiles } from "@/components/SpecTiles";
import { StackTeaser } from "@/components/StackTeaser";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyGoat } from "@/components/WhyGoat";
import { formatMoney, getProducts, IMAGES } from "@/lib/commerce";

export const revalidate = 300;

export default async function Home() {
  const products = await getProducts();
  const pwo = products.find((p) => p.handle === "g-o-a-t-pwo-mango") ?? products[0];
  const bundle = products.find((p) => p.productType === "BUNDLE");

  return (
    <>
      <Hero priceLabel={formatMoney(pwo.variants[0].price)} />
      <SpecTiles />
      <TrustStrip />
      <Marquee />

      <section aria-labelledby="drop-title" className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <p className="eyebrow">The must-have drop</p>
          <h2 id="drop-title" className="h-mix mt-3 text-5xl md:text-7xl">Pick your <em>fuel</em></h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (<Reveal key={p.id} delay={i * 0.1}><ProductCard product={p} priority={i === 0} /></Reveal>))}
        </div>
      </section>

      <Formula />
      <WhyGoat />

      {bundle && (
        <section aria-labelledby="bundle-title" className="mx-auto max-w-7xl px-5 py-24">
          <Reveal>
            <div data-theme="dark" className="relative overflow-hidden rounded-[1.75rem] bg-black text-[#f7f3ec]">
              <Image src={IMAGES.bundle3} alt="Three GOAT PWO tubs on ice" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative max-w-xl p-8 py-16 md:p-16 md:py-24">
                <p className="eyebrow !text-[#f472b6]">Best value</p>
                <h2 id="bundle-title" className="h-mix mt-3 text-5xl md:text-7xl">Stack up. <em>Save up to 30%.</em></h2>
                <p className="mt-5 text-white/75">2 tubs from {formatMoney(bundle.variants[0].price)}. 3 tubs {formatMoney(bundle.variants[bundle.variants.length - 1].price)}, the most popular pick.</p>
                <Link href={`/products/${bundle.handle}`} className="btn btn-primary mt-8">Shop bundles</Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <ApparelSection />
      <SocialFeed />
      <StackTeaser />
      <Faq />
    </>
  );
}
