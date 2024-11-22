<script lang="ts">
	import MobileLink from './NavbarMobileLink.svelte';
	interface Props {
		links: { name: string; href: string }[];
		path: string;
	}

	let { links, path }: Props = $props();
</script>

<div class="sm:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pb-3 pt-2">
		{#each links as { name, href }}
			<MobileLink {name} {href} {path} />
		{/each}
	</div>
</div>
