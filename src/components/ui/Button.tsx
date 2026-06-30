import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "sun";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-transform duration-150 will-change-transform active:translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-pop hover:bg-primary-dark hover:-translate-y-0.5",
  secondary:
    "bg-ink text-cream shadow-pop hover:-translate-y-0.5 hover:bg-ink-soft",
  sun: "bg-sun text-ink shadow-pop hover:-translate-y-0.5",
  ghost:
    "bg-white/70 text-ink ring-1 ring-ink/10 backdrop-blur hover:bg-white hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, ...rest } = props;
    void _v;
    void _s;
    void _c;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props as ButtonProps;
  void _v;
  void _s;
  void _c;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
