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

		<!-- Social -->
		<div class="flex items-center justify-center gap-6 mb-12">
			<a href="https://x.com/celesto" target="_blank" rel="noopener noreferrer" class="text-stone hover:text-lavender transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Follow on X">
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
			</a>
			<a href="https://instagram.com/celesto" target="_blank" rel="noopener noreferrer" class="text-stone hover:text-lavender transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Follow on Instagram">
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
			</a>
			<a href="https://tiktok.com/@celesto" target="_blank" rel="noopener noreferrer" class="text-stone hover:text-lavender transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Follow on TikTok">
				<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13.4a8.16 8.16 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.99-2.21V6.69h3.99z"/></svg>
			</a>
		</div>

		<!-- Legal -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-xs text-stone">
			<a href="/privacy" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Privacy</a>
			<a href="/terms" class="hover:text-parchment transition-colors py-2 min-h-[44px] sm:min-h-0 flex items-center">Terms</a>
			<span>&copy; 2026 Celesto. All rights reserved.</span>
		</div>
	</div>
</footer>
