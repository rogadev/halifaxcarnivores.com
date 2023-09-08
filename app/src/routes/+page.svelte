<script lang="ts">
	import HomepageHero from './HomepageHero.svelte';
	import BlogSection from './BlogSection.svelte';
	import OurShopSection from './OurShopSection.svelte';

	let showcaseProducts = [
		{
			name: 'Venus Fly Trap',
			species: 'Dionaea Muscipula',
			price: '$45',
			quantity: 1,
			imgSrc: 'link_to_image_1.jpg',
			href: '/shop/0001'
		},
		{
			name: 'Tropical Sundew',
			species: 'Drosera Capensis Alba',
			price: '$10',
			quantity: 1,
			imgSrc: 'link_to_image_2.jpg',
			href: '/shop/0002'
		},
		{
			name: 'Small Nepenthes',
			species: 'Nepenthes St. Gaya',
			price: '$40',
			quantity: 1,
			imgSrc: 'link_to_image_3.jpg',
			href: '/shop/0003'
		},
		{
			name: 'Large Nepenthes',
			species: 'Nepenthes mirabilis var. Globosa x ampularia (Green x Black Miracle)',
			price: '$65',
			quantity: 1,
			imgSrc: 'link_to_image_4.jpg',
			href: '/shop/0004'
		}
		// Add more products as needed
	];
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
