<script lang="ts">
	import PlantList from './PlantList.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

{#if data.plants.length === 0}
	<div class="text-center py-12">
		<p class="text-lg text-gray-600">No plants are currently available.</p>
		<p class="text-sm text-gray-500 mt-2">Please check back later for new inventory!</p>
	</div>
{:else}
	<PlantList plants={data.plants} />
{/if}
