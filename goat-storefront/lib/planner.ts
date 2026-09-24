/**
 * GOAT Stack planner logic. Pure functions, no framework or DOM dependencies,
 * so the same code powers the website and the future GOAT mobile app.
 */
export type StackItem = {
  handle: string;
  title: string;
  servingsPerContainer: number;
  servingsPerWeek: number;
  containersOwned: number;
  openedOn: string; // ISO date the current container was opened
  servingsUsedFromCurrent: number;
};

export type StackEstimate = {
  servingsLeft: number;
  daysLeft: number;
  runOutDate: Date;
  reorderByDate: Date;
  status: "ok" | "soon" | "now";
};

export const SHIPPING_BUFFER_DAYS = 5;

export function estimate(item: StackItem, now = new Date()): StackEstimate {
  const perDay = Math.max(item.servingsPerWeek, 0.01) / 7;
  const servingsLeft = Math.max(
    (item.containersOwned - 1) * item.servingsPerContainer +
      (item.servingsPerContainer - item.servingsUsedFromCurrent),
    0,
  );
  const daysLeft = Math.floor(servingsLeft / perDay);
  const runOutDate = new Date(now.getTime() + daysLeft * 86_400_000);
  const reorderByDate = new Date(runOutDate.getTime() - SHIPPING_BUFFER_DAYS * 86_400_000);
  const status = daysLeft <= SHIPPING_BUFFER_DAYS ? "now" : daysLeft <= 14 ? "soon" : "ok";
  return { servingsLeft, daysLeft, runOutDate, reorderByDate, status };
}
