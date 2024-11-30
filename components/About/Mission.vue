<script setup lang="ts">
// Define types for the API responses
interface PlantCountResponse {
  count: number;
}

// Use typed useFetch calls
const { data: plantCount } = await useFetch<PlantCountResponse>('/api/plants/plant-count');
const { data: stockCount } = await useFetch<PlantCountResponse>('/api/plants/stock-count');

// Move this calculation to a computed property for better reactivity
const yearsExperience = computed(() => {
  const startDate = new Date(2014, 3, 1);
  const currentDate = new Date();
  return Math.floor((currentDate.getTime() - startDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
});

// Define interface for stats items
interface StatItem {
  label: string;
  value: string;
}

// Use computed for stats to ensure reactive updates
const stats = computed<StatItem[]>(() => [
  {
    label: 'Species Available',
    value: formatToLocaleNumber(plantCount.value?.count, 25)
  },
  {
    label: 'Years of Experience',
    value: `${yearsExperience.value}+`
  },
  {
    label: 'Plants on Shelves',
    value: formatToLocaleNumber(stockCount.value?.count)
  },
  {
    label: 'Weekly Markets',
    value: '2+'
  },
]);
</script>

<template>
  <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
      <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Our mission</h2>
      <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
        <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
          <p class="text-xl/8 text-gray-600">At Halifax Carnivores, we're dedicated to sharing the fascinating world of
            carnivorous plants with our local community. Our mission is to ethically grow and provide exceptional
            carnivorous plants while educating and inspiring plant enthusiasts throughout Nova Scotia.</p>
          <p class="mt-10 max-w-xl text-base/7 text-gray-700">Based in Dartmouth, we carefully cultivate each plant
            in our collection, from Venus flytraps to pitcher plants, ensuring they thrive in their new homes. Through
            our presence at local farmers markets and educational initiatives, we're building a community of plant
            lovers
            and helping preserve these remarkable species for future generations.</p>
        </div>
        <div class="lg:flex lg:flex-auto lg:justify-center">
          <dl class="w-64 space-y-8 xl:w-80">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse gap-y-4">
              <dt class="text-base/7 text-gray-600">{{ stat.label }}</dt>
              <dd class="text-5xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
