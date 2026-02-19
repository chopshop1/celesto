<script lang="ts">
	import { animate } from 'motion';
	import { tick } from 'svelte';

	let container: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);
	let showUserMessage = $state(false);
	let showTypingIndicator = $state(false);
	let showAiResponse = $state(false);
	let typedText = $state('');

	const userMessage = 'Should I pitch my startup idea this week?';
	const aiResponse = 'Saturn trining your natal Mercury peaks Thursday at 2pm — that\'s your window. Mercury enters your 10th house the same day, sharpening how you communicate authority. Pitch Thursday afternoon. Avoid Monday: Mars square Neptune clouds your delivery.';

	$effect(() => {
		if (!container || hasAnimated) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					hasAnimated = true;
					observer.disconnect();
					startSequence();
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(container);

		return () => observer.disconnect();
	});

	function startSequence() {
		showUserMessage = true;
		let i = 0;
		const typeInterval = setInterval(() => {
			if (i < userMessage.length) {
				typedText = userMessage.slice(0, i + 1);
				i++;
			} else {
				clearInterval(typeInterval);
				setTimeout(() => {
					showTypingIndicator = true;
					setTimeout(async () => {
						showTypingIndicator = false;
						showAiResponse = true;
						await tick();
						if (container) {
							const aiEl = container.querySelector('[data-ai-response]');
							if (aiEl) {
								animate(
									aiEl,
									{ opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0)'] },
									{ duration: 0.4, easing: 'ease-out' }
								);
							}
						}
					}, 1500);
				}, 500);
			}
		}, 40);
	}
</script>

<section id="chat" class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-parchment mb-4 text-center">
			Like texting an astrologer who knows your schedule
		</h2>
		<p class="font-mono text-sm text-stone text-center mb-12 max-w-lg mx-auto">
			Ask about timing for any decision — career moves, conversations, launches. Celesto reads your transits and tells you exactly when to act.
		</p>

		<div
			bind:this={container}
			class="brutalist-border bg-void-light p-6 sm:p-8 max-w-2xl mx-auto"
		>
			<!-- Chat header -->
			<div class="flex items-center gap-3 border-b-2 border-parchment/10 pb-4 mb-6">
				<div class="w-2 h-2 bg-lavender" aria-hidden="true"></div>
				<span class="font-mono text-xs text-stone uppercase tracking-widest">Celesto AI</span>
			</div>

			<!-- Chat messages -->
			<div class="flex flex-col gap-4 min-h-[200px]">
				{#if showUserMessage}
					<div class="self-end bg-void-surface border-2 border-parchment/20 px-4 py-3 max-w-[80%]">
						<p class="font-mono text-sm text-parchment">
							{typedText}<span class="animate-blink {typedText.length === userMessage.length ? 'hidden' : ''}">|</span>
						</p>
					</div>
				{/if}

				{#if showTypingIndicator}
					<div class="border-l-2 border-lavender pl-4">
						<div class="flex gap-1.5">
							<span class="w-1.5 h-1.5 bg-lavender animate-blink"></span>
							<span class="w-1.5 h-1.5 bg-lavender animate-blink" style="animation-delay: 0.2s"></span>
							<span class="w-1.5 h-1.5 bg-lavender animate-blink" style="animation-delay: 0.4s"></span>
						</div>
					</div>
				{/if}

				{#if showAiResponse}
					<div data-ai-response class="border-l-2 border-lavender pl-4" style="opacity: 0;">
						<p class="font-mono text-sm text-lavender-light leading-relaxed">
							{aiResponse}
						</p>
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="font-mono text-sm text-stone mb-4">Get timing advice like this — personalized to your chart.</p>
			<a
				href="#waitlist"
				class="inline-block brutalist-border-lavender bg-transparent px-6 py-3 font-mono text-sm uppercase tracking-widest text-lavender hover:bg-lavender hover:text-void transition-colors"
			>
				Join the Waitlist
			</a>
		</div>
	</div>
</section>
