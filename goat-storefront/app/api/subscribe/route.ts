import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email capture. Forwards to Klaviyo when configured (KLAVIYO_PRIVATE_KEY + KLAVIYO_LIST_ID).
 * Swap this handler for whichever ESP currently powers the 10% popup (the live site uses a third-party popup app).
 * Without keys it accepts the request but stores nothing (dev mode), and says so.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; list?: string } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });

  const segment = body?.list === "apparel" ? "apparel" : "welcome10"; // tag which form the signup came from
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const list = process.env.KLAVIYO_LIST_ID;
  if (!key || !list) {
    console.warn(`[subscribe:${segment}] No ESP configured, email NOT stored:`, email.replace(/(.).+(@.+)/, "$1***$2"));
    return NextResponse.json({ ok: true, mode: "dev" });
  }

  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
    method: "POST",
    headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: "2024-10-15", "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: { data: [{ type: "profile", attributes: { email, properties: { signup_source: segment }, subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } } } }] },
        },
        relationships: { list: { data: { type: "list", id: list } } },
      },
    }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: "Could not subscribe right now. Try again shortly." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
