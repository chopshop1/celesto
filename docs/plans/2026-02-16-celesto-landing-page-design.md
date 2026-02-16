# Celesto Landing Page Design

## Overview

Editorial-style landing page for Celesto — an AI-powered astrological therapist and calendar app. "Digital Brutalism meets Astrology" aesthetic.

## Tech Stack

- SvelteKit 2 + Svelte 5 (runes)
- Tailwind CSS v4 (custom theme)
- Cloudflare Workers adapter
- Neon Postgres via Drizzle ORM (shared DB with nooging)
- Motion One for scroll-triggered animations
- Cloudflare Turnstile for bot protection

## Database

Shared Neon DB with nooging. Add `app` column to both tables:

```sql
ALTER TABLE waitlist ADD COLUMN app varchar(50) NOT NULL DEFAULT 'nooging';
ALTER TABLE pre_purchase_intent ADD COLUMN app varchar(50) NOT NULL DEFAULT 'nooging';
```

Celesto inserts with `app: 'celesto'`. Schema file duplicated locally with the `app` field included.

## Design System

| Token | Value |
|-------|-------|
| bg-primary | `#0A0A0A` |
| bg-light | `#F5F3EF` |
| text-primary | `#F5F3EF` |
| text-dark | `#0A0A0A` |
| accent | `#B8A9E8` (lavender) |
| accent-muted | `#8B7BBF` |
| font-display | Playfair Display (serif) |
| font-mono | JetBrains Mono |

Brutalist rules: no border-radius, hard edges, stark black/white contrasts, oversized typography, visible grid lines, monospaced data text.

## Page Sections

### 1. Hero

- Headline: "Celesto knows why you're crying."
- Subhead: "Your AI astrological therapist. Sync your calendar, chat with your chart, and navigate the chaos."
- Email capture form (waitlist) with Turnstile + honeypot
- CSS 3D phone mockup (perspective + rotateY/rotateX transforms) showing chat bubble: "Mercury is in retrograde, maybe don't text him back."
- Subtle float animation on phone

### 2. Chat Demo — "Ask the Stars"

- Mock chat interface with brutalist styling (monospace, hard borders)
- Typing animation: user types "I feel stuck in my career."
- AI response appears after delay: "Your 10th house is currently empty, but Saturn is in transit. This is a time for building foundations, not instant gratification. Let's look at next Tuesday for your big meeting."
- Triggered on scroll into viewport via Intersection Observer

### 3. Calendar Integration — "Schedule with Intention"

- Headline + description about Google/Apple Calendar integration
- Wireframe-style calendar grid (not a photo)
- "Bad Energy" days greyed out, "Power Days" highlighted in lavender
- Days animate in sequentially on scroll

### 4. Pricing Tiers

Three cards, brutalist style (no rounded corners, thick borders):

| Tier | Price | Features |
|------|-------|----------|
| Stargazer | Free | Daily horoscopes, basic transits |
| Believer | $9/mo | Unlimited AI chat, therapist mode |
| Celestial | $19/mo | Full calendar sync, predictive life planning |

"Get Started" / "Join Waitlist" buttons. Paid tiers track click to `pre_purchase_intent` table with tier name before showing waitlist form.

### 5. Footer CTA

- "Don't miss your transit."
- Email capture (same waitlist endpoint)
- Minimal social icons (X, Instagram, TikTok)
- Copyright + legal links

## Animation Plan (Motion One)

- Scroll-triggered fade-up reveals on all sections
- Staggered children for lists and pricing cards
- Chat typing animation with sequential message reveals
- Phone mockup: CSS keyframe float (translateY oscillation)
- Calendar day highlights: sequential with 50ms stagger
- Respect `prefers-reduced-motion`

## API Routes

- `POST /api/waitlist` — email + referralSource + turnstileToken + honeypot. Inserts to waitlist with `app: 'celesto'`.
- `POST /api/intent` — email + tier + turnstileToken. Inserts to pre_purchase_intent with `app: 'celesto'`.

## SEO

- Semantic HTML: h1 on hero, h2 on sections, proper heading hierarchy
- JSON-LD Organization + SoftwareApplication structured data
- Open Graph + Twitter Card meta tags
- Descriptive title: "Celesto — AI Astrological Therapist & Calendar"
- Meta description targeting "astrology app", "AI horoscope", "astrological calendar"
- Canonical URL
- Fast LCP via minimal hero assets (CSS-only phone mockup, system-loaded fonts)

## Responsive Strategy

Mobile-first breakpoints:
- **Mobile (<640px):** Single column, phone mockup inline (no 3D perspective), stacked pricing cards
- **Tablet (640-1024px):** 2-column pricing, phone mockup with mild perspective
- **Desktop (>1024px):** Full layout, 3-column pricing, full 3D phone mockup, chat demo side-by-side

## Security

- Cloudflare Turnstile on all forms
- Honeypot field (hidden `website` input)
- Email validation (format, length, disposable domain check)
- Server-side only DB access

## Team Review Criteria

- **Marketing:** Copy effectiveness, CTA placement, urgency/FOMO balance
- **UX:** Flow clarity, form friction, mobile usability, animation timing
- **SEO/Growth:** Meta tags, structured data, page speed, ad landing optimization, conversion funnel
