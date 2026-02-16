# Celesto Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an editorial-style landing page for Celesto (AI astrological therapist app) with waitlist signup, pricing intent tracking, and brutalist design aesthetic.

**Architecture:** SvelteKit 2 + Svelte 5 (runes) deployed on Cloudflare Workers. Shared Neon Postgres DB (with nooging) via Drizzle ORM. Motion One for scroll animations. Cloudflare Turnstile for bot protection. Tailwind CSS v4 custom theme.

**Tech Stack:** SvelteKit 2, Svelte 5, Tailwind CSS v4, Drizzle ORM, Neon Postgres, Motion One, Cloudflare Workers, Cloudflare Turnstile

---

## Task 1: Scaffold SvelteKit Project

**Files:**
- Create: `package.json`
- Create: `svelte.config.js`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `wrangler.toml`
- Create: `drizzle.config.ts`
- Create: `.env.example`

**Step 1: Initialize package.json**

```json
{
  "name": "celesto",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "prepare": "svelte-kit sync || echo ''",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "devDependencies": {
    "@sveltejs/adapter-cloudflare": "^7.2.6",
    "@sveltejs/kit": "^2.50.2",
    "@sveltejs/vite-plugin-svelte": "^6.2.4",
    "@tailwindcss/vite": "^4.1.18",
    "dotenv": "^17.2.4",
    "drizzle-kit": "^0.31.9",
    "svelte": "^5.49.2",
    "svelte-check": "^4.3.6",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.9.3",
    "vite": "^7.3.1"
  },
  "dependencies": {
    "@neondatabase/serverless": "^1.0.2",
    "drizzle-orm": "^0.45.1",
    "motion": "^12.0.0"
  }
}
```

**Step 2: Install dependencies**

Run: `cd /home/dev/work/celesto && npm install`

**Step 3: Create svelte.config.js**

```javascript
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
```

**Step 4: Create vite.config.ts**

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    host: '0.0.0.0'
  }
});
```

**Step 5: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "rewriteRelativeImportExtensions": true,
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

**Step 6: Create wrangler.toml**

```toml
name = "celesto"
compatibility_date = "2026-02-10"
main = ".svelte-kit/cloudflare/_worker.js"

[assets]
directory = ".svelte-kit/cloudflare"
binding = "ASSETS"
```

**Step 7: Create drizzle.config.ts**

```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
```

**Step 8: Create .env.example**

```
DATABASE_URL=
TURNSTILE_SECRET_KEY=
PUBLIC_TURNSTILE_SITE_KEY=
```

**Step 9: Run svelte-kit sync**

Run: `cd /home/dev/work/celesto && npx svelte-kit sync`

**Step 10: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold SvelteKit project with Cloudflare Workers adapter"
```

---

## Task 2: Database Schema & Server Utilities

**Files:**
- Create: `src/lib/server/db/schema.ts`
- Create: `src/lib/server/db/index.ts`
- Create: `src/lib/server/turnstile.ts`
- Create: `src/lib/server/validate-email.ts`
- Create: `src/lib/server/disposable-domains.ts`

**Step 1: Create schema with app column**

```typescript
// src/lib/server/db/schema.ts
import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';

export const waitlist = pgTable('waitlist', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  referralSource: varchar('referral_source', { length: 100 }),
  app: varchar('app', { length: 50 }).notNull().default('celesto'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const prePurchaseIntent = pgTable('pre_purchase_intent', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 320 }).notNull(),
  tier: varchar('tier', { length: 50 }).notNull(),
  app: varchar('app', { length: 50 }).notNull().default('celesto'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});
```

**Step 2: Create DB connection**

```typescript
// src/lib/server/db/index.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

const sql = neon(env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
```

**Step 3: Copy turnstile.ts from nooging**

Copy `/home/dev/work/nooging/src/lib/server/turnstile.ts` exactly as-is.

**Step 4: Copy validate-email.ts from nooging**

Copy `/home/dev/work/nooging/src/lib/server/validate-email.ts` exactly as-is.

**Step 5: Copy disposable-domains.ts from nooging**

Copy `/home/dev/work/nooging/src/lib/server/disposable-domains.ts` exactly as-is.

