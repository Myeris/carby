import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, defineComponent, h, markRaw, ref } from 'vue';

const isScrolledMock = ref(false);
const isLargeScreenMock = ref(false);

vi.mock('@/common/composables/useNav.ts', () => ({
  useNav: () => ({
    isScrolled: computed(() => isScrolledMock.value),
  }),
}));

vi.mock('@/common/composables/use-theme/useTheme.ts', () => ({
  useTheme: () => ({
    isLargeScreen: computed(() => isLargeScreenMock.value),
  }),
}));

const buttonStub = defineComponent({
  name: 'ButtonStub',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          'data-test': 'button-stub',
          ...attrs,
        },
        slots.default?.(),
      );
  },
});

const DummyIcon = defineComponent({
  name: 'DummyIcon',
  setup() {
    return () => h('span', { 'data-test': 'dummy-icon' }, 'icon');
  },
});

import { NavLink } from '@/common/composables/use-nav/useNav.ts';
import NavButton from './NavButton.vue';

const mockLink = {
  id: NavLink.Home,
  name: 'Home',
  path: '#home',
  icon: markRaw(DummyIcon),
};

describe('NavButton', () => {
  beforeEach(() => {
    isScrolledMock.value = false;
    isLargeScreenMock.value = true;
  });

  it('renders the provided link', () => {
    const wrapper = mount(NavButton, {
      props: {
        link: mockLink,
      },
      global: {
        stubs: {
          Button: buttonStub,
        },
      },
    });

    const anchor = wrapper.get('a');
    expect(anchor.attributes('href')).toBe(mockLink.path);
    expect(wrapper.find('[data-test="dummy-icon"]').exists()).toBe(true);
    expect(anchor.text()).toContain(mockLink.name);
  });
});
