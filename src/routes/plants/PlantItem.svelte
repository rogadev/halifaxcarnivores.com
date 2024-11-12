<script lang="ts">
	import { goto } from '$app/navigation';

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

	export let plantItem: Plant;

	function handleOrder() {
		goto('/contact');
	}
</script>

<div class="bg-white rounded-lg shadow-lg overflow-hidden">
	{#if plantItem.images && plantItem.images.length > 0}
		<img src={plantItem.images[0]} alt={plantItem.name} class="w-full h-64 object-cover" />
	{/if}

	<div class="p-6">
		<div class="flex justify-between items-start mb-4">
			<div>
				<h2 class="text-2xl font-bold text-gray-900">{plantItem.name}</h2>
				<p class="text-sm text-gray-600 italic">
					{plantItem.genus}
					{plantItem.species} '{plantItem.unique}'
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

		{#if plantItem.description}
			<div class="mb-6">
				<h3 class="text-lg font-semibold mb-2">Description</h3>
				<p class="text-gray-700 whitespace-pre-line">{plantItem.description}</p>
			</div>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
			{#if plantItem.water}
				<div>
					<h3 class="text-lg font-semibold mb-2">Water Requirements</h3>
					<p class="text-gray-700 whitespace-pre-line">{plantItem.water}</p>
				</div>
			{/if}
			{#if plantItem.light}
				<div>
					<h3 class="text-lg font-semibold mb-2">Light Requirements</h3>
					<p class="text-gray-700 whitespace-pre-line">{plantItem.light}</p>
				</div>
			{/if}
			{#if plantItem.temperature}
				<div>
					<h3 class="text-lg font-semibold mb-2">Temperature Requirements</h3>
					<p class="text-gray-700 whitespace-pre-line">{plantItem.temperature}</p>
				</div>
			{/if}
			{#if plantItem.humidity}
				<div>
					<h3 class="text-lg font-semibold mb-2">Humidity Requirements</h3>
					<p class="text-gray-700 whitespace-pre-line">{plantItem.humidity}</p>
				</div>
			{/if}
		</div>

		{#if plantItem.seasonality}
			<div class="mb-6">
				<h3 class="text-lg font-semibold mb-2">Seasonality</h3>
				<p class="text-gray-700 whitespace-pre-line">{plantItem.seasonality}</p>
			</div>
		{/if}

		<div class="mt-6">
			<button
				on:click={handleOrder}
				class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
				disabled={plantItem.quantity === 0}
			>
				{plantItem.quantity > 0 ? 'Order Now' : 'Out of Stock'}
			</button>
		</div>
	</div>
</div>
