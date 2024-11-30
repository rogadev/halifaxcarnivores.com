<script setup lang="ts">
useHead({
  title: 'About Halifax Carnivores - Local Carnivorous Plant Nursery',
  meta: [
    { name: 'description', content: 'Halifax Carnivores is a local nursery specializing in ethically sourced and locally propagated carnivorous plants. Find us at Alderney and Halifax Seaport Farmers Markets or arrange pickup in downtown Dartmouth.' },
    { name: 'keywords', content: 'carnivorous plants Halifax, carnivorous plants Dartmouth, local plant nursery, Venus Flytraps Nova Scotia, Pitcher Plants Halifax, ethical plant sourcing, Canadian grown plants, farmers market plants' },
    // Open Graph
    { property: 'og:title', content: 'About Halifax Carnivores - Local Carnivorous Plant Nursery' },
    { property: 'og:description', content: 'Your local source for ethically sourced carnivorous plants in Halifax & Dartmouth. Visit us at weekend farmers markets or arrange local pickup.' },
    { property: 'og:type', content: 'article' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'About Halifax Carnivores - Local Carnivorous Plant Nursery' },
    { name: 'twitter:description', content: 'Your local source for ethically sourced carnivorous plants in Halifax & Dartmouth. Visit us at weekend farmers markets or arrange local pickup.' },
  ]
});
</script>

<template>
  <div class="bg-white px-8">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white opacity-80" />
        <div class="absolute right-0 top-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div class="aspect-[1200/900] w-[72.1875rem] bg-gradient-to-br from-emerald-100 to-emerald-50 opacity-20" />
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-6 pb-32 pt-24 sm:pb-40 sm:pt-32 lg:flex lg:px-8 lg:py-48">
        <div class="mx-auto max-w-2xl flex-1 lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 class="animate-fade-in mt-10 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Your Local Carnivorous Plant Specialists
          </h1>
          <p class="mt-8 text-xl leading-8 text-gray-600 sm:text-2xl">
            Based in Dartmouth, Halifax Carnivores is dedicated to bringing the fascinating world of carnivorous plants
            to Nova Scotia.
          </p>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            We specialize in ethically sourced and locally propagated plants, ensuring the highest
            quality and sustainability.
          </p>
        </div>
        <div class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-1">
          <NuxtImg src="/images/hero-plant.jpg" alt="Venus Flytrap closeup" width="600" height="500"
            class="rounded-3xl shadow-2xl ring-1 ring-gray-900/10 transition-transform hover:scale-[1.02]"
            loading="eager" />
        </div>
      </div>
    </div>

    <!-- Market Locations -->
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
          Find Us at Local Markets
        </h2>
        <p class="mt-4 text-xl text-gray-600 sm:text-2xl">
          Visit us at these locations to see our unique collection of carnivorous plants
        </p>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2">
        <div
          class="group relative rounded-3xl bg-white p-10 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center gap-6">
            <div class="rounded-2xl bg-emerald-50 p-4">
              <Icon name="mdi:calendar-weekend" class="h-12 w-12 text-emerald-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Alderney Farmers Market</h3>
          </div>
          <p class="mt-6 text-xl text-gray-600">Every Saturday<br />2 Ochterloney Street, Dartmouth</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener"
            class="mt-6 inline-flex items-center text-lg font-medium text-emerald-600 hover:text-emerald-700">
            <Icon name="mdi:map-marker" class="mr-2 h-5 w-5" />
            View on map
          </a>
        </div>

        <div
          class="group relative rounded-3xl bg-white p-10 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div class="flex items-center gap-6">
            <div class="rounded-2xl bg-emerald-50 p-4">
              <Icon name="mdi:calendar-weekend" class="h-12 w-12 text-emerald-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Halifax Seaport Market</h3>
          </div>
          <p class="mt-6 text-xl text-gray-600">Every Sunday<br />1209 Marginal Road, Halifax</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener"
            class="mt-6 inline-flex items-center text-lg font-medium text-emerald-600 hover:text-emerald-700">
            <Icon name="mdi:map-marker" class="mr-2 h-5 w-5" />
            View on map
          </a>
        </div>
      </div>
    </div>

    <!-- Our Commitment -->
    <div class="relative bg-white py-24 sm:py-32 lg:py-40">
      <div
        class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-3xl lg:text-center">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
            Our Commitment to Quality
          </h2>
          <p class="mt-8 text-xl leading-8 text-gray-600 sm:text-2xl">
            We take pride in our collection of carnivorous plants, with many specimens grown and propagated in our own
            facilities. When sourcing additional plants, we work exclusively with reputable Canadian vendors to ensure
            the highest quality and ethical standards.
          </p>
        </div>

        <div class="mx-auto mt-20 max-w-2xl lg:max-w-none">
          <dl class="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div
              class="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <dt class="flex items-center gap-x-4 text-xl font-bold leading-7 text-gray-900">
                <div class="rounded-lg bg-emerald-50 p-2">
                  <Icon name="mdi:sprout" class="h-8 w-8 text-emerald-600" />
                </div>
                Local Propagation
              </dt>
              <dd class="mt-6 text-lg leading-7 text-gray-600">
                Many of our plants are grown and propagated locally in Dartmouth, ensuring they're
                well-adapted to our climate.
              </dd>
            </div>
            <div
              class="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <dt class="flex items-center gap-x-4 text-xl font-bold leading-7 text-gray-900">
                <div class="rounded-lg bg-emerald-50 p-2">
                  <Icon name="mdi:leaf" class="h-8 w-8 text-emerald-600" />
                </div>
                Ethical Sourcing
              </dt>
              <dd class="mt-6 text-lg leading-7 text-gray-600">
                We partner exclusively with reputable Canadian vendors who share our commitment to
                sustainable practices.
              </dd>
            </div>
            <div
              class="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <dt class="flex items-center gap-x-4 text-xl font-bold leading-7 text-gray-900">
                <div class="rounded-lg bg-emerald-50 p-2">
                  <Icon name="mdi:hand-heart" class="h-8 w-8 text-emerald-600" />
                </div>
                Expert Care
              </dt>
              <dd class="mt-6 text-lg leading-7 text-gray-600">
                Each plant receives individual attention and care, ensuring they reach you in
                perfect condition.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="relative bg-emerald-50">
      <div class="absolute right-0 top-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div class="aspect-[700/600] w-[42.1875rem] bg-gradient-to-br from-emerald-200 to-emerald-50 opacity-20" />
      </div>

      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
            Local Pickup Available
          </h2>
          <p class="mt-8 text-xl leading-8 text-gray-600 sm:text-2xl">
            Can't make it to the markets? We offer convenient pickup options in downtown Dartmouth. Contact us to
            arrange a pickup time that works for you.
          </p>
          <div class="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button variant="default" size="xl" class="group text-lg">
              <Icon name="mdi:email" class="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              Contact Us
            </Button>
            <Button variant="outline" size="xl" class="text-lg">
              <Icon name="mdi:phone" class="mr-3 h-6 w-6" />
              Call Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
