"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { addToCart, loadCart, removeLine, setLineQuantity } from "@/lib/commerce/cart";
import type { Cart, LineInput } from "@/lib/commerce/types";

type Ctx = {
  cart: Cart | null;
  open: boolean;
  busy: boolean;
  error: string | null;
  setOpen: (v: boolean) => void;
  add: (lines: LineInput[], openDrawer?: boolean) => Promise<void>;
  setQty: (lineId: string, qty: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
};

const CartCtx = createContext<Ctx | null>(null);

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCart().then(setCart);
  }, []);

  const guard = useCallback(async (fn: () => Promise<Cart>) => {
    setBusy(true);
    setError(null);
    try {
      setCart(await fn());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      cart,
      open,
      busy,
      error,
      setOpen,
      add: async (lines, openDrawer = true) => {
        await guard(() => addToCart(cart, lines));
        if (openDrawer) setOpen(true);
      },
      setQty: (id, qty) => guard(() => setLineQuantity(cart!, id, qty)),
      remove: (id) => guard(() => removeLine(cart!, id)),
    }),
    [cart, open, busy, error, guard],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
