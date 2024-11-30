<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue';
import { StarIcon } from '@heroicons/vue/20/solid';
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
import type { Plant } from '@prisma/client';

const route = useRoute();
const plantId = route.params.plantId;

const { data: plant, pending, error } = await useFetch(`/api/plants/${plantId}`);

// Format price for display
const formattedPrice = computed(() => {
  if (!plant.value?.price) return '$0';
  return `$${plant.value.price}`;
});

// Create details array based on plant care requirements
const details = computed(() => {
  if (!plant.value) return [];

  return [
    plant.value.lightRequirements && {
      name: 'Light',
      items: [`${plant.value.lightRequirements}`]
    },
    plant.value.waterRequirements && {
      name: 'Water',
      items: [`${plant.value.waterRequirements}`]
    },
    plant.value.humidityRequirements && {
      name: 'Humidity',
      items: [`${plant.value.humidityRequirements}`]
    },
    plant.value.temperatureRequirements && {
      name: 'Temperature',
      items: [`${plant.value.temperatureRequirements}`]
    },
    plant.value.soilRequirements && {
      name: 'Soil',
      items: [`${plant.value.soilRequirements}`]
    }
  ].filter(Boolean);
});

const selectedImage = ref(null);
</script>

<template>
  <div class="bg-white" v-if="plant">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="image in plant.images" :key="image.id"
                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
                v-slot="{ selected }">
                <span class="sr-only">{{ image.altText }}</span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <NuxtImg :src="image.url" :alt="image.altText" class="size-full object-cover" />
                </span>
                <span
                  :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
                  aria-hidden="true" />
              </Tab>
            </TabList>
          </div>

          <TabPanels>
            <TabPanel v-for="image in plant.images" :key="image.id">
              <NuxtImg :src="image.url" :alt="image.altText"
                class="aspect-square w-full object-cover sm:rounded-lg cursor-pointer" @click="selectedImage = image" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ plant.displayName }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-900">{{ formattedPrice }}</p>
          </div>

          <div class="mt-6" v-if="plant.description">
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6 text-base text-gray-700">{{ plant.description }}</div>
          </div>

          <form class="mt-6">
            <div class="mt-10 flex">
              <Popover>
                <PopoverTrigger as-child>
                  <Button class="flex-1">
                    <Icon name="mdi:cart-plus" class="mr-2 h-5 w-5" />
                    Add to cart
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-48">
                  <p class="text-sm text-gray-600">Coming soon!</p>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="ghost" size="icon" class="ml-4">
                    <Icon name="mdi:heart" class="h-5 w-5" />
                    <span class="sr-only">Add to favorites</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-48">
                  <p class="text-sm text-gray-600">Coming soon!</p>
                </PopoverContent>
              </Popover>
            </div>
          </form>

          <!-- Details section -->
          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="divide-y divide-gray-200 border-t">
              <Disclosure as="div" v-for="detail in details" :key="detail.name" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                    <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{ detail.name
                      }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block size-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true" />
                      <MinusIcon v-else class="block size-6 text-indigo-400 group-hover:text-indigo-500"
                        aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="pb-6">
                  <ul role="list" class="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
                    <li v-for="item in detail.items" :key="item" class="pl-2">{{ item }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <Dialog :open="!!selectedImage" @update:open="selectedImage = null">
    <DialogContent class="p-0 sm:p-2 max-w-none w-screen h-screen flex items-center justify-center" :class="{
      'sm:max-w-[90vw] sm:h-[90vh]': true,
    }">
      <NuxtImg v-if="selectedImage" :src="selectedImage.url" :alt="selectedImage.altText"
        class="w-full h-full object-contain cursor-pointer p-4 sm:p-8 rounded-lg" @click="selectedImage = null" />
    </DialogContent>
  </Dialog>
</template>
