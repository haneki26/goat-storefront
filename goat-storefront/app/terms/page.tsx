import type { Metadata } from "next";
import { COMPANY, PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Terms of service – GOAT Supplements" };

export default function TermsPage() {
  return (
    <PolicyLayout eyebrow="Legal" title={<>Terms of <em>service</em></>} updated="24 September 2026 (in effect since 11 March 2024)">
      <p>By using goatpeakperformance.com and placing an order, you agree to these terms. Please read them alongside our <a href="/privacy">privacy policy</a> and <a href="/returns">returns policy</a>.</p>

      <h2>Orders & payment</h2>
      <p>We accept Vipps, Visa, Mastercard, Maestro, American Express, Apple Pay, Google Pay, Shop Pay, and Union Pay. Payment is taken at the time of purchase. We may adjust prices at our discretion; the price you&apos;re charged is the one shown at checkout.</p>

      <h2>Shipping</h2>
      <p>Estimated delivery times are shown at checkout and can vary with your destination and carrier. See our <a href="/shipping">shipping page</a> for details. We&apos;re not responsible for delays caused by factors outside our control, such as customs or carrier disruptions.</p>

      <h2>Pre-orders</h2>
      <p>Where a product is offered for pre-order, the listing states expected availability and release timing. Placing a pre-order reserves your unit; payment terms and release dates are as shown on the product page at the time of order.</p>

      <h2>Acceptable use</h2>
      <p>Don&apos;t use the site for anything unlawful, to distribute malware, or to harass others. We may suspend access for accounts that violate this.</p>

      <h2>Content</h2>
      <p>Product information, images, and site content are provided &quot;as is.&quot; We aim for accuracy but don&apos;t guarantee the site is always error-free, uninterrupted, or fully up to date.</p>

      <h2>Liability</h2>
      <p>To the extent permitted by Norwegian law, {COMPANY.legalName} isn&apos;t liable for indirect or consequential loss arising from your use of the site. Nothing here limits rights you have as a consumer under mandatory Norwegian or EU law.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Norway.</p>

      <h2>Contact</h2>
      <p>{COMPANY.legalName} · Org. no. {COMPANY.orgNumber} · <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · {COMPANY.phone}</p>
    </PolicyLayout>
  );
}
