import { PAYMENTS } from "@/lib/brand";

/** Real payment icons copied from the current store (public/payments). */
export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Accepted payment methods">
      {PAYMENTS.map((p) => (
        <li key={p.file}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/payments/${p.file}.svg`} alt={p.name} width={38} height={24} className="h-6 w-auto rounded-[3px]" />
        </li>
      ))}
    </ul>
  );
}
