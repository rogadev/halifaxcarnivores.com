<script lang="ts">
	import { onMount } from 'svelte';

	export let product: Product;

	let displayBannerText: string = product.bannerText || '';

	onMount(() => {
		if (product.bannerText && product.bannerText.length > 16) {
			displayBannerText = 'See Details';
		}
	});

	function formatPrice(low?: number, high?: number): string {
		if (!low) return 'Price TBD';
		if (high && high > low) {
			return `$${low.toFixed(2)} - $${high.toFixed(2)}`;
		}
		return `$${low.toFixed(2)}+`;
	}
</script>

<div class="group relative">
	<div
		class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative"
	>
		<img
			src={product.imgSrc}
			alt={product.imgAlt}
			class="h-full w-full object-cover object-center lg:h-full lg:w-full"
			class:grayscale={product.stock < 1}
		/>
	</div>
	{#if product.stock < 1}
		<div
			class="bg-slate-700 text-white px-4 py-2 text-sm font-bold rounded absolute bottom-0 left-0 right-0 text-center transform translate-y-1/2"
		>
			Out Of Stock
		</div>
	{/if}

	<div class="mt-8 w-full">
		<div class="flex justify-between">
			<div>
				<h3 class="text-sm text-gray-700">
					<a href={product.href}>
						<span aria-hidden="true" class="absolute inset-0" />
						{product.name}
					</a>
				</h3>
				<p class="mt-1 text-sm text-gray-500">{product.species}</p>
			</div>
			<p class="text-sm font-medium text-gray-900 text-right">
				{#if product.onSale && product.salePrice !== undefined}
					<span class="text-red-600 italic">Sale ${product.salePrice.toFixed(2)}</span>
				{:else}
					{formatPrice(product.priceLow, product.priceHigh)}
				{/if}
			</p>
		</div>
		<div class="mt-2 flex flex-wrap justify-between gap-2">
			{#if product.onSale && product.stock > 0}
				<span class="bg-orange-600 text-white px-2 py-1 text-xs font-bold rounded-full">
					On Sale
				</span>
			{/if}
			{#if product.bannerText}
				<span class="bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded-full">
					{displayBannerText}
				</span>
			{/if}
		</div>
	</div>
</div>
