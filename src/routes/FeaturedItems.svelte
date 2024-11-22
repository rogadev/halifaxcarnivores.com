<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DisplayedPlantItem } from '$lib/types';

	interface Props {
		plants: DisplayedPlantItem[];
	}

	let { plants }: Props = $props();
</script>

<section class="py-12">
	<div class="text-center mb-8">
		<h2 class="text-3xl font-bold text-gray-900">Featured Plants</h2>
		<p class="mt-4 text-lg text-gray-600">Check out our specially selected carnivorous plants</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each plants as plant}
			<div class="bg-white rounded-lg shadow-md overflow-hidden">
				{#if plant.featuredImage}
					<img src={plant.featuredImage} alt={plant.name} class="w-full h-64 object-cover" />
				{:else if plant.images && plant.images[0]}
					<img src={plant.images[0]} alt={plant.name} class="w-full h-64 object-cover" />
				{:else}
					<div class="w-full h-64 bg-amber-100 flex items-center justify-center">
						<Icon icon="mdi:plant" class="w-16 h-16 text-amber-600" />
					</div>
				{/if}
				<div class="p-6">
					<h3 class="text-xl font-semibold text-gray-900">{plant.name}</h3>
					<p class="mt-2 text-gray-600">
						{plant.description?.slice(0, 100)}...
					</p>
					<div class="mt-4 flex items-center justify-between">
						<span class="text-lg font-bold text-green-600">
							{#if plant.minPrice === plant.maxPrice}
								${plant.minPrice}
							{:else}
								${plant.minPrice} - ${plant.maxPrice}
							{/if}
						</span>
						<a
							href={`/plants/${plant.id}`}
							class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
						>
							View Details
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
