import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/bodoni-moda/500-italic.css";
import "@fontsource/bodoni-moda/700-italic.css";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { CookieBanner } from "@/components/CookieBanner";
import { EmailPopup } from "@/components/EmailPopup";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goatpeakperformance.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "GOAT Supplements – Unlock Greatness", template: "%s – GOAT Supplements" },
  description:
    "Premium Norwegian pre-workout. GOAT PWO Tropical Mango: clean energy, focus, hydration and pump. Vegan, made in Norway.",
  openGraph: { title: "GOAT Supplements", description: "Unlock your full potential.", type: "website", siteName: "GOAT Supplements" },
};
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("goat.theme");if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}` }} />
      </head>
      <body>
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#db2777] focus:px-4 focus:py-2 focus:text-[#fff]">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <EmailPopup />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
