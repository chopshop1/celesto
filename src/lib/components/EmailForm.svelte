<script lang="ts">
	import { env } from '$env/dynamic/public';

	interface Props {
		id?: string;
		endpoint?: string;
		referralSource?: string;
	}

	let { id = 'waitlist', endpoint = '/api/waitlist', referralSource = 'direct' }: Props = $props();

	let email = $state('');
	let website = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let turnstileToken = $state('');
	let turnstileEl: HTMLDivElement | undefined = $state();
	let widgetId = $state<string | undefined>(undefined);

	$effect(() => {
		if (turnstileEl && typeof window !== 'undefined' && window.turnstile) {
			widgetId = window.turnstile.render(turnstileEl, {
				sitekey: env.PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
				callback: (token: string) => {
					turnstileToken = token;
				},
				theme: 'dark',
				size: 'compact'
			});
		}
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'loading') return;

		status = 'loading';
		errorMessage = '';

		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					referralSource,
					turnstileToken,
					website
				})
			});

			const data = await res.json();

			if (res.ok) {
				status = 'success';
				email = '';
			} else {
				status = 'error';
				errorMessage = data.error || 'Something went wrong.';
			}
		} catch {
			status = 'error';
			errorMessage = 'Network error. Please try again.';
		}

		if (widgetId !== undefined && window.turnstile) {
			window.turnstile.reset(widgetId);
			turnstileToken = '';
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-3 w-full max-w-md" {id}>
	<div class="hp-field" aria-hidden="true">
		<label for="{id}-hp">Website</label>
		<input type="text" id="{id}-hp" name="website" bind:value={website} tabindex="-1" autocomplete="off" />
	</div>

	{#if status === 'success'}
		<div class="brutalist-border-lavender p-4 text-center">
			<p class="text-lavender font-mono text-sm font-semibold">You're on the list.</p>
			<p class="text-stone text-xs mt-1">We'll be in touch when it's your time.</p>
		</div>
	{:else}
		<div class="flex flex-col sm:flex-row gap-2">
			<input
				type="email"
				bind:value={email}
				placeholder="your@email.com"
				required
				class="flex-1 bg-void-surface border-2 border-parchment px-4 py-3 font-mono text-sm text-parchment placeholder:text-stone focus:border-lavender focus:outline-none transition-colors"
			/>
			<button
				type="submit"
				disabled={status === 'loading'}
				class="bg-lavender text-void px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:bg-lavender-light disabled:opacity-50 transition-colors border-2 border-lavender"
			>
				{status === 'loading' ? '...' : 'Join'}
			</button>
		</div>

		<div bind:this={turnstileEl} class="mt-1"></div>

		{#if status === 'error'}
			<p class="text-red-400 font-mono text-xs">{errorMessage}</p>
		{/if}
	{/if}
</form>
