import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import { SweatLevel } from '@/modules/fuel-guide/interfaces/Sweat';
import SweatSelector from './SweatSelector.vue';

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

const genericSelectorStub = defineComponent({
  name: 'GenericSelectorStub',
  emits: ['optionSelected'],
  setup(_, { emit }) {
    return () =>
      h('div', {
        'data-test': 'generic-selector',
        onClick: () => emit('optionSelected', SweatLevel.High),
      });
  },
});

const switchStub = defineComponent({
  name: 'SwitchStub',
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return () =>
      h(
        'button',
        {
          'data-test': 'switch-stub',
          onClick: () => emit('update:modelValue', true),
        },
        'switch',
      );
  },
});

const simpleStub = defineComponent({
  name: 'SimpleStub',
  setup(_, { slots }) {
    return () => h('div', slots.default?.());
  },
});

describe('SweatSelector', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      updateState: vi.fn(),
    };
  });

  it('updates sweat level and salt crust state', async () => {
    const wrapper = mount(SweatSelector, {
      global: {
        stubs: {
          GenericSelector: genericSelectorStub,
          Switch: switchStub,
          Label: simpleStub,
          Tooltip: simpleStub,
          TooltipTrigger: simpleStub,
          TooltipContent: simpleStub,
          TooltipProvider: simpleStub,
        },
      },
    });

    await wrapper.get('[data-test="generic-selector"]').trigger('click');
    expect(formComposableMock.useFormReturn.updateState).toHaveBeenCalledWith(
      'sweat',
      SweatLevel.High,
    );

    await wrapper.get('[data-test="switch-stub"]').trigger('click');
    expect(formComposableMock.useFormReturn.updateState).toHaveBeenCalledWith('saltCrust', true);
  });
});
