<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { DisplayedPlantItem } from '$lib/types.ts';

	interface Props {
		data: { plant: DisplayedPlantItem };
	}

	let { data }: Props = $props();
	const { plant } = data;

	let currentImageIndex = $state(0);
	let showModal = $state(false);

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Image Gallery Section -->
		<div class="space-y-4">
			{#if plant.images.length > 0}
				<div class="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src={plant.images[currentImageIndex]}
						alt={plant.name}
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="grid grid-cols-4 gap-2">
					{#each plant.images as image, index}
						<button
							class="aspect-square rounded-md overflow-hidden {currentImageIndex === index
								? 'ring-2 ring-primary'
								: ''}"
							onclick={() => (currentImageIndex = index)}
						>
							<img src={image} alt="" class="w-full h-full object-cover" />
						</button>
					{/each}
				</div>
			{:else}
				<div class="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
					<Icon icon="mdi:plant" class="text-gray-400" width="64" height="64" />
				</div>
			{/if}
		</div>

		<!-- Product Info Section -->
		<div class="space-y-6">
			<div>
				<div class="flex items-start justify-between">
					<h1 class="text-3xl font-bold text-gray-900">{plant.name}</h1>
					<div class="flex gap-2">
						{#if plant.isNewItem}
							<span
								class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
							>
								New
							</span>
						{/if}
						{#if plant.isComingSoon}
							<span
								class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
							>
								Coming Soon
							</span>
						{/if}
					</div>
				</div>

				<div class="mt-4">
					{#if plant.isOnSale}
						<p class="text-3xl font-bold text-red-600">
							${plant.minPrice.toFixed(2)} - ${plant.maxPrice.toFixed(2)}
						</p>
					{:else}
						<p class="text-3xl font-bold text-gray-900">
							${plant.minPrice.toFixed(2)} - ${plant.maxPrice.toFixed(2)}
						</p>
					{/if}
				</div>
			</div>

			<!-- Tags -->
			{#if plant.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each plant.tags as tag}
						<span class="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<!-- Description -->
			{#if plant.description}
				<div>
					<h2 class="text-lg font-semibold mb-2">About this plant</h2>
					<p class="text-gray-700 leading-relaxed">{plant.description}</p>
				</div>
			{/if}

			<!-- Care Instructions -->
			<div class="border rounded-lg p-6 bg-gray-50 space-y-4">
				<h2 class="text-lg font-semibold">Care Instructions</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{#if plant.water}
						<div>
							<div class="flex items-center gap-2">
								<Icon icon="mdi:water" class="text-blue-500" />
								<h3 class="font-medium">Water</h3>
							</div>
							<p class="text-gray-600 mt-1">{plant.water}</p>
						</div>
					{/if}
					{#if plant.light}
						<div>
							<div class="flex items-center gap-2">
								<Icon icon="mdi:white-balance-sunny" class="text-yellow-500" />
								<h3 class="font-medium">Light</h3>
							</div>
							<p class="text-gray-600 mt-1">{plant.light}</p>
						</div>
					{/if}
					{#if plant.temperature}
						<div>
							<div class="flex items-center gap-2">
								<Icon icon="mdi:thermometer" class="text-red-500" />
								<h3 class="font-medium">Temperature</h3>
							</div>
							<p class="text-gray-600 mt-1">{plant.temperature}</p>
						</div>
					{/if}
					{#if plant.humidity}
						<div>
							<div class="flex items-center gap-2">
								<Icon icon="mdi:water-percent" class="text-green-500" />
								<h3 class="font-medium">Humidity</h3>
							</div>
							<p class="text-gray-600 mt-1">{plant.humidity}</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Add to Cart -->
			<button
				class="w-full py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
				disabled={plant.isComingSoon}
			>
				{plant.isComingSoon ? 'Coming Soon' : 'Add to Cart'}
			</button>
		</div>
	</div>
</div>

<!-- Image Modal -->
{#if showModal}
	<button
		type="button"
		class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 w-full border-0"
		onclick={toggleModal}
	>
		<img
			src={plant.images[currentImageIndex]}
			alt={plant.name}
			class="max-h-[90vh] max-w-[90vw] object-contain"
		/>
	</button>
{/if}
