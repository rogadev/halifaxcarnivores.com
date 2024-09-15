<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let title: string = 'Success';
	export let message: string = '';
	export let show: boolean = false;

	const dispatch = createEventDispatcher();

	let modalElement: HTMLElement;

	function closeModal() {
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	onMount(() => {
		if (show) {
			modalElement.focus();
			document.addEventListener('keydown', handleKeydown);
		}

		// Return a cleanup function to remove the event listener
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if show}
	<div
		class="fixed inset-0 z-10 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		bind:this={modalElement}
	>
		<div class="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<div
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				aria-hidden="true"
				on:click={closeModal}
			/>

			<div
				class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
				role="document"
			>
				<div>
					<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<svg
							class="h-6 w-6 text-green-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-5">
						<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
							{title}
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500">{message}</p>
						</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-6">
					<button
						type="button"
						class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
						on:click={closeModal}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
