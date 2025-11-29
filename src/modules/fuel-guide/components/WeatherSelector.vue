<script setup lang="ts">
import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue'
import { weatherOptions, WeatherType } from "@/modules/fuel-guide/interfaces/Weather";
import { useForm, useProvideForm } from "../composables/useForm";

useProvideForm();
const { updateState } = useForm()!;

function updateSelectedWeather(value: WeatherType) {
  updateState('weather', value);
}
</script>

<template>
  <GenericSelector title="What is the weather like?" :options="weatherOptions"
    @optionSelected="updateSelectedWeather" />
</template>

<style scoped></style>
