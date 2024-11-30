<script setup lang="ts">
import type { Plant, Image } from '@prisma/client';
const { data, pending, error } = await useFetch<Plant[]>('/api/plants');
const plants = computed(() => data.value ?? []);

const getFeaturedImageUrl = (images: Image[]) => images.find((image) => image.isFeaturedImage)?.url;

const formatPrice = (price: number | null) => {
  // if number is 0 or null, return 'TBD'
  if (price === 0 || price === null) return 'TBD';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

const calculateDiscount = (price: number, previousPrice: number) => {
  return Math.round(((previousPrice - price) / previousPrice) * 100);
};
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Plants</h2>

      <div v-if="pending">
        <Button disabled variant="ghost">
          <Icon name="mdi:loading" class="h-5 w-5 animate-spin" />
          Loading plants...
        </Button>
      </div>

      <div v-else-if="error">
        <Button variant="destructive">
          <Icon name="mdi:alert-circle" class="mr-2 h-5 w-5" />
          Error loading plants
        </Button>
      </div>

      <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <NuxtLink v-for="plant in plants" :key="plant.id" :to="`/plants/${plant.id}`" class="group">
          <NuxtImg :src="getFeaturedImageUrl(plant.images) || '/placeholder-plant.jpg'" :alt="plant.name"
            class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
            width="400" height="400" loading="lazy" />
          <h3 class="mt-4 text-sm text-gray-700">{{ plant.displayName }}</h3>
          <div class="mt-1 flex items-center gap-2">
            <p class="text-lg font-medium" :class="plant.previousPrice ? 'text-emerald-600' : 'text-gray-900'">
              {{ formatPrice(plant.price) }}
            </p>
            <template v-if="plant.previousPrice">
              <p class="text-sm text-gray-500 line-through">
                {{ formatPrice(plant.previousPrice) }}
              </p>
              <span class="text-sm font-medium text-emerald-600 italic">
                {{ calculateDiscount(plant.price, plant.previousPrice) }}% off!
              </span>
            </template>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
