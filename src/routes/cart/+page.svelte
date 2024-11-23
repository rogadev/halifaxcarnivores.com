<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="text-center">
		<div class="relative inline-block">
			<Icon icon="mdi:cart-outline" class="h-24 w-24 text-primary mx-auto mb-2 animate-bounce" />
			<Icon icon="mdi:tools" class="h-8 w-8 text-gray-600 absolute -top-2 -right-2 animate-spin" />
		</div>

		<h1 class="mt-4 text-3xl font-bold text-gray-900">Cart Coming Soon!</h1>
		<p class="mt-2 text-lg text-gray-600">
			We're working hard to bring you a seamless shopping experience.
		</p>

		<div class="mt-8 space-y-4">
			<p class="text-sm text-gray-500">In the meantime, feel free to browse our collections:</p>
			<div class="flex justify-center gap-4">
				<a
					href="/plants"
					class="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
				>
					<Icon icon="mdi:plant" class="mr-2" />
					Plants
				</a>
				<a
					href="/soil"
					class="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
				>
					<Icon icon="mdi:plant-outline" class="mr-2" />
					Soil
				</a>
				<a
					href="/terrariums"
					class="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
				>
					<Icon icon="lucide:box" class="mr-2" />
					Terrariums
				</a>
			</div>
		</div>

		<div
			class="mt-12 inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600"
		>
			<Icon icon="mdi:clock-outline" class="mr-2" />
			Expected completion: Soon™
		</div>
	</div>
</div>
