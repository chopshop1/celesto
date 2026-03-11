<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = 'w-4 h-4' }: Props = $props();

	const DISCORD_ICON_URL =
		'https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg';
</script>

<img src={DISCORD_ICON_URL} alt="" aria-hidden="true" class={className} />
