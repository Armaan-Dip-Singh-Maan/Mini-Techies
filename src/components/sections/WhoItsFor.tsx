import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { audiences } from "@/lib/site";
import { accentStyles } from "@/lib/accents";
import { cn } from "@/lib/cn";

export function WhoItsFor() {
  return (
    <Section id="who" tone="white">
      <SectionHeading
        eyebrow="Who it's for"
        title="One platform, made for the whole learning circle"
        subtitle="Kids get the fun. Parents and teachers get the proof. Everybody wins."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {audiences.map((a, i) => {
          const s = accentStyles[a.accent];
          return (
            <Reveal key={a.id} delay={i * 0.08}>
              <div className="group h-full rounded-3xl bg-cream p-7 ring-1 ring-ink/5 transition-transform hover:-translate-y-1.5 hover:shadow-card">
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl",
                    s.bgSoft
                  )}
                >
                  <span aria-hidden="true">{a.emoji}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70">{a.body}</p>
                <div
                  className={cn(
                    "mt-5 h-1.5 w-12 rounded-full transition-all group-hover:w-20",
                    s.bg
                  )}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
