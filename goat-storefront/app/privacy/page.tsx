import type { Metadata } from "next";
import { COMPANY, PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Privacy policy – GOAT Supplements" };

export default function PrivacyPage() {
  return (
    <PolicyLayout eyebrow="Legal" title={<>Privacy <em>policy</em></>} updated="24 September 2026 (in effect since 11 March 2024)">
      <p>{COMPANY.legalName} ({COMPANY.address}) is the data controller for goatpeakperformance.com and goatsup.com.</p>

      <h2>What we collect</h2>
      <ul>
        <li>Contact details you give us — name, address, phone, email</li>
        <li>Order information — billing and shipping address, payment confirmation (we never see or store full card numbers)</li>
        <li>Shopping activity — items viewed, cart contents, wishlists</li>
        <li>Technical data via cookies — device and browser information, IP address</li>
        <li>Messages you send our customer support</li>
      </ul>

      <h2>How we use it</h2>
      <p>To fulfil and ship your orders, process payment, run your account, send marketing emails you&apos;ve opted into, detect fraud, respond to support requests, and improve the site.</p>

      <h2>Who we share it with</h2>
      <p>Shopify (our commerce platform), our payment processors, and the vendors who help us with IT, analytics, customer support, fulfilment, and shipping. We don&apos;t sell your personal data.</p>

      <h2>Cookies</h2>
      <p>We use cookies to run the site and to understand how it&apos;s used, including some from analytics and advertising partners. You can block cookies in your browser settings, though parts of the site may not work as well. See our cookie banner for more control over optional cookies.</p>

      <h2>Your rights</h2>
      <p>You can ask to access, correct, delete, or receive a copy of your data, object to how it&apos;s used, withdraw consent at any time, and lodge a complaint with your local data protection authority. Contact us to exercise any of these.</p>

      <h2>Contact</h2>
      <p>Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or call {COMPANY.phone} with any privacy question or request.</p>
    </PolicyLayout>
  );
}
