import type { Metadata } from "next";
import { COMPANY, PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Returns & refunds – GOAT Supplements" };

export default function ReturnsPage() {
  return (
    <PolicyLayout eyebrow="Order help" title={<>Returns &amp; <em>refunds</em></>} updated="24 September 2026">
      <p>We have a 30-day return policy: you have 30 days after receiving your item to request a return.</p>

      <h2>Eligibility</h2>
      <p>To be eligible, your item must be unworn or unused, in its original packaging, with tags attached, and with proof of purchase.</p>

      <h2>How to start a return</h2>
      <p>Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> with your order number. Once accepted, we&apos;ll send you return instructions and the address to send your package to. Items sent back without first requesting a return won&apos;t be accepted.</p>

      <h2>Not eligible for return</h2>
      <ul>
        <li>Perishable goods</li>
        <li>Custom or personalized products</li>
        <li>Personal care items (opened supplements included)</li>
        <li>Hazardous materials</li>
        <li>Sale items and gift cards</li>
      </ul>

      <h2>Damaged or wrong items</h2>
      <p>Inspect your order as soon as it arrives. If something is defective, damaged, or wrong, contact us straight away so we can make it right.</p>

      <h2>Refunds</h2>
      <p>Once we receive and inspect your return, we&apos;ll let you know if it&apos;s approved. Approved refunds go back to your original payment method within 10 business days. If it&apos;s been more than 15 business days since approval and you haven&apos;t seen it, contact us.</p>

      <h2>Exchanges</h2>
      <p>The fastest way to get a different item is to return the one you have and place a new order once your return is accepted.</p>

      <h2>EU customers: your right to cancel</h2>
      <p>If you&apos;re in the European Union, you have the right to cancel or return your order within 14 days of receiving it, for any reason and without justification, in addition to the policy above.</p>
    </PolicyLayout>
  );
}
