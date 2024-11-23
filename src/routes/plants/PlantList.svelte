<script lang="ts">
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';
	import PlantItem from './PlantItem.svelte';
	import type { Plant } from '@prisma/client';

	interface Props {
		plants: Plant[];
	}

	let { plants }: Props = $props();

	let searchQuery = $state('');

	// Fuse.js options for searching
	const fuseOptions = {
		keys: ['displayname', 'genus', 'species', 'cultivar', 'size'],
		threshold: 0.3
	};

	let filteredPlants: Plant[] = $state([]);
	let fuse = $state(new Fuse<Plant>([], fuseOptions));

	onMount(() => {
		// Initialize Fuse with the plants data directly
		fuse = new Fuse(plants, fuseOptions);
		filteredPlants = plants;
	});

	$effect(() => {
		if (fuse && searchQuery) {
			const results = fuse.search(searchQuery);
			filteredPlants = results.map((result) => result.item);
		} else if (plants) {
			filteredPlants = plants;
		}
	});
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="mb-6">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search plants..."
			class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
		/>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredPlants as plantItem (plantItem.id)}
			<PlantItem {plantItem} />
		{/each}
	</div>
</div>
