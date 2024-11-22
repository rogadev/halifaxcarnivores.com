<script lang="ts">
	import { onMount } from 'svelte';
	import PlantList from './PlantList.svelte';
	import { supabase } from '$lib/supabase';
	import { browser } from '$app/environment';

	let plants: any[] = $state([]);
	let loading = $state(true);
	let error: string | null = $state(null);

	async function fetchPlants() {
		try {
			const { data, error: err } = await supabase.from('plants').select('*');

			if (err) {
				throw err;
			}

			plants = data || [];
		} catch (e) {
			error = (e as Error).message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		if (browser) {
			fetchPlants();
		}
	});
</script>

{#if loading}
	<p>Loading plants...</p>
{:else if error}
	<p class="error">Error: {error}</p>
{:else if plants.length === 0}
	<div class="text-center py-12">
		<p class="text-lg text-gray-600">No plants are currently available.</p>
		<p class="text-sm text-gray-500 mt-2">Please check back later for new inventory!</p>
	</div>
{:else}
	<PlantList {plants} />
{/if}
