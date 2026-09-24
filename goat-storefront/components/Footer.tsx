import Image from "next/image";
import Link from "next/link";
import { PaymentBadges } from "./PaymentBadges";
import { SocialLinks } from "./SocialLinks";
import { LOGOS } from "@/lib/brand";

const cols = [
  { title: "Shop", links: [["GOAT PWO", "/products/g-o-a-t-pwo-mango"], ["Bundles", "/products/goat-holiday-bundle-2x-goat-pwo"], ["All products", "/shop"], ["Apparel (soon)", "/apparel"]] },
  { title: "GOAT", links: [["The Formula", "/#formula"], ["GOAT Stack", "/stack"], ["FAQ", "/#faq"]] },
  { title: "Support", links: [["Contact", "https://goatpeakperformance.com/pages/contact"], ["Refund policy", "https://goatpeakperformance.com/policies/refund-policy"], ["Privacy policy", "https://goatpeakperformance.com/policies/privacy-policy"], ["Terms of service", "https://goatpeakperformance.com/policies/terms-of-service"]] },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Image src={LOGOS.wordmark} alt="GOAT" width={200} height={70} className="h-16 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">Premium performance supplements from Norway. Become the best version of yourself.</p>
          <SocialLinks className="mt-6" />
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="font-serif text-2xl font-medium italic">{c.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {c.links.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-mute transition hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-5 py-6 text-xs text-mute md:flex-row">
        <p>© {new Date().getFullYear()} GOAT Supplements AS. All rights reserved.</p>
        <PaymentBadges />
      </div>
    </footer>
  );
}
