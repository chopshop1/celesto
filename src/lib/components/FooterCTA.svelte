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

		<!-- Legal & Social -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-stone">
			<a href="/privacy" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Privacy</a>
			<a href="/terms" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Terms</a>
			<a
				href="https://discord.gg/gpjt2cqP"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center gap-1.5"
				aria-label="Join our Discord"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
				</svg>
				Discord
			</a>
			<span>&copy; 2026 Celesto. All rights reserved.</span>
		</div>
	</div>
</footer>
