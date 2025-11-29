<script setup lang="ts">
  import { Moon, Sun } from 'lucide-vue-next';
  import { computed, useTemplateRef, watch } from 'vue';

  import Logo from '@/common/components/header/logo/Logo.vue';
  import Nav from '@/common/components/header/nav/Nav.vue';
  import { Button } from '@/common/components/ui/button';
  import { useNav } from '@/common/composables/use-nav/useNav.ts';
  import { useTheme } from '@/common/composables/use-theme/useTheme.ts';

  type Icon = typeof Sun | typeof Moon;

  const { isScrolled, setHeaderHeight } = useNav();
  const { isDark, toggleDark } = useTheme();

  const headerRef = useTemplateRef<HTMLElement>('header');

  const icon = computed<Icon>(() => (isDark.value ? Sun : Moon));

  watch(
    () => headerRef.value?.clientHeight,
    () => {
      setHeaderHeight(headerRef.value?.clientHeight ?? 0);
    },
  );
</script>

<template>
  <header
    ref="header"
    :class="[
      'sticky inset-x-0 top-0 z-50 flex flex-col gap-2 p-4 backdrop-blur transition-shadow',
      isScrolled
        ? 'border-b border-border bg-background/70 shadow-md'
        : 'bg-transparent shadow-none',
    ]">
    <div class="flex w-full items-center justify-between gap-3">
      <Logo :class="[isScrolled ? 'text-foreground' : 'text-white']" />

      <div class="flex flex-row items-center gap-2">
        <Nav />

        <Button
          variant="outline"
          size="icon"
          type="button"
          :class="[
            isScrolled ? '' : 'bg-transparent text-white hover:bg-background hover:text-foreground',
          ]"
          aria-label="Toggle color scheme"
          :aria-pressed="isDark"
          data-cy="theme-toggle-button"
          @click="toggleDark()">
          <Component :is="icon" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </header>
</template>
