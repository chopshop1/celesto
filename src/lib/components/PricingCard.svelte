<script lang="ts">
	import { env } from '$env/dynamic/public';

	interface Props {
		tier: string;
		tierSlug: string;
		price: string;
		period?: string;
		features: string[];
		highlighted?: boolean;
		ctaLabel?: string;
		ctaHref?: string;
	}

	let {
		tier,
		tierSlug,
		price,
		period = '',
		features,
		highlighted = false,
		ctaLabel = 'Join Waitlist',
		ctaHref = '#waitlist'
	}: Props = $props();

	let showForm = $state(false);
	let email = $state('');
	let website = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let turnstileToken = $state('');
	let turnstileEl: HTMLDivElement | undefined = $state();
	let widgetId = $state<string | undefined>(undefined);

	let isPaid = $derived(tierSlug !== 'stargazer');

	$effect(() => {
		if (showForm && turnstileEl && typeof window !== 'undefined' && window.turnstile) {
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

	function handleCta() {
		if (!isPaid) {
			// Free tier: scroll to waitlist
			document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
			return;
		}
		showForm = true;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'loading') return;

		status = 'loading';
		errorMessage = '';

		try {
			const res = await fetch('/api/intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					tier: tierSlug,
					turnstileToken,
					website
				})
			});

			const data = await res.json();

			if (res.ok) {
				status = 'success';
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

<div
	class="flex flex-col p-6 sm:p-8 bg-void-light
		{highlighted ? 'brutalist-border-lavender' : 'brutalist-border'}"
>
	<div class="mb-6">
		<h3 class="font-serif text-xl font-bold {highlighted ? 'text-lavender' : 'text-parchment'}">
			{tier}
		</h3>
		<div class="mt-3 flex items-baseline gap-1">
			<span class="font-serif text-4xl font-black text-parchment">{price}</span>
			{#if period}
				<span class="font-mono text-sm text-stone">{period}</span>
			{/if}
		</div>
	</div>

	<ul class="flex-1 flex flex-col gap-3 mb-8">
		{#each features as feature}
			<li class="flex items-start gap-2 font-mono text-sm text-stone">
				<span class="text-lavender mt-0.5" aria-hidden="true">+</span>
				{feature}
			</li>
		{/each}
	</ul>

	{#if showForm && isPaid}
		{#if status === 'success'}
			<div class="brutalist-border-lavender p-4 text-center animate-fade-in">
				<p class="text-lavender font-mono text-sm font-semibold">{tier} locked in. The universe approves.</p>
				<p class="text-stone text-xs mt-1">We'll reach out before launch.</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="flex flex-col gap-2">
				<div class="hp-field" aria-hidden="true">
					<label for="{tierSlug}-hp">Website</label>
					<input type="text" id="{tierSlug}-hp" name="website" bind:value={website} tabindex="-1" autocomplete="off" />
				</div>
				<input
					type="email"
					bind:value={email}
					placeholder="your@email.com"
					required
					class="w-full bg-void-surface border-2 border-parchment px-4 py-3 font-mono text-sm text-parchment placeholder:text-stone focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:ring-offset-1 focus:ring-offset-void transition-colors"
				/>
				<div bind:this={turnstileEl} class="mt-1"></div>
				<button
					type="submit"
					disabled={status === 'loading'}
					class="w-full bg-lavender text-void px-4 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:bg-lavender-light disabled:opacity-50 transition-colors border-2 border-lavender"
				>
					{status === 'loading' ? '...' : 'Reserve Spot'}
				</button>
				{#if status === 'error'}
					<p class="text-red-400 font-mono text-xs">{errorMessage}</p>
				{/if}
			</form>
		{/if}
	{:else}
		<button
			onclick={handleCta}
			class="w-full px-4 py-3 font-mono text-sm font-semibold uppercase tracking-widest transition-colors border-2
				{highlighted
					? 'bg-lavender text-void border-lavender hover:bg-lavender-light'
					: 'bg-transparent text-parchment border-parchment hover:bg-parchment hover:text-void'}"
		>
			{ctaLabel}
		</button>
	{/if}
</div>
