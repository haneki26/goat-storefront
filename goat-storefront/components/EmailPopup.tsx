"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LOGOS } from "@/lib/brand";

// Shown instantly in the popup so people don't have to leave the site to find it.
// The Klaviyo welcome flow (list: welcome10) still emails the same code as a backup/receipt.
const WELCOME_CODE = process.env.NEXT_PUBLIC_WELCOME_CODE || "WELCOME10";

const KEY = "goat.popup.v1"; // "done" | "dismissed"
function store(set?: string) {
  try {
    if (set !== undefined) localStorage.setItem(KEY, set);
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const seen = store();
    if (seen === "done") return;
    setTab(true);
    if (seen === "dismissed") return;
    const t = setTimeout(() => setOpen(true), 9000);
    const exit = (e: MouseEvent) => e.clientY <= 0 && setOpen(true);
    document.addEventListener("mouseleave", exit);
    return () => { clearTimeout(t); document.removeEventListener("mouseleave", exit); };
  }, []);

  const close = useCallback(() => { setOpen(false); if (state !== "done") store("dismissed"); }, [state]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(WELCOME_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the code is still shown selected for manual copy.
    }
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, close]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, list: "welcome10" }) });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error);
      store("done"); setState("done"); setTab(false);
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      {tab && !open && (
        <button onClick={() => setOpen(true)} className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-r-xl bg-[#0b0b0c] px-3 py-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#fff] [writing-mode:vertical-rl] hover:bg-[#db2777] md:block">
          Get 10% off
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={close} />
            <motion.div role="dialog" aria-modal="true" aria-labelledby="popup-title" className="relative w-full max-w-md rounded-3xl border border-line bg-void p-8 text-center"
              initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 260 }}>
              <button aria-label="Close" onClick={close} className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line hover:bg-coal">✕</button>
              <Image src={LOGOS.wordmark} alt="GOAT" width={337} height={169} className="mx-auto h-20 w-auto" />
              {state === "done" ? (
                <div className="py-6" role="status">
                  <h2 id="popup-title" className="font-display text-5xl">You&apos;re in</h2>
                  <p className="mt-3 text-sm text-mute">Here&apos;s your code. We&apos;ve also sent it to your inbox.</p>
                  <button type="button" onClick={copyCode} aria-label={`Copy discount code ${WELCOME_CODE}`}
                    className="mt-6 flex w-full items-center justify-between gap-3 rounded-full border border-dashed border-accent bg-coal py-3.5 pl-6 pr-2.5 text-left transition hover:border-solid">
                    <span className="font-display text-2xl tracking-[0.15em]">{WELCOME_CODE}</span>
                    <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#fff]">{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <Link href="/products/g-o-a-t-pwo-mango" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">Shop GOAT PWO</Link>
                  <button className="mt-4 text-sm text-mute underline-offset-4 hover:text-white hover:underline" onClick={() => setOpen(false)}>Keep browsing</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 id="popup-title" className="font-display mt-5 text-[4.2rem] leading-[0.88]">
                    Get 10% off<br /><i className="font-serif text-[0.72em] font-bold normal-case tracking-tight">your order</i>
                  </h2>
                  <p className="mt-3 text-sm text-mute">Sign up and unlock your instant discount.</p>
                  <label htmlFor="popup-email" className="sr-only">Email address</label>
                  <input id="popup-email" ref={inputRef} type="email" required autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="mt-6 h-12 w-full rounded-full border border-line bg-coal px-5 text-sm placeholder:text-mute focus:border-accent focus:outline-none" />
                  {state === "error" && <p role="alert" className="mt-2 text-sm text-red-500">{msg}</p>}
                  <button className="btn btn-primary mt-3 w-full" disabled={state === "loading"}>{state === "loading" ? "Claiming…" : "Claim discount"}</button>
                  <button type="button" onClick={close} className="mt-4 text-sm text-mute underline-offset-4 hover:text-white hover:underline">No, thanks</button>
                  <p className="mt-4 text-[0.68rem] leading-relaxed text-mute">By signing up you agree to receive marketing emails from GOAT Supplements. Unsubscribe anytime.</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
