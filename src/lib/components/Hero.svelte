<script lang="ts">
	import { animate, stagger } from 'motion';
	import EmailForm from './EmailForm.svelte';
	import PhoneMockup from './PhoneMockup.svelte';

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
			{ opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
			{ delay: stagger(0.15), duration: 0.6, easing: 'ease-out' }
		);
	});
</script>

<section
	bind:this={section}
	id="waitlist"
	class="relative flex items-start pt-14 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
	<!-- Ambient background gradient -->
	<div class="hero-ambient"></div>

	<div class="relative mx-auto max-w-6xl w-full z-10">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			<!-- Copy -->
			<div class="flex flex-col gap-4 lg:gap-6">
				<div data-reveal style="opacity: 0;">
					<span class="inline-flex items-center gap-2 font-mono text-[11px] text-lavender/80 tracking-widest uppercase mb-2">
						<span class="inline-block w-6 h-px bg-lavender/40"></span>
						AI Astrology
					</span>
				</div>
				<h1
					data-reveal
					class="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-parchment"
					style="opacity: 0;"
				>
					Celesto knows why you're crying.
				</h1>
				<p
					data-reveal
					class="font-mono text-sm sm:text-base text-stone max-w-lg leading-relaxed"
					style="opacity: 0;"
				>
					Your birth chart, decoded. Your schedule, aligned. Your next move, mapped.
				</p>
				<p data-reveal class="font-mono text-xs text-lavender" style="opacity: 0;">
					Join 2,000+ stargazers on the waitlist
				</p>
				<div data-reveal style="opacity: 0;">
					<EmailForm id="hero-waitlist" referralSource={utmSource || 'hero'} />
				</div>
			</div>

			<!-- Phone -->
			<div data-reveal class="flex justify-center lg:justify-end" style="opacity: 0;">
				<PhoneMockup />
			</div>
		</div>
	</div>
</section>

<style>
	.hero-ambient {
		position: absolute;
		top: 0;
		right: -10%;
		width: 70%;
		height: 100%;
		background: radial-gradient(
			ellipse at 60% 50%,
			rgba(184, 169, 232, 0.06) 0%,
			rgba(184, 169, 232, 0.02) 35%,
			transparent 65%
		);
		pointer-events: none;
	}
</style>
