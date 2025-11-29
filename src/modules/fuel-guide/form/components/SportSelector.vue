<script setup lang="ts">
  import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { sportOptions, SportType } from '@/modules/fuel-guide/interfaces/Sport';

  const { updateState } = useForm()!;

  function updateSelectedSport(value: SportType) {
    updateState('sport', value);
  }
</script>

<template>
  <GenericSelector
    title="Which sport are you doing?"
    :options="sportOptions"
    @optionSelected="updateSelectedSport" />
</template>
