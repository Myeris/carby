<script setup lang="ts">
import { intensityOptions, IntensityType } from "@/modules/fuel-guide/interfaces/Intensity";
import { useForm, useProvideForm } from "../composables/useForm";
import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue'

useProvideForm();
const { updateState } = useForm()!;

function updateSelectedIntensity(value: IntensityType) {
  updateState('intensity', value);
}
</script>

<template>
  <GenericSelector title="What will be your workout intensity?" :options="intensityOptions"
    @optionSelected="updateSelectedIntensity" />
</template>
