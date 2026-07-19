"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export type TutorKey = "mini" | "siren" | "tammy" | "egoa";

const tutorData: Record<
  TutorKey,
  { name: string; subject: string; src: string; w: number; h: number }
> = {
  mini: { name: "Mini", subject: "Math", src: "/characters/mini.png", w: 287, h: 461 },
  siren: { name: "Siren", subject: "Science", src: "/characters/siren.png", w: 288, h: 662 },
  tammy: { name: "Tammy", subject: "Technology", src: "/characters/tammy.png", w: 507, h: 756 },
  egoa: { name: "Egoa", subject: "Engineering", src: "/characters/egoa.png", w: 337, h: 743 },
};

/**
 * A friendly Mini Techies AI tutor avatar (Mini, Siren, Tammy, or Egoa),
 * used across the site as the brand mascot.
 */
export function TutorAvatar({
  tutor = "mini",
  float = true,
  className,
  imgClassName,
}: {
  tutor?: TutorKey;
  float?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const reduce = useReducedMotion();
  const t = tutorData[tutor];
  const animate = float && !reduce ? { y: [0, -10, 0] } : undefined;

  return (
    <motion.div
      animate={animate}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={cn("select-none", className)}
    >
      <Image
        src={t.src}
        alt={`${t.name}, your AI ${t.subject} tutor`}
        width={t.w}
        height={t.h}
        className={cn("mx-auto drop-shadow-xl", imgClassName ?? "h-auto w-full")}
      />
    </motion.div>
  );
}
