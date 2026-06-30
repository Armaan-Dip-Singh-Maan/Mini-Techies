import { cn } from "@/lib/cn";

type Tone = "cream" | "white" | "ink" | "primary";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-cream",
  primary: "bg-primary text-white",
};

export function Section({
  id,
  children,
  className,
  tone = "cream",
  containerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-28", toneClasses[tone], className)}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
