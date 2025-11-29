<script setup lang="ts">
  import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { intensityOptions, IntensityType } from '@/modules/fuel-guide/interfaces/Intensity';

  const { updateState } = useForm()!;

  function updateSelectedIntensity(value: IntensityType) {
    updateState('intensity', value);
  }
</script>

<template>
  <GenericSelector
    title="What will be your workout intensity?"
    :options="intensityOptions"
    @optionSelected="updateSelectedIntensity" />
</template>
