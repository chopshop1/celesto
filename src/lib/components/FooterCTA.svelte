<script lang="ts">
	import EmailForm from './EmailForm.svelte';

	interface Props {
		utmSource?: string;
	}

	let { utmSource = '' }: Props = $props();
</script>

<footer class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t-2 border-parchment/10" role="contentinfo">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-parchment mb-4">
			Don't miss your transit.
		</h2>
		<p class="font-mono text-sm text-stone mb-10 max-w-lg mx-auto">
			The waitlist is open. Spots are limited. The stars are not going to remind you twice.
		</p>

		<div class="flex justify-center mb-12">
			<EmailForm id="footer-waitlist" referralSource={utmSource || 'footer'} />
		</div>

		<!-- Legal -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-stone">
			<a href="/privacy" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Privacy</a>
			<a href="/terms" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Terms</a>
			<span>&copy; 2026 Celesto. All rights reserved.</span>
		</div>
	</div>
</footer>
