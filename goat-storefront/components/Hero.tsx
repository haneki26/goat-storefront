"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES } from "@/lib/commerce";

const VIDEO = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;
const POSTER = process.env.NEXT_PUBLIC_HERO_POSTER_URL;
const rise = { hidden: { y: "105%" }, show: (i: number) => ({ y: 0, transition: { duration: 1.1, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] as const } }) };

export function Hero({ priceLabel }: { priceLabel: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  return (
    <section ref={ref} data-theme="dark" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black pb-20 pt-40 text-[#f7f3ec] md:pt-48">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        {VIDEO ? (
          <video className="size-full object-cover" src={VIDEO} poster={POSTER} autoPlay muted loop playsInline preload="metadata" aria-hidden />
        ) : reduce ? null : (
          // Live bottle animation from the current GOAT site (GIF on Shopify CDN). Set NEXT_PUBLIC_HERO_VIDEO_URL to an MP4 for a much lighter load.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={IMAGES.heroGif} alt="" fetchPriority="high" className="size-full object-cover object-center" />
        )}
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-5">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }} className="flex items-center gap-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] md:text-xs md:tracking-[0.42em]">
          <span aria-hidden className="h-px w-10 bg-[#f472b6]" />New · Tropical Mango Pre-Workout
        </motion.p>

        <h1 className="mt-6">
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span className="font-display block text-[clamp(4.6rem,25vw,10.5rem)] leading-[0.86]" variants={rise} custom={0} initial="hidden" animate="show">Unlock</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span className="font-serif holo-text block text-[clamp(3.6rem,19.5vw,8.6rem)] font-medium italic leading-[1]" variants={rise} custom={1} initial="hidden" animate="show">Greatness</motion.span>
          </span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9 }} className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
          GOAT PWO. Clean energy, razor focus, relentless pump and all-session hydration. Vegan. Made in Norway.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.9 }} className="mt-8 flex flex-wrap gap-3">
          <Link href="/products/g-o-a-t-pwo-mango" className="btn btn-primary">Shop GOAT PWO · {priceLabel}</Link>
          <Link href="/#formula" className="btn border-white/60 text-white hover:bg-white hover:text-black">Explore the formula</Link>
        </motion.div>
      </div>
    </section>
  );
}
