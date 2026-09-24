import type { Metadata } from "next";
import { ApparelSection } from "@/components/ApparelSection";

export const metadata: Metadata = { title: "GOAT Apparel – Coming soon" };

export default function ApparelPage() {
  return (
    <div className="pt-36 md:pt-48">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Drop 01</p>
        <h1 className="h-mix mt-3 text-6xl md:text-8xl">Train in <em>GOAT</em></h1>
      </div>
      <ApparelSection id="waitlist" />
    </div>
  );
}
