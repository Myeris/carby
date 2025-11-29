<script setup lang="ts">
  import { Banana } from 'lucide-vue-next';

  import { Button } from '@/common/components/ui/button';
  import { NavLink, useNav } from '@/common/composables/use-nav/useNav.ts';

  const { navLinks } = useNav();

  const homeLink = navLinks[NavLink.Home];
</script>

<template>
  <Button variant="ghost" class="group" as-child>
    <a class="flex items-center gap-2" :href="homeLink.path">
      <Banana
        class="transition-colors group-hover:text-yellow-400 dark:text-yellow-400 dark:group-hover:text-yellow-600" />
      <h1 class="text-xl font-semibold tracking-tight text-balance uppercase md:text-2xl">Carby</h1>
    </a>
  </Button>
</template>
