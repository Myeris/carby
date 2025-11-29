import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';

const mockHomeLink = {
  id: 'home',
  name: 'Home',
  path: '#home',
  icon: 'Banana',
};

vi.mock('@/common/composables/useNav', () => {
  const NavLink = {
    Home: 'home',
    FuelGuide: 'fuel-guide',
  } as const;

  return {
    NavLink,
    useNav: () => ({
      navLinks: {
        [NavLink.Home]: mockHomeLink,
      },
    }),
  };
});

vi.mock('lucide-vue-next', () => {
  const Banana = defineComponent({
    name: 'BananaIconStub',
    setup() {
      return () => h('span', { 'data-test': 'banana-icon' }, 'banana');
    },
  });

  const Home = defineComponent({
    name: 'HomeIconStub',
    setup() {
      return () => h('span', { 'data-test': 'home-icon' }, 'home');
    },
  });

  return { Banana, Home };
});

import Logo from './Logo.vue';

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

describe('Logo', () => {
  it('renders the brand link with icon and label', () => {
    const wrapper = mount(Logo, {
      global: {
        stubs: {
          Button: buttonStub,
        },
      },
    });

    const anchor = wrapper.get('a');
    expect(anchor.attributes('href')).toBe(mockHomeLink.path);
    expect(anchor.text()).toContain('Carby');
    expect(wrapper.find('[data-test="banana-icon"]').exists()).toBe(true);
  });
});
