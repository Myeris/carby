<script setup lang="ts">
  interface Props {
    title: string;
  }

  const { title } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <h3 class="text-lg font-medium">{{ title }}</h3>

    <slot />
  </div>
</template>
