<script setup lang="ts">
  import { Info } from 'lucide-vue-next';

  import GenericSelector from '@/common/components/generic-selector/GenericSelector.vue';
  import Label from '@/common/components/ui/label/Label.vue';
  import Switch from '@/common/components/ui/switch/Switch.vue';
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/common/components/ui/tooltip';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';
  import { SweatLevel, sweatLevelOptions } from '@/modules/fuel-guide/interfaces/Sweat';

  const { updateState } = useForm()!;

  function updateSweatLevel(value: SweatLevel) {
    updateState('sweat', value);
  }

  function updateSaltCrust(value: boolean) {
    updateState('saltCrust', value);
  }
</script>

<template>
  <div class="flex flex-col gap-2">
    <GenericSelector
      title="How much do you usually sweat?"
      :options="sweatLevelOptions"
      @optionSelected="updateSweatLevel" />

    <div class="flex items-center justify-center gap-2">
      <Switch id="salt-crust" @update:modelValue="updateSaltCrust" />
      <Label for="salt-crust"> Do you have salt crust on your skin? </Label>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Info class="size-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>You notice a white crust on your skin or clothes after your workout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
