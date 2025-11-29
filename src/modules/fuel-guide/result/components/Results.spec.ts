import type { UseFormReturn } from '@/__tests__/form-composable.mock.ts';
import Carbs from '@/modules/fuel-guide/result/components/Carbs.vue';
import Electrolytes from '@/modules/fuel-guide/result/components/Electrolytes.vue';
import Hydration from '@/modules/fuel-guide/result/components/Hydration.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive, ref } from 'vue';

const formComposableMock = vi.hoisted(() => ({
  useFormReturn: {} as Partial<UseFormReturn>,
}));

vi.mock('@/modules/fuel-guide/composables/useForm', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

vi.mock('@/modules/fuel-guide/composables/useForm.ts', () => ({
  useForm: () => formComposableMock.useFormReturn,
}));

const skeletonStub = {
  template: '<div data-test="skeleton"><slot /></div>',
  props: ['isLoading'],
};

const resultItemStub = {
  template: '<div data-test="result-item"><slot /></div>',
  props: ['title', 'icon'],
};

describe('Carbs result', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      result: reactive({
        carb: 0,
      }),
      isLoading: ref(false),
    };
  });

  it('displays recommended carb intake and gel guidance', () => {
    formComposableMock.useFormReturn.result!.carb = 90;

    const wrapper = mount(Carbs, {
      global: {
        stubs: {
          SkeletonItem: skeletonStub,
          ResultItem: resultItemStub,
        },
      },
    });

    expect(wrapper.text()).toContain('Recommended intake');
    expect(wrapper.text()).toContain('90');
    expect(wrapper.text()).toContain('3 gels');
    expect(wrapper.text()).toContain('every 20 minutes');
  });

  it('shows the no-carb message when the recommendation is zero', () => {
    const wrapper = mount(Carbs, {
      global: {
        stubs: {
          SkeletonItem: skeletonStub,
          ResultItem: resultItemStub,
        },
      },
    });

    expect(wrapper.text()).toContain("You don't need to take any carbs");
  });
});

describe('Hydration result', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      state: reactive({
        duration: 90,
      }),
      result: reactive({
        hydration: 1200,
      }),
      isLoading: ref(false),
    };
  });

  it('summarizes hourly and total hydration needs', () => {
    const wrapper = mount(Hydration, {
      global: {
        stubs: {
          SkeletonItem: skeletonStub,
          ResultItem: resultItemStub,
        },
      },
    });

    expect(wrapper.text()).toContain('1200 ml/h');
    expect(wrapper.text()).toContain('1.8 L');
  });

  it('falls back to the default hydration guidance when no intake is required', () => {
    formComposableMock.useFormReturn.result!.hydration = 0;

    const wrapper = mount(Hydration, {
      global: {
        stubs: {
          SkeletonItem: skeletonStub,
          ResultItem: resultItemStub,
        },
      },
    });

    expect(wrapper.text()).toContain("You don't need to drink any water");
  });
});

describe('Electrolytes result', () => {
  beforeEach(() => {
    formComposableMock.useFormReturn = {
      state: reactive({
        duration: 90,
      }),
      result: reactive({
        electrolyte: 600,
      }),
      isLoading: ref(false),
    };
  });

  it('details electrolyte intake and total needs', () => {
    const wrapper = mount(Electrolytes, {
      global: {
        stubs: {
          SkeletonItem: skeletonStub,
          ResultItem: resultItemStub,
        },
      },
    });

    expect(wrapper.text()).toContain('600 mg/h');
    expect(wrapper.text()).toContain('900 mg total');
    expect(wrapper.text()).toContain('2 tablets');
  });

  it('renders the fallback copy when no electrolytes are required', () => {
    formComposableMock.useFormReturn.result!.electrolyte = 0;

    const wrapper = mount(Electrolytes, {
      global: {
        stubs: {
          SkeletonItem: skeletonStub,
          ResultItem: resultItemStub,
        },
      },
    });

    expect(wrapper.text()).toContain("You don't need to take any electrolytes");
  });
});
