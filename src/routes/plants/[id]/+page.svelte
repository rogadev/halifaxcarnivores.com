<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { supabase } from '$lib/supabase';
	import type { DisplayedPlantItem } from '$lib/types';
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/cart';
	import { toast } from '$lib/stores/toast';

	interface Props {
		data: { plant: DisplayedPlantItem };
	}

	let { data }: Props = $props();
	const { plant } = data;

	// Image Gallery State
	let images = $state<string[]>([]);
	let currentImageIndex = $state(0);

	// Fetch images from Supabase
	async function loadImages() {
		// Start with featured image if it exists
		const imageList = plant.featuredImage ? [plant.featuredImage] : [];

		// Get additional images from Supabase storage
		const { data: files, error } = await supabase.storage.from('images').list(`plants/${plant.id}`);

		if (!error && files) {
			const additionalImages = await Promise.all(
				files.map(async (file) => {
					const {
						data: { publicUrl }
					} = supabase.storage.from('images').getPublicUrl(`plants/${plant.id}/${file.name}`);
					return publicUrl;
				})
			);
			images = [...imageList, ...additionalImages];
		} else {
			images = imageList;
		}
	}

	// Navigation functions
	function nextImage() {
		if (currentImageIndex < images.length - 1) currentImageIndex++;
	}

	function prevImage() {
		if (currentImageIndex > 0) currentImageIndex--;
	}

	let addingToCart = $state(false);

	async function addToCart() {
		addingToCart = true;
		toast.info('This feature is coming soon!');
		addingToCart = false;
		// try {
		// 	const response = await fetch(`/api/plants/${plant.id}/availability`);
		// 	const { qtyAvailable } = await response.json();

		// 	if (qtyAvailable > 0) {
		// 		cart.addItem(plant, 'plant', 1);
		// 		toast.success(`Added ${plant.displayName} to cart`);
		// 	} else {
		// 		toast.error('Sorry, this item is no longer available');
		// 	}
		// } catch (error) {
		// 	console.error('Error adding to cart:', error);
		// 	toast.error('Failed to add item to cart. Please try again.');
		// } finally {
		// 	addingToCart = false;
		// }
	}

	onMount(() => {
		loadImages();
	});
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Image Gallery Section -->
		<div class="relative">
			{#if images.length > 0}
				<div class="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
					<img
						src={images[currentImageIndex]}
						alt={plant.displayName}
						class="w-full h-full object-cover"
					/>

					{#if images.length > 1}
						<!-- Unified Navigation Controls -->
						<div
							class="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-black/30"
						>
							<button
								class="text-white p-2 hover:bg-black/20 rounded-full transition-colors"
								onclick={prevImage}
								disabled={currentImageIndex === 0}
							>
								<Icon icon="mdi:chevron-left" width="24" height="24" />
							</button>

							<!-- Pagination Dots -->
							<div class="flex gap-2">
								{#each images as _, index}
									<button
										class="w-2 h-2 rounded-full transition-colors {currentImageIndex === index
											? 'bg-white'
											: 'bg-white/50'}"
										onclick={() => (currentImageIndex = index)}
										aria-label="View image {index + 1} of {images.length}"
									></button>
								{/each}
							</div>

							<button
								class="text-white p-2 hover:bg-black/20 rounded-full transition-colors"
								onclick={nextImage}
								disabled={currentImageIndex === images.length - 1}
							>
								<Icon icon="mdi:chevron-right" width="24" height="24" />
							</button>
						</div>
					{/if}
				</div>

				<!-- Thumbnail Preview -->
				<div class="hidden md:grid grid-cols-4 gap-2 mt-4">
					{#each images as image, index}
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
					<h1 class="text-3xl font-bold text-gray-900">{plant.displayName}</h1>
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
							${plant.price?.toFixed(2) ?? 'TBD'}
						</p>
					{:else}
						<p class="text-3xl font-bold text-gray-900">
							${plant.price?.toFixed(2) ?? 'TBD'}
						</p>
					{/if}
				</div>
			</div>

			<!-- Description -->
			{#if plant.description}
				<div>
					<h2 class="text-lg font-semibold mb-2">About this plant</h2>
					<p class="text-gray-700 leading-relaxed">{plant.description}</p>
				</div>
			{/if}

			<!-- Care Instructions -->
			{#if plant.careWater || plant.careLight || plant.careTemperature || plant.careHumidity}
				<div class="border rounded-lg p-6 bg-gray-50 space-y-4">
					<h2 class="text-lg font-semibold">Care Instructions</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{#if plant.careWater}
							<div>
								<div class="flex items-center gap-2">
									<Icon icon="mdi:water" class="text-blue-500" />
									<h3 class="font-medium">Water</h3>
								</div>
								<p class="text-gray-600 mt-1">{plant.careWater}</p>
							</div>
						{/if}
						{#if plant.careLight}
							<div>
								<div class="flex items-center gap-2">
									<Icon icon="mdi:white-balance-sunny" class="text-yellow-500" />
									<h3 class="font-medium">Light</h3>
								</div>
								<p class="text-gray-600 mt-1">{plant.careLight}</p>
							</div>
						{/if}
						{#if plant.careTemperature}
							<div>
								<div class="flex items-center gap-2">
									<Icon icon="mdi:thermometer" class="text-red-500" />
									<h3 class="font-medium">Temperature</h3>
								</div>
								<p class="text-gray-600 mt-1">{plant.careTemperature}</p>
							</div>
						{/if}
						{#if plant.careHumidity}
							<div>
								<div class="flex items-center gap-2">
									<Icon icon="mdi:water-percent" class="text-green-500" />
									<h3 class="font-medium">Humidity</h3>
								</div>
								<p class="text-gray-600 mt-1">{plant.careHumidity}</p>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<div class="border rounded-lg p-6 bg-gray-50 space-y-4">
					<h2 class="text-lg font-semibold">Care Instructions</h2>
					<div class="flex items-center gap-3 text-gray-600">
						<Icon icon="mdi:information" class="text-blue-500" width="24" height="24" />
						<p>Care instructions for this plant are coming soon!</p>
					</div>
				</div>
			{/if}

			<!-- Add to Cart -->
			<button
				class="w-full py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
				disabled={plant.isComingSoon || addingToCart || !plant.qtyAvailable}
				onclick={addToCart}
			>
				{#if addingToCart}
					Adding...
				{:else if plant.isComingSoon}
					Coming Soon
				{:else if !plant.qtyAvailable}
					Out of Stock
				{:else}
					Add to Cart
				{/if}
			</button>
		</div>
	</div>
</div>
