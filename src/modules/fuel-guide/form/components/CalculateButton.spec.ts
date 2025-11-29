import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick, ref } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import CalculateButton from './CalculateButton.vue';

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

const buttonStub = defineComponent({
  name: 'ButtonStub',
  inheritAttrs: false,
  emits: ['click'],
  setup(_, { slots, attrs, emit }) {
    return () =>
      h(
        'button',
        {
          'data-test': 'button-stub',
          ...attrs,
          onClick: () => emit('click'),
        },
        slots.default?.(),
      );
  },
});

const spinnerStub = defineComponent({
  name: 'SpinnerStub',
  setup() {
    return () => h('span', { 'data-test': 'spinner-stub' }, 'spinner');
  },
});

describe('CalculateButton', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      isLoading: ref(false),
      canCalculate: ref(false),
      calculate: vi.fn(),
    };
  });

  it('disables the action until the form can be calculated', async () => {
    const wrapper = mount(CalculateButton, {
      global: {
        stubs: {
          Button: buttonStub,
          Spinner: spinnerStub,
        },
      },
    });

    const button = wrapper.get('[data-test="button-stub"]');
    expect(button.attributes('disabled')).toBeDefined();

    formComposableMock.useFormReturn.canCalculate!.value = true;
    await nextTick();

    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('shows a spinner while the calculation runs and triggers the action on click', async () => {
    const wrapper = mount(CalculateButton, {
      global: {
        stubs: {
          Button: buttonStub,
          Spinner: spinnerStub,
        },
      },
    });

    formComposableMock.useFormReturn.canCalculate!.value = true;
    await nextTick();

    const button = wrapper.get('[data-test="button-stub"]');
    await button.trigger('click');
    expect(formComposableMock.useFormReturn.calculate).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('Calculate');

    formComposableMock.useFormReturn.isLoading!.value = true;
    await nextTick();

    expect(wrapper.text()).toContain('Calculating...');
    expect(wrapper.find('[data-test="spinner-stub"]').exists()).toBe(true);
  });
});
