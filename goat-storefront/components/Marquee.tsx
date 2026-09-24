const words = ["Clean energy", "Razor focus", "Relentless pump", "Vegan", "Made in Norway"];

export function Marquee() {
  const row = words.flatMap((w, i) => [
    i % 2 ? <em key={`e${i}`} className="font-serif text-xl font-medium md:text-2xl">{w}</em> : <span key={`s${i}`} className="font-display text-xl tracking-[0.05em] md:text-2xl">{w}</span>,
    <i key={`d${i}`} className="size-1.5 rounded-full bg-[#f472b6]" />,
  ]);
  return (
    <div aria-hidden className="overflow-hidden bg-[#0b0b0c] py-4 text-[#f7f3ec]">
      <div className="flex w-max items-center gap-8 whitespace-nowrap" style={{ animation: "marquee 34s linear infinite" }}>
        {[...row, ...row, ...row, ...row].map((el, i) => <span key={i} className="flex items-center gap-8">{el}</span>)}
      </div>
    </div>
  );
}
