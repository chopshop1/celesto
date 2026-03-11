# Celesto Website Improvements — Execution Plan

## Wave 1: Copy & Config Changes

### 1.1 Add form microcopy
- [ ] Below every EmailForm: add "Free. No spam. Early access when we launch."
- [ ] After signup success: show "You're #[position] on the waitlist. Check your email." instead of "You're in. The stars noticed."
- [ ] Files: `src/lib/components/EmailForm.svelte`, `src/lib/components/PricingCard.svelte`

### 1.2 Standardize CTA copy
- [ ] Hero form button: "Claim Spot" → "Join the Waitlist — It's Free"
- [ ] Navbar button: "Claim Your Spot" → "Join the Waitlist"
- [ ] Footer form button: "Claim Spot" → "Join the Waitlist"
- [ ] Stargazer pricing CTA: "Join Waitlist" → "Join the Waitlist"
- [ ] Paid tier CTAs: keep "Claim Early Access" but rename inline form button from "Reserve Spot" → "Reserve [Tier]"
- [ ] Files: `EmailForm.svelte`, `Navbar.svelte`, `PricingCard.svelte`, `Pricing.svelte`

### 1.3 Add mid-page CTAs after demo sections
- [ ] After ChatDemo section: add a centered CTA block — "This is what Celesto does." + [Join the Waitlist] button linking to `#waitlist`
- [ ] After CalendarFeature section: add a centered CTA block — "See your power days." + [Join the Waitlist] button linking to `#waitlist`
- [ ] Style: font-mono, text-sm, lavender accent, consistent with page aesthetic
- [ ] Files: `src/lib/components/ChatDemo.svelte`, `src/lib/components/CalendarFeature.svelte`

### 1.4 Repeat social proof
- [ ] Add "2,000+ stargazers already waiting" above the pricing grid in `Pricing.svelte`
- [ ] Add "Join 2,000+ stargazers" near the footer CTA in `FooterCTA.svelte`
- [ ] Style consistent with hero social proof (avatar dots + mono text)

### 1.5 Fix form loading/disabled states
- [ ] Replace "..." loading text with "Submitting..." on the button
- [ ] Add "Verifying..." disabled state text when Turnstile hasn't loaded yet
- [ ] Add `autocomplete="email"` and `inputmode="email"` to all email inputs
- [ ] Add `aria-label="Email address"` to all email inputs
- [ ] Files: `EmailForm.svelte`, `PricingCard.svelte`

### 1.6 Simplify hero value prop copy
- [ ] Badge: "AI-powered chart reader & consultant" → "Your personal AI astrologer"
- [ ] Value prop: "Celesto decodes your natal chart into real advice — not fluff. Sync your calendar, spot your power days, and stop making decisions during Mercury retrograde." → "Stop reading generic horoscopes. Celesto reads YOUR chart and gives real advice — specific to your exact birth time and placements. Sync your calendar and see your best days ahead."
- [ ] File: `Hero.svelte`

### 1.7 Reframe pricing as early access
- [ ] Heading: "Choose Your Path" → "Early Access Pricing"
- [ ] Subheading: "Everyone gets the horoscope. Not everyone gets the whole chart." → "Lock in these prices before launch. Waitlist members get first access."
- [ ] File: `Pricing.svelte`

### 1.8 Update title tag and meta description
- [ ] Title: "Celesto — AI Astrology App & Horoscope Calendar" → "Celesto — AI Birth Chart Reader & Daily Horoscope App"
- [ ] Meta description: update to "Free AI birth chart reading & daily horoscope. Celesto decodes your natal chart, reads transits, and syncs astrology to your calendar. Join 2,000+ on the waitlist."
- [ ] OG title: update to match new title
- [ ] Twitter title: update to match
- [ ] File: `src/app.html`

