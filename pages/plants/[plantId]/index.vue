<script setup lang="ts">
const route = useRoute();
const plantId = route.params.plantId;

const { data: plant, pending, error } = await useFetch(`/api/plants/${plantId}`);
</script>

<template>
  <div>
    <Skeleton v-if="pending" class="w-full h-[300px]" />
    <pre v-else>
      {{ plant }}
    </pre>
  </div>
</template>
