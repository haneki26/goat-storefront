"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/brand";

/** Rotating top messages: slide up and out, next slides in. */
export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 3400);
    return () => clearInterval(t);
  }, []);

  const [a, b] = ANNOUNCEMENTS[i];
  return (
    <div className="relative h-9 overflow-hidden" role="status" aria-live="off">
      <AnimatePresence initial={false}>
        <motion.p
          key={i}
          className="absolute inset-0 flex items-center justify-center gap-2.5 whitespace-nowrap text-[0.62rem] sm:text-[0.68rem]"
          initial={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <b className="font-extrabold uppercase tracking-[0.2em]">{a}</b>
          <em className="font-serif text-sm normal-case tracking-normal">{b}</em>
        </motion.p>
      </AnimatePresence>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 gap-1.5 md:flex" aria-hidden>
        {ANNOUNCEMENTS.map((_, n) => (
          <i key={n} className={`h-[5px] rounded-full bg-black transition-all duration-500 ${n === i ? "w-3.5 opacity-100" : "w-[5px] opacity-20"}`} />
        ))}
      </div>
    </div>
  );
}
