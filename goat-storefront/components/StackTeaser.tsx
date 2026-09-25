import Link from "next/link";

const STEPS: [string, string][] = [
  ["Tell us how you train", "How many sessions a week, and how many scoops each time."],
  ["We track your tub", "We estimate exactly when you'll run out, down to the day."],
  ["Never miss a session", "A reminder lands before you're out, so reordering takes one click."],
];

/** Homepage teaser for the /stack planner, placed low on the page for people who've already decided to buy. */
export function StackTeaser() {
  return (
    <section aria-labelledby="stack-teaser" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-12 rounded-[1.75rem] border border-line bg-coal p-8 md:grid-cols-[0.9fr_1.1fr] md:p-14">
        <div>
          <p className="eyebrow">GOAT Supplement Planner · Beta</p>
          <h2 id="stack-teaser" className="h-mix mt-3 text-5xl md:text-6xl">My GOAT <em>Stack</em></h2>
          <p className="mt-5 max-w-sm text-mute">A simple planner that tracks your tub and tells you exactly when to reorder, so you're never mid-set without fuel.</p>
          <Link href="/stack" className="btn btn-primary mt-8">Plan my stack</Link>
        </div>
        <ol className="space-y-6">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="flex gap-4">
              <span className="font-display grid size-10 shrink-0 place-items-center rounded-full border border-line text-lg">{i + 1}</span>
              <span className="pt-1.5 text-sm leading-relaxed"><b className="text-white">{title}</b><br /><span className="text-mute">{text}</span></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
