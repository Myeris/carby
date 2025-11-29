<script setup lang="ts">
  import { Clock } from 'lucide-vue-next';

  import { InputGroup, InputGroupAddon, InputGroupInput } from '@/common/components/ui/input-group';
  import FormItem from '@/common/layouts/form-item/FormItem.vue';
  import { useForm } from '@/modules/fuel-guide/composables/useForm';

  const { updateState } = useForm()!;

  function updateWorkoutDuration(value: number) {
    updateState('duration', value);
  }
</script>

<template>
  <FormItem title="How long will your workout be?">
    <InputGroup class="w-full sm:w-3xs">
      <InputGroupInput type="number" :min="0" @update:modelValue="updateWorkoutDuration" />
      <InputGroupAddon>
        <Clock />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end"> minutes</InputGroupAddon>
    </InputGroup>
  </FormItem>
</template>
