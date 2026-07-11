import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Mini Techies wordmark logo (client-supplied).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Mini Techies"
      width={376}
      height={179}
      priority
      className={cn("h-9 w-auto", className)}
    />
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
