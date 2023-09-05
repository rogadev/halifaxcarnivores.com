<script lang="ts">
	let showcaseProducts = [
		{
			name: 'Venus Fly Trap',
			species: 'Dionaea Muscipula',
			price: '$45',
			quantity: 1,
			imgSrc: 'img/venus_fly_trap_1.jpg',
			href: '/store/0001'
		},
		{
			name: 'Tropical Sundew',
			species: 'Drosera Capensis Alba',
			price: '$10',
			quantity: 1,
			imgSrc: 'img/drosera_1.jpg',
			href: '/store/0002'
		},
		{
			name: 'Small Nepenthes',
			species: 'Nepenthes St. Gaya',
			price: '$40',
			quantity: 1,
			imgSrc: 'img/nepenthes_1.jpg',
			href: '/store/0003'
		},
		{
			name: 'Large Nepenthes',
			species: 'Nepenthes mirabilis var. Globosa x ampularia (Green x Black Miracle)',
			price: '$65',
			quantity: 1,
			imgSrc: 'img/nepenthes_2.jpg',
			href: '/store/0004'
		}
	];
</script>

<section id="store" class="mb-6">
	<h1 class="text-3xl font-bold">See our selection</h1>
	<div class="mx-auto max-w-2xl px-4sm:px-6 py-4 lg:max-w-7xl lg:px-8">
		<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{#each showcaseProducts as { name, species, price, imgSrc, href }}
				<div class="group relative">
					<div
						class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
					>
						<img
							src={imgSrc}
							alt="{name} - {species}"
							class="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
					</div>
					<div class="mt-4 flex justify-between">
						<div>
							<h3 class="text-sm text-gray-700">
								<a {href}>
									<span aria-hidden="true" class="absolute inset-0" />
									{name}
								</a>
							</h3>
							<p class="mt-1 text-sm text-gray-500">{species}</p>
						</div>
						<p class="text-sm font-medium text-gray-900">{price}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
