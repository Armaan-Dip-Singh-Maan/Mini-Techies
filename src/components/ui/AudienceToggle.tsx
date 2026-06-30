"use client";

import { motion } from "motion/react";
import { useAudience, type Audience } from "@/components/providers/AudienceProvider";
import { cn } from "@/lib/cn";

const options: { id: Audience; label: string; emoji: string }[] = [
  { id: "kids", label: "For Kids", emoji: "🎮" },
  { id: "parents", label: "For Parents", emoji: "🛡️" },
];

export function AudienceToggle({ className }: { className?: string }) {
  const { audience, setAudience } = useAudience();

  return (
    <div
      role="tablist"
      aria-label="Choose your view"
      className={cn(
        "relative inline-flex rounded-full bg-white/80 p-1 ring-1 ring-ink/10 backdrop-blur",
        className
      )}
    >
      {options.map((opt) => {
        const active = audience === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={active}
            onClick={() => setAudience(opt.id)}
            className={cn(
              "relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-display font-semibold transition-colors sm:px-5",
              active ? "text-white" : "text-ink/70 hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span aria-hidden="true">{opt.emoji}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
