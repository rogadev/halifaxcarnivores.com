<script setup lang=ts>
import type { Plant } from '@prisma/client';
const { data: plants, pending, error } = await useFetch<Plant[]>('/api/plants');
</script>

<template>
  <pre>
    {{ plants.length }}
  </pre>
</template>
