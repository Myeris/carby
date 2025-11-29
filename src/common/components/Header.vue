<script setup lang="ts">

import Logo from '@/common/components/Logo.vue';
import { Button } from '@/common/components/ui/button';
import { NavLink, useNav } from '@/common/composables/useNav';
import { useTheme } from '@/common/composables/useTheme';
import { Moon, Sun } from 'lucide-vue-next';

const { isScrolled, navLinks } = useNav();
const { isDark, toggleDark } = useTheme();

const homeLink = navLinks[NavLink.Home];
const fuelGuideLink = navLinks[NavLink.FuelGuide];
</script>

<template>
  <header :class="[
    'sticky inset-x-0 top-0 z-50 flex items-center justify-between bg-background/90 p-4 backdrop-blur transition-shadow',
    isScrolled ? 'shadow-md border-b border-border' : 'shadow-none'
  ]">
    <Logo />
    <nav class="flex items-center gap-2">
      <Button variant="outline" class="cursor-pointer" as-child>
        <a :href="homeLink?.path">{{ homeLink?.name }}</a>
      </Button>

      <Button variant="outline" class="cursor-pointer" as-child>
        <a :href="fuelGuideLink?.path">{{ fuelGuideLink?.name }}</a>
      </Button>

      <Button variant="outline" size="icon" type="button" :aria-pressed="isDark" aria-label="Toggle color scheme"
        @click="toggleDark()">
        <Sun v-if="isDark" class="h-4 w-4" />
        <Moon v-else class="h-4 w-4" />
      </Button>
    </nav>
  </header>
</template>

<style scoped></style>
