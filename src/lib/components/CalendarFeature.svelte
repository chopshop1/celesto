<script lang="ts">
	import { animate, stagger } from 'motion';

	let grid: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);

	const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

	type DayType = 'normal' | 'bad' | 'power' | 'empty';

	interface Day {
		num: number;
		type: DayType;
	}

	// Hardcoded March calendar
	const days: (Day | null)[] = [
		// Padding for March starting on Saturday (6 empty)
		null, null, null, null, null, null,
		{ num: 1, type: 'power' },
		{ num: 2, type: 'normal' },
		{ num: 3, type: 'bad' },
		{ num: 4, type: 'normal' },
		{ num: 5, type: 'normal' },
		{ num: 6, type: 'power' },
		{ num: 7, type: 'normal' },
		{ num: 8, type: 'normal' },
		{ num: 9, type: 'normal' },
		{ num: 10, type: 'bad' },
		{ num: 11, type: 'bad' },
		{ num: 12, type: 'normal' },
		{ num: 13, type: 'power' },
		{ num: 14, type: 'normal' },
		{ num: 15, type: 'normal' },
		{ num: 16, type: 'normal' },
		{ num: 17, type: 'normal' },
		{ num: 18, type: 'bad' },
		{ num: 19, type: 'normal' },
		{ num: 20, type: 'power' },
		{ num: 21, type: 'normal' },
		{ num: 22, type: 'normal' },
		{ num: 23, type: 'normal' },
		{ num: 24, type: 'normal' },
		{ num: 25, type: 'bad' },
		{ num: 26, type: 'normal' },
		{ num: 27, type: 'power' },
		{ num: 28, type: 'normal' },
		{ num: 29, type: 'normal' },
		{ num: 30, type: 'normal' },
		{ num: 31, type: 'normal' }
	];

	$effect(() => {
		if (!grid || hasAnimated) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					hasAnimated = true;
					observer.disconnect();

					const cells = grid!.querySelectorAll('[data-day]');
					animate(
						cells,
						{ opacity: [0, 1], transform: ['scale(0.8)', 'scale(1)'] },
						{ delay: stagger(0.03), duration: 0.3, easing: 'ease-out' }
					);
				}
			},
			{ threshold: 0.2 }
		);

		observer.observe(grid);

		return () => observer.disconnect();
	});
</script>

<section id="calendar" class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Copy -->
			<div>
				<h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-parchment mb-4">
					Your calendar, aligned with the stars.
				</h2>
				<p class="font-mono text-sm text-stone leading-relaxed mb-6">
					See which days are cosmically in your favor — and which ones to avoid for big decisions, launches, or tough conversations.
				</p>
				<div class="flex gap-6 font-mono text-xs">
					<div class="flex items-center gap-2">
						<div class="w-3 h-3 bg-lavender" aria-hidden="true"></div>
						<span class="text-lavender">Power Day</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-3 h-3 bg-stone/30" aria-hidden="true"></div>
						<span class="text-stone">Lay Low</span>
					</div>
				</div>
			</div>

			<!-- Calendar grid -->
			<div class="brutalist-border p-4 sm:p-6 bg-void-light">
				<!-- Month header -->
				<div class="flex items-center justify-between mb-4">
					<span class="font-serif text-lg font-bold text-parchment">March 2026</span>
					<span class="font-mono text-xs text-stone">Pisces Season</span>
				</div>

				<!-- Day labels -->
				<div class="grid grid-cols-7 gap-1 mb-2">
					{#each dayLabels as label}
						<div class="text-center font-mono text-[10px] text-stone py-1">
							{label}
						</div>
					{/each}
				</div>

				<!-- Days grid -->
				<div bind:this={grid} class="grid grid-cols-7 gap-1">
					{#each days as day}
						{#if day === null}
							<div></div>
						{:else}
							<div
								data-day
								class="aspect-square flex items-center justify-center font-mono text-xs border
									{day.type === 'power'
										? 'bg-lavender-glow border-lavender text-lavender font-semibold'
										: day.type === 'bad'
											? 'bg-stone/5 border-stone/20 text-stone line-through'
											: 'border-void-border text-parchment/70'}"
								style="opacity: 0;"
							>
								{day.num}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Mid-page CTA -->
		<div class="mt-12 text-center">
			<p class="font-mono text-sm text-stone mb-4">Never miss a power day.</p>
			<a
				href="#waitlist"
				class="inline-block brutalist-border-lavender bg-transparent px-6 py-3 font-mono text-sm uppercase tracking-widest text-lavender hover:bg-lavender hover:text-void transition-colors"
			>
				Join the Waitlist
			</a>
		</div>
	</div>
</section>
