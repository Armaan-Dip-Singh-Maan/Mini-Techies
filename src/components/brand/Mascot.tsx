"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Mood = "happy" | "wave" | "celebrate" | "think";

/**
 * "Bit" — the Mini Techies mascot. A friendly robot that reacts with moods.
 */
export function Mascot({
  className,
  mood = "happy",
  float = true,
}: {
  className?: string;
  mood?: Mood;
  float?: boolean;
}) {
  const reduce = useReducedMotion();
  const animate =
    float && !reduce ? { y: [0, -10, 0], rotate: [0, 2, 0] } : undefined;

  return (
    <motion.svg
      viewBox="0 0 200 220"
      className={cn("select-none", className)}
      role="img"
      aria-label="Bit, the Mini Techies robot mascot"
      animate={animate}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="bit-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="var(--color-primary-dark)" />
        </linearGradient>
        <linearGradient id="bit-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1020" />
          <stop offset="1" stopColor="#1b2350" />
        </linearGradient>
      </defs>

      {/* antenna */}
      <line
        x1="100"
        y1="34"
        x2="100"
        y2="14"
        stroke="var(--color-sky)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.circle
        cx="100"
        cy="11"
        r="8"
        fill="var(--color-sun)"
        animate={reduce ? undefined : { scale: [1, 1.2, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      {/* head */}
      <rect x="44" y="34" width="112" height="92" rx="26" fill="url(#bit-body)" />
      <rect x="40" y="40" width="120" height="80" rx="24" fill="url(#bit-face)" />

      {/* eyes */}
      <Eyes mood={mood} reduce={!!reduce} />

      {/* cheeks */}
      <circle cx="64" cy="98" r="6" fill="var(--color-coral)" opacity="0.7" />
      <circle cx="136" cy="98" r="6" fill="var(--color-coral)" opacity="0.7" />

      {/* mouth by mood */}
      {mood === "celebrate" ? (
        <ellipse cx="100" cy="100" rx="12" ry="9" fill="var(--color-sun)" />
      ) : mood === "think" ? (
        <circle cx="108" cy="102" r="5" fill="var(--color-sky)" />
      ) : (
        <path
          d="M84 98c5 7 27 7 32 0"
          stroke="var(--color-sky)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* body */}
      <rect x="62" y="132" width="76" height="58" rx="20" fill="url(#bit-body)" />
      <rect x="78" y="146" width="44" height="30" rx="10" fill="#0b1020" opacity="0.45" />
      <circle cx="90" cy="161" r="4" fill="var(--color-mint)" />
      <circle cx="110" cy="161" r="4" fill="var(--color-coral)" />

      {/* arms */}
      <motion.rect
        x="34"
        y="138"
        width="26"
        height="12"
        rx="6"
        fill="var(--color-primary-dark)"
        style={{ transformOrigin: "60px 144px" }}
        animate={
          mood === "wave" && !reduce ? { rotate: [0, -28, 0, -28, 0] } : undefined
        }
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <rect
        x="140"
        y="138"
        width="26"
        height="12"
        rx="6"
        fill="var(--color-primary-dark)"
      />

      {/* legs */}
      <rect x="76" y="190" width="16" height="20" rx="7" fill="var(--color-ink-soft)" />
      <rect x="108" y="190" width="16" height="20" rx="7" fill="var(--color-ink-soft)" />
    </motion.svg>
  );
}

function Eyes({ mood, reduce }: { mood: Mood; reduce: boolean }) {
  if (mood === "celebrate") {
    return (
      <>
        <path
          d="M62 74c4-6 12-6 16 0"
          stroke="var(--color-sun)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M122 74c4-6 12-6 16 0"
          stroke="var(--color-sun)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }
  return (
    <>
      <motion.circle
        cx="74"
        cy="76"
        r="11"
        fill="var(--color-sky)"
        animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
        style={{ transformOrigin: "74px 76px" }}
      />
      <motion.circle
        cx="126"
        cy="76"
        r="11"
        fill="var(--color-sky)"
        animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
        style={{ transformOrigin: "126px 76px" }}
      />
      <circle cx="77" cy="73" r="3.4" fill="white" />
      <circle cx="129" cy="73" r="3.4" fill="white" />
    </>
  );
}
