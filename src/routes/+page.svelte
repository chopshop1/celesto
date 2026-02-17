<script lang="ts">
	import { page } from '$app/stores';
	import Hero from '$lib/components/Hero.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import ChatDemo from '$lib/components/ChatDemo.svelte';
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
			},
			{
				"@type": "FAQPage",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "Do I need to know astrology?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Not at all. Celesto translates your birth chart into plain language. You ask questions in normal words, and get answers you can actually use."
						}
					},
					{
						"@type": "Question",
						"name": "What birth info do I need?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Your date of birth, time of birth, and place of birth. If you don't know your exact birth time, Celesto can still work with your date and location — you'll just miss some details like your rising sign."
						}
					},
					{
						"@type": "Question",
						"name": "When does it launch?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "We're building now and launching to waitlist members first. Join the waitlist to get early access before the public launch."
						}
					},
					{
						"@type": "Question",
						"name": "Is my data private?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes. We don't sell your data. Birth details and chart readings are encrypted and never shared with third parties. See our privacy policy for details."
						}
					},
					{
						"@type": "Question",
						"name": "How is Celesto different from other astrology apps?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Most apps give you a generic daily blurb based on your sun sign. Celesto uses AI to read your full natal chart — all your placements, houses, and transits — and gives you specific, actionable guidance."
						}
					},
					{
						"@type": "Question",
						"name": "Can I use it for compatibility?",
						"acceptedAnswer": {
							"@type": "Answer",
							"text": "Yes. Celesto does full synastry readings — comparing your chart with another person's to show compatibility in love, friendship, and work."
						}
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<Hero {utmSource} />
<HowItWorks />
<ChatDemo />
<CalendarFeature />
<Pricing />
<FAQ />
<FooterCTA {utmSource} />
<StickyCTA />
<ExitIntent />
