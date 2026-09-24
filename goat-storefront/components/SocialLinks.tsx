import { SocialIcon } from "./Icons";
import { SOCIALS } from "@/lib/brand";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`GOAT on ${s.label}`} className="grid size-11 place-items-center rounded-full border border-line text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
            <SocialIcon name={s.key} width={20} height={20} />
          </a>
        </li>
      ))}
    </ul>
  );
}
