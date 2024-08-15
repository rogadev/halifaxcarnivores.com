<script lang="ts">
	export let title: string = 'Coming Soon...';
</script>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<h1 class="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-4">{title}</h1>

	<div class="relative overflow-hidden rounded-lg">
		<div class="absolute inset-0">
			<img
				src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
				alt=""
				class="h-full w-full object-cover object-center"
			/>
		</div>
		<div class="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
			<div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
				<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
					<span class="block sm:inline">This page is</span>
					<span class="block sm:inline">under construction</span>
				</h2>
				<p class="mt-3 text-xl text-white">
					We're working hard to bring you something amazing. Stay tuned!
				</p>
				<a
					href="/"
					class="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
					>Back to Homepage</a
				>
			</div>
		</div>
	</div>
</div>
