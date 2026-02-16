<script lang="ts">
	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '#chat', label: 'Chat' },
		{ href: '#calendar', label: 'Calendar' },
		{ href: '#pricing', label: 'Pricing' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 {scrolled
		? 'bg-void border-b-2 border-parchment'
		: 'bg-transparent'}"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="font-serif text-2xl font-black text-parchment tracking-tight">
				Celesto
			</a>

			<!-- Desktop nav -->
			<div class="hidden md:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="font-mono text-sm uppercase tracking-widest text-stone hover:text-parchment transition-colors"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="#waitlist"
					class="brutalist-border-lavender bg-transparent px-5 py-2 font-mono text-sm uppercase tracking-widest text-lavender hover:bg-lavender hover:text-void transition-colors"
				>
					Join Waitlist
				</a>
			</div>

			<!-- Mobile hamburger -->
			<button
				class="md:hidden text-parchment p-2"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileOpen}
						<path stroke-linecap="square" stroke-width="2" d="M6 6l12 12M6 18L18 6" />
					{:else}
						<path stroke-linecap="square" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden bg-void border-t-2 border-parchment">
			<div class="flex flex-col px-4 py-4 gap-4">
				{#each navLinks as link}
					<a
						href={link.href}
						class="font-mono text-sm uppercase tracking-widest text-stone hover:text-parchment"
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="#waitlist"
					class="brutalist-border-lavender bg-transparent px-5 py-2 font-mono text-sm uppercase tracking-widest text-lavender text-center hover:bg-lavender hover:text-void transition-colors"
					onclick={closeMobile}
				>
					Join Waitlist
				</a>
			</div>
		</div>
	{/if}
</nav>
