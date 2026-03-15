<script lang="ts">
	import { onMount } from 'svelte';

	let password = $state('');
	let error = $state('');
	let loading = $state(false);
	let checking = $state(true);
	let paidOnly = $state(false);
	type AnswerEntry = { count: number; byPriceTier: Record<string, number> };
	let data = $state<null | {
		generatedAt: string;
		totalResponses: number;
		priceTiers: string[];
		questions: Record<string, {
			question: string;
			type: string;
			totalAnswered: number;
			answers: Record<string, AnswerEntry>;
		}>;
	}>(null);

	function apiUrl() {
		return '/api/analytics/survey' + (paidOnly ? '?paid=true' : '');
	}

	async function fetchData() {
		const res = await fetch(apiUrl());
		if (res.ok) {
			data = await res.json();
		}
	}

	onMount(async () => {
		try {
			await fetchData();
		} catch {
			// not authed, show password form
		} finally {
			checking = false;
		}
	});

	async function unlock() {
		if (!password.trim()) {
			error = 'Please enter a password';
			return;
		}

		loading = true;
		error = '';

		try {
			const res = await fetch(apiUrl(), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: password.trim() })
			});

			if (!res.ok) {
				const body = await res.json();
				error = body.error || 'Unauthorized';
				data = null;
				return;
			}

			data = await res.json();
			password = '';
		} catch {
			error = 'Failed to fetch data';
		} finally {
			loading = false;
		}
	}

	async function togglePaidFilter() {
		paidOnly = !paidOnly;
		try {
			await fetchData();
		} catch {
			// ignore
		}
	}

	function lock() {
		data = null;
		password = '';
	}

	const tierColors: Record<string, string> = {
		'Under $5/month': '#60a5fa',  // blue
		'$5–$10/month': '#34d399',    // emerald
		'$10–$20/month': '#fbbf24',   // amber
		'$20–$40/month': '#fb923c',   // orange
		'$40+/month': '#f472b6',      // pink
	};
	const noTierColor = '#525270'; // muted gray for no price selected

	function getBarWidth(count: number, max: number) {
		return max > 0 ? (count / max) * 100 : 0;
	}

	function getMaxCount(answers: Record<string, AnswerEntry>) {
		const values = Object.values(answers);
		return values.length > 0 ? Math.max(...values.map(v => v.count)) : 0;
	}

	function getTierSegments(entry: AnswerEntry, tiers: string[]) {
		const segments: { tier: string; count: number; color: string }[] = [];
		let accounted = 0;
		for (const tier of tiers) {
			const count = entry.byPriceTier[tier] || 0;
			if (count > 0) {
				segments.push({ tier, count, color: tierColors[tier] || noTierColor });
				accounted += count;
			}
		}
		const unset = entry.count - accounted;
		if (unset > 0) {
			segments.push({ tier: 'No price selected', count: unset, color: noTierColor });
		}
		return segments;
	}
</script>

