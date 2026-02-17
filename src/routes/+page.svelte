<script lang="ts">
	import { page } from '$app/stores';
	import Hero from '$lib/components/Hero.svelte';
	import ChatDemo from '$lib/components/ChatDemo.svelte';
	import CalendarFeature from '$lib/components/CalendarFeature.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import FooterCTA from '$lib/components/FooterCTA.svelte';

	let utmSource = $derived(
		$page.url.searchParams.get('utm_source')
		|| $page.url.searchParams.get('ref')
		|| ''
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"name": "Celesto",
				"url": "https://celesto.app",
				"logo": "https://celesto.app/favicon.svg",
				"description": "AI-powered astrological therapist and calendar app",
				"sameAs": []
			},
			{
				"@type": "SoftwareApplication",
				"name": "Celesto",
				"applicationCategory": "LifestyleApplication",
				"operatingSystem": "iOS, Android, Web",
				"description": "AI astrology app and horoscope calendar. Chat with your birth chart AI, sync your astrological calendar, and plan around the stars.",
				"url": "https://celesto.app",
				"offers": [
					{
						"@type": "Offer",
						"price": "0",
						"priceCurrency": "USD",
						"name": "Stargazer"
					},
					{
						"@type": "Offer",
						"price": "9",
						"priceCurrency": "USD",
						"name": "Believer"
					},
					{
						"@type": "Offer",
						"price": "19",
						"priceCurrency": "USD",
						"name": "Celestial"
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<Hero {utmSource} />
<ChatDemo />
<CalendarFeature />
<Pricing />
<FooterCTA {utmSource} />
