import { API_VERSION, SHOP_DOMAIN, STOREFRONT_TOKEN } from "./config";

/** Minimal typed Storefront API client. Works in the browser, on the server, and in React Native. */
export async function storefront<T>(
  query: string,
  variables?: Record<string, unknown>,
  opts?: { revalidate?: number },
): Promise<T> {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Next.js extension; ignored elsewhere
    ...({ next: { revalidate: opts?.revalidate ?? 300 } } as object),
  });
  if (!res.ok) throw new Error(`Storefront API ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}
