<script lang="ts">
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';
	import PlantItem from './PlantItem.svelte';

	interface Plant {
		id: number;
		name: string;
		genus: string;
		species: string;
		unique: string;
		price: number;
		salePrice: number;
		cost: number;
		quantity: number;
		new: boolean;
		onSale: boolean;
		images: string[];
		description?: string;
		water?: string;
		light?: string;
		temperature?: string;
		humidity?: string;
		seasonality?: string;
		climateZoneId: number;
		climateZone: {
			id: number;
		};
		createdAt: Date;
		updatedAt: Date;
	}
	export let plant: Plant;

	let searchQuery = '';
	let filteredPlants: Plant[] = [];
	let fuse: Fuse<Plant>;

	// Fuse.js options for searching
	const fuseOptions = {
		keys: ['name', 'genus', 'species', 'unique'],
		threshold: 0.3
	};

	onMount(() => {
		// Initialize Fuse with the plants data
		fuse = new Fuse([plant], fuseOptions);
		filteredPlants = [plant];
	});

	$: {
		if (fuse && searchQuery) {
			const results = fuse.search(searchQuery);
			filteredPlants = results.map((result) => result.item);
		} else if (plant) {
			filteredPlants = [plant];
		}
	}
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