### 1.9 Self-host fonts
- [ ] Download Playfair Display (400, 700, 900, italic 400, italic 700) and JetBrains Mono (400, 600) WOFF2 files
- [ ] Place in `static/fonts/`
- [ ] Create `@font-face` declarations in `src/app.css`
- [ ] Remove Google Fonts `<link>` tags and `preconnect` from `app.html`
- [ ] Verify fonts render correctly

---

## Wave 2: New Sections & Components

### 2.1 "How It Works" 3-step section
- [ ] Create `src/lib/components/HowItWorks.svelte`
- [ ] Three steps: "1. Enter your birth details" → "2. AI reads your chart" → "3. Ask anything, anytime"
- [ ] Each step: icon + heading + one-line description
- [ ] Style: horizontal on desktop (3 cols), vertical on mobile, mono font, lavender step numbers
- [ ] Add scroll-reveal animation consistent with other sections
- [ ] Insert between Hero and ChatDemo in `+page.svelte`

### 2.2 FAQ section with schema markup
- [ ] Create `src/lib/components/FAQ.svelte`
- [ ] Questions: "Do I need to know astrology?", "What birth info do I need?", "When does it launch?", "Is my data private?", "How is the AI different from other apps?", "Can I use it for compatibility?"
- [ ] Accordion-style expand/collapse (no JS library — use `<details>/<summary>` or Svelte toggle)
- [ ] Add `FAQPage` JSON-LD schema in `+page.svelte`
- [ ] Insert between Pricing and FooterCTA
- [ ] Style: brutalist borders, mono font, consistent spacing

### 2.3 Sticky mobile CTA bar
- [ ] Create `src/lib/components/StickyCTA.svelte`
- [ ] Fixed bottom bar, only visible on mobile (hidden on `lg:` breakpoint)
- [ ] Appears after user scrolls past the hero section (use IntersectionObserver)
- [ ] Content: "Join the Waitlist" button, full-width, lavender background
- [ ] Hides when user is at the hero or footer form (to avoid overlap)
- [ ] Min-height 44px, safe area padding for notched phones (`pb-safe`)
- [ ] Add to `+layout.svelte` or `+page.svelte`

### 2.4 Exit intent popup
- [ ] Create `src/lib/components/ExitIntent.svelte`
- [ ] Desktop only: triggers on `mouseleave` from document top edge
- [ ] Only shows once per session (use sessionStorage flag)
- [ ] Only shows if user hasn't already signed up (check waitlist email store)
- [ ] Content: "Before you go..." + "Join 2,000+ stargazers waiting for Celesto" + email form
- [ ] Backdrop overlay, centered modal, close button, ESC to dismiss
- [ ] Brutalist border styling, dark background

### 2.5 "Most Popular" badge on Believer tier
- [ ] Add a "Most Popular" label/badge to the Believer pricing card
- [ ] Style: lavender background, uppercase mono text, positioned at top of card
- [ ] File: `PricingCard.svelte` — add conditional badge when `highlighted` prop is true

### 2.6 Improve footer CTA copy
- [ ] Heading: "Don't miss your transit." → "Don't miss your window."
- [ ] Copy: "The waitlist is open. Spots are limited. The stars are not going to remind you twice." → "Limited to 5,000 early access spots. Lock in your rate before launch."
- [ ] File: `FooterCTA.svelte`

### 2.7 Improve ChatDemo copy
- [ ] Heading: "Ask the Stars" → "Like texting an astrologer who knows your whole chart"
- [ ] Subheading: update to "Ask about your career, relationships, timing — anything. Celesto interprets your actual transits and gives specific, actionable answers."
- [ ] File: `ChatDemo.svelte`

### 2.8 Improve CalendarFeature copy
- [ ] Heading: "Schedule with Intention." → "Your calendar, aligned with the stars."
- [ ] Copy: update to "See which days are cosmically in your favor — and which ones to avoid for big decisions, launches, or tough conversations."
- [ ] File: `CalendarFeature.svelte`
