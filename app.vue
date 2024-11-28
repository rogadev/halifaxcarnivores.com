<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue';

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }
  ]
});
</script>

<template>
  <Toaster />
  <div class="h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
