<script lang="ts">
	import { animate } from 'motion';
	import { tick } from 'svelte';

	let container: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);
	let showUserMessage = $state(false);
	let showTypingIndicator = $state(false);
	let showAiResponse = $state(false);
	let typedText = $state('');

	const userMessage = 'I have a big client meeting Thursday. What does my chart say?';
	const aiResponse = 'Jupiter is trine your natal Mercury this week — your communication is sharp and persuasive. Thursday specifically, the Moon enters your 10th house mid-morning, which is ideal for high-stakes negotiations. This meeting is well-timed for closing. Lead with your proposal early; your chart favors directness over small talk right now.';

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
			Like having a strategist who reads the stars
		</h2>
		<p class="font-mono text-sm text-stone text-center mb-12 max-w-lg mx-auto">
			Ask about meetings, deals, timing — anything on your calendar. Celesto reads your transits and gives you a real edge.
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
			<p class="font-mono text-sm text-stone mb-4">Your next big move deserves better than guessing.</p>
			<a
				href="#waitlist"
				class="inline-block brutalist-border-lavender bg-transparent px-6 py-3 font-mono text-sm uppercase tracking-widest text-lavender hover:bg-lavender hover:text-void transition-colors"
			>
				Join the Waitlist
			</a>
		</div>
	</div>
</section>
