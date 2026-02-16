<script lang="ts">
	import { animate, stagger } from 'motion';
	import PricingCard from './PricingCard.svelte';

	let section: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);

	const tiers = [
		{
			tier: 'Stargazer',
			tierSlug: 'stargazer',
			price: 'Free',
			features: [
				'Daily horoscopes',
				'Basic transit alerts',
				'Weekly overview',
				'Community access'
			],
			ctaLabel: 'Join Waitlist'
		},
		{
			tier: 'Believer',
			tierSlug: 'believer',
			price: '$9',
			period: '/mo',
			features: [
				'Unlimited AI chat',
				'Therapist mode',
				'Birth chart deep dives',
				'Relationship compatibility'
			],
			highlighted: true,
			ctaLabel: 'Get Believer'
		},
		{
			tier: 'Celestial',
			tierSlug: 'celestial',
			price: '$19',
			period: '/mo',
			features: [
				'Full calendar sync',
				'Predictive life planning',
				'Power day scheduling',
				'Priority support'
			],
			ctaLabel: 'Get Celestial'
		}
	];

	$effect(() => {
		if (!section || hasAnimated) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					hasAnimated = true;
					observer.disconnect();

					const cards = section!.querySelectorAll('[data-card]');
					animate(
						cards,
						{ opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
						{ delay: stagger(0.12), duration: 0.5, easing: 'ease-out' }
					);
				}
			},
			{ threshold: 0.15 }
		);

		observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section bind:this={section} id="pricing" class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-5xl">
		<h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-parchment mb-4 text-center">
			Choose Your Path
		</h2>
		<p class="font-mono text-sm text-stone text-center mb-12 max-w-lg mx-auto">
			Start free. Go deeper when you're ready.
		</p>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{#each tiers as t}
				<div data-card style="opacity: 0;">
					<PricingCard {...t} />
				</div>
			{/each}
		</div>
	</div>
</section>
