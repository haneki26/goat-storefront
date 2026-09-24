"use client";

import { useState } from "react";

/** Email capture for the apparel waitlist (posts to /api/subscribe with list=apparel). */
export function Waitlist({ list = "apparel", cta = "Notify me" }: { list?: string; cta?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, list }) });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error);
      setState("done");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") return <p role="status" className="mt-7 text-lg font-semibold">You&apos;re on the list. We&apos;ll be in touch.</p>;
  return (
    <form onSubmit={submit} noValidate className="mt-7 flex flex-wrap gap-3">
      <label htmlFor={`wl-${list}`} className="sr-only">Email address</label>
      <input id={`wl-${list}`} type="email" required autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
        className="h-[3.1rem] min-w-[12rem] flex-1 rounded-full border border-line bg-void px-6 text-sm placeholder:text-mute focus:border-accent focus:outline-none" />
      <button className="btn btn-primary" disabled={state === "loading"}>{state === "loading" ? "Adding…" : cta}</button>
      {state === "error" && <p role="alert" className="w-full text-sm text-red-500">{msg}</p>}
    </form>
  );
}
