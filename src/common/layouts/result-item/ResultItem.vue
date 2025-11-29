<script setup lang="ts" generic="Icon">
  interface Props<Icon> {
    title: string;
    icon: Icon;
  }

  const { title, icon } = defineProps<Props<Icon>>();
</script>

<template>
  <div class="flex flex-col gap-2 items-center w-full">
    <h4 class="text-lg font-semibold flex items-center gap-2 flex-row">
      <Component :is="icon" />
      {{ title }}
    </h4>

    <slot />
  </div>
</template>
