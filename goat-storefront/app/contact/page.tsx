import type { Metadata } from "next";
import { COMPANY, PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Contact – GOAT Supplements" };

export default function ContactPage() {
  return (
    <PolicyLayout eyebrow="We're here to help" title={<>Get in <em>touch</em></>}>
      <p>Questions about an order, a product, or anything else — reach us directly and we&apos;ll get back to you, usually within one business day.</p>
      <div className="mt-8 border-t border-line pt-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">Email</p>
        <p className="mt-1 text-lg text-white"><a href={`mailto:${COMPANY.email}`} className="hover:text-accent">{COMPANY.email}</a></p>
      </div>
      <p className="mt-10 text-sm">
        Looking for order help specifically? Check our <a href="/shipping">shipping</a> and <a href="/returns">returns</a> pages first — most questions are answered there.
      </p>
      <p className="text-sm">{COMPANY.legalName} · Org. no. {COMPANY.orgNumber}</p>
    </PolicyLayout>
  );
}
