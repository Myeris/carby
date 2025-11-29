<script setup lang="ts">
  import { useHashObserver } from '@/common/composables/use-hash-observer/useHashObserver.ts';
  import { useNav } from '@/common/composables/use-nav/useNav.ts';
  import FuelGuide from '@/modules/fuel-guide/FuelGuide.vue';
  import Landing from '@/modules/landing/Landing.vue';

  const { navLinks } = useNav();
  const sectionIds = Object.values(navLinks).map((link) => link.id);

  useHashObserver(sectionIds);
</script>

<template>
  <Landing />
  <FuelGuide />
</template>
