<script setup>
// Fetch 5 random images
const { data: featuredImages } = await useFetch('/api/images/random?count=5');

// Helper function to extract plant ID from Supabase URL
const getPlantIdFromUrl = (url) => {
  if (!url) return null;
  const matches = url.match(/\/plants\/(\d+)\//);
  return matches ? matches[1] : null;
};

// Create computed properties for images and their corresponding plant IDs
const imageData = computed(() => (featuredImages.value || []).map(img => ({
  url: img.url,
  plantId: getPlantIdFromUrl(img.url)
})));
</script>

<template>
  <div class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
    <!-- First Column -->
    <div class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-96 lg:pt-32 xl:pt-80">
      <div class="relative">
        <NuxtLink v-if="imageData[0]?.plantId" :to="`/plants/${imageData[0].plantId}`" class="block">
          <NuxtImg :src="imageData[0]?.url || '/images/placeholder-plant.jpg'" alt="Featured plant"
            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" width="400" height="600"
            loading="eager" />
          <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </NuxtLink>
      </div>
    </div>

    <!-- Second Column -->
    <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-72 lg:pt-32">
      <div v-for="index in [1, 2]" :key="index" class="relative">
        <NuxtLink v-if="imageData[index]?.plantId" :to="`/plants/${imageData[index].plantId}`" class="block">
          <NuxtImg :src="imageData[index]?.url || '/images/placeholder-plant.jpg'" alt="Featured plant"
            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" width="400" height="600"
            loading="eager" />
          <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </NuxtLink>
      </div>
    </div>

    <!-- Third Column -->
    <div class="w-44 flex-none space-y-8 pt-32">
      <div v-for="index in [3, 4]" :key="index" class="relative">
        <NuxtLink v-if="imageData[index]?.plantId" :to="`/plants/${imageData[index].plantId}`" class="block">
          <NuxtImg :src="imageData[index]?.url || '/images/placeholder-plant.jpg'" alt="Featured plant"
            class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" width="400" height="600"
            loading="eager" />
          <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
