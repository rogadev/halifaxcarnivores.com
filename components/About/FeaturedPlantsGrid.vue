<script setup>
const { data: plants, pending, error } = await useFetch('/api/plants/featured');

// Computed property to determine if we should show the grid
const hasValidPlantCount = computed(() => {
  return plants.value?.length === 3 || plants.value?.length === 6;
});
</script>

<template>
  <div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Featured Plants</h2>
      <p class="mt-6 text-lg/8 text-gray-600">Find the perfect plant for your space.</p>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="mt-10 flex justify-center">
      <Icon name="mdi:loading" class="h-8 w-8 animate-spin" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="mt-10 flex justify-center">
      <Button variant="destructive">
        <Icon name="mdi:alert-circle" class="mr-2 h-5 w-5" />
        Failed to load plants
      </Button>
    </div>

    <!-- No plants message -->
    <div v-else-if="!hasValidPlantCount" class="mt-10 text-center">
      <Icon name="mdi:plant-off" class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-lg font-semibold text-gray-900">No Featured Plants</h3>
      <p class="mt-2 text-gray-600">Check back tomorrow to discover our latest featured plants!</p>
    </div>

    <!-- Plants grid -->
    <div v-else
      class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <article v-for="plant in plants" :key="plant.id" class="flex flex-col items-start">
        <div class="relative w-full">
          <NuxtImg :src="plant.imageUrl || '/images/placeholder-plant.jpg'" :alt="plant.name"
            class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]" width="800" height="600"
            loading="lazy" />
        </div>
        <div class="max-w-xl">
          <div class="mt-8 flex items-center gap-x-4 text-xs">
            <h3 class="text-lg font-semibold leading-6 text-gray-900">
              {{ plant.name }}
            </h3>
          </div>
          <p class="mt-5 text-sm leading-6 text-gray-600">{{ plant.description }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
