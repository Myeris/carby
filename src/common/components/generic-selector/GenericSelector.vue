<script setup lang="ts" generic="Type, Icon">
  import { type AcceptableValue } from 'reka-ui';

  import type { GenericOption } from '@/common/components/generic-selector/GenericOption';
  import { Button } from '@/common/components/ui/button';
  import { ToggleGroup, ToggleGroupItem } from '@/common/components/ui/toggle-group';
  import { useTheme } from '@/common/composables/use-theme/useTheme.ts';
  import FormItem from '@/common/layouts/form-item/FormItem.vue';
  import { ref } from 'vue';

  interface Props<Type, Icon> {
    options: GenericOption<Type, Icon>[];
    title: string;
  }

  interface Emits {
    (e: 'optionSelected', value: Type): void;
  }

  const { options = [], title } = defineProps<Props<Type, Icon>>();
  const emits = defineEmits<Emits>();

  const { isLargeScreen } = useTheme();

  const selectedOption = ref<Type | null>(null);

  function updateModelValue(value: AcceptableValue) {
    emits('optionSelected', value as Type);
  }

  function toggleOption(id: Type) {
    selectedOption.value = id;
    updateModelValue(id as AcceptableValue);
  }
</script>

<template>
  <FormItem :title="title">
    <ToggleGroup
      v-if="isLargeScreen"
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

    <div v-else class="flex flex-col gap-2">
      <Button
        v-for="(option, key) in options"
        class="w-full justify-center sm:w-auto"
        :class="[option.id === selectedOption ? 'bg-accent! text-accent-foreground!' : '']"
        variant="outline"
        :key="key"
        :value="option.id as string"
        :aria-label="`Select ${option.label}`"
        :data-cy="option.id"
        @click="() => toggleOption(option.id)">
        <Component v-if="option.icon" :is="option.icon" />
        <span>{{ option.label }}</span>
      </Button>
    </div>
  </FormItem>
</template>
