import { mount } from '@vue/test-utils';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { defineComponent, h } from 'vue';

import Landing from './Landing.vue';

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

const heroStub = defineComponent({
  name: 'HeroStub',
  setup() {
    return () => h('div', { 'data-test': 'hero-stub' }, 'hero');
  },
});

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

const chevronStub = defineComponent({
  name: 'ChevronStub',
  setup(_, { attrs }) {
    return () => h('span', { 'data-test': 'chevron-stub', ...attrs }, 'icon');
  },
});

describe('Landing module', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('anchors the home section and links to the fuel guide CTA', () => {
    const wrapper = mount(Landing, {
      global: {
        stubs: {
          Hero: heroStub,
          Button: buttonStub,
          ChevronsDown: chevronStub,
        },
      },
    });

    const section = wrapper.get('section');
    expect(section.attributes('id')).toBe('home');
    expect(wrapper.find('[data-test="hero-stub"]').exists()).toBe(true);

    const cta = wrapper.get('a');
    expect(cta.attributes('href')).toBe('#fuel-guide');
    expect(wrapper.text()).toContain('Fuel smarter, perform better');
  });
});

