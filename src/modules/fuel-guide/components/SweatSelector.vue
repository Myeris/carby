<script setup lang="ts">
import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue'
import { useForm, useProvideForm } from '../composables/useForm';
import { SweatLevel, sweatLevelOptions } from '../interfaces/Sweat';


useProvideForm();
const { updateState } = useForm()!;

function updateSweatLevel(value: SweatLevel) {
  updateState('weather', value);
}

</script>

<template>
  <GenericSelector title="How much do you usually sweat?" :options="sweatLevelOptions"
    @optionSelected="updateSweatLevel" />
</template>
