import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TeamCard } from "@/components/TeamCard";
import { team } from "@/lib/site";

export function TeamTeaser() {
  return (
    <Section id="team-teaser" tone="cream">
      <SectionHeading
        eyebrow="The team"
        title="Built by people who care about how kids learn"
        subtitle="Educators, scientists, and builders on a mission to make STEM joyful for every child."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <TeamCard {...m} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <Button href="/team" variant="secondary" size="lg">
          Meet the full team →
        </Button>
      </Reveal>
    </Section>
  );
}
