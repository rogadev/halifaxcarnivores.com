<script lang="ts">
	let showcaseProducts = [
		{
			name: 'Venus Fly Trap',
			species: 'Dionaea Muscipula',
			price: '$45',
			imgSrc: 'img/dionaea/1.jpg',
			href: '/shop/0001',
			stock: 0
		},
		{
			name: 'Tropical Sundew',
			species: 'Drosera Capensis Alba',
			price: '$10',
			imgSrc: 'img/drosera/capensis/5.jpg',
			href: '/shop/0002',
			stock: 3
		},
		{
			name: 'Small Nepenthes',
			species: 'Nepenthes St. Gaya',
			price: '$40',
			imgSrc: 'img/nepenthes/7.jpg',
			href: '/shop/0003',
			stock: 2
		},
		{
			name: 'Large Nepenthes',
			species: 'Nepenthes mirabilis var. Globosa x ampularia (Green x Black Miracle)',
			price: '$65',
			imgSrc: 'img/nepenthes/1.jpg',
			href: '/shop/0004',
			stock: 1
		}
	];
</script>

<section id="shop" class="mb-6">
	<h1 class="text-3xl font-bold">See our selection</h1>
	<div class="mx-auto max-w-2xl px-4sm:px-6 py-4 lg:max-w-7xl lg:px-8">
		<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{#each showcaseProducts as { name, species, price, imgSrc, href, stock }}
				<div class="group relative" class:group-hover={stock !== 0}>
					<div
						class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 {stock >
						0
							? 'group-hover:opacity-75 cursor-pointer'
							: 'cursor-default'}"
						class:grayscale={stock === 0}
					>
						<img
							src={imgSrc}
							alt="{name} - {species}"
							class="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
						{#if stock === 0}
							<div class="sold-out-banner">Sold Out</div>
						{/if}
					</div>
					<div class="mt-4 flex justify-between">
						<div>
							<h3 class="text-sm text-gray-700">
								{#if stock > 0}
									<a {href}>
										<span aria-hidden="true" class="absolute inset-0" />
										{name}
									</a>
								{:else}
									{name}
								{/if}
							</h3>
							<p class="mt-1 text-sm text-gray-500">{species}</p>
						</div>
						<p class="text-sm font-medium text-gray-900">{stock > 0 ? price : 'Sold Out'}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.grayscale {
		filter: grayscale(1);
	}
	.sold-out-banner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-5deg);
		filter: none;
		background-color: red;
		color: white;
		padding: 8px 16px;
		white-space: nowrap;
		font-size: 16px;
		width: 105%;
		text-align: center;
	}
</style>
