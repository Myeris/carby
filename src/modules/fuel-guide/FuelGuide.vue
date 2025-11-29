<script setup lang="ts">
import { NavLink, useNav } from "@/common/composables/useNav";
import Form from "./Form.vue";

const { navLinks } = useNav();
const link = navLinks[NavLink.FuelGuide];
</script>

<template>
  <section :id="link.id" class="mx-auto flex w-full max-w-4xl flex-col gap-8 text-center h-screen scroll-mt-28">
    <h2 class="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
      {{ link.name }}
    </h2>

    <Form />
  </section>
</template>
