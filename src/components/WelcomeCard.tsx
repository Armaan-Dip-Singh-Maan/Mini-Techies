import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { accentStyles } from "@/lib/accents";
import type { Accent } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Renders a "Welcome to the Team" card. Priority:
 * 1. `card` — a full client-supplied card image shown edge-to-edge.
 * 2. `photo` — a headshot dropped into a branded welcome-card layout.
 * 3. initials — a branded placeholder when no artwork exists.
 */
export function WelcomeCard({
  name,
  title,
  initials,
  accent,
  card,
  photo,
}: {
  name: string;
  title: string;
  initials: string;
  accent: Accent;
  card?: string | null;
  photo?: string | null;
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

      <div className="relative mt-8 w-[74%]">
        {/* purple accent shapes echoing the welcome cards */}
        <span className="absolute -left-4 top-1/3 h-8 w-8 rotate-45 rounded-[6px] bg-primary/30" />
        <span className="absolute -right-4 top-1/2 h-10 w-10 rotate-45 rounded-[6px] bg-primary/20" />
        {photo ? (
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-pop ring-1 ring-ink/5">
            <Image
              src={photo}
              alt={`${name}, ${title}`}
              fill
              sizes="(max-width: 768px) 60vw, 220px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br font-display text-5xl font-bold text-white shadow-pop",
              s.gradient
            )}
          >
            {initials}
          </div>
        )}
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
