import type { Metadata } from "next";
import { StackPlanner } from "@/components/StackPlanner";
import { getProduct } from "@/lib/commerce";

export const metadata: Metadata = { title: "My GOAT Stack" };

export default async function StackPage() {
  const pwo = await getProduct("g-o-a-t-pwo-mango");
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:pt-48">
      <p className="eyebrow">GOAT Supplement Planner · Beta</p>
      <h1 className="h-mix mt-3 text-6xl md:text-8xl">My GOAT <em>Stack</em></h1>
      <p className="mt-5 max-w-xl text-mute">Tell us how often you train with GOAT. We&apos;ll estimate when you&apos;ll run out and when to reorder, so you never miss a session.</p>
      <div className="mt-12"><StackPlanner variantId={pwo?.variants[0].id} /></div>
    </div>
  );
}
