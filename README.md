# Mini Techies — mini-techies.ca

A standalone, gamified, accessibility-first marketing site for **Mini Techies**, a STEM
education platform that turns real school curriculum into game-like learning for kids
ages 7-18. Built to migrate the product off `qa-enterprises.com/mini-techies` to its own
home at **mini-techies.ca**.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- **Motion** (Framer Motion) for animation
- **canvas-confetti** for reward moments
- Deployed on **Vercel**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

Optional configuration lives in `.env.example` — copy it to `.env.local`.

## What's inside

### Signature interactive features
- **Dual-audience toggle** (For Kids / For Parents) that re-tones the hero copy.
- **Personalize preview** — pick an age + subject and watch a learning path build live.
- **Try a Mini Module** — a real, playable 3-question quiz with XP, feedback, and confetti.
- **Gamified scroll** — an XP-style progress bar in the header fills as you explore.
- **Animated mascot "Bit"** that reacts with moods across the page.
- **App preview** — an animated phone showing streaks, dashboards, and certificates.

### Pages
- `/` — single-page home (hero, try-a-module, who it's for, how it works, app preview,
  for parents & teachers + FAQ, team teaser, waitlist).
- `/team` — leadership + mission/values.

### Accessibility (a brand value)
A floating accessibility menu (header) offers:
- **Readable font** (Atkinson Hyperlegible + relaxed spacing)
- **Larger text**
- **Reduce motion** (also auto-respects the OS `prefers-reduced-motion`)

Plus keyboard navigation, focus styles, skip link, semantic landmarks, and alt text.
Preferences persist in `localStorage`.

## Waitlist

The form posts to `POST /api/waitlist`. Delivery is provider-abstracted in
`src/lib/waitlist.ts` and chosen entirely via env vars (no code changes):

| Destination            | Env vars |
| ---------------------- | -------- |
| Webhook (Sheet/CRM/Zapier) | `WAITLIST_WEBHOOK_URL` |
| Email (Resend)         | `RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, `WAITLIST_NOTIFY_EMAIL` |
| Console (default)      | none — logs validated signups server-side |

Includes email validation and a honeypot field for spam protection.

## SEO & analytics
- Per-page metadata, Open Graph + dynamic OG image (`src/app/opengraph-image.tsx`)
- `sitemap.ts`, `robots.ts`, favicon (`icon.svg`)
- JSON-LD: `EducationalOrganization` (layout) + `FAQPage` (home)
- Optional privacy-friendly analytics via Plausible (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)

## Redirects / SEO continuity

`next.config.ts` redirects `/mini-techies*` -> `/` as a safety net. The primary 301 from
`qa-enterprises.com/mini-techies` -> `mini-techies.ca` must be configured on the **QA
Enterprises** domain (it's a different host), e.g. via that site's hosting/redirect rules.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel (framework auto-detected as Next.js).
3. Add the `mini-techies.ca` domain and any env vars from `.env.example`.
4. Submit `mini-techies.ca/sitemap.xml` in Google Search Console.

## Brand assets

Client-supplied assets already integrated (processed via `scripts/prep-assets.mjs` and `scripts/prep-tutors.mjs`):
- Mini Techies logo — `public/logo.png` (blue background removed), used in header/footer.
- AI tutor characters — `public/characters/mini.png` (Math), `tammy.png` (Tech), `egoa.png` (Engineering). They appear in the Try-a-Module section, swapping with the active subject.
- Team welcome cards — `public/team/dandre-card.png`, `public/team/kamini-card.png` shown full on the dedicated `/team` page (not on the home page). Members without a card get a matching branded placeholder (`WelcomeCard`).

Still to drop in later:
- Moose's team card / photo (currently a branded initials placeholder in `WelcomeCard`).
- A Science AI tutor character (Math tutor is used as the fallback host).
- Real app screenshots for the App Preview section.
- Brand colours/fonts can be tuned via tokens in `src/app/globals.css` under `@theme`.
