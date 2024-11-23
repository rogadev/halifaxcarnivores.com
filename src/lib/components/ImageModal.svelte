<script lang="ts">
	let { isOpen = false, imageUrl = '', altText = '' } = $props();

	function handleClose() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
		<button
			onclick={handleClose}
			class="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
			aria-label="Close modal"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>

		<button
			onclick={handleClose}
			class="border-0 p-0 bg-transparent"
			aria-label="View full size image and close modal"
		>
			<img
				src={imageUrl}
				alt={altText}
				class="max-h-[90vh] max-w-[90vw] object-contain cursor-pointer"
			/>
		</button>
	</div>
{/if}
