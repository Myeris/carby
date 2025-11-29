<script setup lang="ts">
  import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { placeOptions, PlaceType } from '@/modules/fuel-guide/interfaces/Place';

  const { updateState } = useForm()!;

  function updateSelectedIntensity(value: PlaceType) {
    updateState('place', value);
  }
</script>

<template>
  <GenericSelector
    title="Where are you training?"
    :options="placeOptions"
    @optionSelected="updateSelectedIntensity" />
</template>
