<script setup lang="ts">
  import { Button } from '@/common/components/ui/button';
  import { Spinner } from '@/common/components/ui/spinner';
  import { useForm } from '@/modules/fuel-guide/composables/useForm.ts';

  const { isLoading, canCalculate, calculate } = useForm()!;
</script>

<template>
  <div class="mt-4 flex justify-center">
    <Button data-cy="calculate" :disabled="isLoading || !canCalculate" @click="calculate">
      <Spinner v-if="isLoading" />
      {{ isLoading ? 'Calculating...' : 'Calculate' }}
    </Button>
  </div>
</template>
