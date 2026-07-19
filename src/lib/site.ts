export const site = {
  name: "Mini Techies",
  domain: "mini-techies.ca",
  url: "https://mini-techies.ca",
  tagline: "STEM adventures that level up real school skills.",
  description:
    "Mini Techies gamifies science, technology, engineering, and math for kids ages 7-18. Built on real school curriculum, enhanced with AI, with progress tracking, certificates, and built-in support for neurodiverse learners. No ads, ever.",
  email: "hello@mini-techies.ca",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
} as const;

export const nav = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Try a Module", href: "/#try" },
  { label: "Play", href: "/#play" },
  { label: "For Parents", href: "/#parents" },
  { label: "Team", href: "/team" },
] as const;

export const audiences = [
  {
    id: "kids",
    emoji: "🚀",
    title: "Kids & Teens, 7-18",
    body: "Play your way through real STEM challenges, earn badges, keep your streak, and watch your skills level up.",
    accent: "coral" as const,
  },
  {
    id: "parents",
    emoji: "🛡️",
    title: "Parents",
    body: "Curriculum-aligned learning with zero ads, safe logins, and a dashboard that shows real progress, not screen time.",
    accent: "primary" as const,
  },
  {
    id: "teachers",
    emoji: "🍎",
    title: "Teachers",
    body: "Standards-mapped modules that meet students where they are and adapt as they grow.",
    accent: "sky" as const,
  },
];

export const steps = [
  {
    n: 1,
    title: "Personalize",
    body: "Pick an age, grade, and the subjects that spark curiosity. Mini Techies builds a learning path that fits.",
    emoji: "🎯",
    accent: "primary" as const,
  },
  {
    n: 2,
    title: "Play modules",
    body: "Character-led, bite-sized missions turn lessons into games with quizzes, puzzles, and hands-on challenges.",
    emoji: "🎮",
    accent: "coral" as const,
  },
  {
    n: 3,
    title: "Track progress",
    body: "Streaks, XP, dashboards, and certificates make growth visible and worth celebrating.",
    emoji: "📈",
    accent: "mint" as const,
  },
  {
    n: 4,
    title: "AI adapts",
    body: "The path gets smarter every session, adding support where it is needed and a challenge where it is not.",
    emoji: "✨",
    accent: "sun" as const,
  },
];

export const trust = [
  {
    title: "Built on real curriculum",
    body: "Modules map to school standards so practice at home reinforces the classroom.",
    emoji: "📚",
  },
  {
    title: "Designed for neurodiverse learners",
    body: "Adjustable pacing, readable typography, reduced-motion options, and clear, calm interfaces.",
    emoji: "🧩",
  },
  {
    title: "Safe, private logins",
    body: "Kid-safe accounts with parent controls. Your child's data is never sold.",
    emoji: "🔐",
  },
  {
    title: "No ads. Ever.",
    body: "No advertising and no distractions, just focused, joyful learning.",
    emoji: "🚫",
  },
];

export const team = [
  {
    name: "Musap “Moose” Abdel",
    title: "Founder & Chief Executive Officer",
    bio: "Moose leads Mini Techies with a mission to make world-class STEM learning playful, accessible, and available to every kid.",
    initials: "MA",
    photo: "/team/moose.png",
    card: null,
    accent: "primary" as const,
  },
  {
    name: "Dr. D’Andre Wilson-Ihejirika",
    title: "Chief Product Officer",
    bio: "D'Andre shapes the learning experience, blending real curriculum with game design so progress feels like play.",
    initials: "DW",
    photo: "/team/dandre.png",
    card: "/team/dandre-card.png",
    accent: "coral" as const,
  },
  {
    name: "Dr. Kamini Sehmi, PhD",
    title: "Chief Technology Officer",
    bio: "Kamini builds the adaptive technology that personalizes every learner's path safely and at scale.",
    initials: "KS",
    photo: "/team/kamini.png",
    card: "/team/kamini-card.png",
    accent: "sky" as const,
  },
];

export const faqs = [
  {
    q: "What ages is Mini Techies for?",
    a: "Mini Techies is designed for kids and teens ages 7 to 18, with content that adapts to each learner's grade and level.",
  },
  {
    q: "Is it aligned to school curriculum?",
    a: "Yes. Modules are built on real school curriculum and standards, so learning at home reinforces the classroom.",
  },
  {
    q: "Are there ads?",
    a: "Never. Mini Techies is ad-free and privacy-conscious, with no data selling and safe, parent-controlled logins.",
  },
  {
    q: "Does it support neurodiverse learners?",
    a: "Absolutely. Adjustable pacing, readable typography, reduced-motion options, and a calm interface are built in from the start.",
  },
];

export type Accent = "primary" | "coral" | "sky" | "sun" | "mint";
