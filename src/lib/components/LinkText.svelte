<script lang="ts">
	interface Props {
		href?: string;
		target?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { href = '', target = undefined, children }: Props = $props();
</script>

<a class="text-blue-700 hover:text-blue-500 hover:underline font-semibold" {href} {target}>
	{@render children?.()}
</a>
