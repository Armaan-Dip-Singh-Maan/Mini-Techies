import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { accentStyles } from "@/lib/accents";
import type { Accent } from "@/lib/site";
import { cn } from "@/lib/cn";

const CARD_BOX =
  "relative aspect-[819/1024] overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1.5";

/**
 * Renders a "Welcome to the Team" card. Every variant fills the exact same
 * aspect box so all cards render at an identical size. Priority:
 * 1. `card` — a full client-supplied card image (819×1024) shown edge-to-edge.
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
      <div className={CARD_BOX}>
        <Image
          src={card}
          alt={`${name} — ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  const s = accentStyles[accent];
  return (
    <div className={cn(CARD_BOX, "flex flex-col items-center p-5 text-center")}>
      <Logo className="h-7 w-auto shrink-0" />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="relative w-[52%]">
          {/* purple accent shapes echoing the welcome cards */}
          <span className="absolute -left-3 top-1/3 h-6 w-6 rotate-45 rounded-[5px] bg-primary/30" />
          <span className="absolute -right-3 top-1/2 h-8 w-8 rotate-45 rounded-[5px] bg-primary/20" />
          {photo ? (
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-pop ring-1 ring-ink/5">
              <Image
                src={photo}
                alt={`${name}, ${title}`}
                fill
                sizes="(max-width: 768px) 45vw, 160px"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br font-display text-4xl font-bold text-white shadow-pop",
                s.gradient
              )}
            >
              {initials}
            </div>
          )}
        </div>

        <h3 className="mt-5 font-display text-lg font-bold leading-tight text-primary">
          {name}
        </h3>
        <p className="mt-1 text-[0.7rem] font-bold uppercase leading-snug tracking-[0.12em] text-ink">
          {title}
        </p>
      </div>

      <div className="shrink-0">
        <p className="text-gradient font-display text-2xl font-bold leading-none">
          WELCOME
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/60">
          to the team
        </p>
      </div>
    </div>
  );
}
