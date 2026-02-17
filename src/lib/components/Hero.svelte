<script lang="ts">
	import { animate, stagger } from 'motion';
	import EmailForm from './EmailForm.svelte';
	import AppDemo from './AppDemo.svelte';

	interface Props {
		utmSource?: string;
	}

	let { utmSource = '' }: Props = $props();

	let section: HTMLElement | undefined = $state();

	$effect(() => {
		if (!section) return;

		const elements = section.querySelectorAll('[data-reveal]');
		if (elements.length === 0) return;

		animate(
			elements,
			{ opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] },
			{ delay: stagger(0.12), duration: 0.7, easing: [0.22, 1, 0.36, 1] }
		);
	});
</script>

<section
	bind:this={section}
	id="waitlist"
	class="relative min-h-[100dvh] flex items-center pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
	<!-- Starfield background -->
	<div class="hero-stars" aria-hidden="true">
		<div class="star star-1"></div>
		<div class="star star-2"></div>
		<div class="star star-3"></div>
		<div class="star star-4"></div>
		<div class="star star-5"></div>
		<div class="star star-6"></div>
		<div class="star star-7"></div>
		<div class="star star-8"></div>
		<div class="star star-9"></div>
		<div class="star star-10"></div>
		<div class="star star-11"></div>
		<div class="star star-12"></div>
	</div>

	<!-- Ambient gradient orbs -->
	<div class="hero-orb hero-orb-1" aria-hidden="true"></div>
	<div class="hero-orb hero-orb-2" aria-hidden="true"></div>
	<div class="hero-orb hero-orb-3" aria-hidden="true"></div>

	<!-- Constellation line accents -->
	<svg class="hero-constellation" aria-hidden="true" viewBox="0 0 600 400" fill="none">
		<line x1="50" y1="80" x2="180" y2="140" stroke="rgba(184,169,232,0.08)" stroke-width="1"/>
		<line x1="180" y1="140" x2="240" y2="60" stroke="rgba(184,169,232,0.06)" stroke-width="1"/>
		<line x1="240" y1="60" x2="380" y2="120" stroke="rgba(184,169,232,0.05)" stroke-width="1"/>
		<line x1="380" y1="120" x2="520" y2="80" stroke="rgba(184,169,232,0.04)" stroke-width="1"/>
		<circle cx="50" cy="80" r="2" fill="rgba(184,169,232,0.15)"/>
		<circle cx="180" cy="140" r="1.5" fill="rgba(184,169,232,0.12)"/>
		<circle cx="240" cy="60" r="2" fill="rgba(184,169,232,0.1)"/>
		<circle cx="380" cy="120" r="1.5" fill="rgba(184,169,232,0.08)"/>
		<circle cx="520" cy="80" r="2" fill="rgba(184,169,232,0.06)"/>
	</svg>

	<div class="relative mx-auto max-w-7xl w-full z-10">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
			<!-- Copy — takes 7 cols for more breathing room -->
			<div class="lg:col-span-7 flex flex-col gap-5 lg:gap-7">
				<!-- What it is -->
				<div data-reveal style="opacity: 0;">
					<div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lavender/20 bg-lavender/[0.04]">
						<span class="inline-block w-1.5 h-1.5 rounded-full bg-lavender animate-pulse-slow"></span>
						<span class="font-mono text-[11px] text-lavender tracking-widest uppercase">
							Your personal AI astrologer
						</span>
					</div>
				</div>

				<!-- Headline -->
				<h1
					data-reveal
					class="font-serif text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black leading-[1.08] text-parchment"
					style="opacity: 0;"
				>
					Your birth chart<br class="hidden sm:block" />
					knows the answer.<br />
					<span class="text-lavender italic">Ask it.</span>
				</h1>

				<!-- Value prop -->
				<p
					data-reveal
					class="font-mono text-sm sm:text-[15px] text-stone max-w-xl leading-relaxed"
					style="opacity: 0;"
				>
					Stop reading generic horoscopes. Celesto reads YOUR chart — your exact placements, transits, and timing — and gives you answers you can actually use.
				</p>

				<!-- Feature chips -->
				<div data-reveal class="flex flex-wrap gap-2.5" style="opacity: 0;">
					<div class="feature-chip">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-lavender">
							<circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1"/>
							<circle cx="7" cy="7" r="2" fill="currentColor"/>
						</svg>
						<span>AI birth chart chat</span>
					</div>
					<div class="feature-chip">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-lavender">
							<rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1"/>
							<line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="currentColor" stroke-width="1"/>
							<line x1="5" y1="2.5" x2="5" y2="1" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
							<line x1="9" y1="2.5" x2="9" y2="1" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
						</svg>
						<span>Calendar sync</span>
					</div>
					<div class="feature-chip">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-lavender">
							<path d="M7 1L8.5 5H13L9.25 7.5L10.5 12L7 9L3.5 12L4.75 7.5L1 5H5.5L7 1Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
						</svg>
						<span>Power day alerts</span>
					</div>
				</div>

				<!-- Social proof -->
				<div data-reveal class="flex items-center gap-3" style="opacity: 0;">
					<div class="flex -space-x-2">
						<div class="avatar-dot" style="background: #B8A9E8;"></div>
						<div class="avatar-dot" style="background: #8B7BBF;"></div>
						<div class="avatar-dot" style="background: #D0C5F0;"></div>
						<div class="avatar-dot" style="background: #9B8DD4;"></div>
					</div>
					<p class="font-mono text-xs text-stone">
						<span class="text-parchment font-semibold">2,000+</span> stargazers on the waitlist
					</p>
				</div>

				<!-- CTA -->
				<div data-reveal style="opacity: 0;">
					<EmailForm id="hero-waitlist" referralSource={utmSource || 'hero'} ctaText="Join the Waitlist — It's Free" />
				</div>
			</div>

			<!-- App demo — takes 5 cols -->
			<div data-reveal class="lg:col-span-5 flex justify-center lg:justify-end" style="opacity: 0;">
				<AppDemo />
			</div>
		</div>
	</div>
