<script setup>
const values = [
  {
    name: "Sustainable Growing",
    description: "We're committed to ethically growing our carnivorous plants using sustainable practices that respect both our plants and the environment."
  },
  {
    name: "Expert Care",
    description: "Each plant is carefully nurtured by experienced growers who understand the unique needs of carnivorous species, ensuring you receive healthy, thriving specimens."
  },
  {
    name: "Community Education",
    description: "We believe in sharing our knowledge and passion, helping both beginners and experienced collectors learn more about these fascinating plants."
  },
  {
    name: "Local Focus",
    description: "As a Dartmouth-based business, we're proud to serve our local Halifax community through farmers markets, creating connections with plant enthusiasts."
  },
  {
    name: "Quality Assurance",
    description: "Every plant we sell meets our high standards for health and vitality, backed by our commitment to customer satisfaction."
  },
  {
    name: "Conservation Mindset",
    description: "We promote responsible cultivation of carnivorous plants, helping preserve these unique species while reducing pressure on wild populations."
  }
];
</script>

<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Our values</h2>
      <p class="mt-6 text-lg/8 text-gray-600">At Halifax Carnivores, our values guide everything we do. From sustainable
        growing practices to community engagement, we're dedicated to sharing our passion for carnivorous plants while
        ensuring their preservation for future generations.</p>
    </div>
    <dl
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <div v-for="value in values" :key="value.name">
        <dt class="font-semibold text-gray-900">{{ value.name }}</dt>
        <dd class="mt-1 text-gray-600">{{ value.description }}</dd>
      </div>
    </dl>
  </div>
</template>
