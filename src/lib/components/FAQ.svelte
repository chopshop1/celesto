<script lang="ts">
	import { animate, stagger } from 'motion';

	let section: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);

	const faqs = [
		{
			question: 'Do I need to know astrology?',
			answer: "Not at all. Celesto translates your birth chart into plain language. You ask questions in normal words, and get answers you can actually use."
		},
		{
			question: 'What birth info do I need?',
			answer: "Your date of birth, time of birth, and place of birth. If you don't know your exact birth time, Celesto can still work with your date and location — you'll just miss some details like your rising sign."
		},
		{
			question: 'When does it launch?',
			answer: "We're building now and launching to waitlist members first. Join the waitlist to get early access before the public launch."
		},
		{
			question: 'Is my data private?',
			answer: "Yes. We don't sell your data. Birth details and chart readings are encrypted and never shared with third parties. See our privacy policy for details."
		},
		{
			question: 'How is Celesto different from other astrology apps?',
			answer: 'Most apps give you a generic daily blurb based on your sun sign. Celesto uses AI to read your full natal chart — all your placements, houses, and transits — and gives you specific, actionable guidance.'
		},
		{
			question: 'Can I use it for compatibility?',
			answer: 'Yes. Celesto does full synastry readings — comparing your chart with another person\'s to show compatibility in love, friendship, and work.'
		}
	];

	$effect(() => {
		if (!section || hasAnimated) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					hasAnimated = true;
					observer.disconnect();

					const items = section!.querySelectorAll('[data-reveal]');
					animate(
						items,
						{ opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
						{ delay: stagger(0.08), duration: 0.4, easing: 'ease-out' }
					);
				}
			},
			{ threshold: 0.15 }
		);

		observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section bind:this={section} class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-parchment mb-12 text-center">
			Frequently Asked Questions
		</h2>

		<div class="flex flex-col">
			{#each faqs as faq}
				<details data-reveal class="border-b-2 border-parchment/10 group" style="opacity: 0;">
					<summary class="font-mono text-sm text-parchment py-4 px-6 cursor-pointer list-none flex items-center justify-between gap-4 hover:text-lavender transition-colors">
						{faq.question}
						<span class="text-stone group-open:rotate-45 transition-transform text-lg" aria-hidden="true">+</span>
					</summary>
					<div class="font-mono text-sm text-stone leading-relaxed px-6 pb-4">
						{faq.answer}
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	details summary::-webkit-details-marker {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
