<script setup>
const count = ref(0);

const increment = () => {
  count.value++;
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Counter: {{ count }}</h1>
    <Button @click="increment" variant="default">
      <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
      Increment
    </Button>
  </div>
</template>
