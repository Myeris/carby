<script setup lang="ts">
  import { Skeleton } from '@/common/components/ui/skeleton';

  interface Props {
    isLoading: boolean;
  }

  const { isLoading } = defineProps<Props>();
</script>

<template>
  <Skeleton v-if="isLoading" class="w-full h-4" />
  <slot v-else />
</template>