**Step 6: Commit**

```bash
git add src/lib/server/ && git commit -m "feat: add DB schema with app tracking, server utilities"
```

---

## Task 3: Tailwind Theme & Global Styles

**Files:**
- Create: `src/app.css`
- Create: `src/app.html`

**Step 1: Create app.css with brutalist Celesto theme**

```css
@import "tailwindcss";

@theme {
  /* Monochrome palette */
  --color-void: #0A0A0A;
  --color-void-light: #141414;
  --color-void-surface: #1A1A1A;
  --color-void-border: rgba(245, 243, 239, 0.1);
  --color-parchment: #F5F3EF;
  --color-parchment-dark: #E8E5DF;
  --color-stone: #888888;

  /* Accent — hyper-digital lavender */
  --color-lavender: #B8A9E8;
  --color-lavender-light: #D0C5F0;
  --color-lavender-dark: #8B7BBF;
  --color-lavender-glow: rgba(184, 169, 232, 0.15);

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing extensions */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
}

button, a, [role="button"] {
  cursor: pointer;
}

body {
  background-color: var(--color-void);
  color: var(--color-parchment);
  font-family: var(--font-mono);
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
}

/* Brutalist borders */
.brutalist-border {
  border: 2px solid var(--color-parchment);
}

.brutalist-border-lavender {
  border: 2px solid var(--color-lavender);
}

/* Accent text */
.text-accent {
  color: var(--color-lavender);
}

/* Honeypot field */
.hp-field {
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
  background: var(--color-lavender);
  color: var(--color-void);
  font-weight: 600;
  z-index: 100;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 1rem;
}

html {
  scroll-behavior: smooth;
}

/* Float animation for phone mockup */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Typing cursor blink */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-blink {
    animation: none;
  }
  * {
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

**Step 2: Create app.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="%sveltekit.assets%/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Celesto — AI Astrological Therapist & Calendar</title>
    <meta name="description" content="Your AI astrological therapist. Sync your calendar, chat with your chart, and navigate the chaos. Celesto combines deep astrological insights with smart calendar integration." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://celesto.app" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Celesto — AI Astrological Therapist & Calendar" />
    <meta property="og:description" content="Your AI astrological therapist. Sync your calendar, chat with your chart, and navigate the chaos." />
    <meta property="og:url" content="https://celesto.app" />
    <meta property="og:site_name" content="Celesto" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Celesto — AI Astrological Therapist & Calendar" />
    <meta name="twitter:description" content="Your AI astrological therapist. Sync your calendar, chat with your chart, and navigate the chaos." />
    %sveltekit.head%
  </head>
  <body>
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

**Step 3: Commit**

```bash
git add src/app.css src/app.html && git commit -m "feat: add brutalist Celesto theme and HTML shell with SEO meta"
```

---

## Task 4: Layout & Navbar

**Files:**
- Create: `src/routes/+layout.svelte`
- Create: `src/lib/components/Navbar.svelte`

**Step 1: Create Navbar.svelte**

Brutalist navigation bar with Celesto wordmark in Playfair Display, section links (Chat, Calendar, Pricing), and a "Join Waitlist" CTA button. Mobile hamburger menu. All monospace except the wordmark. No border-radius. Hard black/white border on scroll.

**Step 2: Create +layout.svelte**

```svelte
<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<Navbar />

<main id="main-content">
  {@render children()}
</main>
```

**Step 3: Commit**

```bash
git add src/routes/+layout.svelte src/lib/components/Navbar.svelte && git commit -m "feat: add layout with brutalist navbar"
```

---

## Task 5: API Routes

**Files:**
- Create: `src/routes/api/waitlist/+server.ts`
- Create: `src/routes/api/intent/+server.ts`

**Step 1: Create waitlist API route**

Same pattern as nooging's `/api/waitlist/+server.ts` but inserts with `app: 'celesto'`:

```typescript
// Key difference from nooging:
const result = await db.insert(waitlist).values({
  email: validation.email,
  referralSource: body.referralSource || 'direct',
  app: 'celesto'
}).returning();
```

**Step 2: Create intent API route**

```typescript
// src/routes/api/intent/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { prePurchaseIntent } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';

