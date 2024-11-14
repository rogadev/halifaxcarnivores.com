<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let plants: any[] = [];

	onMount(async () => {
		const { data, error } = await supabase
			.from('plants')
			.select('*')
			.order('createdAt', { ascending: false });

		if (error) {
			console.error('Error fetching plants:', error);
			return;
		}

		plants = data;
	});
</script>

{#if plants.length > 0}
	<section id="shop" class="mb-6">
		<div class="mx-auto max-w-2xl px-4sm:px-6 py-4 lg:max-w-7xl lg:px-8">
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-3">Shop Our Selection</h2>
				<h3 class="font-semibold md:tracking-wide">
					Updated regularly, here's some of what we have in stock and coming soon...
				</h3>
			</div>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{#each plants as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</section>
{/if}
