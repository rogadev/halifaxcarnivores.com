<script setup lang="ts">
const heroImage = ref({
  src: '/images/placeholder-plant.jpg',
  alt: 'Beautiful Pinguicula esseriana sparkling with dew',
  link: '/plants'
});

const TIME_TO_RELOAD = 15 as const;
const timeRemaining = ref(TIME_TO_RELOAD);
const isLoading = ref(true);

// Add a computed property to calculate the loading bar width
const loadingBarWidth = computed(() => `${(timeRemaining.value / TIME_TO_RELOAD) * 100}%`);

// Add computed property for the link
const imageLink = computed(() => {
  if (heroImage.value.src.includes('supabase')) {
    // Extract plantId from URL using regex
    const match = heroImage.value.src.match(/\/plants\/([^\/]+)/);
    return match ? `/plants/${match[1]}` : '/plants';
  }
  return '/plants';
});

// Updated to use API endpoint
async function getRandomImage() {
  try {
    const { data } = await useFetch('/api/images/random');

    if (!data.value) {
      console.error('No image returned from API');
      return null;
    }

    return {
      src: data.value.url,
      alt: `Featured carnivorous plant: ${data.value.name}`
    };
  } catch (error) {
    console.error('Error fetching random image:', error);
    return null;
  }
}

onMounted(() => {
  // Continuous timer
  const timer = setInterval(async () => {
    timeRemaining.value--;

    if (timeRemaining.value <= 0) {
      isLoading.value = true;

      const newImage = await getRandomImage();
      if (newImage) {
        heroImage.value = newImage;
      }

      timeRemaining.value = TIME_TO_RELOAD; // Reset timer
      isLoading.value = false;
    }
  }, 1000);

  // Cleanup
  onUnmounted(() => clearInterval(timer));
});
</script>

<template>
  <div class="relative isolate overflow-hidden bg-gradient-to-b from-green-100/20">
    <div
      class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-green-600/10 ring-1 ring-green-50 sm:-mr-80 lg:-mr-96"
      aria-hidden="true" />
    <div class="mx-auto max-w-7xl px-6 py-16 md:py-38 lg:py-40 lg:px-8">
      <div
        class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
        <h1
          class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
          Discover the Fascinating World of Carnivorous Plants
        </h1>
        <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
          <p class="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Welcome to Halifax Carnivores, your local spot for ethically sourced carnivorous plants. From Venus Flytraps
            to Pitcher Plants, we nurture these remarkable species right here in Halifax. Find us at the Alderney and
            Halifax Seaport Markets, or shop our collection online for local pickup.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <Button variant="default" size="lg">
              <NuxtLink to="/plants" class="px-3.5">
                Browse Collection
              </NuxtLink>
            </Button>
            <Button variant="ghost">
              <NuxtLink to="/markets" class="text-gray-900">
                Find Us
                <Icon name="mdi:map-marker" class="ml-2 h-4 w-4" />
              </NuxtLink>
            </Button>
          </div>
        </div>
        <div
          class="relative mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
          <NuxtLink :to="imageLink" class="block">
            <NuxtImg :src="heroImage.src" :alt="heroImage.alt"
              class="aspect-[6/5] w-full rounded-2xl object-cover hover:opacity-90 transition-opacity" width="1280"
              height="1067" loading="eager" format="webp" quality="80" />
          </NuxtLink>
          <div class="relative flex justify-center px-4">
            <div id="loading-bar" :style="{ width: loadingBarWidth }"
              class="rounded-full h-[3px] mt-[1px] w-[90%] bg-green-500 loading-bar">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
  </div>
</template>

<style scoped>
.loading-bar {
  /* Only transition when the width is decreasing */
  transition: width 1s linear;
  transition-property: width;
}

/* Remove transition when width increases */
.loading-bar[style*="width: 100%"] {
  transition: none;
}
</style>
