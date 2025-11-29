<script setup lang="ts">
  import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { weatherOptions, WeatherType } from '@/modules/fuel-guide/interfaces/Weather';

  const { updateState } = useForm()!;

  function updateSelectedWeather(value: WeatherType) {
    updateState('weather', value);
  }
</script>

<template>
  <GenericSelector
    title="What is the weather like?"
    :options="weatherOptions"
    @optionSelected="updateSelectedWeather" />
</template>
