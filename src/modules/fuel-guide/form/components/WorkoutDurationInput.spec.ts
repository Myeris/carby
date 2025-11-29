import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import WorkoutDurationInput from './WorkoutDurationInput.vue';

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

const passthroughStub = (name: string, extraAttrs: Record<string, string> = {}) =>
  defineComponent({
    name,
    setup(_, { slots }) {
      return () => h('div', { 'data-test': `${name}-stub`, ...extraAttrs }, slots.default?.());
    },
  });

const inputStub = defineComponent({
  name: 'InputGroupInputStub',
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return () =>
      h('input', {
        'data-test': 'duration-input',
        onInput: (event: Event) => {
          const target = event.target as HTMLInputElement;
          emit('update:modelValue', Number(target.value));
        },
      });
  },
});

describe('WorkoutDurationInput', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      updateState: vi.fn(),
    };
  });

  it('updates the duration through the input group', async () => {
    const wrapper = mount(WorkoutDurationInput, {
      global: {
        stubs: {
          FormItem: passthroughStub('FormItem'),
          InputGroup: passthroughStub('InputGroup'),
          InputGroupAddon: passthroughStub('InputGroupAddon'),
          InputGroupInput: inputStub,
        },
      },
    });

    const input = wrapper.get('[data-test="duration-input"]');
    await input.setValue('75');

    expect(formComposableMock.useFormReturn.updateState).toHaveBeenCalledWith('duration', 75);
  });
});