<svelte:head>
	<title>Analytics | Celesto</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-void text-parchment px-4 py-12 font-mono">
	{#if checking}
		<!-- Loading state while checking session -->
		<div class="max-w-sm mx-auto mt-32 text-center">
			<p class="text-stone">Checking session...</p>
		</div>
	{:else if !data}
		<!-- Password Gate -->
		<div class="max-w-sm mx-auto mt-32">
			<h1 class="text-xl font-serif font-bold text-center mb-8 text-lavender">Analytics</h1>
			<form onsubmit={(e) => { e.preventDefault(); unlock(); }} class="flex flex-col gap-4">
				<input
					type="password"
					bind:value={password}
					placeholder="Enter password"
					autocomplete="off"
					class="w-full bg-void-surface border border-void-border rounded-lg px-4 py-3 text-parchment placeholder:text-stone focus:outline-none focus:border-lavender transition-colors"
				/>
				{#if error}
					<p class="text-red-400 text-sm text-center">{error}</p>
				{/if}
				<button
					type="submit"
					disabled={loading}
					class="bg-lavender text-void font-semibold rounded-lg px-4 py-3 hover:bg-lavender-light transition-colors disabled:opacity-50"
				>
					{loading ? 'Loading...' : 'Unlock'}
				</button>
			</form>
		</div>
	{:else}
		<!-- Dashboard -->
		<div class="max-w-3xl mx-auto">
			<div class="flex items-center justify-between mb-10">
				<h1 class="text-2xl font-serif font-bold text-lavender">Survey Analytics</h1>
				<div class="flex items-center gap-4">
					<button
						onclick={togglePaidFilter}
						class="text-sm px-3 py-1.5 rounded-lg border transition-colors {paidOnly ? 'bg-lavender text-void border-lavender' : 'bg-void-surface text-stone border-void-border hover:text-parchment'}"
					>
						{paidOnly ? 'Paid users only' : 'All users'}
					</button>
					<button
						onclick={lock}
						class="text-stone text-sm hover:text-parchment transition-colors"
					>
						Lock
					</button>
				</div>
			</div>

			<!-- Summary -->
			<div class="bg-void-surface border border-void-border rounded-xl p-6 mb-8">
				<div class="flex items-baseline gap-3">
					<span class="text-4xl font-bold text-lavender">{data.totalResponses}</span>
					<span class="text-stone">total responses</span>
				</div>
				<p class="text-stone text-xs mt-2">Generated {new Date(data.generatedAt).toLocaleString()}</p>
			</div>

			<!-- Questions -->
			{#each Object.entries(data.questions) as [id, q]}
				<div class="bg-void-surface border border-void-border rounded-xl p-6 mb-6">
					<div class="flex items-start justify-between gap-4 mb-1">
						<h2 class="font-serif text-lg font-bold">{q.question}</h2>
						<span class="text-xs text-stone whitespace-nowrap mt-1">{q.type.replace('_', ' ')}</span>
					</div>
					<p class="text-stone text-sm mb-4">{q.totalAnswered} answered</p>

					{#if q.type === 'long_text'}
						<!-- Free text responses as a list -->
						<div class="flex flex-col gap-2 max-h-64 overflow-y-auto">
							{#each Object.entries(q.answers) as [text, entry]}
								<div class="bg-void rounded-lg px-4 py-3 border border-void-border">
									<p class="text-parchment-dark text-sm">{text}</p>
									{#if entry.count > 1}
										<span class="text-stone text-xs">×{entry.count}</span>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<!-- Stacked bar chart for select questions -->
						{@const max = getMaxCount(q.answers)}
						<div class="flex flex-col gap-2.5">
							{#each Object.entries(q.answers) as [answer, entry]}
								{@const segments = getTierSegments(entry, data?.priceTiers ?? [])}
								<div>
									<div class="flex items-center justify-between text-sm mb-1">
										<span class="text-parchment-dark truncate mr-3">{answer}</span>
										<span class="text-stone whitespace-nowrap">{entry.count} <span class="text-xs">({Math.round((entry.count / q.totalAnswered) * 100)}%)</span></span>
									</div>
									<div class="h-4 bg-void rounded-full overflow-hidden flex">
										{#each segments as seg}
											<div
												class="h-full transition-all first:rounded-l-full last:rounded-r-full"
												style="width: {getBarWidth(seg.count, max)}%; background: {seg.color}"
												title="{seg.tier}: {seg.count}"
											></div>
										{/each}
									</div>
								</div>
							{/each}
						</div>

						<!-- Price tier legend -->
						<div class="flex flex-wrap gap-3 mt-4 pt-3 border-t border-void-border">
							{#each data?.priceTiers ?? [] as tier}
								<div class="flex items-center gap-1.5 text-xs text-stone">
									<span class="inline-block w-2.5 h-2.5 rounded-full shrink-0" style="background: {tierColors[tier]}"></span>
									{tier}
								</div>
							{/each}
							<div class="flex items-center gap-1.5 text-xs text-stone">
								<span class="inline-block w-2.5 h-2.5 rounded-full shrink-0" style="background: {noTierColor}"></span>
								No price selected
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