export const POST: RequestHandler = async ({ request }) => {
  let body: { email?: string; tier?: string; turnstileToken?: string; website?: string };

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body.website) {
    return json({ success: true }, { status: 201 });
  }

  const turnstileValid = await verifyTurnstile(body.turnstileToken ?? null);
  if (!turnstileValid) {
    return json({ error: 'Bot verification failed' }, { status: 400 });
  }

  const validation = validateEmail(body.email);
  if (!validation.valid) {
    return json({ error: validation.message }, { status: 400 });
  }

  if (!body.tier || !['stargazer', 'believer', 'celestial'].includes(body.tier)) {
    return json({ error: 'Invalid tier' }, { status: 400 });
  }

  try {
    const result = await db.insert(prePurchaseIntent).values({
      email: validation.email,
      tier: body.tier,
      app: 'celesto'
    }).returning();

    return json({ success: true, id: result[0].id }, { status: 201 });
  } catch (err) {
    console.error('Intent capture error:', err);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
```

**Step 3: Commit**

```bash
git add src/routes/api/ && git commit -m "feat: add waitlist and pricing intent API routes"
```

---

## Task 6: Hero Section Component

**Files:**
- Create: `src/lib/components/Hero.svelte`
- Create: `src/lib/components/EmailForm.svelte`
- Create: `src/lib/components/PhoneMockup.svelte`

**Step 1: Create EmailForm.svelte**

Reusable email capture form with Turnstile widget, honeypot, loading states, success/error feedback. Brutalist styling: no border-radius, thick borders, monospace input text, lavender focus ring.

**Step 2: Create PhoneMockup.svelte**

CSS 3D phone using `perspective`, `rotateY(-5deg)`, `rotateX(5deg)`. Black phone frame with hard borders. Inside shows a mock chat bubble: "Mercury is in retrograde, maybe don't text him back." in monospace. Float animation.

**Step 3: Create Hero.svelte**

- `<h1>` in Playfair Display 900 weight: "Celesto knows why you're crying."
- Subhead in JetBrains Mono: "Your AI astrological therapist..."
- EmailForm component for waitlist
- PhoneMockup positioned to the right on desktop, below on mobile
- Motion One fade-up animation on scroll

**Step 4: Commit**

```bash
git add src/lib/components/Hero.svelte src/lib/components/EmailForm.svelte src/lib/components/PhoneMockup.svelte && git commit -m "feat: add hero section with 3D phone mockup and email form"
```

---

## Task 7: Chat Demo Section

**Files:**
- Create: `src/lib/components/ChatDemo.svelte`

**Step 1: Create ChatDemo.svelte**

"Ask the Stars" section. Mock chat interface with:
- Brutalist container (thick white border on black)
- User message typing animation triggered on scroll into viewport (Intersection Observer)
- User types: "I feel stuck in my career."
- Typing indicator (three dots blinking)
- AI response fades in: "Your 10th house is currently empty, but Saturn is in transit..."
- All text in JetBrains Mono
- Lavender accent on AI response border
- Use `motion` library's `animate` for staggered reveals

**Step 2: Commit**

```bash
git add src/lib/components/ChatDemo.svelte && git commit -m "feat: add interactive chat demo with typing animation"
```

---

## Task 8: Calendar Feature Section

**Files:**
- Create: `src/lib/components/CalendarFeature.svelte`

**Step 1: Create CalendarFeature.svelte**

- Headline: "Schedule with Intention." in Playfair Display
- Description text in mono about calendar integration
- Wireframe calendar grid (CSS grid, 7 columns for days)
- Hardcoded month view with:
  - "Bad Energy" days: greyed out with strikethrough text
  - "Power Days": lavender background highlight
  - Normal days: default void background
- Days animate in with staggered delays on scroll (Motion One)
- Labels in monospace, tiny font size

**Step 2: Commit**

```bash
git add src/lib/components/CalendarFeature.svelte && git commit -m "feat: add calendar feature section with wireframe calendar"
```

---

## Task 9: Pricing Cards Section

**Files:**
- Create: `src/lib/components/Pricing.svelte`
- Create: `src/lib/components/PricingCard.svelte`

**Step 1: Create PricingCard.svelte**

Props: `tier`, `price`, `features`, `highlighted`. Brutalist card: no border-radius, 2px white border, black background. Highlighted card (Believer) gets lavender border. Features list in monospace. CTA button that:
- For free tier: scrolls to waitlist form
- For paid tiers: captures email + tier to `/api/intent`, then shows success message

**Step 2: Create Pricing.svelte**

Three-column grid (stacks on mobile). Cards:
1. Stargazer (Free): Daily horoscopes, basic transits
2. Believer ($9/mo): Unlimited AI chat, therapist mode — highlighted
3. Celestial ($19/mo): Full calendar sync, predictive life planning

Motion One stagger on scroll.

**Step 3: Commit**

```bash
git add src/lib/components/Pricing.svelte src/lib/components/PricingCard.svelte && git commit -m "feat: add pricing cards with intent tracking"
```

---

## Task 10: Footer CTA & Social Links

**Files:**
- Create: `src/lib/components/FooterCTA.svelte`

**Step 1: Create FooterCTA.svelte**

- "Don't miss your transit." headline in Playfair Display
- Second EmailForm instance for waitlist
- Minimal social links (X, Instagram, TikTok) using inline SVG icons
- Copyright line
- Links to /privacy, /terms (placeholder pages)

**Step 2: Commit**

```bash
git add src/lib/components/FooterCTA.svelte && git commit -m "feat: add footer CTA with second email capture and social links"
```

---

## Task 11: Assemble Main Page

**Files:**
- Create: `src/routes/+page.svelte`
- Create: `src/routes/+page.server.ts`

**Step 1: Create +page.svelte**

Assemble all sections in order:
1. Hero
2. ChatDemo
3. CalendarFeature
4. Pricing
5. FooterCTA

Add JSON-LD structured data in `<svelte:head>`.

**Step 2: Create +page.server.ts**

Form action for waitlist signup (progressive enhancement fallback for the email forms):

```typescript
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  signup: async ({ request }) => {
    const data = await request.formData();

    if (data.get('website')) {
      return { success: true };
    }

    const turnstileValid = await verifyTurnstile(data.get('cf-turnstile-response') as string);
    if (!turnstileValid) {
      return fail(400, { error: 'Bot verification failed' });
    }

    const validation = validateEmail(data.get('email'));
    if (!validation.valid) {
      return fail(400, { error: validation.message });
    }

    try {
      await db.insert(waitlist).values({
        email: validation.email,
        referralSource: (data.get('referralSource') as string) || 'direct',
        app: 'celesto'
      });
      return { success: true };
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
        return fail(409, { error: 'Email already registered' });
      }
      return fail(500, { error: 'Internal server error' });
    }
  }
};
```

**Step 3: Commit**

```bash
git add src/routes/+page.svelte src/routes/+page.server.ts && git commit -m "feat: assemble main page with all sections and form action"
```

---

## Task 12: Responsive Polish & Build Verification

**Step 1: Verify build passes**

Run: `cd /home/dev/work/celesto && npm run build`
Expected: Clean build with no errors

**Step 2: Verify dev server runs**

Run: `cd /home/dev/work/celesto && npm run dev`
Expected: Dev server starts on localhost

**Step 3: Test responsive breakpoints**

Verify mobile (<640px), tablet (640-1024px), desktop (>1024px) layouts render correctly.

**Step 4: Final commit**

```bash
git add -A && git commit -m "chore: responsive polish and build verification"
```

---

## Task Dependencies

```
Task 1 (scaffold) → Task 2 (DB) → Task 5 (API routes)
Task 1 (scaffold) → Task 3 (theme) → Task 4 (layout)
Task 4 (layout) + Task 5 (API) → Task 6 (hero) → Task 7 (chat) → Task 8 (calendar) → Task 9 (pricing) → Task 10 (footer) → Task 11 (assemble) → Task 12 (verify)
```

Tasks 2+3 can run in parallel after Task 1.
Tasks 6-10 can potentially run in parallel if each component is self-contained, then assembled in Task 11.
