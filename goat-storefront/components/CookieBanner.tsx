"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const KEY = "goat.cookies.v1"; // "accepted" | "essential-only"

function store(set?: string) {
  try {
    if (set !== undefined) localStorage.setItem(KEY, set);
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Simple cookie-consent banner (EU/Norway). Choice is remembered locally; wire the two setters to your analytics/ad scripts' own consent APIs when those are added. */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!store()) setOpen(true);
  }, []);

  function choose(value: "accepted" | "essential-only") {
    store(value);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog" aria-modal="false" aria-label="Cookie settings"
          className="fixed inset-x-0 bottom-0 z-[95] border-t border-line bg-void/95 backdrop-blur"
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-mute">
              We use cookies to run the site and, with your consent, to understand how it&apos;s used. Read our{" "}
              <Link href="/privacy" className="text-white underline underline-offset-4 hover:text-accent">privacy policy</Link>.
            </p>
            <div className="flex shrink-0 gap-3">
              <button onClick={() => choose("essential-only")} className="btn btn-ghost">Essential only</button>
              <button onClick={() => choose("accepted")} className="btn btn-primary">Accept all</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
