<script setup lang="ts" generic="Type, Icon">
  import { type AcceptableValue } from 'reka-ui';

  import type { GenericOption } from '@/common/components/generic-selector/GenericOption';
  import { ToggleGroup, ToggleGroupItem } from '@/common/components/ui/toggle-group';
  import FormItem from '@/common/layouts/form-item/FormItem.vue';

  interface Props<Type, Icon> {
    options: GenericOption<Type, Icon>[];
    title: string;
  }

  interface Emits {
    (e: 'optionSelected', value: Type): void;
  }

  const { options = [], title } = defineProps<Props<Type, Icon>>();
  const emits = defineEmits<Emits>();

  function updateModelValue(value: AcceptableValue) {
    emits('optionSelected', value as Type);
  }
</script>

<template>
  <FormItem :title="title">
    <ToggleGroup
      variant="outline"
      type="single"
      class="flex w-full flex-wrap justify-center"
      @update:modelValue="updateModelValue">
      <ToggleGroupItem
        class="w-full justify-center sm:w-auto"
        v-for="(option, key) in options"
        :key="key"
        :value="option.id as string"
        :aria-label="`Select ${option.label}`"
        :data-cy="option.id">
        <Component v-if="option.icon" :is="option.icon" />
        <span>{{ option.label }}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  </FormItem>
</template>
