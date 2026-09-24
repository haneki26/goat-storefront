const items = [
  ["Free shipping", "Over 799 kr"],
  ["Price-match guarantee", "Safe money when ordering with us"],
  ["Hassle-free exchange", "Receive a slip for exchanges"],
  ["5.0 on Google", "Rated by the GOAT pack"],
];

export function TrustStrip() {
  return (
    <section aria-label="Why GOAT">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {items.map(([t, s]) => (
          <li key={t} className="px-3 py-6 text-center">
            <p className="font-display text-base tracking-[0.06em] md:text-lg">{t}</p>
            <p className="mt-1 text-xs text-mute">{s}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
