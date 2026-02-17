<script lang="ts">
	let { children } = $props();
	import "@fontsource/playfair-display/400.css";
	import "@fontsource/playfair-display/400-italic.css";
	import "@fontsource/playfair-display/700.css";
	import "@fontsource/playfair-display/700-italic.css";
	import "@fontsource/playfair-display/900.css";
	import "@fontsource/jetbrains-mono/400.css";
	import "@fontsource/jetbrains-mono/600.css";
	import "../app.css";
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
	<noscript>
		<style>
			[data-reveal], [data-card], [data-day], [data-ai-response] {
				opacity: 1 !important;
				transform: none !important;
			}
		</style>
	</noscript>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<Navbar />

<main id="main-content">
	{@render children()}
</main>
