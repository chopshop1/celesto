<script lang="ts">
	// Animated SVG app demo — replaces phone mockup
</script>

<div class="app-demo" aria-hidden="true">
	<svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="demo-svg">
		<!-- Filters -->
		<defs>
			<filter id="demo-shadow" x="-8%" y="-4%" width="116%" height="116%">
				<feDropShadow dx="0" dy="6" stdDeviation="14" flood-color="#000" flood-opacity="0.35"/>
			</filter>
			<linearGradient id="title-bar-grad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#1a1a24"/>
				<stop offset="100%" stop-color="#14141c"/>
			</linearGradient>
			<linearGradient id="window-grad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#111118"/>
				<stop offset="100%" stop-color="#0d0d14"/>
			</linearGradient>
		</defs>

		<!-- Window frame -->
		<rect x="16" y="12" width="448" height="376" rx="12" fill="url(#window-grad)" filter="url(#demo-shadow)" stroke="rgba(184,169,232,0.08)" stroke-width="0.8"/>

		<!-- Title bar -->
		<rect x="16" y="12" width="448" height="36" rx="12" fill="url(#title-bar-grad)"/>
		<rect x="16" y="36" width="448" height="12" fill="url(#title-bar-grad)"/>
		<line x1="16" y1="48" x2="464" y2="48" stroke="rgba(245,243,239,0.04)" stroke-width="0.8"/>

		<!-- Traffic lights -->
		<circle cx="38" cy="30" r="4.5" fill="#ff5f57" opacity="0.6"/>
		<circle cx="54" cy="30" r="4.5" fill="#febc2e" opacity="0.6"/>
		<circle cx="70" cy="30" r="4.5" fill="#28c840" opacity="0.6"/>

		<!-- App name -->
		<text x="240" y="34" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="rgba(184,169,232,0.5)" letter-spacing="3" font-weight="500">CELESTO</text>

		<!-- Natal chart wheel — top right -->
		<g class="chart-wheel" transform="translate(410, 94)">
			<circle cx="0" cy="0" r="30" stroke="rgba(184,169,232,0.1)" stroke-width="0.6" fill="none"/>
			<circle cx="0" cy="0" r="20" stroke="rgba(184,169,232,0.07)" stroke-width="0.5" fill="none"/>
			<circle cx="0" cy="0" r="10" stroke="rgba(184,169,232,0.05)" stroke-width="0.4" fill="none"/>

			<!-- 12 zodiac ticks -->
			<line x1="0" y1="-26" x2="0" y2="-30" stroke="rgba(184,169,232,0.18)" stroke-width="0.7"/>
			<line x1="13" y1="-22.5" x2="15" y2="-26" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="22.5" y1="-13" x2="26" y2="-15" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="26" y1="0" x2="30" y2="0" stroke="rgba(184,169,232,0.18)" stroke-width="0.7"/>
			<line x1="22.5" y1="13" x2="26" y2="15" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="13" y1="22.5" x2="15" y2="26" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="0" y1="26" x2="0" y2="30" stroke="rgba(184,169,232,0.18)" stroke-width="0.7"/>
			<line x1="-13" y1="22.5" x2="-15" y2="26" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="-22.5" y1="13" x2="-26" y2="15" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="-26" y1="0" x2="-30" y2="0" stroke="rgba(184,169,232,0.18)" stroke-width="0.7"/>
			<line x1="-22.5" y1="-13" x2="-26" y2="-15" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>
			<line x1="-13" y1="-22.5" x2="-15" y2="-26" stroke="rgba(184,169,232,0.12)" stroke-width="0.6"/>

			<!-- Aspect lines -->
			<line x1="-7" y1="-16" x2="14" y2="7" stroke="rgba(184,169,232,0.07)" stroke-width="0.5" stroke-dasharray="2 2"/>
			<line x1="-4" y1="13" x2="9" y2="-11" stroke="rgba(184,169,232,0.06)" stroke-width="0.5" stroke-dasharray="2 2"/>

			<!-- Planet positions -->
			<circle cx="-7" cy="-16" r="2.2" fill="#B8A9E8" opacity="0.65" class="planet p1"/>
			<circle cx="14" cy="7" r="1.8" fill="#D0C5F0" opacity="0.55" class="planet p2"/>
			<circle cx="-4" cy="13" r="2.2" fill="#8B7BBF" opacity="0.65" class="planet p3"/>
			<circle cx="9" cy="-11" r="1.6" fill="#B8A9E8" opacity="0.45" class="planet p4"/>
		</g>

		<!-- Transit badge -->
		<g class="msg msg-0">
			<rect x="36" y="60" width="210" height="24" rx="5" fill="rgba(184,169,232,0.05)" stroke="rgba(184,169,232,0.1)" stroke-width="0.6"/>
			<circle cx="50" cy="72" r="3.5" stroke="rgba(184,169,232,0.5)" stroke-width="0.7" fill="none"/>
			<circle cx="50" cy="72" r="1" fill="rgba(184,169,232,0.5)"/>
			<text x="60" y="76" font-family="'JetBrains Mono', monospace" font-size="8" fill="rgba(184,169,232,0.5)" letter-spacing="0.8" font-weight="500">MERCURY RX · 7TH HOUSE</text>
		</g>

		<!-- User message 1 -->
		<g class="msg msg-1">
			<rect x="230" y="100" width="204" height="34" rx="10" fill="rgba(245,243,239,0.035)" stroke="rgba(245,243,239,0.07)" stroke-width="0.6"/>
			<text x="246" y="121" font-family="'JetBrains Mono', monospace" font-size="11" fill="rgba(245,243,239,0.8)">should I text my ex back?</text>
		</g>

		<!-- AI message 1 -->
		<g class="msg msg-2">
			<circle cx="48" cy="164" r="9" stroke="rgba(184,169,232,0.25)" stroke-width="0.7" fill="none"/>
			<circle cx="48" cy="164" r="2.5" fill="rgba(184,169,232,0.35)"/>
			<rect x="66" y="148" width="250" height="36" rx="10" fill="rgba(184,169,232,0.05)" stroke="rgba(184,169,232,0.1)" stroke-width="0.6"/>
			<text x="80" y="165" font-family="'JetBrains Mono', monospace" font-size="11" fill="rgba(208,197,240,0.8)">Mercury retrograde in your 7th</text>
			<text x="80" y="178" font-family="'JetBrains Mono', monospace" font-size="11" fill="rgba(208,197,240,0.8)">house. <tspan font-weight="700" fill="rgba(245,243,239,0.9)">Don't.</tspan></text>
		</g>

		<!-- User message 2 -->
		<g class="msg msg-3">
			<rect x="300" y="200" width="134" height="32" rx="10" fill="rgba(245,243,239,0.035)" stroke="rgba(245,243,239,0.07)" stroke-width="0.6"/>
			<text x="316" y="220" font-family="'JetBrains Mono', monospace" font-size="11" fill="rgba(245,243,239,0.8)">but I miss him</text>
		</g>

		<!-- AI message 2 -->
		<g class="msg msg-4">
			<circle cx="48" cy="268" r="9" stroke="rgba(184,169,232,0.25)" stroke-width="0.7" fill="none"/>
			<circle cx="48" cy="268" r="2.5" fill="rgba(184,169,232,0.35)"/>
			<rect x="66" y="248" width="310" height="44" rx="10" fill="rgba(184,169,232,0.05)" stroke="rgba(184,169,232,0.1)" stroke-width="0.6"/>
			<text x="80" y="266" font-family="'JetBrains Mono', monospace" font-size="11" fill="rgba(208,197,240,0.8)">That's Venus square Neptune talking.</text>
			<text x="80" y="280" font-family="'JetBrains Mono', monospace" font-size="11" fill="rgba(208,197,240,0.8)">Friday is a <tspan fill="#B8A9E8" font-weight="600">power day</tspan> — use it.</text>
		</g>

		<!-- Typing indicator -->
		<g class="msg msg-5">
			<circle cx="48" cy="318" r="9" stroke="rgba(184,169,232,0.25)" stroke-width="0.7" fill="none"/>
			<circle cx="48" cy="318" r="2.5" fill="rgba(184,169,232,0.35)"/>
			<rect x="66" y="308" width="50" height="22" rx="10" fill="rgba(184,169,232,0.05)" stroke="rgba(184,169,232,0.1)" stroke-width="0.6"/>
			<circle cx="80" cy="319" r="2.2" fill="rgba(184,169,232,0.35)" class="typing-dot td-1"/>
			<circle cx="91" cy="319" r="2.2" fill="rgba(184,169,232,0.35)" class="typing-dot td-2"/>
			<circle cx="102" cy="319" r="2.2" fill="rgba(184,169,232,0.35)" class="typing-dot td-3"/>
		</g>

		<!-- Input bar -->
		<g class="msg msg-6">
			<rect x="36" y="350" width="408" height="28" rx="14" fill="rgba(245,243,239,0.015)" stroke="rgba(245,243,239,0.05)" stroke-width="0.6"/>
			<text x="56" y="368" font-family="'JetBrains Mono', monospace" font-size="10" fill="rgba(245,243,239,0.18)">Ask the stars...</text>
			<path d="M424 360 L432 364 L424 368" stroke="rgba(184,169,232,0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
		</g>
	</svg>
