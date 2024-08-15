<script lang="ts">
	export let href: string = '';
	export let target: string | undefined = undefined;
</script>

<a class="text-blue-700 hover:text-blue-500 hover:underline font-semibold" {href} {target}>
	<slot />
</a>
