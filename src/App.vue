<script setup lang="ts">
import Default from '@/common/layouts/Default.vue';
import Header from '@/common/components/Header.vue';
import HomePage from '@/pages/HomePage.vue'
</script>

<template>
  <Default>
    <template #header>
      <Header />
    </template>

    <template #main>
      <HomePage />
    </template>
  </Default>
</template>

<style scoped></style>
