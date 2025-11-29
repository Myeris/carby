<script setup lang="ts">
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import CalculateButton from '@/modules/fuel-guide/form/components/CalculateButton.vue';
  import IntensitySelector from '@/modules/fuel-guide/form/components/IntensitySelector.vue';
  import PlaceSelector from '@/modules/fuel-guide/form/components/PlaceSelector.vue';
  import SportSelector from '@/modules/fuel-guide/form/components/SportSelector.vue';
  import SweatSelector from '@/modules/fuel-guide/form/components/SweatSelector.vue';
  import WeatherSelector from '@/modules/fuel-guide/form/components/WeatherSelector.vue';
  import WorkoutDurationInput from '@/modules/fuel-guide/form/components/WorkoutDurationInput.vue';
  import { PlaceType } from '@/modules/fuel-guide/interfaces/Place';

  const { state } = useForm()!;
</script>

<template>
  <div class="flex flex-col gap-6 px-4">
    <SportSelector />

    <PlaceSelector />

    <WeatherSelector v-if="state.place !== PlaceType.Inside" />

    <SweatSelector />

    <IntensitySelector />

    <WorkoutDurationInput />

    <CalculateButton />
  </div>
</template>
