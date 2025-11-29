<script setup lang="ts">
import { NavLink, useNav } from '@/common/composables/useNav';

const { navLinks } = useNav();
const link = navLinks[NavLink.Home];
</script>

<template>
  <section :id="link.id"
    class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 text-center h-screen">
    <div class="space-y-6">
      <h1 class="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
        Carby helps you tailored your nutrition and hydration for successful workouts.
      </h1>

      <p class="text-base text-muted-foreground md:text-lg">
        Sports fuel is supported by science and works alongside real food — not as a replacement. Some Fuel
        Guides — longer or more intense — rely heavily on the specific composition of sports nutrition. Others
        less so.
      </p>
    </div>
  </section>
</template>
