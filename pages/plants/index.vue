<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Plants</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <NuxtLink v-for="plant in plants" :key="plant.id" :to="`/plants/${plant.id}`" class="group">
          <NuxtImg :src="plant.imageUrl || '/images/placeholder-plant.jpg'" :alt="plant.name"
            class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
            width="400" height="400" loading="lazy" sizes="sm:100vw md:50vw lg:33vw xl:25vw" />
          <h3 class="mt-4 text-sm text-gray-700">{{ plant.name }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ formatPrice(plant.price) }}
          </p>
        </NuxtLink>

        <!-- Error state -->
        <div v-if="error" class="col-span-full text-center">
          <Button variant="destructive">
            <Icon name="mdi:alert-circle" class="mr-2 h-5 w-5" />
            Error Loading Plants
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: plants, error } = await useFetch('/api/plants');

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};
</script>
