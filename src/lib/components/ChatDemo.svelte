<script lang="ts">
	import { animate } from 'motion';
	import { tick } from 'svelte';

	let container: HTMLElement | undefined = $state();
	let hasAnimated = $state(false);
	let showUserMessage = $state(false);
	let showTypingIndicator = $state(false);
	let showAiResponse = $state(false);
	let typedText = $state('');

	const userMessage = 'I feel stuck in my career.';
	const aiResponse = 'Saturn is transiting your 10th house and squaring your natal Mars. This isn\'t a dead end — it\'s a restructuring. Stop forcing it. Thursday has a Venus trine that favors networking. Let\'s prep for that instead.';

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
		// Type user message character by character
		showUserMessage = true;
		let i = 0;
		const typeInterval = setInterval(() => {
			if (i < userMessage.length) {
				typedText = userMessage.slice(0, i + 1);
				i++;
			} else {
				clearInterval(typeInterval);
				// Show typing indicator after message completes
				setTimeout(() => {
					showTypingIndicator = true;
					// Show AI response after typing indicator
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
			Ask the Stars
		</h2>
		<p class="font-mono text-sm text-stone text-center mb-12 max-w-lg mx-auto">
			Your birth chart has answers. Celesto doesn't just read horoscopes — it reads you.
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
					<!-- User message -->
					<div class="self-end bg-void-surface border-2 border-parchment/20 px-4 py-3 max-w-[80%]">
						<p class="font-mono text-sm text-parchment">
							{typedText}<span class="animate-blink {typedText.length === userMessage.length ? 'hidden' : ''}">|</span>
						</p>
					</div>
				{/if}

				{#if showTypingIndicator}
					<!-- Typing indicator -->
					<div class="border-l-2 border-lavender pl-4">
						<div class="flex gap-1.5">
							<span class="w-1.5 h-1.5 bg-lavender animate-blink"></span>
							<span class="w-1.5 h-1.5 bg-lavender animate-blink" style="animation-delay: 0.2s"></span>
							<span class="w-1.5 h-1.5 bg-lavender animate-blink" style="animation-delay: 0.4s"></span>
						</div>
					</div>
				{/if}

				{#if showAiResponse}
					<!-- AI response -->
					<div data-ai-response class="border-l-2 border-lavender pl-4" style="opacity: 0;">
						<p class="font-mono text-sm text-lavender-light leading-relaxed">
							{aiResponse}
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
