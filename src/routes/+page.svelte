<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ChatDemo from '$lib/components/ChatDemo.svelte';
	import CalendarFeature from '$lib/components/CalendarFeature.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import FooterCTA from '$lib/components/FooterCTA.svelte';
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"name": "Celesto",
				"url": "https://celesto.app",
				"description": "AI-powered astrological therapist and calendar app"
			},
			{
				"@type": "SoftwareApplication",
				"name": "Celesto",
				"applicationCategory": "LifestyleApplication",
				"operatingSystem": "iOS, Android, Web",
				"description": "Your AI astrological therapist. Sync your calendar, chat with your chart, and navigate the chaos.",
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

<Hero />
<ChatDemo />
<CalendarFeature />
<Pricing />
<FooterCTA />
