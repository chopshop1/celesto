<script lang="ts">
	import { animate, stagger } from 'motion';

	let section: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);

	const steps = [
		{
			number: '01',
			heading: 'Enter your birth details',
			description: 'Date, time, and place — that\'s all we need to map your chart.'
		},
		{
			number: '02',
			heading: 'AI reads your chart',
			description: 'Celesto interprets your natal placements and current transits instantly.'
		},
		{
			number: '03',
			heading: 'Ask anything, anytime',
			description: 'Career, love, timing — get specific answers based on your actual chart.'
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
						{ opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] },
						{ delay: stagger(0.15), duration: 0.5, easing: 'ease-out' }
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
	<div class="mx-auto max-w-5xl">
		<h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-parchment text-center mb-12">
			How It Works
		</h2>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
			{#each steps as step}
				<div data-reveal class="flex flex-col gap-3" style="opacity: 0;">
					<!-- Icon -->
					{#if step.number === '01'}
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-lavender" aria-hidden="true">
							<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
							<line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							<line x1="7" y1="13" x2="13" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					{:else if step.number === '02'}
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-lavender" aria-hidden="true">
							<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
							<circle cx="12" cy="12" r="3" fill="currentColor"/>
							<line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							<line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							<line x1="3" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							<line x1="18" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					{:else}
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-lavender" aria-hidden="true">
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
							<line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
							<line x1="8" y1="13" x2="12" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					{/if}

					<!-- Step number -->
					<span class="font-mono text-2xl font-semibold text-lavender">{step.number}</span>

					<!-- Heading -->
					<h3 class="font-serif text-xl font-bold text-parchment">{step.heading}</h3>

					<!-- Description -->
					<p class="font-mono text-sm text-stone leading-relaxed">{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
