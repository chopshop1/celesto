<script lang="ts">
	import { page } from '$app/stores';
	import SimpleAskHero from '$lib/components/ab/SimpleAskHero.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import SimpleAskChatDemo from '$lib/components/ab/SimpleAskChatDemo.svelte';
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
	<title>Celesto — Before Your Next Big Meeting, Ask Your Chart</title>
	<meta name="description" content="AI chart reader that gives you strategic meeting prep, deal timing, and close-rate insights from your natal chart." />
</svelte:head>

<SimpleAskHero {utmSource} />
<HowItWorks />
<SimpleAskChatDemo />
<CalendarFeature />
<Pricing />
<FAQ />
<FooterCTA {utmSource} />
<StickyCTA />
<ExitIntent />
