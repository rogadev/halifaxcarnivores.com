<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import type { Plant } from '$lib/types';

	interface Props {
		plantItem: Plant;
	}

	let { plantItem }: Props = $props();
	let showMessage = $state(false);
	let showPopover = $state(false);

	// Preload both cart icons
	onMount(() => {
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
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
	{#if plantItem.images && plantItem.images.length > 0}
		<img src={plantItem.images[0]} alt={plantItem.name} class="w-full h-64 object-cover" />
	{:else}
		<div class="w-full h-64 bg-green-100 flex items-center justify-center">
			<Icon icon="mdi:plant" class="text-green-600" width="64" height="64" />
		</div>
	{/if}

	<div class="p-6 flex flex-col flex-grow">
		<div class="flex justify-between items-start mb-4">
			<div>
				<h2 class="text-2xl font-bold text-gray-900">
					{plantItem.genus}
					{plantItem.species}
					<span class="text-xl">{plantItem.unique}</span>
				</h2>
				<p class="text-sm text-gray-600">
					{plantItem.name}
				</p>
			</div>
			<div class="text-right">
				{#if plantItem.onSale}
					<p class="text-lg font-bold text-red-600">${plantItem.salePrice.toFixed(2)}</p>
					<p class="text-sm text-gray-500 line-through">${plantItem.price.toFixed(2)}</p>
				{:else}
					<p class="text-lg font-bold text-gray-900">${plantItem.price.toFixed(2)}</p>
				{/if}
				{#if plantItem.new}
					<span class="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full"
						>New</span
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
