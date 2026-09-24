import Image from "next/image";
import { Reveal } from "./Reveal";
import { Waitlist } from "./Waitlist";
import { LOGOS } from "@/lib/brand";

/** Coming-soon teaser with waitlist. Swap for a real collection once apparel is live. */
export function ApparelSection({ id = "apparel" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby="apparel-title" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal>
        <div className="grid overflow-hidden rounded-[1.75rem] bg-coal md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em]"><i className="size-1.5 rounded-full bg-accent" />Coming soon</span>
            <h2 id="apparel-title" className="h-mix mt-6 text-5xl md:text-7xl">GOAT <em>Apparel</em></h2>
            <p className="mt-4 max-w-md text-mute">Train in GOAT. Our first apparel drop is on the way. Join the list to be first in line.</p>
            <Waitlist />
          </div>
          <div data-theme="dark" className="relative grid min-h-[16rem] place-items-center bg-[#0b0b0c] p-10">
            <Image src={LOGOS.emblem} alt="GOAT" width={640} height={628} className="w-1/2 max-w-[15rem]" />
            <Image src={LOGOS.wordmark} alt="" width={337} height={169} className="absolute bottom-6 h-11 w-auto" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
