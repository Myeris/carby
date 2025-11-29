import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick, reactive } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place';
import Form from './Form.vue';

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

const stubFactory = (name: string) =>
  defineComponent({
    name: `${name}Stub`,
    setup() {
      return () => h('div', { 'data-test': `${name}-stub` }, name);
    },
  });

const stubs = {
  SportSelector: stubFactory('sport-selector'),
  PlaceSelector: stubFactory('place-selector'),
  WeatherSelector: stubFactory('weather-selector'),
  SweatSelector: stubFactory('sweat-selector'),
  IntensitySelector: stubFactory('intensity-selector'),
  WorkoutDurationInput: stubFactory('duration-input'),
  CalculateButton: stubFactory('calculate-button'),
};

describe('Fuel guide Form', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      state: reactive({
        place: PlaceType.Outside,
      }),
    };
  });

  it('renders each sub-section', () => {
    const wrapper = mount(Form, {
      global: {
        stubs,
      },
    });

    expect(wrapper.find('[data-test="sport-selector-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="place-selector-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="weather-selector-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="sweat-selector-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="intensity-selector-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="duration-input-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="calculate-button-stub"]').exists()).toBe(true);
  });

  it('hides the weather selector when training indoors', async () => {
    const wrapper = mount(Form, {
      global: {
        stubs,
      },
    });

    expect(wrapper.find('[data-test="weather-selector-stub"]').exists()).toBe(true);

    formComposableMock.useFormReturn.state!.place = PlaceType.Inside;
    await nextTick();

    expect(wrapper.find('[data-test="weather-selector-stub"]').exists()).toBe(false);
  });
});
