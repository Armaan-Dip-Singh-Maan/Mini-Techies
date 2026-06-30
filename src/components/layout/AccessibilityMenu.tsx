"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useA11y } from "@/components/providers/AccessibilityProvider";
import { cn } from "@/lib/cn";

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const { reduceMotion, readable, largeText, toggle } = useA11y();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const options: {
    key: "readable" | "largeText" | "reduceMotion";
    label: string;
    desc: string;
    on: boolean;
  }[] = [
    {
      key: "readable",
      label: "Readable font",
      desc: "Hyperlegible type & spacing",
      on: readable,
    },
    {
      key: "largeText",
      label: "Larger text",
      desc: "Increase overall text size",
      on: largeText,
    },
    {
      key: "reduceMotion",
      label: "Reduce motion",
      desc: "Calm down animations",
      on: reduceMotion,
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Accessibility options"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink ring-1 ring-ink/10 transition hover:bg-white hover:ring-primary"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <path
            d="M4 8h16M12 8v6m0 0l-3 6m3-6l3 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            role="menu"
            className="absolute right-0 mt-3 w-72 rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/10"
          >
            <p className="px-2 pb-2 pt-1 font-display text-sm font-bold text-ink">
              Make it comfy
            </p>
            <ul className="space-y-1">
              {options.map((opt) => (
                <li key={opt.key}>
                  <button
                    type="button"
                    role="menuitemcheckbox"
                    aria-checked={opt.on}
                    onClick={() => toggle(opt.key)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-cream"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {opt.label}
                      </span>
                      <span className="block text-xs text-ink/60">
                        {opt.desc}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition",
                        opt.on ? "bg-mint" : "bg-ink/15"
                      )}
                    >
                      <span
                        className={cn(
                          "h-5 w-5 rounded-full bg-white shadow transition-transform",
                          opt.on && "translate-x-5"
                        )}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
