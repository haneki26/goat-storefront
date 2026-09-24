const FAQ = [
  ["Is GOAT PWO vegan?", "Yes. GOAT PWO Tropical Mango is vegan and made in Norway."],
  ["How much caffeine is in each serving?", "Each 15 g serving contains 230 mg of caffeine, balanced with L-theanine."],
  ["When do I get free shipping?", "Orders over 799 kr ship free. The cart shows your progress."],
  ["What if I want to exchange or need help?", "Exchanges are hassle-free, and we price-match. Reach out via the contact page and we'll sort it."],
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl px-5 py-24">
      <p className="eyebrow text-center">Good to know</p>
      <h2 id="faq-title" className="h-mix mt-3 text-center text-5xl md:text-6xl">Your <em>questions</em></h2>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {q}<span aria-hidden className="text-accent transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-2xl text-mute">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
