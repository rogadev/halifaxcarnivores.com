<script lang="ts">
	import { onMount } from 'svelte';

	type Plant = {
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
		createdAt: string;
		updatedAt: string;
	};

	export let product: Plant;

	let imageLoaded = false;

	// Get the full product name
	$: productName = [product.genus, product.species, product.unique].filter(Boolean).join(' ');

	// Preload the image
	onMount(() => {
		// Create new image object to preload
		const img = new Image();
		img.src = product.images[0];
		img.onload = () => {
			imageLoaded = true;
		};
	});
</script>

<div class="group relative">
	<div
		class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative"
	>
		<img
			src={product.images[0]}
			alt={productName || product.name}
			class="h-full w-full object-cover object-center lg:h-full lg:w-full transition-all duration-300"
			class:grayscale={product.quantity < 1}
			loading="lazy"
			decoding="async"
			fetchpriority="high"
		/>
		{#if product.quantity < 1}
			<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
				<span class="bg-black text-white px-6 py-3 text-sm font-medium rounded-lg shadow-lg">
					Out Of Stock
				</span>
			</div>
		{/if}
	</div>

	<div class="mt-4 w-full">
		<div class="mb-3">
			<h3 class="text-sm text-gray-700">
				<a href={`/plants/${product.id}`} class="hover:text-emerald-700 transition-colors">
					<span aria-hidden="true" class="absolute inset-0" />
					{productName || product.name}
				</a>
			</h3>
			{#if productName}
				<p class="mt-1 text-sm text-gray-500">
					{product.name}
				</p>
			{/if}
		</div>

		<div class="flex items-center justify-between">
			<div class="flex gap-2">
				{#if product.onSale && product.quantity > 0}
					<span
						class="inline-flex items-center bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-1 rounded-full"
					>
						Sale
					</span>
				{/if}
				{#if product.new}
					<span
						class="inline-flex items-center bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded-full"
					>
						New
					</span>
				{/if}
			</div>

			<div class="text-right">
				{#if product.onSale && product.salePrice > 0}
					<p class="text-sm font-medium">
						<span class="text-rose-600">${product.salePrice.toFixed(2)}</span>
						<span class="ml-1 text-gray-500 line-through">${product.price.toFixed(2)}</span>
					</p>
				{:else}
					<p class="text-sm font-medium text-gray-900">
						${product.price.toFixed(2)}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
