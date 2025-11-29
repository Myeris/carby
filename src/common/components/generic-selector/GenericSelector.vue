<script setup lang="ts" generic="Type, Icon">
import { ToggleGroup, ToggleGroupItem } from "@/common/components/ui/toggle-group";
import { type AcceptableValue } from "reka-ui";
import type { GenericOption } from '@/common/components/generic-selector/GenericOption';

interface Props<Type, Icon> {
  options: GenericOption<Type, Icon>[];
  title: string;
}

interface Emits {
  (e: 'optionSelected', value: Type): void;
}

const { options = [], } = defineProps<Props<Type, Icon>>();
const emits = defineEmits<Emits>();


function updateModelValue(value: AcceptableValue) {
  emits('optionSelected', value as Type);
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <h3 class="text-lg font-medium">{{ title }}</h3>

    <ToggleGroup variant="outline" type="single" @update:modelValue="updateModelValue">
      <ToggleGroupItem v-for="(option, key) in options" :key="key" :value="option.id as string"
        :aria-label="`Select ${option.label}`">
        <Component v-if="option.icon" :is="option.icon" />
        <span>{{ option.label }}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
