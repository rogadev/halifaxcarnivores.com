<script lang="ts">
	import OrderingSection from './OrderingSection.svelte';
	import EventsSection from './EventsSection.svelte';
	import CareSection from './CareSection.svelte';
	import HomepageHero from './HomepageHero.svelte';
	import BlogSection from './BlogSection.svelte';
	import OurShopSection from '$lib/components/OurShopSection/index.svelte';
	import Icon from '@iconify/svelte';

	// Calculate next Friday's date (not tomorrow, but the following Friday)
	const today = new Date();
	const nextFriday = new Date();
	nextFriday.setDate(today.getDate() + ((7 - today.getDay() + 5) % 7) + 7);

	// Format the date nicely
	const formattedDate = nextFriday.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});

	// Check if we should show the banner
	let isDismissed = false;

	// Initialize from localStorage when the component mounts (client-side only)
	if (typeof window !== 'undefined') {
		isDismissed = localStorage.getItem('bannerDismissed') === 'true';
	}

	let showBanner = today < nextFriday && !isDismissed;

	function dismissBanner() {
		isDismissed = true;
		showBanner = false;
		localStorage.setItem('bannerDismissed', 'true');
	}
</script>

<svelte:head>
	<title>Halifax Carnivores - Your Carnivorous Plant Haven</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-8">
	<div class="flex flex-col gap-8">
		{#if showBanner}
			<div class="bg-amber-50 border-b border-amber-200">
				<div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
					<div class="flex items-center justify-between flex-wrap">
						<div class="w-0 flex-1 flex items-center">
							<span class="flex p-2 rounded-lg bg-amber-100">
								<Icon icon="mdi:tools" class="h-5 w-5 text-amber-400" />
							</span>
							<p class="ml-2 flex-1 text-sm font-medium text-amber-800">
								Our website is currently under development! Expect frequent updates and changes
								until {formattedDate}. Some products may temporarily disappear or change as we
								improve the site. Stay tuned for our completed store!
							</p>
						</div>
						<div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
							<button
								type="button"
								on:click={dismissBanner}
								class="flex rounded-md p-2 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
								aria-label="Dismiss banner"
							>
								<Icon icon="mdi:close" class="h-6 w-6 text-amber-400" />
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<HomepageHero />
		<OurShopSection />
		<OrderingSection />
		<CareSection />
		<BlogSection />
		<EventsSection />
	</div>
</div>
