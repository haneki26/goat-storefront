const SPECS = [
  ["Vegan", "Plant-based"],
  ["Tea", "Based energy"],
  ["230 mg", "Caffeine per serving"],
  ["Norway", "Made in Norway"],
  ["L-Theanine", "Smooth focus"],
  ["Electrolytes", "Built-in hydration"],
];

/** Statement badges. Facts only: keep in sync with the label. */
export function SpecTiles() {
  return (
    <section aria-label="Product highlights" className="border-y border-line">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-6">
        {SPECS.map(([t, s], i) => (
          <li key={t} className={`spec-tile border-line px-3 pb-6 pt-7 text-center ${i % 2 === 0 ? "border-r" : ""} ${i < 4 ? "border-b" : ""} md:border-b-0 md:border-r md:last:border-r-0`}>
            <b className={`font-display block text-[2.1rem] leading-none md:text-[2.5rem] ${i === 1 ? "holo-text holo-text-dk" : ""}`}>{t}</b>
            <i className="mt-2 block font-serif text-[0.95rem] text-mute">{s}</i>
          </li>
        ))}
      </ul>
    </section>
  );
}
