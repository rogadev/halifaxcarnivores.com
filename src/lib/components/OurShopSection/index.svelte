<script lang="ts">
	import ProductCard from './ProductCard.svelte';

	let showcaseProducts: Product[] = [
		{
			id: 1,
			name: 'Venus Fly Traps',
			species: 'Dionaea Muscipula',
			priceLow: 25,
			priceHigh: 35,
			imgSrc: '/img/dionaea/1.jpg',
			imgAlt: 'A beautiful venus flytrap.',
			href: '/shop',
			stock: 30,
			salePrice: 15,
			onSale: true,
			bannerText: 'More Coming Soon'
		},
		{
			id: 2,
			name: 'Tropical Sundews',
			species: 'Drosera Capensis',
			priceLow: 25,
			priceHigh: 35,
			imgSrc: '/img/drosera/capensis/8.jpg',
			imgAlt: 'A beautiful tropical sundew, Drosera capensis.',
			href: '/shop',
			stock: 3
		},
		{
			id: 3,
			name: 'Trumpet Pitcher Plants',
			species: 'Sarracenia',
			priceLow: 10,
			priceHigh: 35,
			salePrice: 20,
			onSale: true,
			imgSrc: '/img/sarracenia/purpurea/1.jpg',
			imgAlt: 'Beautiful red trumpet pitcher plants in a bog in Nova Scotia',
			href: '/shop',
			stock: 2
		},
		{
			id: 4,
			name: 'Tropical Pitcher Plants',
			species: 'Nepenthes',
			priceLow: 25,
			imgSrc: '/img/nepenthes/1.jpg',
			imgAlt: 'A beautiful tropical pitcher plant with stunning color in the pitchers.',
			href: '/shop',
			stock: 1
		},
		{
			id: 5,
			name: 'Forked Sundews',
			species: 'Drosera Binata',
			priceLow: 25,
			salePrice: 20,
			onSale: true,
			imgSrc: '/img/drosera/binata/1.jpg',
			imgAlt: 'A forked sundew growing tall and bushy, covered in sticky dew.',
			href: '/shop',
			stock: 1
		},
		{
			id: 6,
			name: 'Temperate Sundews',
			species: 'Drosera Filiformis',
			imgSrc: '/img/drosera/filiformis/1.jpg',
			imgAlt:
				'Long, stringy strands of dewy tentacles extend up to the sun, ready to trap their prey.',
			href: '/shop',
			stock: 20,
			bannerText: 'Coming Soon'
		}
	];
</script>

<section id="shop" class="mb-6">
	<div class="mx-auto max-w-2xl px-4sm:px-6 py-4 lg:max-w-7xl lg:px-8">
		<div class="text-center">
			<h2 class="text-4xl font-bold mb-3">Shop Our Selection</h2>
			<h3 class="font-semibold md:tracking-wide">
				Updated regularly, here's some of what we have in stock and coming soon...
			</h3>
		</div>
		<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{#each showcaseProducts as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>
