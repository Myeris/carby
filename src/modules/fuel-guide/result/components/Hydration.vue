<script setup lang="ts">
  import { GlassWater } from 'lucide-vue-next';
  import { computed } from 'vue';

  import SkeletonItem from '@/common/components/skeleton-item/SkeletonItem.vue';
  import ResultItem from '@/common/layouts/result-item/ResultItem.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { mlToL } from '@/modules/fuel-guide/services/ConvertUnits.ts';

  const { state, result, isLoading } = useForm()!;

  const hydration = computed<number>(() => result.hydration ?? 0);
  const durationPercentage = computed<number>(() => (state.duration ?? 0) / 60);
  const totalHydrationBasedOnDuration = computed<{
    value: number;
    unit: 'ml' | 'L';
  }>(() => mlToL(hydration.value * durationPercentage.value));
</script>

<template>
  <ResultItem title="Hydration" :icon="GlassWater">
    <template v-if="hydration > 0">
      <SkeletonItem :isLoading="isLoading">
        <p>
          Recommended intake: <strong>{{ hydration }}</strong> ml/h
        </p>
      </SkeletonItem>
      <SkeletonItem :isLoading="isLoading">
        <p>
          That's <strong>{{ totalHydrationBasedOnDuration.value }}</strong>
          {{ totalHydrationBasedOnDuration.unit }} for your workout
        </p>
      </SkeletonItem>
      <SkeletonItem :isLoading="isLoading">
        <p>Try and take a sip every now and then to prevent dehydration</p>
      </SkeletonItem>
    </template>
    <template v-else>
      <p>
        You don't need to drink any water during your workout. But if it makes you feel better,
        bring a small bottle with you.
      </p>
    </template>
  </ResultItem>
</template>
