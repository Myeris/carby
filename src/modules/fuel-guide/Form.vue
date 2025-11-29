<script setup lang="ts">
import IntensitySelector from "@/modules/fuel-guide/components/IntensitySelector.vue";
import PlaceSelector from "@/modules/fuel-guide/components/PlaceSelector.vue";
import SportSelector from "@/modules/fuel-guide/components/SportSelector.vue";
import SweatSelector from "@/modules/fuel-guide/components/SweatSelector.vue";
import WeatherSelector from "@/modules/fuel-guide/components/WeatherSelector.vue";

</script>

<template>
  <div class="flex flex-col gap-4">
    <SportSelector />

    <PlaceSelector />

    <WeatherSelector />

    <SweatSelector />

    <IntensitySelector />
  </div>

</template>

<style scoped></style>