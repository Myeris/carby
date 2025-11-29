import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import { IntensityType } from '@/modules/fuel-guide/interfaces/Intensity';
import { PlaceType } from '@/modules/fuel-guide/interfaces/Place';
import { SportType } from '@/modules/fuel-guide/interfaces/Sport';
import { WeatherType } from '@/modules/fuel-guide/interfaces/Weather';
import IntensitySelector from './IntensitySelector.vue';
import PlaceSelector from './PlaceSelector.vue';
import SportSelector from './SportSelector.vue';
import WeatherSelector from './WeatherSelector.vue';

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
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['optionSelected'],
  setup(props, { emit }) {
    return () =>
      h(
        'div',
        {
          'data-test': 'generic-selector',
          'data-title': props.title,
          onClick: () => emit('optionSelected', props.options[0]),
        },
        props.title,
      );
  },
});

function mountSelector<T>(component: T) {
  return mount(component, {
    global: {
      stubs: {
        GenericSelector: genericSelectorStub,
      },
    },
  });
}

describe('Fuel guide selectors', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      updateState: vi.fn(),
    };
  });

  const scenarios = [
    {
      name: 'SportSelector',
      component: SportSelector,
      expectedTitle: 'Which sport are you doing?',
      key: 'sport',
      value: SportType.Cycling,
    },
    {
      name: 'PlaceSelector',
      component: PlaceSelector,
      expectedTitle: 'Where are you training?',
      key: 'place',
      value: PlaceType.Inside,
    },
    {
      name: 'IntensitySelector',
      component: IntensitySelector,
      expectedTitle: 'What will be your workout intensity?',
      key: 'intensity',
      value: IntensityType.Moderate,
    },
    {
      name: 'WeatherSelector',
      component: WeatherSelector,
      expectedTitle: 'What is the weather like?',
      key: 'weather',
      value: WeatherType.Hot,
    },
  ] as const;

  scenarios.forEach(({ name, component, expectedTitle, key, value }) => {
    it(`passes props and emits updates for ${name}`, async () => {
      const wrapper = mountSelector<typeof component>(component);
      const stub = wrapper.getComponent(genericSelectorStub);

      expect(stub.attributes('data-title')).toBe(expectedTitle);

      stub.vm.$emit('optionSelected', value);

      expect(formComposableMock.useFormReturn.updateState).toHaveBeenCalledWith(key, value);
    });
  });
});
