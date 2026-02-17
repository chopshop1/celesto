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
			Don't miss your window.
		</h2>
		<p class="font-mono text-sm text-stone mb-10 max-w-lg mx-auto">
			Limited to 5,000 early access spots. Lock in your rate before launch.
		</p>

		<!-- Social proof -->
		<div class="flex items-center justify-center gap-3 mb-8">
			<div class="flex -space-x-2">
				<div class="w-5 h-5 rounded-full border-2 border-void" style="background: #B8A9E8; opacity: 0.8;" aria-hidden="true"></div>
				<div class="w-5 h-5 rounded-full border-2 border-void" style="background: #8B7BBF; opacity: 0.8;" aria-hidden="true"></div>
				<div class="w-5 h-5 rounded-full border-2 border-void" style="background: #D0C5F0; opacity: 0.8;" aria-hidden="true"></div>
			</div>
			<p class="font-mono text-xs text-stone">
				Join <span class="text-parchment font-semibold">2,000+</span> stargazers
			</p>
		</div>

		<div class="flex justify-center mb-12">
			<EmailForm id="footer-waitlist" referralSource={utmSource || 'footer'} ctaText="Join the Waitlist — It's Free" />
		</div>

		<!-- Legal -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-stone">
			<a href="/privacy" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Privacy</a>
			<a href="/terms" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Terms</a>
			<span>&copy; 2026 Celesto. All rights reserved.</span>
		</div>
	</div>
</footer>
