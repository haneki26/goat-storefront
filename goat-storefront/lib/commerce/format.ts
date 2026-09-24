import type { Money } from "./types";

export function formatMoney({ amount, currencyCode }: Money): string {
  if (currencyCode === "NOK") {
    return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(amount)} kr`;
  }
  return new Intl.NumberFormat("en", { style: "currency", currency: currencyCode, maximumFractionDigits: 0 }).format(amount);
}

export function savingsPercent(price: Money, compareAt: Money | null): number {
  if (!compareAt || compareAt.amount <= price.amount) return 0;
  return Math.round((1 - price.amount / compareAt.amount) * 100);
}
