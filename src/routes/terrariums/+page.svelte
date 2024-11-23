<script lang="ts">
	import ComingSoon from '$lib/components/ComingSoon.svelte';

	const links = [
		{ href: '/plants', icon: 'mdi:plant', label: 'Plants' },
		{ href: '/soil', icon: 'mdi:plant-outline', label: 'Soil' },
		{ href: '/terrariums', icon: 'lucide:box', label: 'Terrariums' }
	];
</script>

<ComingSoon
	title="Terrariums Page Coming Soon!"
	description="We're working hard to bring you a seamless shopping experience."
	mainIcon="mdi:cart-outline"
	{links}
/>
