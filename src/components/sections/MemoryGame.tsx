"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fireConfetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

type Face = {
  key: string;
  name: string;
  tile: string;
} & ({ type: "img"; src: string } | { type: "emoji"; emoji: string });

const faces: Face[] = [
  { key: "mini", name: "Mini", type: "img", src: "/characters/mini.png", tile: "from-primary/15 to-primary/5" },
  { key: "siren", name: "Siren", type: "img", src: "/characters/siren.png", tile: "from-sky/20 to-sky/5" },
  { key: "tammy", name: "Tammy", type: "img", src: "/characters/tammy.png", tile: "from-coral/15 to-coral/5" },
  { key: "egoa", name: "Egoa", type: "img", src: "/characters/egoa.png", tile: "from-mint/20 to-mint/5" },
  { key: "rocket", name: "Rocket", type: "emoji", emoji: "🚀", tile: "from-sun/25 to-sun/5" },
  { key: "star", name: "Star", type: "emoji", emoji: "⭐", tile: "from-primary/15 to-sky/10" },
];

type Card = { id: number; face: Face };

function buildDeck(): Card[] {
  return faces
    .flatMap((face, i) => [
      { id: i * 2, face },
      { id: i * 2 + 1, face },
    ])
    .map((c) => c);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MemoryGame() {
  const reduce = useReducedMotion();
  const [deck, setDeck] = useState<Card[]>(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);

  const reset = useCallback(() => {
    setDeck(shuffle(buildDeck()));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
  }, []);

  // Shuffle on mount (client-only, avoids SSR hydration mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reset();
  }, [reset]);

  const won = matched.size === faces.length;

  useEffect(() => {
    if (won && !reduce) fireConfetti();
  }, [won, reduce]);

  // Resolve a pair whenever two cards are face-up (robust to click timing).
  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const isMatch = deck[a].face.key === deck[b].face.key;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMoves((m) => m + 1);
    if (isMatch) {
      setMatched((prev) => new Set(prev).add(deck[a].face.key));
      if (!reduce) fireConfetti({ small: true });
      setFlipped([]);
      return;
    }
    const t = setTimeout(() => setFlipped([]), 850);
    return () => clearTimeout(t);
  }, [flipped, deck, reduce]);

  function flip(index: number) {
    setFlipped((prev) => {
      if (prev.length >= 2) return prev;
      if (prev.includes(index)) return prev;
      if (matched.has(deck[index].face.key)) return prev;
      return [...prev, index];
    });
  }

  return (
    <Section id="play" tone="cream" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Brain break"
        title="Match the STEM squad"
        subtitle="Flip the cards to pair up all four AI tutors — a tiny taste of the playful learning waiting inside Mini Techies."
      />

      <div className="mx-auto mt-10 max-w-2xl">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink shadow-card ring-1 ring-ink/5">
            🔁 Moves: {moves}
          </span>
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink shadow-card ring-1 ring-ink/5">
            ⭐ Pairs: {matched.size}/{faces.length}
          </span>
          <Button onClick={reset} variant="ghost" size="sm">
            ↻ New game
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
          {deck.map((card, i) => {
            const isUp = flipped.includes(i) || matched.has(card.face.key);
            const isMatched = matched.has(card.face.key);
            return (
              <button
                key={card.id}
                onClick={() => flip(i)}
                aria-label={isUp ? card.face.name : "Hidden card"}
                className={cn(
                  "relative aspect-square w-full rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                  isMatched && "opacity-80"
                )}
                style={{ perspective: "1000px" }}
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    reduce ? "" : "transition-transform duration-300"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isUp ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Back */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky text-2xl font-bold text-white shadow-card"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="opacity-90">?</span>
                    <span
                      className="bg-dotgrid absolute inset-0 rounded-2xl opacity-20"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Front */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ring-1 ring-ink/5",
                      card.face.tile,
                      isMatched && "ring-2 ring-mint"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {card.face.type === "img" ? (
                      <Image
                        src={card.face.src}
                        alt={card.face.name}
                        fill
                        sizes="(max-width: 640px) 30vw, 120px"
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <span className="text-4xl sm:text-5xl" aria-hidden="true">
                        {card.face.emoji}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {won && (
          <div className="mt-8 rounded-3xl bg-white p-6 text-center shadow-card ring-1 ring-ink/5">
            <p className="text-3xl" aria-hidden="true">
              🎉
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">
              You matched them all!
            </h3>
            <p className="mt-2 text-ink/70">
              Solved in{" "}
              <span className="font-bold text-primary">{moves} moves</span>. This
              is the kind of joyful challenge kids get every day on Mini Techies.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/#waitlist" size="lg">
                Join the waitlist 🚀
              </Button>
              <Button onClick={reset} variant="ghost" size="lg">
                ↻ Play again
              </Button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
