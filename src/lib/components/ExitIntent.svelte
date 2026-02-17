<script lang="ts">
	import EmailForm from './EmailForm.svelte';
	import { getWaitlistEmail } from '$lib/stores/waitlist-email.svelte';

	let show = $state(false);

	function dismiss() {
		show = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') dismiss();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) dismiss();
	}

	$effect(() => {
		// Only on desktop (no touch)
		if ('ontouchstart' in window) return;

		function handleMouseLeave(e: MouseEvent) {
			if (e.clientY > 0) return;
			if (sessionStorage.getItem('celesto-exit-shown')) return;
			if (getWaitlistEmail()) return;

			sessionStorage.setItem('celesto-exit-shown', '1');
			show = true;
		}

		document.addEventListener('mouseleave', handleMouseLeave);
		return () => document.removeEventListener('mouseleave', handleMouseLeave);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm animate-fade-in"
		onclick={handleBackdropClick}
	>
		<div class="brutalist-border bg-void-light max-w-md w-full mx-4 p-8 relative" role="dialog" aria-modal="true" aria-label="Join the waitlist">
			<button
				onclick={dismiss}
				class="absolute top-4 right-4 text-stone hover:text-parchment transition-colors font-mono text-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
				aria-label="Close"
			>
				&times;
			</button>

			<h2 class="font-serif text-2xl font-bold text-parchment mb-3">Your chart is waiting.</h2>
			<p class="font-mono text-sm text-stone mb-6">
				Join <span class="text-parchment font-semibold">2,000+</span> stargazers waiting for Celesto
			</p>

			<EmailForm id="exit-intent" referralSource="exit-intent" />
		</div>
	</div>
{/if}
