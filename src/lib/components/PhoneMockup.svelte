<script lang="ts">
	// CSS-only 3D phone mockup — no JS needed
</script>

<div class="animate-float" aria-hidden="true">
	<div
		class="relative mx-auto w-[260px] sm:w-[280px]"
		style="perspective: 1000px;"
	>
		<div
			class="border-2 border-parchment bg-void-light p-3 sm:p-4"
			style="transform: rotateY(-5deg) rotateX(5deg); transform-style: preserve-3d;"
		>
			<!-- Status bar -->
			<div class="flex items-center justify-between mb-4 px-1">
				<span class="text-stone text-[10px] font-mono">9:41</span>
				<span class="text-stone text-[10px] font-mono">celesto</span>
				<div class="flex gap-1">
					<div class="w-3 h-1.5 border border-stone"></div>
				</div>
			</div>

			<!-- Chat content -->
			<div class="flex flex-col gap-3">
				<!-- AI message -->
				<div class="border-l-2 border-lavender pl-3">
					<p class="text-[11px] text-lavender font-mono leading-relaxed">
						Mercury is in retrograde, maybe don't text him back.
					</p>
				</div>

				<!-- User message -->
				<div class="self-end bg-void-surface border-2 border-parchment/20 px-3 py-2 max-w-[85%]">
					<p class="text-[11px] text-parchment font-mono">
						but I miss him
					</p>
				</div>

				<!-- AI message -->
				<div class="border-l-2 border-lavender pl-3">
					<p class="text-[11px] text-lavender font-mono leading-relaxed">
						Saturn says no. Let's check your calendar for a power day instead.
					</p>
				</div>
			</div>

			<!-- Input bar -->
			<div class="mt-4 border-t-2 border-parchment/10 pt-3">
				<div class="bg-void-surface border border-parchment/20 px-3 py-2">
					<span class="text-stone text-[10px] font-mono">Ask the stars...</span>
				</div>
			</div>
		</div>
	</div>
</div>
