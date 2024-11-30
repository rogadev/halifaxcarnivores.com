<script setup>
useHead({
  title: 'About Halifax Carnivores | Carnivorous Plants in Nova Scotia',
  meta: [
    {
      name: 'description',
      content: 'Halifax Carnivores specializes in growing and selling carnivorous plants in Nova Scotia. Find Venus Flytraps, Pitcher Plants, Sundews, and more at local farmers markets in Halifax and Dartmouth.',
    },
    {
      name: 'keywords',
      content: 'carnivorous plants, Venus Flytraps, Pitcher Plants, Sundews, Halifax plants, Dartmouth plants, Nova Scotia plants, exotic plants, local plant nursery',
    },
    // Open Graph tags for social sharing
    {
      property: 'og:title',
      content: 'About Halifax Carnivores | Carnivorous Plants in Nova Scotia',
    },
    {
      property: 'og:description',
      content: 'Discover our collection of carefully cultivated carnivorous plants. Find us at Halifax and Dartmouth Farmers Markets or schedule a local pickup.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:locale',
      content: 'en_CA',
    },
    // Location-specific meta tags
    {
      name: 'geo.region',
      content: 'CA-NS',
    },
    {
      name: 'geo.placename',
      content: 'Dartmouth, Nova Scotia',
    },
  ],
});
</script>

<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10">
        <svg
          class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true">
          <defs>
            <pattern id="plant-hero-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              stroke-width="0" />
          </svg>
          <rect width="100%" height="100%" stroke-width="0" fill="url(#plant-hero-pattern)" />
        </svg>

        <div class="overflow-hidden">
          <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
            <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 class="text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Discover Our
                  Plant Collection</h1>
                <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                  Browse our carefully curated selection of plants, perfect for bringing life and beauty to any space.
                </p>
              </div>

              <!-- Hero Images Component -->
              <AboutHeroImages />
            </div>
          </div>
        </div>
      </div>

      <!-- Replace the Featured Plants Grid with the new component -->
      <AboutFeaturedPlantsGrid />
    </main>
  </div>
</template>
