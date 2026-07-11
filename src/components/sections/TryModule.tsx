"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { fireConfetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

type Question = {
  subject: string;
  emoji: string;
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
};

const questions: Question[] = [
  {
    subject: "Math",
    emoji: "➗",
    prompt: "A robot takes 3 steps forward, then 5 more. How many steps total?",
    options: ["6", "8", "15", "2"],
    answer: 1,
    explain: "3 + 5 = 8 steps. Addition combines both groups of steps.",
  },
  {
    subject: "Science",
    emoji: "🔬",
    prompt: "Which of these is a source of renewable energy?",
    options: ["Coal", "Solar", "Gasoline", "Natural gas"],
    answer: 1,
    explain: "Solar power comes from the sun and never runs out — that's renewable!",
  },
  {
    subject: "Tech",
    emoji: "💻",
    prompt: "In code, what does a 'loop' help you do?",
    options: [
      "Repeat actions",
      "Delete files",
      "Change colors",
      "Turn off the screen",
    ],
    answer: 0,
    explain: "Loops repeat instructions so you don't have to write them over and over.",
  },
];

export function TryModule() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[step];
  const isCorrect = picked === q?.answer;
  const isLast = step === questions.length - 1;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) {
      setXp((x) => x + 50);
      if (!reduce) fireConfetti({ small: true });
    }
  }

  function next() {
    if (isLast) {
      setDone(true);
      if (!reduce) fireConfetti();
      return;
    }
    setStep((s) => s + 1);
    setPicked(null);
  }

  function restart() {
    setStep(0);
    setPicked(null);
    setXp(0);
    setDone(false);
  }

  return (
    <Section id="try" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Show, don't tell"
        title="Try a mini module right now"
        subtitle="Meet Mini, your AI tutor. No signup, no app store — just the kind of bite-sized, game-like learning kids get every day."
      />

      <div className="mx-auto mt-12 flex max-w-4xl items-center justify-center gap-6">
        {!done && (
          <div className="relative hidden w-44 shrink-0 lg:block">
            <Image
              src="/characters/mini.png"
              alt="Mini, your AI math tutor"
              width={287}
              height={461}
              className="h-auto w-full drop-shadow-xl"
            />
            <div className="absolute -right-1 top-4 rounded-2xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-pop">
              Hi! I’m Mini ✨
            </div>
          </div>
        )}
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8">
          {/* progress + xp header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-sky"
                  initial={false}
                  animate={{
                    width: `${
                      ((done ? questions.length : step) / questions.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-sun-soft px-3 py-1 text-sm font-bold text-ink">
              ⭐ {xp} XP
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                  <span aria-hidden="true">{q.emoji}</span> {q.subject} · Question{" "}
                  {step + 1} of {questions.length}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink sm:text-2xl">
                  {q.prompt}
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {q.options.map((opt, i) => {
                    const chosen = picked === i;
                    const correct = i === q.answer;
                    const reveal = picked !== null;
                    return (
                      <button
                        key={opt}
                        onClick={() => choose(i)}
                        disabled={reveal}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left font-semibold transition",
                          !reveal &&
                            "border-ink/10 bg-cream hover:border-primary hover:bg-primary-soft",
                          reveal &&
                            correct &&
                            "border-mint bg-mint-soft text-ink",
                          reveal &&
                            chosen &&
                            !correct &&
                            "border-coral bg-coral-soft text-ink",
                          reveal &&
                            !correct &&
                            !chosen &&
                            "border-ink/5 bg-cream opacity-60"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                            reveal && correct
                              ? "bg-mint text-white"
                              : reveal && chosen && !correct
                                ? "bg-coral text-white"
                                : "bg-white text-ink ring-1 ring-ink/10"
                          )}
                        >
                          {reveal && correct
                            ? "✓"
                            : reveal && chosen && !correct
                              ? "✕"
                              : String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "mt-5 flex items-start gap-3 rounded-2xl p-4 text-sm",
                          isCorrect
                            ? "bg-mint-soft text-ink"
                            : "bg-coral-soft text-ink"
                        )}
                      >
                        <span className="text-lg" aria-hidden="true">
                          {isCorrect ? "🎉" : "💡"}
                        </span>
                        <p>
                          <strong>
                            {isCorrect ? "Nice! +50 XP. " : "Good try! "}
                          </strong>
                          {q.explain}
                        </p>
                      </div>
                      <div className="mt-5 flex justify-end">
                        <Button onClick={next}>
                          {isLast ? "See my result" : "Next question →"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 text-center"
              >
                <div className="mx-auto w-24">
                  <Image
                    src="/characters/mini.png"
                    alt="Mini celebrating"
                    width={287}
                    height={461}
                    className="h-auto w-full drop-shadow-xl"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-ink">
                  Module complete!
                </h3>
                <p className="mt-2 text-ink/70">
                  You earned{" "}
                  <span className="font-bold text-primary">{xp} XP</span> and
                  unlocked the{" "}
                  <span className="font-bold text-coral">Curious Mind</span>{" "}
                  badge. Imagine this every day.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href="/#waitlist" size="lg">
                    Join the waitlist
                  </Button>
                  <Button onClick={restart} variant="ghost" size="lg">
                    ↻ Play again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
