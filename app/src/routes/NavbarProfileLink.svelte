<script lang="ts">
	export let name: string;
	export let href: string;
	export let path: string;

	$: current = path === href;
</script>

<a
	{href}
	class="{current ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700"
	role="menuitem"
	tabindex="-1"
	id="user-menu-item-0">{name}</a
>
