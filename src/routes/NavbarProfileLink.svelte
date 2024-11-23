<script lang="ts">
	interface Props {
		name: string;
		href: string;
		path: string;
	}

	let { name, href, path }: Props = $props();

	let current = $derived(path === href);
</script>

<a
	{href}
	class="{current ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700"
	role="menuitem"
	tabindex="-1"
	id="user-menu-item-0">{name}</a
>
