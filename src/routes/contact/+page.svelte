<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import { enhance } from '$app/forms'; // Import enhance function

	export let data: any;

	let hasError: boolean = false;
	let feedbackMessage: string = '';

	// Control the modal's visibility
	let showModal: boolean = false;

	// Variables for business hours
	let showBusinessHours: boolean = false;
	let currentTime: string = '';

	function isBusinessHours(): boolean {
		const now = new Date();
		const halifaxTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Halifax' }));
		const day = halifaxTime.getDay();
		const hour = halifaxTime.getHours();

		// Check if it's Monday to Friday (1-5) and between 10 AM and 6 PM
		return day >= 1 && day <= 5 && hour >= 10 && hour < 18;
	}

	function formatTime(date: Date): string {
		return date.toLocaleString('en-US', {
			timeZone: 'America/Halifax',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});
	}

	// Handle form submission result
	$: if (data?.success) {
		hasError = false;
		showModal = true;
		feedbackMessage = '';
		alert('Your form has been submitted.');
	}

	$: if (data?.error) {
		hasError = true;
		feedbackMessage = data.errorMessage ?? data.error;
		console.error(data);
		alert('Something went wrong submitting your form./n' + data.error);
	}

	// Function to handle modal close
	function handleCloseModal() {
		showModal = false;
	}

	onMount(() => {
		const updateTime = () => {
			const now = new Date();
			currentTime = formatTime(now);
			showBusinessHours = !isBusinessHours();
		};

		updateTime();
		const interval = setInterval(updateTime, 60000); // Update every minute

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Contact Halifax Carnivores - Reach Out to Our Expert Team</title>
	<meta
		name="description"
		content="Got questions or need assistance? Reach out to the friendly team at Halifax Carnivores. We are here to assist you with any inquiries, be it about our exotic plant collection, care tips, or purchase details. Contact us via phone or email today."
	/>
	<meta
		name="keywords"
		content="Contact Halifax Carnivores, carnivorous plant store contact, plant care assistance Halifax, carnivorous plant inquiry, exotic plant support Halifax, plant purchase assistance, plant care tips contact"
	/>
</svelte:head>

<div class="relative isolate bg-white">
	<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
		<div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
			<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
				<div
					class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2"
				>
					<!-- SVG code remains unchanged -->
				</div>
				<h2 class="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
				<p class="mt-6 text-lg leading-8 text-gray-600">
					We're still working on building our online web store. In the meantime, all sales will be
					done directly over the phone or by email. Please contact us directly for orders or
					questions during regular business hours.
				</p>
				{#if showBusinessHours}
					<div class="mt-6 p-4 bg-yellow-100 rounded-md">
						<p class="text-sm font-semibold text-yellow-800">
							Our business hours are Monday to Friday, 10 AM to 6 PM.
						</p>
						<p class="text-sm text-yellow-700 mt-1">Current time: {currentTime}</p>
					</div>
					<p class="text-sm font-semibold text-slate italic -800 mt-4">
						Contact details display only during regular business hours.
					</p>
				{:else}
					<dl class="mt-10 space-y-4 text-base leading-7 text-gray-600">
						<div class="flex gap-x-4">
							<dt class="flex-none">
								<span class="sr-only">Telephone</span>
								<svg
									class="h-7 w-6 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
									/>
								</svg>
							</dt>
							<dd>
								<a class="hover:text-blue-700" href="tel:19028308881">+1 (902) 830-8881</a>
							</dd>
						</div>
						<div class="flex gap-x-4">
							<dt class="flex-none">
								<span class="sr-only">Email</span>
								<svg
									class="h-7 w-6 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
							</dt>
							<dd>
								<a class="hover:text-blue-700" href="mailto:ryan@roga.dev">ryan@roga.dev</a>
							</dd>
						</div>
					</dl>
				{/if}
			</div>
		</div>

		<form method="POST" use:enhance class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
			<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900"
							>First name</label
						>
						<div class="mt-2.5">
							<input
								type="text"
								name="first-name"
								id="first-name"
								autocomplete="given-name"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900"
							>Last name</label
						>
						<div class="mt-2.5">
							<input
								type="text"
								name="last-name"
								id="last-name"
								autocomplete="family-name"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="email" class="block text-sm font-semibold leading-6 text-gray-900"
							>Email</label
						>
						<div class="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autocomplete="email"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900"
							>Phone number</label
						>
						<div class="mt-2.5">
							<input
								type="tel"
								name="phone-number"
								id="phone-number"
								autocomplete="tel"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="message" class="block text-sm font-semibold leading-6 text-gray-900"
							>Message</label
						>
						<div class="mt-2.5">
							<textarea
								name="message"
								id="message"
								rows="4"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>
				<div class="mt-8 flex justify-end">
					<button
						type="submit"
						class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Send message</button
					>
				</div>
				{#if hasError}
					<div class="mt-6 p-4 bg-red-100 rounded-md">
						<p class="text-sm font-semibold text-red-800">Error: {feedbackMessage}</p>
					</div>
				{/if}
			</div>
		</form>
	</div>
</div>

<Modal
	title="Message Sent Successfully"
	message="Thank you for contacting us! We'll get back to you shortly."
	show={showModal}
	on:close={handleCloseModal}
/>
