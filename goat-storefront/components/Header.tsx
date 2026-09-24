"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCart } from "./CartProvider";
import { ThemeToggle } from "./ThemeToggle";
import { LOGOS } from "@/lib/brand";

const LEFT = [
  { href: "/shop", label: "Shop" },
  { href: "/products/g-o-a-t-pwo-mango", label: "GOAT PWO" },
  { href: "/products/goat-holiday-bundle-2x-goat-pwo", label: "Bundles" },
];
const RIGHT = [
  { href: "/apparel", label: "Apparel", soon: true },
  { href: "/#formula", label: "The Formula" },
  { href: "/stack", label: "GOAT Stack" },
];
const ALL = [...LEFT, ...RIGHT];

const link = "whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/80 transition hover:text-black";

export function Header() {
  const { cart, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const count = cart?.totalQuantity ?? 0;

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <>
      {/* Always the light pink-to-white gradient, in both themes */}
      <div data-theme="light" className="grad-top fixed inset-x-0 top-0 z-50 border-b border-black/5">
        <AnnouncementBar />
        <header>
          <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:h-[6.5rem]">
            <button className="grid size-11 place-items-center rounded-full md:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <span className="block w-5 space-y-1.5"><i className="block h-px bg-black" /><i className="block h-px bg-black" /><i className="block h-px w-3 bg-black" /></span>
            </button>

            <nav aria-label="Primary" className="hidden w-[24rem] items-center gap-7 md:flex">
              {LEFT.map((n) => <Link key={n.href} href={n.href} className={link}>{n.label}</Link>)}
            </nav>

            <Link href="/" aria-label="GOAT Supplements home" className="absolute left-1/2 -translate-x-1/2">
              <Image src={LOGOS.emblem} alt="GOAT" width={140} height={96} priority className="h-[3.4rem] w-auto object-contain md:h-[5.6rem]" />
            </Link>

            <div className="flex items-center gap-2 md:w-[24rem] md:justify-end md:gap-6">
              <nav aria-label="Secondary" className="hidden items-center gap-5 md:flex">
                {RIGHT.map((n) => (
                  <Link key={n.href} href={n.href} className={link}>
                    {n.label}{n.soon && <span className="ml-1.5 rounded-full bg-[#db2777] px-1.5 py-0.5 text-[0.55rem] tracking-widest text-[#fff]">SOON</span>}
                  </Link>
                ))}
              </nav>
              <ThemeToggle />
              <button onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`} className="relative grid size-10 place-items-center rounded-full border border-black/20 bg-[rgba(255,255,255,0.6)] text-black transition hover:bg-[#fff]">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#db2777] text-[0.65rem] font-bold text-[#fff]">{count}</motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-40 bg-void px-6 pb-10 pt-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav aria-label="Mobile" className="flex flex-col">
              {ALL.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.1 }} className="border-b border-line">
                  <Link href={n.href} onClick={() => setMenu(false)} className="font-serif block py-2.5 text-[2.6rem] italic leading-tight">
                    {n.label}{"soon" in n && n.soon ? <small className="ml-3 rounded-full bg-[#db2777] px-2 py-1 align-middle font-sans text-[0.6rem] font-bold not-italic tracking-widest text-[#fff]">SOON</small> : null}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
