"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { estimate, type StackItem } from "@/lib/planner";

const KEY = "goat.stack.v1";
// TODO: confirm real servings per tub with product data (Shopify metafield `goat.servings_per_container`).
const SERVINGS_PER_TUB = 30;
const PWO_VARIANT = "gid://shopify/ProductVariant/mock-pwo-1"; // replaced by live variant id via product data in the app

const DEFAULT: StackItem = { handle: "g-o-a-t-pwo-mango", title: "GOAT PWO Tropical Mango", servingsPerContainer: SERVINGS_PER_TUB, servingsPerWeek: 4, containersOwned: 1, openedOn: new Date().toISOString(), servingsUsedFromCurrent: 0 };

export function StackPlanner({ variantId = PWO_VARIANT }: { variantId?: string }) {
  const { add } = useCart();
  const [item, setItem] = useState<StackItem>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItem(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(item)); } catch {} }, [item, ready]);

  const est = estimate(item);
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const tone = est.status === "now" ? "text-red-500" : est.status === "soon" ? "text-accent" : "text-emerald-600";
  const set = <K extends keyof StackItem>(k: K, v: StackItem[K]) => setItem((s) => ({ ...s, [k]: v }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[1.75rem] bg-coal p-8">
        <p className="eyebrow">{item.title}</p>
        <div className="mt-6 space-y-7">
          <Slider label="Servings per week" value={item.servingsPerWeek} min={1} max={14} onChange={(v) => set("servingsPerWeek", v)} />
          <Slider label="Tubs you own" value={item.containersOwned} min={1} max={6} onChange={(v) => set("containersOwned", v)} />
          <Slider label={`Servings used from current tub (of ${item.servingsPerContainer})`} value={item.servingsUsedFromCurrent} min={0} max={item.servingsPerContainer - 1} onChange={(v) => set("servingsUsedFromCurrent", v)} />
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-[1.75rem] bg-coal p-8">
        <div>
          <p className="eyebrow">Your supply</p>
          <p className={`font-display mt-3 text-8xl leading-none ${tone}`} aria-live="polite">{est.daysLeft}<span className="ml-2 text-3xl text-mute">days left</span></p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-line bg-void p-4"><dt className="text-mute">Runs out</dt><dd className="mt-1 text-lg font-semibold">{fmt(est.runOutDate)}</dd></div>
            <div className="rounded-2xl border border-line bg-void p-4"><dt className="text-mute">Reorder by</dt><dd className="mt-1 text-lg font-semibold">{fmt(est.reorderByDate)}</dd></div>
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => add([{ variantId, quantity: 1 }])}>Reorder now</button>
          <Link href="/products/goat-holiday-bundle-2x-goat-pwo" className="btn btn-ghost">Save with a bundle</Link>
        </div>
        <p className="mt-4 text-xs text-mute">Saved on this device. In the GOAT app your stack syncs to your account and sends reorder reminders.</p>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const id = label.replace(/\W+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-sm"><span className="text-white/80">{label}</span><b className="text-accent">{value}</b></label>
      <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full accent-[#db2777]" />
    </div>
  );
}
