<script setup lang="ts">
  import { round } from 'lodash';
  import { Tablets } from 'lucide-vue-next';
  import { computed } from 'vue';

  import SkeletonItem from '@/common/components/skeleton-item/SkeletonItem.vue';
  import ResultItem from '@/common/layouts/result-item/ResultItem.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { mgToG } from '@/modules/fuel-guide/services/ConvertUnits.ts';

  const { state, result, isLoading } = useForm()!;

  const tabletMg = 300;
  const electrolytes = computed<number>(() => result.electrolyte ?? 0);
  const tabletIntake = computed<number>(() => round(electrolytes.value / tabletMg));
  const totalElectrolytes = computed<number>(() => electrolytes.value * durationPercentage.value);
  const totalElectrolytesBasedOnDuration = computed<{
    value: number;
    unit: 'mg' | 'g';
  }>(() => mgToG(totalElectrolytes.value));
  const duration = computed<number>(() => round(60 / tabletIntake.value));
  const durationPercentage = computed<number>(() => (state.duration ?? 0) / 60);
  const totalTabletIntake = computed<number>(() => round(totalElectrolytes.value / tabletMg));
</script>

<template>
  <ResultItem title="Electrolytes" :icon="Tablets">
    <template v-if="tabletIntake > 0">
      <SkeletonItem :isLoading="isLoading">
        <p>
          Recommended intake: <strong>{{ electrolytes }}</strong> mg/h
        </p>
      </SkeletonItem>
      <SkeletonItem :isLoading="isLoading">
        <p>
          That's <strong>{{ totalElectrolytesBasedOnDuration.value }}</strong>
          {{ totalElectrolytesBasedOnDuration.unit }} total or {{ totalTabletIntake }} tablet ({{
            tabletMg
          }}mg each) for your workout
        </p>
      </SkeletonItem>
      <SkeletonItem :isLoading="isLoading">
        <p>
          That's about <strong>{{ tabletIntake }}</strong> tablet{{
            tabletIntake > 1 ? 's' : ''
          }}
          every {{ duration }} minutes
        </p>
      </SkeletonItem>
    </template>
    <template v-else>
      <p>You don't need to take any electrolytes during your workout</p>
    </template>
  </ResultItem>
</template>
