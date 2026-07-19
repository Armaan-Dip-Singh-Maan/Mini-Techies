"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AudienceToggle } from "@/components/ui/AudienceToggle";
import { TutorAvatar } from "@/components/brand/TutorAvatar";
import { PersonalizePreview } from "./PersonalizePreview";
import { useAudience } from "@/components/providers/AudienceProvider";

const copy = {
  kids: {
    eyebrow: "🎮 Level up your brain",
    title: (
      <>
        Learning that feels like{" "}
        <span className="text-gradient">your favorite game.</span>
      </>
    ),
    body: "Blast through science, tech, engineering, and math missions. Earn XP, keep your streak, collect badges, and become the hero of your own STEM story.",
    primary: "Start my adventure",
  },
  parents: {
    eyebrow: "🛡️ Trusted by parents & teachers",
    title: (
      <>
        Real curriculum, <span className="text-gradient">zero ads,</span> serious
        progress.
      </>
    ),
    body: "Mini Techies turns school standards into joyful, gamified learning for ages 7-18 — with AI that adapts, a dashboard that shows real growth, and built-in support for every kind of mind.",
    primary: "Join the waitlist",
  },
} as const;

const floaters = [
  { e: "🔬", x: "8%", y: "20%", d: 0 },
  { e: "🚀", x: "86%", y: "12%", d: 0.6 },
  { e: "➗", x: "14%", y: "72%", d: 1.1 },
  { e: "⚙️", x: "90%", y: "66%", d: 0.3 },
  { e: "💡", x: "78%", y: "84%", d: 0.9 },
  { e: "🧪", x: "4%", y: "46%", d: 1.4 },
];

export function Hero() {
  const { audience } = useAudience();
  const reduce = useReducedMotion();
  const c = copy[audience];

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36">
      {/* background flourishes */}
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary-soft blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-sun-soft blur-3xl" />

      {!reduce &&
        floaters.map((f, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute hidden text-3xl sm:block md:text-4xl"
            style={{ left: f.x, top: f.y }}
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{
              duration: 6 + f.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: f.d,
            }}
            aria-hidden="true"
          >
            {f.e}
          </motion.span>
        ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <AudienceToggle />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={audience}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mt-6 flex justify-center lg:justify-start">
                <Badge>{c.eyebrow}</Badge>
              </div>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                {c.title}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink/70 lg:mx-0">
                {c.body}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/#waitlist" size="lg">
              {c.primary}
            </Button>
            <Button href="/#try" variant="ghost" size="lg">
              ▶ Try a mini module
            </Button>
          </div>

          <dl className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 lg:justify-start">
            {[
              { k: "Ages 7-18", v: "Adapts to every grade" },
              { k: "100% ad-free", v: "Privacy-first by design" },
              { k: "Curriculum-aligned", v: "Built on real standards" },
            ].map((s) => (
              <div key={s.k} className="text-center lg:text-left">
                <dt className="font-display text-lg font-bold text-ink">
                  {s.k}
                </dt>
                <dd className="text-sm text-ink/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            className="absolute -left-6 -top-14 z-10 hidden w-24 sm:block lg:-left-12"
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <TutorAvatar tutor="mini" float={false} />
          </motion.div>
          <PersonalizePreview />
        </div>
      </div>
    </section>
  );
}
