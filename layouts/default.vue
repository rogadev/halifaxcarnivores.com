<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const user = useSupabaseUser();
const route = useRoute();
const router = useRouter();

type NavLinks = {
  name: string;
  href: string;
}[];

const baseNavigationLinks: NavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/auth/login' },
  { name: 'Register', href: '/auth/register' }
];

const userNavigationLinks: NavLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Plants', href: '/plants' },
];

const userNavigation: NavLinks = [
  { name: 'Profile', href: '/auth/profile' },
  { name: 'Settings', href: '/auth/settings' },
  { name: 'Sign out', href: '/auth/logout' }
];

// Reactive references
const currentUrl = ref(route.path);

// Computed properties
const nav = computed(() => user.value ? userNavigationLinks : baseNavigationLinks);

// Watchers
watch(route, (newRoute) => {
  currentUrl.value = newRoute.path;
});

watch(user, () => {
  if (user.value) {
    // Set default avatar if none exists
    user.value.imageUrl = user.value.user_metadata?.avatar_url ?? '/images/default-avatar.webp';
  }
});

// Methods
const navigateAndCloseMenu = (href: string) => {
  router.push(href);
};

const getIconForRoute = (name: string) => {
  const iconMap: Record<string, string> = {
    Home: 'mdi:home',
    Login: 'mdi:login',
    Register: 'mdi:account-plus',
    Dashboard: 'mdi:view-dashboard',
    Plants: 'mdi:flower',
    Profile: 'mdi:account',
    Settings: 'mdi:cog',
    'Sign out': 'mdi:logout'
  };
  return iconMap[name] || 'mdi:circle';
};
</script>

<template>
  <div class="min-h-full bg-gray-100 flex flex-col">
    <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/dashboard" class="flex-shrink-0 flex items-center gap-2">
              <Icon name="mdi:plant" class="h-8 w-8 text-emerald-600 transition-transform hover:scale-110"
                aria-label="Plants App" />
              <span class="hidden md:block font-semibold text-gray-900">PlantApp</span>
            </NuxtLink>

            <!-- Navigation Links -->
            <div class="ml-10 flex items-baseline space-x-1 sm:space-x-2">
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
          </div>

          <!-- User Menu -->
          <Menu v-if="user" as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                <span class="sr-only">Open user menu</span>
                <Icon name="mdi:account-circle" class="h-9 w-9 text-gray-700 hover:text-emerald-600 transition-colors"
                  aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                <button @click="navigateAndCloseMenu(item.href)"
                  class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors"
                  :class="[active ? 'bg-gray-50' : '']">
                  <Icon :name="getIconForRoute(item.name)" class="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
                  {{ item.name }}
                </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
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
