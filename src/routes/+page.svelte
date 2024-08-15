<script lang="ts">
	import OrderingSection from './OrderingSection.svelte';

	import EventsSection from './EventsSection.svelte';

	import CareSection from './CareSection.svelte';

	import HomepageHero from './HomepageHero.svelte';
	import BlogSection from './BlogSection.svelte';
	import OurShopSection from './OurShopSection.svelte';
</script>

<svelte:head>
	<title>Halifax Carnivores - Your Carnivorous Plant Haven</title>
</svelte:head>

<HomepageHero />
<div class="max-w-7xl mx-auto px-8">
	<div class="flex flex-col gap-8">
		<OurShopSection />
		<OrderingSection />
		<CareSection />
		<BlogSection />
		<EventsSection />
	</div>
</div>
