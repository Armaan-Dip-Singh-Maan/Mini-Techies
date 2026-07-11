import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WelcomeCard } from "@/components/WelcomeCard";
import { Mascot } from "@/components/brand/Mascot";
import { team, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team & Mission",
  description:
    "Meet the leadership behind Mini Techies — educators, scientists, and builders making STEM learning joyful, ad-free, and accessible for every kid.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: `Our Team & Mission · ${site.name}`,
    description:
      "Meet the leadership behind Mini Techies and the mission driving ad-free, accessibility-first STEM learning.",
    url: `${site.url}/team`,
  },
};

const values = [
  {
    emoji: "🎮",
    title: "Joy first",
    body: "If it isn't fun, kids won't come back. We design learning that earns its place in their day.",
  },
  {
    emoji: "🧩",
    title: "Built for every mind",
    body: "Accessibility and neurodiverse support are foundations, not afterthoughts.",
  },
  {
    emoji: "🛡️",
    title: "Trust by default",
    body: "No ads, no data selling, safe logins. Parents should never have to worry.",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-16 sm:pt-36">
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-primary-soft blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto w-24">
            <Mascot mood="happy" />
          </div>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
            The people behind{" "}
            <span className="text-gradient">Mini Techies</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
            We&apos;re educators, scientists, and builders who believe every kid
            deserves world-class STEM learning that actually feels like play.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the team"
          subtitle="The leaders building joyful, ad-free STEM learning for every kind of mind."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <WelcomeCard
                name={m.name}
                title={m.title}
                initials={m.initials}
                accent={m.accent}
                card={m.card}
                photo={m.photo}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Mission / values */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Our mission"
          title="Make STEM joyful, ad-free, and within reach for every child"
          subtitle="Mini Techies turns real school curriculum into gamified adventures — enhanced with AI, designed for neurodiverse learners, and free of ads."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-ink/5">
                <span className="text-4xl" aria-hidden="true">
                  {v.emoji}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="ink" className="text-center">
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.07]" />
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">
            Want to follow the journey?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-cream/70">
            Join the waitlist and be first to know when Mini Techies launches.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/#waitlist" size="lg">
              Join the waitlist 🚀
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
