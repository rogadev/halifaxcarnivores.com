<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import type { Plant } from '@prisma/client';
	import { supabase } from '$lib/supabase';
	import ImageModal from '$lib/components/ImageModal.svelte';

	interface Props {
		plantItem: Plant;
	}

	let { plantItem }: Props = $props();
	let showMessage = $state(false);
	let showPopover = $state(false);
	let fallbackImage = $state<string | null>(null);
	let isImageModalOpen = $state(false);

	async function loadFallbackImage() {
		if (!plantItem.featuredImage) {
			const { data, error } = await supabase.storage.from('images').list(`plants/${plantItem.id}/`);

			if (!error && data && data.length > 0) {
				const { data: urlData } = await supabase.storage
					.from('images')
					.getPublicUrl(`plants/${plantItem.id}/${data[0].name}`);

				if (urlData) {
					fallbackImage = urlData.publicUrl;
				}
			}
		}
	}

	onMount(() => {
		loadFallbackImage();

		// Preload cart icons
		const icons = ['mdi:cart-plus', 'mdi:cart-off'];
		icons.forEach((icon) => {
			const img = new Image();
			img.src = `https://api.iconify.design/${icon.replace(':', '/')}.svg`;
		});
	});

	function handleLearnMore() {
		goto(`/plants/${plantItem.id}`);
	}

	function handleAddToCart() {
		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 3000);
	}

	function getDisplayPrice(plant: Plant): string {
		if (!plant.price) return 'Price TBD';
		return plant.isOnSale && plant.salePrice
			? `$${plant.salePrice.toFixed(2)}`
			: `$${plant.price.toFixed(2)}`;
	}

	function getOriginalPrice(plant: Plant): string | null {
		return plant.isOnSale && plant.price ? `$${plant.price.toFixed(2)}` : null;
	}

	console.table(plantItem);

	function handleImageClick() {
		isImageModalOpen = true;
	}
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
	{#if plantItem.featuredImage}
		<button onclick={handleImageClick} class="w-full">
			<img
				src={plantItem.featuredImage}
				alt={plantItem.displayName}
				class="w-full h-64 object-cover hover:opacity-90 transition-opacity"
			/>
		</button>
	{:else if fallbackImage}
		<button onclick={handleImageClick} class="w-full">
			<img
				src={fallbackImage}
				alt={plantItem.displayName}
				class="w-full h-64 object-cover hover:opacity-90 transition-opacity"
			/>
		</button>
	{:else}
		<div class="w-full h-64 bg-green-100 flex items-center justify-center">
			<Icon icon="mdi:plant" class="text-green-600" width="64" height="64" />
		</div>
	{/if}

	<div class="p-6 flex flex-col flex-grow">
		<div class="flex justify-between items-start mb-4">
			<div>
				<h2 class="text-2xl font-bold text-gray-900">
					{plantItem.displayName}
				</h2>
				{#if plantItem.size}
					<p class="text-sm text-gray-500">Size: {plantItem.size}</p>
				{/if}
			</div>
			<div class="text-right">
				<p class="text-lg font-bold {plantItem.isOnSale ? 'text-red-600' : 'text-gray-900'}">
					{getDisplayPrice(plantItem)}
				</p>
				{#if plantItem.isOnSale && getOriginalPrice(plantItem)}
					<p class="text-sm text-gray-500 line-through">{getOriginalPrice(plantItem)}</p>
				{/if}
				{#if plantItem.qtyAvailable === 0}
					<span class="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full"
						>Sold Out</span
					>
				{/if}
			</div>
		</div>

		<div class="mt-auto flex gap-3 items-center">
			<button
				onclick={handleLearnMore}
				class="flex-grow inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 hover:bg-gray-700 h-10 px-4 py-2 text-white"
			>
				Learn More
			</button>
			<div class="relative">
				<button
					onmouseenter={() => (showPopover = true)}
					onmouseleave={() => (showPopover = false)}
					onclick={handleAddToCart}
					class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-gray-200 hover:text-gray-600 h-10 w-10 relative"
					aria-label="Add to cart (coming soon)"
				>
					<Icon
						icon={showPopover ? 'mdi:cart-off' : 'mdi:cart-plus'}
						width="20"
						height="20"
						class={showPopover ? 'text-gray-500 cursor-not-allowed' : 'cursor-not-allowed'}
					/>
				</button>
				{#if showPopover}
					<div
						class="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 text-white text-sm rounded-md p-2 shadow-lg"
					>
						<p>Shopping cart functionality coming soon!</p>
						<div
							class="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"
						></div>
					</div>
				{/if}
			</div>
		</div>

		{#if showMessage}
			<div
				class="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded"
				role="alert"
			>
				<p>Shopping cart functionality coming soon!</p>
			</div>
		{/if}
	</div>
</div>

<ImageModal
	isOpen={isImageModalOpen}
	imageUrl={plantItem.featuredImage || fallbackImage || ''}
	altText={plantItem.displayName}
/>
