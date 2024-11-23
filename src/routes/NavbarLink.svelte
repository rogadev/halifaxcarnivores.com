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
	class="{current
		? 'bg-gray-900 text-white'
		: 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium"
	aria-current="page">{name}</a
>
