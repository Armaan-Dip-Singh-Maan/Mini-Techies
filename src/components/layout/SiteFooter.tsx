import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="[&_span]:text-cream" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.tagline} A {site.parent} product, building joyful,
              ad-free STEM learning for every kind of mind.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream/60">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/80 transition hover:text-sun"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#waitlist"
                  className="text-cream/80 transition hover:text-sun"
                >
                  Join the waitlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream/60">
              Connect
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-cream/80 transition hover:text-sun"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  className="text-cream/80 transition hover:text-sun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  className="text-cream/80 transition hover:text-sun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.social.youtube}
                  className="text-cream/80 transition hover:text-sun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. A {site.parent} product.
            All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-mint" />
            No ads · Privacy-first · Accessibility-first
          </p>
        </div>
      </div>
    </footer>
  );
}
