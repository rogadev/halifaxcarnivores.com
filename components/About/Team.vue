<script setup lang="ts">
const team = ref([
  {
    name: 'Ryan Roga',
    role: 'Main Man',
    imageUrl: null
  },
  {
    name: 'Emma Warren',
    role: 'Support & Logistics',
    imageUrl: null
  },
  {
    name: 'Sarah Warren',
    role: 'Market Helper',
    imageUrl: null
  },
]);
</script>

<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Meet Our Team</h2>
      <p class="mt-6 text-lg/8 text-gray-600">
        We're passionate about bringing unique carnivorous plants to Halifax and Dartmouth. From careful cultivation to
        sharing these fascinating plants at local farmers markets, our small team is dedicated to helping you discover
        the amazing world of carnivorous plants.
      </p>
    </div>
    <ul role="list"
      class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none">
      <li v-for="person in team" :key="person.name">
        <div v-if="person.imageUrl" class="mx-auto size-24">
          <NuxtImg :src="person.imageUrl" :alt="`Photo of ${person.name}`" width="96" height="96"
            class="rounded-full object-cover" loading="lazy" />
        </div>
        <div v-else class="mx-auto size-24 rounded-full bg-gray-200 flex items-center justify-center">
          <Icon name="mdi:account" class="h-12 w-12 text-gray-400" aria-label="Profile placeholder" />
        </div>
        <h3 class="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">{{ person.name }}</h3>
        <p class="text-sm/6 text-gray-600">{{ person.role }}</p>
      </li>
    </ul>
  </div>
</template>
