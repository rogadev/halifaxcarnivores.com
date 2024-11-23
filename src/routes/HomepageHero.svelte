<script lang="ts">
	import Icon from '@iconify/svelte';

	const imagePaths = [
		'/img/plants/drosera-capensis-alba-eating.jpg',
		'/img/plants/pinguicula-esseriana.jpg',
		'/img/plants/tricolor-ampularia.jpg',
		'/img/plants/pinguicula-hybrid.jpg',
		'/img/plants/moss-garden.jpg'
	];
</script>

<main id="intro" class="mb-6 bg-white">
	<div class="relative isolate">
		<svg
			class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
					width="200"
					height="200"
					x="50%"
					y="-1"
					patternUnits="userSpaceOnUse"
				>
					<path d="M.5 200V.5H200" fill="none" />
				</pattern>
			</defs>
			<svg x="50%" y="-1" class="overflow-visible fill-gray-50">
				<path
					d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
					stroke-width="0"
				/>
			</svg>
			<rect
				width="100%"
				height="100%"
				stroke-width="0"
				fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
			/>
		</svg>
		<div
			class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
			aria-hidden="true"
		>
			<div
				class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
				style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"
			></div>
		</div>
		<div class="overflow-hidden">
			<div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
				<div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
					<section id="introduction" class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
						<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Halifax Carnivores
						</h1>
						<h2 class="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl">
							Your Local Source for Exotic Carnivorous Plants and More in Halifax and Dartmouth
						</h2>
						<p
							class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none before:absolute before:-inset-4 before:block before:rounded-lg before:bg-gradient-to-r before:from-white/0 before:via-white/95 before:to-white/0 before:-z-10 before:sm:hidden"
						>
							Discover the fascinating world of carnivorous plants with Halifax Carnivores, your
							go-to destination for rare and exotic insect-eating flora like Venus Flytraps,
							Sarracenia, Nepenthes, and Drosera. More than just a plant shop, we're a vibrant
							community in downtown Dartmouth, Nova Scotia, offering plant enthusiasts of all levels
							a wealth of resources, including expert plant care tips, a helpful blog, and engaging
							educational events. Discover how to grow and care for these fascinating plants with us
							today!
						</p>
						<div class="mt-10 flex items-center gap-x-6">
							<a
								href="/shop"
								class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Shop Now
							</a>
							<a href="/contact" class="text-sm font-semibold leading-6 text-gray-900"
								>Get in touch <span aria-hidden="true">→</span></a
							>
						</div>
					</section>
					<section
						id="hero"
						class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
					>
						<div
							class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
						>
							<div class="relative">
								<img
									src={imagePaths[0]}
									alt="Drosera plant"
									class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
								/>
								<div
									class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
								></div>
							</div>
						</div>
						<div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
							<div class="relative">
								<img
									src={imagePaths[1]}
									alt="Rotundifolia plant"
									class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
								/>
								<div
									class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
								></div>
							</div>
							<div class="relative">
								<img
									src={imagePaths[2]}
									alt="Nepenthes plant"
									class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
								/>
								<div
									class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
								></div>
							</div>
						</div>
						<div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
							<div class="relative">
								<img
									src={imagePaths[3]}
									alt="Pinguicula plant"
									class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
								/>
								<div
									class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
								></div>
							</div>
							<div class="relative">
								<img
									src={imagePaths[4]}
									alt="Nepenthes plant"
									class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
								/>
								<div
									class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
								></div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</main>
