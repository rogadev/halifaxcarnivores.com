<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	const icons = {
		success: 'mdi:check-circle',
		error: 'mdi:alert-circle',
		info: 'mdi:information'
	};

	const colors = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		info: 'bg-blue-500'
	};
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
	{#each $toast as { type, message, id } (id)}
		<div
			transition:fly={{ x: 100, duration: 300 }}
			class="flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-lg {colors[type]}"
			role="alert"
		>
			<Icon icon={icons[type]} width="20" height="20" />
			<span>{message}</span>
			<button class="ml-2 hover:opacity-80" onclick={() => toast.dismiss(id)} aria-label="Dismiss">
				<Icon icon="mdi:close" width="16" height="16" />
			</button>
		</div>
	{/each}
</div>
