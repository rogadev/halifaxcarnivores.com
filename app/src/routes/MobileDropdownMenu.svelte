<script lang="ts">
	import MobileLink from './NavbarMobileLink.svelte';
	export let links: { name: string; href: string }[];
	export let path: string;
</script>

<div class="sm:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pb-3 pt-2">
		{#each links as { name, href }}
			<MobileLink {name} {href} {path} />
		{/each}
	</div>
</div>
