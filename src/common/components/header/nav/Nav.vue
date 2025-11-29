<script setup lang="ts">
  import NavButton from '@/common/components/header/nav/NavButton.vue';
  import { useNav } from '@/common/composables/use-nav/useNav.ts';

  const { navLinks } = useNav();
</script>

<template>
  <nav class="flex flex-row flex-wrap items-center gap-2">
    <NavButton v-for="(link, key) of Object.values(navLinks)" :key="key" :link="link" />
  </nav>
</template>
