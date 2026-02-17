<script lang="ts">
	let visible = $state(false);
	let heroVisible = $state(true);
	let footerVisible = $state(false);

	let shouldShow = $derived(visible && !heroVisible && !footerVisible);

	$effect(() => {
		const hero = document.getElementById('waitlist');
		const footer = document.querySelector('footer');
		if (!hero || !footer) return;

		const heroObserver = new IntersectionObserver(
			(entries) => { heroVisible = entries[0].isIntersecting; },
			{ threshold: 0.1 }
		);

		const footerObserver = new IntersectionObserver(
			(entries) => { footerVisible = entries[0].isIntersecting; },
			{ threshold: 0.1 }
		);

		const scrollObserver = new IntersectionObserver(
			(entries) => { visible = !entries[0].isIntersecting; },
			{ threshold: 0 }
		);

		heroObserver.observe(hero);
		footerObserver.observe(footer);
		scrollObserver.observe(hero);

		return () => {
			heroObserver.disconnect();
			footerObserver.disconnect();
			scrollObserver.disconnect();
		};
	});
</script>

{#if shouldShow}
	<div
		class="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-void-light border-t border-parchment/10 py-3 px-4 animate-slide-up"
		style="padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));"
	>
		<a
			href="#waitlist"
			class="block w-full bg-lavender text-void text-center font-mono text-sm font-semibold uppercase tracking-widest py-3 min-h-[44px] flex items-center justify-center hover:bg-lavender-light transition-colors"
		>
			Join the Waitlist
		</a>
	</div>
{/if}

<style>
	@keyframes slide-up {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}

	.animate-slide-up {
		animation: slide-up 0.3s ease-out;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-slide-up {
			animation: none;
		}
	}
</style>
