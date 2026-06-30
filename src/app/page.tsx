import { Hero } from "@/components/sections/Hero";
import { TryModule } from "@/components/sections/TryModule";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AppPreview } from "@/components/sections/AppPreview";
import { ForParents } from "@/components/sections/ForParents";
import { TeamTeaser } from "@/components/sections/TeamTeaser";
import { Waitlist } from "@/components/sections/Waitlist";
import { faqs } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TryModule />
      <WhoItsFor />
      <HowItWorks />
      <AppPreview />
      <ForParents />
      <TeamTeaser />
      <Waitlist />
    </>
  );
}
