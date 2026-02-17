<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { setWaitlistEmail } from '$lib/stores/waitlist-email.svelte';

	interface Props {
		id?: string;
		endpoint?: string;
		referralSource?: string;
		ctaText?: string;
	}

	let { id = 'waitlist', endpoint = '/api/waitlist', referralSource = 'direct', ctaText = 'Join the Waitlist' }: Props = $props();

	let email = $state('');
	let website = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let waitlistPosition = $state<number | null>(null);
	let turnstileToken = $state('');
	let turnstileEl: HTMLDivElement | undefined = $state();
	let widgetId = $state<string | undefined>(undefined);

	$effect(() => {
		if (!turnstileEl) return;

		let timer: ReturnType<typeof setTimeout>;

		function tryRender() {
			if (typeof window !== 'undefined' && window.turnstile && turnstileEl) {
				widgetId = window.turnstile.render(turnstileEl, {
					sitekey: env.PUBLIC_TURNSTILE_SITE_KEY,
					callback: (token: string) => {
						turnstileToken = token;
					},
					theme: 'dark',
					size: 'compact',
					appearance: 'interaction-only'
				});
			} else {
				timer = setTimeout(tryRender, 200);
			}
		}

		tryRender();

		return () => clearTimeout(timer);
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
				setWaitlistEmail(email);
				waitlistPosition = data.position ?? null;
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
		<div class="brutalist-border-lavender p-4 text-center animate-fade-in">
			<p class="text-lavender font-mono text-sm font-semibold">
				{#if waitlistPosition}You're #{waitlistPosition} on the waitlist. Check your email.{:else}You're on the waitlist. Check your email.{/if}
			</p>
		</div>
	{:else}
		<div class="flex flex-col sm:flex-row gap-2">
			<input
				type="email"
				bind:value={email}
				placeholder="your@email.com"
				required
				autocomplete="email"
				inputmode="email"
				aria-label="Email address"
				class="flex-1 bg-void-surface border-2 border-parchment px-4 py-3 font-mono text-sm text-parchment placeholder:text-stone focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-1 focus:ring-offset-void transition-colors"
			/>
			<button
				type="submit"
				disabled={status === 'loading' || !turnstileToken}
				class="bg-lavender text-void px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:bg-lavender-light disabled:opacity-50 transition-colors border-2 border-lavender"
			>
				{status === 'loading' ? 'Submitting...' : !turnstileToken ? 'Verifying...' : ctaText}
			</button>
		</div>

		<div bind:this={turnstileEl} class="mt-1"></div>

		<p class="font-mono text-xs text-stone text-center">Free. No spam. Early access when we launch.</p>

		{#if status === 'error'}
			<p class="text-red-400 font-mono text-xs">{errorMessage}</p>
		{/if}
	{/if}
</form>
