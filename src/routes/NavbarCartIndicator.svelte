<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import Icon from '@iconify/svelte';
	import { spring } from 'svelte/motion';

	// Create a spring store for the bounce animation
	const scaleStore = spring(1, { stiffness: 0.15, damping: 0.4 });

	// Track pending (non-ordered) items
	let itemCount = $derived(
		$cart.items
			.filter((item) => item.orderStatus === 'pending')
			.reduce((sum, item) => sum + item.quantity, 0)
	);

	// Trigger animation when itemCount changes
	$effect(() => {
		if (itemCount > 0) {
			scaleStore.set(1.5).then(() => {
				scaleStore.set(1);
			});
		}
	});
</script>

<a
	href="/cart"
	class="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
>
	<span class="sr-only">View cart ({itemCount} items)</span>
	<div style:transform="scale({$scaleStore})" class="transition-transform">
		<Icon icon="mdi:cart" class="h-6 w-6" />
		{#if itemCount > 0}
			<span
				class="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
			>
				{itemCount}
			</span>
		{/if}
	</div>
</a>
