"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { trust, faqs } from "@/lib/site";
import { cn } from "@/lib/cn";

const ribbon = [
  "Curriculum-aligned",
  "COPPA-minded privacy",
  "No third-party ads",
  "Parent dashboard",
  "Accessibility-first",
];

export function ForParents() {
  return (
    <Section id="parents" tone="white" className="scroll-mt-20">
      <SectionHeading
        eyebrow="For parents & teachers"
        title="The fun is for kids. The trust is for you."
        subtitle="Inspired by the parent-trusted standards of the best kids' platforms — built to earn a place in your child's day."
      />

      {/* credibility ribbon */}
      <Reveal className="mt-8">
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {ribbon.map((r) => (
            <li
              key={r}
              className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/5"
            >
              <span className="text-mint" aria-hidden="true">
                ✓
              </span>
              {r}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {trust.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.06}>
            <div className="flex h-full items-start gap-4 rounded-3xl bg-cream p-6 ring-1 ring-ink/5 transition-transform hover:-translate-y-1">
              <span className="text-3xl" aria-hidden="true">
                {t.emoji}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {t.title}
                </h3>
                <p className="mt-1 leading-relaxed text-ink/70">{t.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-16 max-w-3xl">
        <h3 className="text-center font-display text-2xl font-bold text-ink">
          Questions parents ask
        </h3>
        <div className="mt-6 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FaqItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-display font-bold text-ink">{q}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform",
            open && "rotate-45"
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 leading-relaxed text-ink/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
