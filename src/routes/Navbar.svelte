<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import Icon from '@iconify/svelte';
	import Link from './NavbarLink.svelte';
	import ProfileLink from './NavbarProfileLink.svelte';
	import MobileDropdownMenu from './MobileDropdownMenu.svelte';

	const user = false;
	let path: string;
	page.subscribe((value) => (path = value.url.pathname));
	const links = [
		{
			name: 'Halifax Carnivores',
			href: '/'
		},
		{
			name: 'About',
			href: '/about-us'
		},
		{
			name: 'Shop',
			href: '/shop'
		},
		{
			name: 'Care',
			href: '/plant-care-guides'
		},
		{
			name: 'Blog',
			href: '/blog'
		},
		{
			name: 'Contact',
			href: '/contact'
		},
		{
			name: 'FAQ',
			href: '/faq'
		},
		{
			name: 'Events',
			href: '/events'
		}
	];
	const profileLinks = [
		{
			name: 'Your Profile',
			href: '/profile'
		},
		{
			name: 'Settings',
			href: '/settings'
		},
		{
			name: 'Sign out',
			href: '/logout'
		}
	];

	let showMobileMenu = false;
	let showProfileMenu = false;
	let previousPath: string;

	$: {
		if (path !== previousPath) {
			showMobileMenu = false;
			showProfileMenu = false;
		}
	}

	onMount(() => {
		previousPath = path;
	});
</script>

<nav class="bg-gray-800 sticky top-0 z-50">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => (showMobileMenu = !showMobileMenu)}
				>
					<span class="absolute -inset-0.5" />
					<span class="sr-only">Open main menu</span>
					{#if !showMobileMenu}
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					{:else}
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<a href="/" class="flex flex-shrink-0 items-center">
					<img class="h-8 w-auto rounded" src="/logo/large.webp" alt="Halifax Carnivores" />
				</a>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						{#each links as { name, href }}
							<Link {name} {href} {path} />
						{/each}
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- <a href="/contact" class="hidden md:block text-white font-bold text-lg">902-830-8881</a>
				<a
					href="tel:19028308881"
					type="button"
					class="md:hidden inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					<Icon icon="mdi:phone" class="-ml-0.5 h-5 w-5" />
					Call Now
				</a> -->

				{#if user}
					<button
						type="button"
						class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					>
						<span class="absolute -inset-1.5" />
						<span class="sr-only">View cart</span>
						<Icon icon="mdi:cart" class="h-6 w-6" />
					</button>

					<!-- Profile dropdown -->
					<div class="relative ml-3">
						<div>
							<button
								type="button"
								class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								id="user-menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								on:click={() => (showProfileMenu = !showProfileMenu)}
							>
								<span class="absolute -inset-1.5" />
								<span class="sr-only">Open user menu</span>
								<img
									class="h-8 w-8 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</button>
						</div>
						{#if showProfileMenu}
							<div
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu-button"
								tabindex="-1"
							>
								{#each profileLinks as { name, href }}
									<ProfileLink {name} {href} {path} />
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if showMobileMenu}
		<MobileDropdownMenu {links} {path} />
	{/if}
</nav>
