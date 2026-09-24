# GOAT Supplements – Headless Storefront

Next.js 15 (App Router) + TypeScript + Tailwind v4 + Motion. Shopify stays the commerce backend
(products, inventory, cart, checkout, payments, orders) through the Storefront API.

```
Frontend (this repo) → Shopify Storefront API → Shopify checkout / payments / orders
```

## Run
```bash
npm install
cp .env.example .env.local   # add Shopify domain + Storefront token
npm run dev
```
With no Shopify keys the site runs in **demo mode** on a local catalogue (real GOAT products, prices in NOK,
real Shopify CDN images); checkout is disabled until keys are added.

## Connect Shopify
1. Shopify admin → Settings → Apps → Develop apps → create app → Storefront API scopes:
   `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`.
2. Copy the Storefront access token and `your-store.myshopify.com` into `.env.local`.
3. Checkout redirects to Shopify's hosted checkout (`cart.checkoutUrl`).

## Structure
- `lib/commerce/*`: framework-free commerce layer (types, Storefront client, catalogue, cart). **Reused by the future GOAT app** (React Native can import it as-is; move to `packages/commerce` in a monorepo).
- `lib/planner.ts`: GOAT Stack estimate logic (pure functions, shared with the app).
- `components/*`: UI. `app/*`: routes (`/`, `/shop`, `/products/[handle]`, `/stack`, `/api/subscribe`).

## Design system
- Light (white) by default, dark via the toggle (saved in localStorage, no flash). Header is always the pink-to-white gradient.
- Flat colours only. Gradients are limited to: header top, primary CTA (pink to white), the holographic word "Greatness", the "Tea" spec tile and spec-tile hover.
- Type: Barlow Condensed (Nike-style headlines), Bodoni Moda (Dior-style serif / italic accents), Inter (body). All self-hosted via Fontsource.
- Real brand assets only: emblem, gothic wordmark, payment icons (`public/payments`) and social icons come from the current store. Nothing is redrawn. Set in `lib/brand.ts`.

## To do before launch
- **Wordmark:** currently hotlinked from the popup app's CDN (files.ecomsend.com). Re-upload to Shopify Files and update `LOGOS.wordmark` in `lib/brand.ts`.
- **Hero video:** the live site's video is an expiring Instagram CDN URL. Upload the GOAT PWO video to Shopify Files and set `NEXT_PUBLIC_HERO_VIDEO_URL` (+ poster).
- **Email popup:** `/api/subscribe` posts to Klaviyo if keys are set; otherwise it stores nothing. Point it at the provider behind the current 10% popup and issue the discount code.
- **Servings per tub:** `components/StackPlanner.tsx` assumes 30. Move to a Shopify metafield.
- Review marketing/health claims in `Formula.tsx` for Norwegian/EU compliance.
- Add reviews (Google/Judge.me), account (Shopify Customer Account API), search, collections, cookie consent, analytics.
- Domain cutover: keep Shopify checkout domain; redirect old theme URLs.

## Future GOAT app roadmap
Profile & goals → My GOAT Stack (planner, synced to account via customer metafields) → reorder reminders
(push) → one-tap reorder (cart API) → personalised bundles.
