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
				'Daily horoscope (sun sign only)',
				'3 transit alerts per week',
				'Weekly overview',
				'Community access'
			],
			ctaLabel: 'Join the Waitlist'
		},
		{
			tier: 'Believer',
			tierSlug: 'believer',
			price: '$9',
			period: '/mo',
			features: [
				'Unlimited AI chart readings',
				'AI consultant — instant chart interpretations',
				'Full natal chart analysis',
				'Synastry & compatibility reports'
			],
			highlighted: true,
			ctaLabel: 'Claim Early Access'
		},
		{
			tier: 'Celestial',
			tierSlug: 'celestial',
			price: '$19',
			period: '/mo',
			features: [
				'Everything in Believer',
				'Full calendar sync & power days',
				'Predictive life planning',
				'Priority support & beta features'
			],
			ctaLabel: 'Claim Early Access'
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
			Early Access Pricing
		</h2>
		<p class="font-mono text-sm text-stone text-center mb-8 max-w-lg mx-auto">
			Lock in these prices before launch. Waitlist members get first access.
		</p>

		<!-- Social proof -->
		<div class="flex items-center justify-center gap-3 mb-12">
			<div class="flex -space-x-2">
				<div class="w-5 h-5 rounded-full border-2 border-void" style="background: #B8A9E8; opacity: 0.8;" aria-hidden="true"></div>
				<div class="w-5 h-5 rounded-full border-2 border-void" style="background: #8B7BBF; opacity: 0.8;" aria-hidden="true"></div>
				<div class="w-5 h-5 rounded-full border-2 border-void" style="background: #D0C5F0; opacity: 0.8;" aria-hidden="true"></div>
			</div>
			<p class="font-mono text-xs text-stone">
				<span class="text-parchment font-semibold">2,000+</span> stargazers already waiting
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{#each tiers as t}
				<div data-card class="h-full" style="opacity: 0;">
					<PricingCard {...t} />
				</div>
			{/each}
		</div>
	</div>
</section>
