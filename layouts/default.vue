<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const route = useRoute();
const router = useRouter();

type NavLinks = {
  name: string;
  href: string;
}[];

const nav: NavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about-us' },
  { name: 'Plants', href: '/plants' },
];

// Reactive references
const currentUrl = ref(route.path);

// Watchers
watch(route, (newRoute) => {
  currentUrl.value = newRoute.path;
});

// Methods
const navigateAndCloseMenu = (href: string) => {
  router.push(href);
  closeMenu();
};

const getIconForRoute = (name: string) => {
  const iconMap: Record<string, string> = {
    Home: 'mdi:home',
    About: 'mdi:information',
    Plants: 'mdi:flower',
    Cart: 'mdi:cart'
  };
  return iconMap[name] || 'mdi:circle';
};

useHead({
  title: 'Halifax Carnivores | Carnivorous Plants in Halifax & Dartmouth',
  titleTemplate: '%s | Halifax Carnivores',
  meta: [
    { name: 'description', content: 'Halifax Carnivores specializes in carnivorous plants including Venus Flytraps (Dionaea muscipula), Pitcher Plants (Nepenthes), Sundews (Drosera), and Butterworts (Pinguicula). Visit us at Alderney and Halifax Seaport Farmers Markets.' },
    { name: 'keywords', content: 'carnivorous plants, Venus Flytrap, Dionaea muscipula, Pitcher Plant, Nepenthes, Sundew, Drosera, Butterwort, Pinguicula, Halifax, Dartmouth, Nova Scotia, farmers market' },
    // Open Graph
    { property: 'og:title', content: 'Halifax Carnivores | Carnivorous Plants in Halifax & Dartmouth' },
    { property: 'og:description', content: 'Specialized carnivorous plant nursery serving Halifax and Dartmouth. Find us at local farmers markets for unique plants like Venus Flytraps, Pitcher Plants, Sundews, and Butterworts.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_CA' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Halifax Carnivores | Carnivorous Plants in Halifax & Dartmouth' },
    { name: 'twitter:description', content: 'Specialized carnivorous plant nursery serving Halifax and Dartmouth. Find us at local farmers markets for unique plants like Venus Flytraps, Pitcher Plants, Sundews, and Butterworts.' },
    // Location
    { name: 'geo.region', content: 'CA-NS' },
    { name: 'geo.placename', content: 'Dartmouth, Nova Scotia' },
  ],
  link: [
    { rel: 'canonical', href: 'https://halifaxcarnivores.com' },
  ],
});
</script>

<template>
  <div class="min-h-full bg-gray-100 flex flex-col">
    <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo Section -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center gap-2">
              <Icon name="mdi:plant" class="h-8 w-8 text-emerald-600 transition-transform hover:scale-110"
                aria-label="Plants App" />
              <span class="hidden md:block font-semibold text-gray-900">Halifax Carnivores</span>
            </NuxtLink>
          </div>

          <!-- Navigation Links - Centered -->
          <div class="flex items-baseline space-x-1 sm:space-x-2 mx-4">
            <NuxtLink v-for="item in nav" :key="item.name" :to="item.href" :class="[
              currentUrl === item.href
                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
              'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150'
            ]" :aria-current="currentUrl === item.href ? 'page' : undefined">
              <Icon :name="getIconForRoute(item.name)" class="h-5 w-5 md:mr-2 transition-colors"
                :class="currentUrl === item.href ? 'text-emerald-600' : 'text-gray-500'" :aria-label="item.name" />
              <span class="hidden md:inline">{{ item.name }}</span>
            </NuxtLink>
          </div>

          <!-- Cart Button - Right aligned -->
          <div class="flex-shrink-0">
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost" size="icon" class="relative">
                  <Icon name="mdi:cart" class="h-6 w-6" />
                  <span
                    class="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-64">
                <div class="flex items-center gap-2 text-sm">
                  <Icon name="mdi:clock-outline" class="h-4 w-4 text-gray-500" />
                  <p>Shopping cart feature coming soon!</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow min-h-[calc(100vh-4rem)]">
      <slot />
    </main>

    <footer class="bg-gray-800 text-gray-300">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p class="text-center text-sm">© {{ new Date().getFullYear() }} Ryan Roga. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
