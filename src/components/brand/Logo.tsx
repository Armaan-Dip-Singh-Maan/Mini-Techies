import { cn } from "@/lib/cn";

/**
 * Placeholder wordmark + mark for Mini Techies.
 * Swap the mark for the client-supplied logo file when provided.
 */
export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      {showWord && (
        <span className="font-display text-xl font-bold tracking-tight text-ink">
          Mini<span className="text-primary">Techies</span>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Mini Techies"
    >
      <defs>
        <linearGradient id="mt-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="var(--color-sky)" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="13" fill="url(#mt-mark)" />
      {/* friendly robot face */}
      <circle cx="18" cy="22" r="4.2" fill="white" />
      <circle cx="30" cy="22" r="4.2" fill="white" />
      <circle cx="18" cy="22" r="1.9" fill="var(--color-ink)" />
      <circle cx="30" cy="22" r="1.9" fill="var(--color-ink)" />
      <path
        d="M16 31c2.4 2.4 13.6 2.4 16 0"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="22.4" y="6" width="3.2" height="6" rx="1.6" fill="var(--color-sun)" />
      <circle cx="24" cy="6" r="2.4" fill="var(--color-coral)" />
    </svg>
  );
}
