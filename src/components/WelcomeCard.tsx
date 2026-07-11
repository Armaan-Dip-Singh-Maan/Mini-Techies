import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { accentStyles } from "@/lib/accents";
import type { Accent } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Renders a "Welcome to the Team" card. When a client-supplied card image is
 * provided it is shown full-bleed; otherwise a matching branded placeholder is
 * generated so members without artwork still look at home in the grid.
 */
export function WelcomeCard({
  name,
  title,
  initials,
  accent,
  card,
}: {
  name: string;
  title: string;
  initials: string;
  accent: Accent;
  card?: string | null;
}) {
  if (card) {
    return (
      <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1.5">
        <Image
          src={card}
          alt={`${name} — ${title}`}
          width={819}
          height={1024}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  const s = accentStyles[accent];
  return (
    <div className="flex aspect-[819/1024] flex-col items-center rounded-3xl bg-white p-6 text-center shadow-card ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1.5">
      <Logo className="h-8 w-auto" />
      <div
        className={cn(
          "mt-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br font-display text-4xl font-bold text-white shadow-pop sm:h-36 sm:w-36",
          s.gradient
        )}
      >
        {initials}
      </div>
      <h3 className="mt-7 font-display text-xl font-bold text-primary">{name}</h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-ink sm:text-sm">
        {title}
      </p>
      <p className="text-gradient mt-auto font-display text-3xl font-bold">
        WELCOME
      </p>
      <p className="text-sm font-semibold uppercase tracking-wide text-ink/60">
        to the team
      </p>
    </div>
  );
}
