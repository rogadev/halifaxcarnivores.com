<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	let {
		title = 'Coming Soon!',
		description = "We're working hard to bring you this feature.",
		mainIcon = 'mdi:clock-outline',
		overlayIcon = 'mdi:tools',
		links,
		children
	} = $props<{
		title?: string;
		description?: string;
		mainIcon?: string;
		overlayIcon?: string;
		links?: Array<{ href: string; icon: string; label: string }>;
		children?: Snippet;
	}>();
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="text-center">
		<div class="relative inline-block">
			<Icon icon={mainIcon} class="h-24 w-24 text-primary mx-auto mb-2 animate-bounce" />
			{#if overlayIcon}
				<Icon
					icon={overlayIcon}
					class="h-8 w-8 text-gray-600 absolute -top-2 -right-2 animate-spin"
				/>
			{/if}
		</div>

		<h1 class="mt-4 text-3xl font-bold text-gray-900">{title}</h1>
		<p class="mt-2 text-lg text-gray-600">
			{description}
		</p>

		{#if links}
			<div class="mt-8 space-y-4">
				<p class="text-sm text-gray-500">In the meantime, feel free to browse:</p>
				<div class="flex justify-center gap-4">
					{#each links as { href, icon, label }}
						<a
							{href}
							class="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
						>
							<Icon {icon} class="mr-2" />
							{label}
						</a>
					{/each}
				</div>
			</div>
		{/if}

		{#if children}
			<div class="mt-8">
				{@render children()}
			</div>
		{/if}

		<div
			class="mt-12 inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600"
		>
			<Icon icon="mdi:clock-outline" class="mr-2" />
			Expected completion: Soon™
		</div>
	</div>
</div>
