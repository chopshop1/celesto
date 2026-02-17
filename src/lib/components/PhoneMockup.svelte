<script lang="ts">
	// CSS-only phone mockup with celestial atmosphere
</script>

<div class="phone-scene" aria-hidden="true">
	<!-- Celestial atmosphere -->
	<div class="phone-glow"></div>
	<div class="orbit orbit-1"></div>
	<div class="orbit orbit-2"></div>
	<div class="orbit-dot orbit-dot-1"></div>
	<div class="orbit-dot orbit-dot-2"></div>

	<!-- Phone frame -->
	<div class="phone-frame animate-float">
		<!-- Screen glass reflection -->
		<div class="screen-reflection"></div>

		<!-- Notch -->
		<div class="phone-notch">
			<div class="notch-camera"></div>
		</div>

		<!-- Screen content -->
		<div class="phone-screen">
			<!-- Status bar -->
			<div class="flex items-center justify-between mb-3 px-1">
				<span class="text-parchment/60 text-[10px] font-mono font-semibold">9:41</span>
				<span class="text-lavender text-[10px] font-mono font-semibold tracking-wider uppercase">celesto</span>
				<div class="flex items-center gap-1">
					<svg width="14" height="10" viewBox="0 0 14 10" fill="none" class="text-parchment/60">
						<rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="currentColor"/>
						<rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="currentColor"/>
						<rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="currentColor"/>
						<rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="currentColor"/>
					</svg>
				</div>
			</div>

			<!-- Chat content -->
			<div class="flex flex-col gap-3">
				<!-- AI message -->
				<div class="ai-message">
					<div class="ai-avatar">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
							<circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1" class="text-lavender"/>
							<circle cx="6" cy="6" r="1.5" fill="currentColor" class="text-lavender"/>
						</svg>
					</div>
					<div class="ai-bubble">
						<p class="text-[11px] text-lavender-light font-mono leading-relaxed">
							Mercury retrograde in your 7th house. Don't text him back.
						</p>
					</div>
				</div>

				<!-- User message -->
				<div class="user-bubble">
					<p class="text-[11px] text-parchment font-mono">
						but I miss him
					</p>
				</div>

				<!-- AI message -->
				<div class="ai-message">
					<div class="ai-avatar">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
							<circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1" class="text-lavender"/>
							<circle cx="6" cy="6" r="1.5" fill="currentColor" class="text-lavender"/>
						</svg>
					</div>
					<div class="ai-bubble">
						<p class="text-[11px] text-lavender-light font-mono leading-relaxed">
							That's your Venus talking. Saturn says wait. You have a power day Friday — use it.
						</p>
					</div>
				</div>
			</div>

			<!-- Input bar -->
			<div class="mt-4 pt-3 border-t border-parchment/5">
				<div class="input-bar">
					<span class="text-stone/50 text-[10px] font-mono">Ask the stars...</span>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-lavender/40">
						<path d="M7 1L7 13M7 1L12 6M7 1L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(90, 7, 7)"/>
					</svg>
				</div>
			</div>
		</div>

		<!-- Home indicator -->
		<div class="home-indicator"></div>
	</div>
</div>

