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
		{#each links as link}
			{#if link.name === '-'}
				<div class="border-b border-gray-600 my-2"></div>
			{:else}
				<a
					href={link.href}
					class:bg-gray-900={path === link.href}
					class:text-white={path === link.href}
					class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
					>{link.name}</a
				>
			{/if}
		{/each}
	</div>
</div>
