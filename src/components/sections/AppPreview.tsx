"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const features = [
  {
    emoji: "🔥",
    title: "Daily streaks",
    body: "A gentle nudge to show up every day builds a real learning habit.",
  },
  {
    emoji: "📊",
    title: "Progress dashboards",
    body: "See mastery by subject and skill — growth you can actually measure.",
  },
  {
    emoji: "🏅",
    title: "Certificates & badges",
    body: "Celebrate milestones with shareable rewards that build confidence.",
  },
];

const subjectBars = [
  { label: "Science", pct: 82, color: "bg-mint" },
  { label: "Tech", pct: 64, color: "bg-primary" },
  { label: "Engineering", pct: 48, color: "bg-coral" },
  { label: "Math", pct: 91, color: "bg-sky" },
];

export function AppPreview() {
  const reduce = useReducedMotion();

  return (
    <Section id="app" tone="ink" className="overflow-hidden">
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-sun">
              A sneak peek
            </span>
            <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Progress you can{" "}
              <span className="text-gradient">see and celebrate</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/70">
              Mini Techies borrows the best engagement mechanics from the games
              kids love — streaks, XP, and dashboards — and points them at real
              learning.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="text-2xl" aria-hidden="true">
                    {f.emoji}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">
                      {f.title}
                    </h3>
                    <p className="text-sm text-cream/65">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Phone */}
        <Reveal className="flex justify-center" y={40}>
          <div className="relative">
            <motion.div
              className="pointer-events-none absolute -inset-8 rounded-full bg-primary/30 blur-3xl"
              animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative w-[280px] rounded-[2.8rem] border-[6px] border-ink-soft bg-ink p-3 shadow-card sm:w-[300px]">
              <div className="absolute left-1/2 top-3 h-5 w-28 -translate-x-1/2 rounded-full bg-ink-soft" />
              <div className="overflow-hidden rounded-[2rem] bg-cream pt-7">
                {/* app header */}
                <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pb-6 pt-3 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/70">Welcome back</p>
                      <p className="font-display text-lg font-bold">Hi, Maya!</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-sm font-bold">
                      🔥 12
                    </span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white/15 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span>Level 7 · Explorer</span>
                      <span>1,840 XP</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/25">
                      <motion.div
                        className="h-full rounded-full bg-sun"
                        initial={{ width: 0 }}
                        whileInView={{ width: "72%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* dashboard */}
                <div className="px-5 py-4">
                  <p className="font-display text-sm font-bold text-ink">
                    This week’s mastery
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {subjectBars.map((b, i) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-xs font-semibold text-ink/70">
                          <span>{b.label}</span>
                          <span>{b.pct}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/10">
                          <motion.div
                            className={cn("h-full rounded-full", b.color)}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${b.pct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.9,
                              delay: 0.2 + i * 0.12,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-4 flex items-center gap-3 rounded-2xl bg-mint-soft p-3"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      🏅
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">
                        Certificate earned!
                      </p>
                      <p className="text-xs text-ink/60">Math: Fractions Pro</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