<style>
	.phone-scene {
		position: relative;
		width: 280px;
		height: 500px;
		margin: 0 auto;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		.phone-scene {
			width: 340px;
			height: 620px;
			overflow: visible;
		}
	}

	/* Celestial glow behind phone */
	.phone-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 380px;
		height: 380px;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(184, 169, 232, 0.12) 0%,
			rgba(184, 169, 232, 0.04) 40%,
			transparent 70%
		);
		filter: blur(30px);
		pointer-events: none;
	}

	/* Orbital rings */
	.orbit {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(184, 169, 232, 0.08);
		pointer-events: none;
	}

	.orbit-1 {
		top: 50%;
		left: 50%;
		width: 360px;
		height: 360px;
		transform: translate(-50%, -50%) rotateX(65deg);
		animation: orbit-spin 20s linear infinite;
	}

	.orbit-2 {
		top: 50%;
		left: 50%;
		width: 440px;
		height: 440px;
		transform: translate(-50%, -50%) rotateX(65deg) rotateZ(30deg);
		animation: orbit-spin 30s linear infinite reverse;
	}

	/* Orbital dots */
	.orbit-dot {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--color-lavender);
		opacity: 0.5;
		pointer-events: none;
	}

	.orbit-dot-1 {
		animation: orbit-path-1 20s linear infinite;
	}

	.orbit-dot-2 {
		animation: orbit-path-2 30s linear infinite reverse;
	}

	@keyframes orbit-spin {
		from { transform: translate(-50%, -50%) rotateX(65deg) rotateZ(0deg); }
		to { transform: translate(-50%, -50%) rotateX(65deg) rotateZ(360deg); }
	}

	@keyframes orbit-path-1 {
		0% { top: calc(50% - 180px); left: 50%; }
		25% { top: 50%; left: calc(50% + 90px); }
		50% { top: calc(50% + 180px); left: 50%; }
		75% { top: 50%; left: calc(50% - 90px); }
		100% { top: calc(50% - 180px); left: 50%; }
	}

	@keyframes orbit-path-2 {
		0% { top: calc(50% - 220px); left: calc(50% + 40px); }
		25% { top: calc(50% + 20px); left: calc(50% + 120px); }
		50% { top: calc(50% + 220px); left: calc(50% - 40px); }
		75% { top: calc(50% - 20px); left: calc(50% - 120px); }
		100% { top: calc(50% - 220px); left: calc(50% + 40px); }
	}

	/* Phone frame */
	.phone-frame {
		position: absolute;
		top: 48%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.88);
		width: 260px;
		background: linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%);
		border-radius: 36px;
		padding: 12px;
		box-shadow:
			0 0 0 1px rgba(245, 243, 239, 0.08),
			0 4px 24px rgba(0, 0, 0, 0.5),
			0 12px 48px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(245, 243, 239, 0.06);
	}

	@media (min-width: 640px) {
		.phone-frame {
			transform: translate(-50%, -50%);
			width: 280px;
			padding: 14px;
		}
	}

	/* Glass reflection on screen */
	.screen-reflection {
		position: absolute;
		top: 12px;
		left: 12px;
		right: 50%;
		bottom: 60%;
		background: linear-gradient(
			135deg,
			rgba(245, 243, 239, 0.03) 0%,
			transparent 60%
		);
		border-radius: 24px 0 0 0;
		pointer-events: none;
		z-index: 10;
	}

	/* Notch */
	.phone-notch {
		position: relative;
		width: 100px;
		height: 22px;
		margin: 0 auto 8px;
		background: #0a0a0a;
		border-radius: 0 0 14px 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.notch-camera {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #1a1a1a;
		border: 1px solid rgba(245, 243, 239, 0.06);
	}

	/* Screen area */
	.phone-screen {
		background: var(--color-void);
		border-radius: 24px;
		padding: 14px 12px;
		min-height: 340px;
	}

	@media (min-width: 640px) {
		.phone-screen {
			min-height: 370px;
			padding: 16px 14px;
		}
	}

	/* Chat message styles */
	.ai-message {
		display: flex;
		gap: 8px;
		align-items: flex-start;
	}

	.ai-avatar {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
	}

	.ai-bubble {
		background: rgba(184, 169, 232, 0.06);
		border: 1px solid rgba(184, 169, 232, 0.12);
		border-radius: 2px 12px 12px 12px;
		padding: 8px 10px;
		max-width: 85%;
	}

	.user-bubble {
		align-self: flex-end;
		background: rgba(245, 243, 239, 0.04);
		border: 1px solid rgba(245, 243, 239, 0.08);
		border-radius: 12px 12px 2px 12px;
		padding: 8px 12px;
		max-width: 75%;
	}

	.input-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(245, 243, 239, 0.03);
		border: 1px solid rgba(245, 243, 239, 0.06);
		border-radius: 20px;
		padding: 8px 12px;
	}

	/* Home indicator */
	.home-indicator {
		width: 100px;
		height: 4px;
		background: rgba(245, 243, 239, 0.15);
		border-radius: 2px;
		margin: 10px auto 4px;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.orbit-1, .orbit-2 { animation: none; }
		.orbit-dot-1, .orbit-dot-2 { animation: none; display: none; }
	}
</style>
