<script lang="ts">
	import { animate, stagger } from 'motion';
	import EmailForm from './EmailForm.svelte';
	import PhoneMockup from './PhoneMockup.svelte';

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
	class="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
>
	<div class="mx-auto max-w-6xl w-full">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Copy -->
			<div class="flex flex-col gap-6 lg:gap-8">
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
					Your AI astrological therapist. Sync your calendar, chat with your chart, and navigate the chaos.
				</p>
				<div data-reveal style="opacity: 0;">
					<EmailForm id="hero-waitlist" referralSource="hero" />
				</div>
			</div>

			<!-- Phone -->
			<div data-reveal class="flex justify-center lg:justify-end" style="opacity: 0;">
				<PhoneMockup />
			</div>
		</div>
	</div>
</section>
