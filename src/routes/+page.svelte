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
				"description": "AI chart reader and instant astrological consultant. Celesto uses AI to decode natal charts, interpret transits, and deliver personalized horoscope insights.",
				"sameAs": []
			},
			{
				"@type": "SoftwareApplication",
				"name": "Celesto",
				"applicationCategory": "LifestyleApplication",
				"operatingSystem": "iOS, Android, Web",
				"description": "AI chart reader, interpreter, and instant astrological consultant. Decode your natal chart with AI, get transit insights, and sync your personalized horoscope calendar.",
				"keywords": "AI astrology app, birth chart reader, AI chart reader, astrological consultant, horoscope calendar, AI chart interpreter, natal chart AI, astrology calendar app",
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
