import type { Metadata } from "next";
import { COMPANY, PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Contact – GOAT Supplements" };

const ROWS: [string, string, string][] = [
  ["Email", COMPANY.email, `mailto:${COMPANY.email}`],
  ["Phone", COMPANY.phone, `tel:${COMPANY.phone.replace(/\s/g, "")}`],
  ["Address", COMPANY.address, ""],
];

export default function ContactPage() {
  return (
    <PolicyLayout eyebrow="We're here to help" title={<>Get in <em>touch</em></>}>
      <p>Questions about an order, a product, or anything else — reach us directly and we&apos;ll get back to you, usually within one business day.</p>
      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        {ROWS.map(([label, value, href]) => (
          <div key={label} className="border-t border-line pt-4">
            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">{label}</dt>
            <dd className="mt-1 text-base text-white">{href ? <a href={href} className="hover:text-accent">{value}</a> : value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-sm">
        Looking for order help specifically? Check our <a href="/shipping">shipping</a> and <a href="/returns">returns</a> pages first — most questions are answered there.
      </p>
      <p className="text-sm">{COMPANY.legalName} · Org. no. {COMPANY.orgNumber}</p>
    </PolicyLayout>
  );
}
