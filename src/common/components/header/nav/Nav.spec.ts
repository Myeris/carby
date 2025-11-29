import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';

const navLinksMock = {
  home: { id: 'home', name: 'Home', path: '#home', icon: 'HomeIcon' },
  fuel: { id: 'fuel', name: 'The Fuel Guide', path: '#fuel', icon: 'FuelIcon' },
};

vi.mock('@/common/composables/useNav', () => ({
  useNav: () => ({
    navLinks: navLinksMock,
  }),
}));

vi.mock('@/common/components/header/nav/NavButton.vue', () => {
  const NavButtonStub = defineComponent({
    name: 'NavButtonStub',
    props: {
      link: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      return () => h('div', { 'data-test': 'nav-button-stub' }, props.link.name);
    },
  });

  return { default: NavButtonStub };
});

import Nav from './Nav.vue';

describe('Nav', () => {
  it('renders a NavButton for each configured link', () => {
    const wrapper = mount(Nav);

    const buttons = wrapper.findAll('[data-test="nav-button-stub"]');
    expect(buttons).toHaveLength(Object.values(navLinksMock).length);
    expect(buttons[0]!.text()).toBe(navLinksMock.home.name);
    expect(buttons[1]!.text()).toBe(navLinksMock.fuel.name);
  });
});
