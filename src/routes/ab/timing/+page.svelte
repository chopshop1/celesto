<script lang="ts">
	import { page } from '$app/stores';
	import TimingHero from '$lib/components/ab/TimingHero.svelte';
	import TimingChatDemo from '$lib/components/ab/TimingChatDemo.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import CalendarFeature from '$lib/components/CalendarFeature.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import FooterCTA from '$lib/components/FooterCTA.svelte';
	import StickyCTA from '$lib/components/StickyCTA.svelte';
	import ExitIntent from '$lib/components/ExitIntent.svelte';

	let utmSource = $derived(
		$page.url.searchParams.get('utm_source')
		|| $page.url.searchParams.get('ref')
		|| ''
	);
</script>

<svelte:head>
	<title>Celesto — What if your timing was always right?</title>
	<meta name="description" content="Your birth chart knows when your best windows open. Celesto tells you exactly when to make the move." />
</svelte:head>

<TimingHero {utmSource} />
<HowItWorks />
<TimingChatDemo />
<CalendarFeature />
<Pricing />
<FAQ />
<FooterCTA {utmSource} />
<StickyCTA />
<ExitIntent />
