"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type AgeBand = "7-10" | "11-14" | "15-18";

const ages: { id: AgeBand; label: string }[] = [
  { id: "7-10", label: "7-10" },
  { id: "11-14", label: "11-14" },
  { id: "15-18", label: "15-18" },
];

const subjects = [
  { id: "science", label: "Science", emoji: "🔬", accent: "mint" },
  { id: "tech", label: "Tech", emoji: "💻", accent: "primary" },
  { id: "engineering", label: "Engineering", emoji: "⚙️", accent: "coral" },
  { id: "math", label: "Math", emoji: "➗", accent: "sky" },
] as const;

type SubjectId = (typeof subjects)[number]["id"];

const modulesBySubject: Record<SubjectId, Record<AgeBand, string[]>> = {
  science: {
    "7-10": ["Volcano lab", "Animal habitats", "States of matter"],
    "11-14": ["Cells & systems", "Chemical reactions", "Forces & motion"],
    "15-18": ["Genetics decoded", "Organic chemistry", "Physics of energy"],
  },
  tech: {
    "7-10": ["Code your robot", "Pixel art logic", "Internet safety"],
    "11-14": ["Build a website", "Intro to Python", "How AI thinks"],
    "15-18": ["App development", "Data & algorithms", "Machine learning 101"],
  },
  engineering: {
    "7-10": ["Bridge builder", "Simple machines", "Design a maze"],
    "11-14": ["Circuits & sensors", "3D design basics", "Robotics challenge"],
    "15-18": ["Structural design", "Renewable systems", "Automation projects"],
  },
  math: {
    "7-10": ["Fraction quest", "Shapes & symmetry", "Times-table arena"],
    "11-14": ["Algebra unlocked", "Geometry proofs", "Ratios & rates"],
    "15-18": ["Functions & graphs", "Probability lab", "Intro to calculus"],
  },
};

export function PersonalizePreview({ className }: { className?: string }) {
  const [age, setAge] = useState<AgeBand>("11-14");
  const [subject, setSubject] = useState<SubjectId>("tech");

  const modules = useMemo(
    () => modulesBySubject[subject][age],
    [subject, age]
  );
  const active = subjects.find((s) => s.id === subject)!;

  return (
    <div
      className={cn(
        "w-full rounded-[2rem] bg-white p-5 shadow-card ring-1 ring-ink/5 sm:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-primary">
          Build your path
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-sun-soft px-3 py-1 text-xs font-bold text-ink">
          🔥 Day 1 streak
        </span>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          Age
        </p>
        <div className="flex gap-2">
          {ages.map((a) => (
            <button
              key={a.id}
              onClick={() => setAge(a.id)}
              aria-pressed={age === a.id}
              className={cn(
                "flex-1 rounded-xl px-2 py-2 text-sm font-semibold transition",
                age === a.id
                  ? "bg-ink text-cream"
                  : "bg-cream text-ink/70 hover:bg-primary-soft"
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          Spark a subject
        </p>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              aria-pressed={subject === s.id}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ring-1 transition",
                subject === s.id
                  ? "bg-primary-soft text-ink ring-primary"
                  : "bg-cream text-ink/70 ring-transparent hover:ring-ink/10"
              )}
            >
              <span aria-hidden="true">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-cream p-4">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold text-ink">
            <span aria-hidden="true">{active.emoji}</span> Your {active.label}{" "}
            adventure
          </p>
          <span className="text-xs font-semibold text-ink/50">3 modules</span>
        </div>
        <ul className="mt-3 space-y-2">
          <AnimatePresence mode="popLayout">
            {modules.map((m, i) => (
              <motion.li
                key={`${subject}-${age}-${m}`}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-ink/5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-ink">{m}</span>
                <span className="ml-auto text-xs font-bold text-mint">
                  +{(i + 1) * 50} XP
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <p className="mt-3 text-center text-xs text-ink/50">
        Live preview — your real path adapts with AI as you learn.
      </p>
    </div>
  );
}
