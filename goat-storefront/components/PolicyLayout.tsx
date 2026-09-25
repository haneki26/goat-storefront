import type { ReactNode } from "react";

/** Shared shell for the legal/info pages (contact, shipping, returns, privacy, terms). */
export function PolicyLayout({ eyebrow, title, updated, children }: { eyebrow: string; title: ReactNode; updated?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:pt-48">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h-mix mt-3 text-5xl md:text-7xl">{title}</h1>
      {updated && <p className="mt-4 text-sm text-mute">Last updated {updated}</p>}
      <div className="prose mt-10 max-w-none space-y-6 text-[0.95rem] leading-relaxed text-mute [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:italic [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-2 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </div>
  );
}

export const COMPANY = {
  legalName: "GOAT Supplements AS",
  orgNumber: "932 919 338",
  address: "Gulliveien 12, 1405 Langhus, Norway",
  email: "goatspmts@gmail.com",
  phone: "+47 406 71 617",
};
