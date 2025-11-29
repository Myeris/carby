<script setup lang="ts">
  import { useNav } from '@/common/composables/use-nav/useNav.ts';

  const { headerMarginTop, headerMarginBottom } = useNav();
</script>

<template>
  <div>
    <slot name="header" />

    <main
      class="flex min-h-screen flex-col bg-background text-foreground"
      :style="{ marginTop: headerMarginTop, marginBottom: headerMarginBottom }">
      <slot name="main" />
    </main>

    <slot name="footer" />
  </div>
</template>
