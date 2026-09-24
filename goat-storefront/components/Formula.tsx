"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { IMAGES } from "@/lib/commerce";

const STAGES = [
  { k: "Energy", t: "Clean energy, no crash", d: "230 mg caffeine per serving, paired with L-theanine for a smooth, controlled lift.", img: IMAGES.tubIce, stat: "230 mg" },
  { k: "Focus", t: "Locked in from rep one", d: "L-Tyrosine and Acetyl L-Carnitine support mental clarity when the session gets heavy.", img: IMAGES.tubMango, stat: "L-Theanine" },
  { k: "Pump", t: "Fuller. Harder. Longer.", d: "L-Citrulline Malate, L-Arginine AKG and Beta-Alanine built for pump and endurance.", img: IMAGES.gymBag, stat: "Citrulline" },
  { k: "Hydration", t: "Electrolytes built in", d: "Sodium chloride, tripotassium citrate and taurine keep you hydrated through the hardest sets.", img: IMAGES.sunset, stat: "Electrolytes" },
];

export function Formula() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(STAGES.length - 1, Math.floor(v * STAGES.length))));
  const s = STAGES[active];

  return (
    <section id="formula" aria-labelledby="formula-title" className="bg-coal">
      <div ref={ref} className="relative md:h-[300vh]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:sticky md:top-0 md:flex md:h-screen md:items-center md:py-0">
          <div className="grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow">The formula</p>
              <h2 id="formula-title" className="h-mix mt-3 text-5xl md:text-7xl">Engineered for the <em>session</em></h2>
              <ul className="mt-8">
                {STAGES.map((st, i) => (
                  <li key={st.k}>
                    <button onClick={() => setActive(i)} aria-current={i === active} className={`w-full border-l-[3px] px-5 py-3 text-left transition ${i === active ? "border-accent bg-void" : "border-transparent text-mute hover:text-white"}`}>
                      <span className="font-display text-3xl md:text-4xl">{st.k}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {i === active && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="px-5 pb-3 pt-2 text-mute"><b className="text-white">{st.t}. </b>{st.d}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-mute">Full ingredient list and serving info on the product page.</p>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-void">
              <AnimatePresence mode="popLayout">
                <motion.div key={s.k} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  <Image src={s.img} alt="" fill sizes="(min-width:768px) 40vw, 92vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <p className="font-display absolute bottom-5 left-5 rounded-full bg-black/70 px-5 py-2 text-4xl text-[#fff]">{s.stat}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