</section>

<style>
	/* Ambient orbs */
	.hero-orb {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		filter: blur(80px);
	}

	.hero-orb-1 {
		top: 10%;
		right: 5%;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(184, 169, 232, 0.1) 0%, transparent 70%);
	}

	.hero-orb-2 {
		bottom: 10%;
		left: -5%;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(139, 123, 191, 0.06) 0%, transparent 70%);
	}

	.hero-orb-3 {
		top: 40%;
		right: 25%;
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(184, 169, 232, 0.04) 0%, transparent 60%);
		animation: orb-drift 12s ease-in-out infinite alternate;
	}

	@keyframes orb-drift {
		from { transform: translate(0, 0); }
		to { transform: translate(30px, -20px); }
	}

	/* Constellation SVG */
	.hero-constellation {
		position: absolute;
		top: 10%;
		left: 0;
		width: 100%;
		height: 60%;
		pointer-events: none;
		opacity: 0.7;
	}

	/* Starfield */
	.hero-stars {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.star {
		position: absolute;
		width: 2px;
		height: 2px;
		border-radius: 50%;
		background: var(--color-parchment);
		animation: star-twinkle 3s ease-in-out infinite alternate;
	}

	.star-1 { top: 8%; left: 15%; opacity: 0.3; animation-delay: 0s; }
	.star-2 { top: 22%; left: 78%; opacity: 0.2; animation-delay: 0.5s; }
	.star-3 { top: 45%; left: 8%; opacity: 0.15; animation-delay: 1s; }
	.star-4 { top: 65%; left: 92%; opacity: 0.25; animation-delay: 1.5s; }
	.star-5 { top: 15%; left: 55%; opacity: 0.2; animation-delay: 0.8s; }
	.star-6 { top: 75%; left: 35%; opacity: 0.15; animation-delay: 2s; }
	.star-7 { top: 35%; left: 42%; opacity: 0.1; animation-delay: 0.3s; width: 1px; height: 1px; }
	.star-8 { top: 55%; left: 68%; opacity: 0.18; animation-delay: 1.2s; }
	.star-9 { top: 85%; left: 20%; opacity: 0.12; animation-delay: 2.2s; width: 1px; height: 1px; }
	.star-10 { top: 12%; left: 35%; opacity: 0.22; animation-delay: 0.7s; }
	.star-11 { top: 50%; left: 85%; opacity: 0.14; animation-delay: 1.8s; width: 1px; height: 1px; }
	.star-12 { top: 90%; left: 60%; opacity: 0.2; animation-delay: 2.5s; }

	@keyframes star-twinkle {
		0% { opacity: var(--tw-opacity, 0.15); transform: scale(1); }
		100% { opacity: calc(var(--tw-opacity, 0.15) * 2.5); transform: scale(1.3); }
	}

	/* Feature chips */
	.feature-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px;
		border: 1px solid rgba(184, 169, 232, 0.15);
		background: rgba(184, 169, 232, 0.04);
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--color-parchment-dark);
		letter-spacing: 0.02em;
	}

	/* Avatar dots for social proof */
	.avatar-dot {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--color-void);
		opacity: 0.8;
	}

	/* Pulse animation for the status dot */
	@keyframes pulse-slow {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	:global(.animate-pulse-slow) {
		animation: pulse-slow 2.5s ease-in-out infinite;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.star { animation: none; }
		.hero-orb-3 { animation: none; }
		:global(.animate-pulse-slow) { animation: none; }
	}
</style>
