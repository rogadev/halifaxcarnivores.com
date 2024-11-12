<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import Icon from '@iconify/svelte';
	import type { Plant } from '$lib/types';

	let plant: Plant | null = null;
	let currentImageIndex = 0;
	let showPopover = false;
	let loading = true;
	let error: string | null = null;
	let showModal = false;

	async function fetchPlant() {
		try {
			const { data, error: err } = await supabase
				.from('Plant')
				.select('*')
				.eq('id', $page.params.id)
				.single();

			if (err) throw err;
			plant = data;
		} catch (e) {
			error = (e as Error).message;
		} finally {
			loading = false;
		}
	}

	function nextImage() {
		if (plant?.images && currentImageIndex < plant.images.length - 1) {
			currentImageIndex++;
		}
	}

	function previousImage() {
		if (currentImageIndex > 0) {
			currentImageIndex--;
		}
	}

	function toggleModal() {
		showModal = !showModal;
	}

	onMount(() => {
		fetchPlant();
	});
</script>

{#if loading}
	<div class="flex justify-center items-center min-h-screen">
		<p class="text-xl">Loading plant details...</p>
	</div>
{:else if error}
	<div class="flex justify-center items-center min-h-screen">
		<p class="text-xl text-red-600">Error: {error}</p>
	</div>
{:else if plant}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="bg-white rounded-lg shadow-lg overflow-hidden">
			<div>
				{#if plant.images && plant.images.length > 0}
					<div class="relative w-full" style="height: min(33vh, 400px);">
						<button class="w-full h-full" on:click={toggleModal}>
							<img
								src={plant.images[currentImageIndex]}
								alt={`${plant.name} - Image ${currentImageIndex + 1}`}
								class="w-full h-full object-cover"
							/>
						</button>

						{#if plant.images.length > 1}
							<button
								on:click|stopPropagation={previousImage}
								class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity {currentImageIndex ===
								0
									? 'hidden'
									: ''}"
							>
								<Icon icon="mdi:chevron-left" width="32" height="32" />
							</button>

							<button
								on:click|stopPropagation={nextImage}
								class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity {currentImageIndex ===
								plant.images.length - 1
									? 'hidden'
									: ''}"
							>
								<Icon icon="mdi:chevron-right" width="32" height="32" />
							</button>
						{/if}
					</div>
				{:else}
					<div class="relative w-full" style="height: min(33vh, 400px);">
						<div class="w-full h-full bg-green-700 flex items-center justify-center">
							<Icon icon="mdi:plant" class="text-white" width="48" height="48" />
						</div>
					</div>
				{/if}
			</div>

			{#if showModal && plant.images && plant.images.length > 0}
				<button
					class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
					on:click={toggleModal}
				>
					<img
						src={plant.images[currentImageIndex]}
						alt={plant.name}
						class="max-h-[90vh] max-w-[90vw] object-contain"
					/>
				</button>
			{/if}

			<div class="p-8">
				<div class="flex justify-between items-start mb-6">
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							{plant.genus}
							{plant.species}
							<span class="text-2xl">{plant.unique}</span>
						</h1>
						<p class="text-lg text-gray-600 mt-2">{plant.name}</p>
					</div>
					<div class="text-right">
						{#if plant.onSale}
							<p class="text-2xl font-bold text-red-600">${plant.salePrice.toFixed(2)}</p>
							<p class="text-lg text-gray-500 line-through">${plant.price.toFixed(2)}</p>
						{:else}
							<p class="text-2xl font-bold text-gray-900">${plant.price.toFixed(2)}</p>
						{/if}
						{#if plant.new}
							<span class="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full mt-2"
								>New</span
							>
						{/if}
					</div>
				</div>

				{#if plant.description}
					<div class="mb-6">
						<h2 class="text-xl font-semibold mb-2">Description</h2>
						<p class="text-gray-700">{plant.description}</p>
					</div>
				{/if}

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{#if plant.water}
						<div>
							<h3 class="font-semibold mb-1">Water Requirements</h3>
							<p class="text-gray-700">{plant.water}</p>
						</div>
					{/if}
					{#if plant.light}
						<div>
							<h3 class="font-semibold mb-1">Light Requirements</h3>
							<p class="text-gray-700">{plant.light}</p>
						</div>
					{/if}
					{#if plant.temperature}
						<div>
							<h3 class="font-semibold mb-1">Temperature</h3>
							<p class="text-gray-700">{plant.temperature}</p>
						</div>
					{/if}
					{#if plant.humidity}
						<div>
							<h3 class="font-semibold mb-1">Humidity</h3>
							<p class="text-gray-700">{plant.humidity}</p>
						</div>
					{/if}
				</div>

				<div class="relative">
					<button
						on:mouseenter={() => (showPopover = true)}
						on:mouseleave={() => (showPopover = false)}
						class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 hover:bg-gray-700 h-10 px-4 py-2 text-white"
					>
						<Icon
							icon={showPopover ? 'mdi:cart-off' : 'mdi:cart-plus'}
							width="20"
							height="20"
							class="mr-2"
						/>
						Add to Cart
					</button>
					{#if showPopover}
						<div
							class="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 text-white text-sm rounded-md p-2 shadow-lg"
						>
							<p>Shopping cart functionality coming soon!</p>
							<div
								class="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
