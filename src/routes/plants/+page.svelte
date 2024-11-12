<script lang="ts">
	import { onMount } from 'svelte';
	import PlantList from './PlantList.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { browser } from '$app/environment';

	let plants: any[] = [];
	let loading = true;
	let error: string | null = null;

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
{:else}
	<PlantList {plants} />
{/if}
