const ROWS: [string, string, string][] = [
  ["Energy source", "Tea-based caffeine + L-theanine", "Straight caffeine, often overdosed"],
  ["The crash", "Smooth focus, no crash", "Sharp spike, hard crash"],
  ["Hydration", "Electrolytes in every scoop", "Usually none"],
  ["Diet", "100% vegan", "Often not"],
  ["Made in", "Norway, quality assured", "Varies"],
];

/** Short, honest comparison to frame the formula story against a typical pre-workout. No brand names — just the category. */
export function WhyGoat() {
  return (
    <section aria-labelledby="why-goat" className="mx-auto max-w-4xl px-5 py-24">
      <p className="eyebrow text-center">Why GOAT</p>
      <h2 id="why-goat" className="h-mix mt-3 text-center text-5xl md:text-7xl">Not your average <em>pre-workout</em></h2>
      <div className="mt-12 overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-coal text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute sm:text-xs">
          <div className="p-4 text-left sm:pl-6" />
          <div className="p-4 text-accent">GOAT PWO</div>
          <div className="p-4">Typical PWO</div>
        </div>
        {ROWS.map(([label, goat, typical], i) => (
          <div key={label} className={`grid grid-cols-[1fr_1fr_1fr] items-center text-center text-xs sm:text-sm ${i > 0 ? "border-t border-line" : ""}`}>
            <div className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-white sm:pl-6 sm:text-sm">{label}</div>
            <div className="p-4 font-semibold text-white">{goat}</div>
            <div className="p-4 text-mute">{typical}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-mute">General comparison to a typical pre-workout formula, not a specific competitor.</p>
    </section>
  );
}
