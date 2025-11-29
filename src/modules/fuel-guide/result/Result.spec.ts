import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import Result from './Result.vue';

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

const carbsStub = defineComponent({
  name: 'CarbsStub',
  setup() {
    return () => h('div', { 'data-test': 'carbs-stub' }, 'carbs');
  },
});

const hydrationStub = defineComponent({
  name: 'HydrationStub',
  setup() {
    return () => h('div', { 'data-test': 'hydration-stub' }, 'hydration');
  },
});

const electrolytesStub = defineComponent({
  name: 'ElectrolytesStub',
  setup() {
    return () => h('div', { 'data-test': 'electrolytes-stub' }, 'electrolytes');
  },
});

const noResultStub = defineComponent({
  name: 'NoResultStub',
  setup() {
    return () => h('div', { 'data-test': 'no-result-stub' }, 'no result');
  },
});

describe('Result layout', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      hasNutritionNeeds: ref(true),
    };
  });

  it('renders recommendations when nutrition needs exist', () => {
    const wrapper = mount(Result, {
      global: {
        stubs: {
          Carbs: carbsStub,
          Hydration: hydrationStub,
          Electrolytes: electrolytesStub,
          NoResult: noResultStub,
        },
      },
    });

    expect(wrapper.find('[data-test="carbs-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="hydration-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="electrolytes-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-result-stub"]').exists()).toBe(false);
  });

  it('falls back to the empty state when no needs are detected', () => {
    formComposableMock.useFormReturn.hasNutritionNeeds!.value = false;

    const wrapper = mount(Result, {
      global: {
        stubs: {
          Carbs: carbsStub,
          Hydration: hydrationStub,
          Electrolytes: electrolytesStub,
          NoResult: noResultStub,
        },
      },
    });

    expect(wrapper.find('[data-test="no-result-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="carbs-stub"]').exists()).toBe(false);
  });
});
