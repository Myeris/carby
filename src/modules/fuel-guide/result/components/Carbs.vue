<script setup lang="ts">
  import { round } from 'lodash';
  import { Banana } from 'lucide-vue-next';
  import { computed } from 'vue';

  import SkeletonItem from '@/common/components/skeleton-item/SkeletonItem.vue';
  import ResultItem from '@/common/layouts/result-item/ResultItem.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';

  const { result, isLoading } = useForm()!;

  const gelCarbs = 30;
  const carb = computed<number>(() => result.carb ?? 0);
  const gelIntake = computed<number>(() => round(carb.value / gelCarbs));
  const duration = computed<number>(() => round(60 / gelIntake.value));
</script>

<template>
  <ResultItem title="Carbs" :icon="Banana">
    <template v-if="gelIntake > 0">
      <SkeletonItem :isLoading="isLoading">
        <p>
          Recommended intake: <strong>{{ carb }}</strong> g/h
        </p>
      </SkeletonItem>

      <SkeletonItem :isLoading="isLoading">
        <p>
          That's about <strong>{{ gelIntake }}</strong> gel{{ gelIntake > 1 ? 's' : '' }} ({{
            gelCarbs
          }}g each) every {{ duration }} minutes
        </p>
      </SkeletonItem>
    </template>
    <template v-else>
      <p>You don't need to take any carbs during your workout</p>
    </template>
  </ResultItem>
</template>
