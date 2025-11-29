import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';

import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import FuelGuide from './FuelGuide.vue';

const navMocks = vi.hoisted(() => ({
  navLinks: {
    home: { id: 'home', name: 'Home', path: '#home' },
    'fuel-guide': { id: 'fuel-guide', name: 'Fuel Guide', path: '#fuel-guide' },
  },
  navLinkEnum: {
    Home: 'home',
    FuelGuide: 'fuel-guide',
  } as const,
}));

vi.mock('@/common/composables/use-nav/useNav.ts', () => ({
  NavLink: navMocks.navLinkEnum,
  useNav: () => ({
    navLinks: navMocks.navLinks,
  }),
}));

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
  provide: vi.fn(),
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
  useProvideForm: formComposableMock.provide,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
  useProvideForm: formComposableMock.provide,
}));

const formStub = defineComponent({
  name: 'FormStub',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => h('div', { 'data-test': 'form-stub' }, props.id);
  },
});

const resultStub = defineComponent({
  name: 'ResultStub',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => h('div', { 'data-test': 'result-stub' }, props.id);
  },
});

describe('FuelGuide', () => {
  beforeEach(() => {
    formComposableMock.provide.mockReset();
    formComposableMock.useFormReturn = {
      formId: 'form-id',
      resultId: 'result-id',
      hasResult: ref(false),
    };
  });

  it('renders the section and form when no result is available', () => {
    const wrapper = mount(FuelGuide, {
      global: {
        stubs: {
          Form: formStub,
          Result: resultStub,
        },
      },
    });

    expect(formComposableMock.provide).toHaveBeenCalled();
    const section = wrapper.get('section');
    expect(section.attributes('id')).toBe('fuel-guide');
    expect(wrapper.get('h2').text()).toBe('Fuel Guide');
    expect(wrapper.findComponent(formStub).props('id')).toBe('form-id');
    expect(wrapper.findComponent(resultStub).exists()).toBe(false);
  });

  it('shows the result panel when a recommendation exists', () => {
    formComposableMock.useFormReturn = {
      formId: 'form-id',
      resultId: 'result-id',
      hasResult: ref(true),
    };

    const wrapper = mount(FuelGuide, {
      global: {
        stubs: {
          Form: formStub,
          Result: resultStub,
        },
      },
    });

    expect(wrapper.findComponent(resultStub).props('id')).toBe('result-id');
  });
});
