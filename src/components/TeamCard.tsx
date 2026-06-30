import { accentStyles } from "@/lib/accents";
import type { Accent } from "@/lib/site";
import { cn } from "@/lib/cn";

export function TeamCard({
  name,
  title,
  bio,
  initials,
  accent,
  showBio = true,
}: {
  name: string;
  title: string;
  bio?: string;
  initials: string;
  accent: Accent;
  showBio?: boolean;
}) {
  const s = accentStyles[accent];
  return (
    <div className="group h-full overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5 transition-transform hover:-translate-y-1.5 hover:shadow-card">
      {/* Headshot placeholder — swap for client-supplied photo */}
      <div
        className={cn(
          "relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br",
          s.gradient
        )}
      >
        <div className="bg-dotgrid absolute inset-0 opacity-20" />
        <span className="relative font-display text-5xl font-bold text-white/95">
          {initials}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink/60">
          Photo soon
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-ink">{name}</h3>
        <p className={cn("mt-0.5 font-semibold", s.text)}>{title}</p>
        {showBio && bio && (
          <p className="mt-3 leading-relaxed text-ink/70">{bio}</p>
        )}
      </div>
    </div>
  );
}
