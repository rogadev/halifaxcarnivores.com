<script lang="ts">
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

		<BlogSection />

		<section id="events" class="mb-6">
			<h2 class="text-3xl mb-4">Events</h2>
			<p>Join us in our annual community events and connect with fellow enthusiasts...</p>
			<p class="italic text-slate-600">Section coming soon...</p>
		</section>

		<section id="care-maintenance" class="mb-6">
			<h2 class="text-3xl mb-4">Care & Maintenance</h2>
			<p>Discover essential care products and tips to nurture your carnivorous plants...</p>
			<p class="italic text-slate-600">Section coming soon...</p>
		</section>
	</div>
</div>
