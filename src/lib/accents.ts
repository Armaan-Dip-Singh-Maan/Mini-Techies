import type { Accent } from "./site";

type AccentStyle = {
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  ring: string;
  gradient: string;
  shadow: string;
};

export const accentStyles: Record<Accent, AccentStyle> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary",
    bgSoft: "bg-primary-soft",
    border: "border-primary",
    ring: "ring-primary",
    gradient: "from-primary to-sky",
    shadow: "shadow-[0_18px_40px_-20px_var(--color-primary)]",
  },
  coral: {
    text: "text-coral",
    bg: "bg-coral",
    bgSoft: "bg-coral-soft",
    border: "border-coral",
    ring: "ring-coral",
    gradient: "from-coral to-sun",
    shadow: "shadow-[0_18px_40px_-20px_var(--color-coral)]",
  },
  sky: {
    text: "text-sky",
    bg: "bg-sky",
    bgSoft: "bg-sky-soft",
    border: "border-sky",
    ring: "ring-sky",
    gradient: "from-sky to-primary",
    shadow: "shadow-[0_18px_40px_-20px_var(--color-sky)]",
  },
  sun: {
    text: "text-sun",
    bg: "bg-sun",
    bgSoft: "bg-sun-soft",
    border: "border-sun",
    ring: "ring-sun",
    gradient: "from-sun to-coral",
    shadow: "shadow-[0_18px_40px_-20px_var(--color-sun)]",
  },
  mint: {
    text: "text-mint",
    bg: "bg-mint",
    bgSoft: "bg-mint-soft",
    border: "border-mint",
    ring: "ring-mint",
    gradient: "from-mint to-sky",
    shadow: "shadow-[0_18px_40px_-20px_var(--color-mint)]",
  },
};
