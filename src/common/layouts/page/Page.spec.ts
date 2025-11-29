import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const pageMocks = vi.hoisted(() => ({
  headerMarginTop: '-10px',
  headerMarginBottom: '10px',
}));

vi.mock('@/common/composables/useNav', () => ({
  useNav: () => ({
    headerMarginTop: pageMocks.headerMarginTop,
    headerMarginBottom: pageMocks.headerMarginBottom,
  }),
}));

import Page from './Page.vue';

describe('Page layout', () => {
  beforeEach(() => {
    pageMocks.headerMarginTop = '-25px';
    pageMocks.headerMarginBottom = '25px';
  });

  it('renders header, main, and footer slots', () => {
    const wrapper = mount(Page, {
      slots: {
        header: '<header data-test="header-slot">Header</header>',
        main: '<section data-test="main-slot">Main</section>',
        footer: '<footer data-test="footer-slot">Footer</footer>',
      },
    });

    expect(wrapper.get('[data-test="header-slot"]').text()).toBe('Header');
    expect(wrapper.get('[data-test="main-slot"]').text()).toBe('Main');
    expect(wrapper.get('[data-test="footer-slot"]').text()).toBe('Footer');
  });
});