</div>

<style>
	.app-demo {
		width: 100%;
		max-width: 480px;
		margin: 0 auto;
	}

	.demo-svg {
		width: 100%;
		height: auto;
		display: block;
	}

	/* Natal chart slow rotation */
	.chart-wheel {
		animation: chart-spin 40s linear infinite;
	}

	@keyframes chart-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* Planet subtle pulse */
	.planet {
		animation: planet-pulse 3s ease-in-out infinite alternate;
	}
	.p1 { animation-delay: 0s; }
	.p2 { animation-delay: 0.8s; }
	.p3 { animation-delay: 1.6s; }
	.p4 { animation-delay: 2.4s; }

	@keyframes planet-pulse {
		from { opacity: 0.4; }
		to { opacity: 0.8; }
	}

	/* Staggered message reveals */
	.msg {
		opacity: 0;
		animation: msg-in 0.6s ease-out forwards;
	}

	.msg-0 { animation-delay: 0.3s; }
	.msg-1 { animation-delay: 0.7s; }
	.msg-2 { animation-delay: 1.4s; }
	.msg-3 { animation-delay: 2.2s; }
	.msg-4 { animation-delay: 3.0s; }
	.msg-5 { animation-delay: 3.8s; }
	.msg-6 { animation-delay: 0.1s; }

	@keyframes msg-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Typing dots bounce */
	.typing-dot {
		animation: typing-bounce 1.2s ease-in-out infinite;
	}
	.td-1 { animation-delay: 3.8s; }
	.td-2 { animation-delay: 4.0s; }
	.td-3 { animation-delay: 4.2s; }

	@keyframes typing-bounce {
		0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
		30% { transform: translateY(-3px); opacity: 0.7; }
	}

	/* Gentle float on the whole demo */
	.app-demo {
		animation: demo-float 6s ease-in-out infinite;
	}

	@keyframes demo-float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.chart-wheel { animation: none; }
		.planet { animation: none; }
		.msg { animation: none; opacity: 1; }
		.typing-dot { animation: none; }
		.app-demo { animation: none; }
	}
</style>
