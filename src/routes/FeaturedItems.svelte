<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DisplayedPlantItem } from '$lib/types';
	import { supabase } from '$lib/supabase';

	let { plants }: { plants: DisplayedPlantItem[] } = $props();

	// Function to get the first image from Supabase storage for a plant
	async function getFirstPlantImage(plantId: number) {
		const { data: files, error } = await supabase.storage.from('images').list(`plants/${plantId}`);

		if (error || !files?.length) return null;

		const firstImage = files[0];
		const {
			data: { publicUrl }
		} = supabase.storage.from('images').getPublicUrl(`plants/${plantId}/${firstImage.name}`);

		return publicUrl;
	}
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
					<img src={plant.featuredImage} alt={plant.displayName} class="w-full h-64 object-cover" />
				{:else}
					{#await getFirstPlantImage(plant.id)}
						<div class="w-full h-64 bg-amber-100 flex items-center justify-center">
							<Icon icon="mdi:loading" class="w-16 h-16 text-amber-600 animate-spin" />
						</div>
					{:then imageUrl}
						{#if imageUrl}
							<img src={imageUrl} alt={plant.displayName} class="w-full h-64 object-cover" />
						{:else}
							<div class="w-full h-64 bg-amber-100 flex items-center justify-center">
								<Icon icon="mdi:plant" class="w-16 h-16 text-amber-600" />
							</div>
						{/if}
					{/await}
				{/if}
				<div class="p-6">
					<h3 class="text-xl font-semibold text-gray-900">{plant.displayName}</h3>
					<p class="mt-2 text-gray-600">
						{plant.description?.slice(
							0,
							100
						)}{#if plant.description?.length && plant.description?.length > 100}...{/if}
					</p>
					<div class="mt-4 flex items-center justify-between">
						<span class="text-lg font-bold text-green-600">
							{#if plant.isOnSale && plant.salePrice}
								<span class="line-through text-gray-400 mr-2">${plant.price}</span>
								${plant.salePrice}
							{:else}
								${plant.price}
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
