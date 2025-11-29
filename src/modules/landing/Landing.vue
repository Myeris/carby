<script setup lang="ts">
  import { ChevronsDown } from 'lucide-vue-next';

  import { Button } from '@/common/components/ui/button';
  import { NavLink, useNav } from '@/common/composables/use-nav/useNav.ts';
  import Hero from '@/modules/landing/components/Hero.vue';

  const { navLinks } = useNav();
  const link = navLinks[NavLink.Home];
</script>

<template>
  <section
    :id="link.id"
    class="relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-background text-center text-white">
    <Hero />
    <p class="text-sm tracking-[0.3em] text-white/80 uppercase">Fuel smarter, perform better</p>

    <div class="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-16">
      <h1 class="text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl">
        Carby helps you tailor your nutrition and hydration for successful workouts.
      </h1>

      <p class="text-base text-white/85 md:text-lg">
        A good nutrition and hydration plan is supported by science to help you perform your best.
      </p>
    </div>

    <div class="absolute bottom-8">
      <Button
        variant="ghost"
        size="icon"
        class="rounded-full bg-white/50 backdrop-blur hover:bg-white/10">
        <a :href="navLinks[NavLink.FuelGuide].path">
          <ChevronsDown class="size-4" />
        </a>
      </Button>
    </div>
  </section>
</template>
