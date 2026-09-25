import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Shipping – GOAT Supplements" };

const REGIONS = ["Norway", "Sweden", "Denmark", "Finland", "Germany", "Netherlands", "Belgium", "France", "Spain", "Italy", "Austria", "Switzerland", "Poland", "Portugal", "Ireland", "United Kingdom", "United States", "Canada", "Australia", "New Zealand", "and more — see your options at checkout"];

export default function ShippingPage() {
  return (
    <PolicyLayout eyebrow="Order help" title={<>Shipping &amp; <em>delivery</em></>}>
      <p>Every order ships from Norway. Estimated delivery times are shown at checkout once you enter your address, since they depend on your destination and the carrier.</p>

      <h2>Free shipping</h2>
      <p>Orders over 799 kr ship free. Your cart shows how close you are.</p>

      <h2>Where we ship</h2>
      <p>We currently ship to:</p>
      <ul>{REGIONS.map((r) => <li key={r}>{r}</li>)}</ul>

      <h2>Delays</h2>
      <p>We hand every order to the carrier promptly, but delivery times are estimates. Customs, weather, and carrier delays are outside our control — if your order is taking longer than expected, <a href="/contact">contact us</a> and we&apos;ll look into it.</p>

      <h2>Payment</h2>
      <p>We accept Vipps, Visa, Mastercard, Maestro, American Express, Apple Pay, Google Pay, Shop Pay, and Union Pay. Payment is processed securely at checkout.</p>
    </PolicyLayout>
  );
}
