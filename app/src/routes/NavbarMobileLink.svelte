<script lang="ts">
	export let name: string;
	export let href: string;
	export let path: string;

	$: current = path === href;
</script>

<a
	{href}
	class="{current
		? 'bg-gray-900 text-white'
		: 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-base font-medium"
	aria-current="page">{name}</a
>
