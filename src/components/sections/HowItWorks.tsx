"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TutorAvatar, type TutorKey } from "@/components/brand/TutorAvatar";
import { steps } from "@/lib/site";
import { accentStyles } from "@/lib/accents";
import { cn } from "@/lib/cn";

const stepTutors: TutorKey[] = ["mini", "siren", "tammy", "egoa"];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(next);
  });

  return (
    <Section id="how-it-works" tone="cream" className="scroll-mt-20">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps from curious to confident"
        subtitle="A gamified loop that keeps learners coming back — and keeps them growing."
      />

      <div ref={ref} className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Sticky visual */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div
              className={cn(
                "relative overflow-hidden rounded-[2.5rem] p-10 ring-1 ring-ink/5 transition-colors duration-500",
                accentStyles[steps[active].accent].bgSoft
              )}
            >
              <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative flex flex-col items-center text-center">
                <div className="text-7xl" aria-hidden="true">
                  {steps[active].emoji}
                </div>
                <div className="mt-4 flex h-44 items-end justify-center">
                  <TutorAvatar
                    tutor={stepTutors[active % stepTutors.length]}
                    imgClassName="h-full w-auto"
                  />
                </div>
                <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-ink/60">
                  Step {steps[active].n} of {steps.length}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  {steps[active].title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-1 rounded-full bg-ink/10 lg:left-[27px]" />
          <motion.div
            className="absolute left-[27px] top-2 w-1 origin-top rounded-full bg-gradient-to-b from-primary to-coral"
            style={{ scaleY: fill, height: "calc(100% - 16px)" }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const s = accentStyles[step.accent];
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45 }}
                  className="relative flex gap-5 pl-0"
                >
                  <div
                    className={cn(
                      "z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white shadow-pop transition-transform",
                      s.bg,
                      active === i ? "scale-110" : "scale-100"
                    )}
                    aria-hidden="true"
                  >
                    {step.emoji}
                  </div>
                  <div
                    className={cn(
                      "flex-1 rounded-3xl bg-white p-6 ring-1 transition-all",
                      active === i
                        ? "ring-2 " + s.ring + " shadow-card"
                        : "ring-ink/5"
                    )}
                  >
                    <span className="font-display text-sm font-bold uppercase tracking-wide text-ink/40">
                      Step {step.n}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink/70">
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
