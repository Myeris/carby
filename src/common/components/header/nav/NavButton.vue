<script setup lang="ts" generic="Icon">
  import { Button } from '@/common/components/ui/button';
  import { type NavItem, useNav } from '@/common/composables/use-nav/useNav.ts';
  import { useTheme } from '@/common/composables/use-theme/useTheme.ts';

  interface Props {
    link: NavItem<Icon>;
  }

  const { link } = defineProps<Props>();

  const { isScrolled } = useNav();
  const { isLargeScreen } = useTheme();
</script>

<template>
  <Button variant="outline" :class="[isScrolled ? '' : 'bg-transparent text-white']" as-child>
    <a :href="link?.path">
      <Component :is="link?.icon" class="h-4 w-4" />
      <span v-if="isLargeScreen">
        {{ link?.name }}
      </span>
    </a>
  </Button>
</template>
