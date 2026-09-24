import { PWO_INFO } from "@/lib/productInfo";

// Clean, scannable replacement for the raw Shopify description on the PWO page.
export function PwoIntro({ full }: { full: string }) {
  const i = PWO_INFO;
  return (
    <div className="mt-6 max-w-lg">
      <p className="font-display text-3xl leading-[0.95] md:text-4xl">
        {i.tagline.map((t, n) => (
          <span key={t} className={n === 1 ? "block text-accent" : "block"}>{t}</span>
        ))}
      </p>
      <p className="mt-5 leading-relaxed text-mute">{i.intro}</p>
      <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {i.highlights.map((h, n) => (
          <li key={h.title} className="border-t border-line pt-3">
            <span className="font-display text-sm tracking-widest text-accent">{String(n + 1).padStart(2, "0")}</span>
            <p className="mt-1 text-sm font-semibold leading-snug">{h.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-mute">{h.text}</p>
          </li>
        ))}
      </ul>
      {full && (
        <details className="group mt-5 text-sm">
          <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.2em] text-mute hover:text-white [&::-webkit-details-marker]:hidden">
            Full description <span aria-hidden className="text-accent">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-mute">{full}</p>
        </details>
      )}
    </div>
  );
}

export function PwoFacts() {
  const i = PWO_INFO;
  const max = Math.max(...i.formula.map((f) => f.g));
  return (
    <section className="mt-24 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20" aria-labelledby="facts">
      <div>
        <p className="eyebrow">Per 15 g serving</p>
        <h2 id="facts" className="h-mix mt-2 text-4xl md:text-6xl">The <em>formula</em></h2>
        <ul className="mt-8">
          {i.formula.map((f) => (
            <li key={f.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-t border-line py-3 sm:grid-cols-[13rem_1fr_4.5rem]">
              <span className="text-sm font-semibold">{f.name}</span>
              <span className="row-start-2 h-1.5 overflow-hidden rounded-full bg-coal sm:row-start-auto" aria-hidden>
                <span className="block h-full rounded-full bg-accent" style={{ width: `${Math.max((f.g / max) * 100, 2)}%` }} />
              </span>
              <span className="text-right text-sm tabular-nums text-mute">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="font-serif text-3xl italic">How to use</h3>
          <ol className="mt-5 space-y-4">
            {i.steps.map((s, n) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-display grid size-10 shrink-0 place-items-center rounded-full border border-line text-lg">{n + 1}</span>
                <span className="pt-1 text-sm leading-relaxed"><b className="uppercase tracking-widest">{s.title}</b><br /><span className="text-mute">{s.text}</span></span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl bg-coal p-4 text-xs leading-relaxed text-mute">{i.note}</p>
        </div>

        <div>
          <h3 className="font-serif text-3xl italic">Nutrition</h3>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {i.nutrition.map((n) => (
              <div key={n.k} className="bg-void p-4">
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">{n.k}</dt>
                <dd className="font-display mt-1 text-2xl">{n.v}</dd>
              </div>
            ))}
            <div className="hidden bg-void sm:block" aria-hidden />
          </dl>
          <p className="mt-3 text-xs text-mute">Always check the label on your tub for the full ingredient list, allergens and directions.</p>
        </div>
      </div>
    </section>
  );
}
