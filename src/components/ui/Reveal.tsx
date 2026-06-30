"use client";

import { motion, useReducedMotion } from "motion/react";
import { useA11y } from "@/components/providers/AccessibilityProvider";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const osReduce = useReducedMotion();
  const { reduceMotion } = useA11y();
  const noMotion = osReduce || reduceMotion;

  return (
    <motion.div
      className={className}
      initial={noMotion ? false : { opacity: 0, y }}
      whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
