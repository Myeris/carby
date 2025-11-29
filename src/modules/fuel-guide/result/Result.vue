<script setup lang="ts">
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import Carbs from '@/modules/fuel-guide/result/components/Carbs.vue';
  import Electrolytes from '@/modules/fuel-guide/result/components/Electrolytes.vue';
  import Hydration from '@/modules/fuel-guide/result/components/Hydration.vue';
  import NoResult from '@/modules/fuel-guide/result/components/NoResult.vue';

  const { hasNutritionNeeds } = useForm()!;
</script>

<template>
  <div class="flex flex-col px-4 items-center gap-16 justify-center">
    <template v-if="hasNutritionNeeds">
      <Carbs />
      <Hydration />
      <Electrolytes />
    </template>
    <template v-else>
      <NoResult />
    </template>
  </div>
</template>
