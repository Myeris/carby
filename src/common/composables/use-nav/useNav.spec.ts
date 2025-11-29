import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const scrollY = ref(0);

vi.mock('@vueuse/core', () => ({
  useWindowScroll: () => ({
    y: scrollY,
  }),
}));

import { NavLink, useNav } from './useNav.ts';

describe('useNav', () => {
  beforeEach(() => {
    scrollY.value = 0;
  });

  afterEach(() => {
    const nav = useNav();
    nav.setHeaderHeight(0);
  });

  it('exposes the expected nav links', () => {
    const { navLinks } = useNav();

    expect(navLinks[NavLink.Home].path).toBe('#home');
    expect(navLinks[NavLink.FuelGuide].path).toBe('#fuel-guide');
  });

  it('tracks header height and derived margins', () => {
    const { headerHeight, headerMarginTop, headerMarginBottom, setHeaderHeight } = useNav();

    setHeaderHeight(120);

    expect(headerHeight.value).toBe(120);
    expect(headerMarginTop.value).toBe('-120px');
    expect(headerMarginBottom.value).toBe('120px');
  });

  it('marks the header as scrolled only after passing its height', () => {
    const { isScrolled, setHeaderHeight } = useNav();
    setHeaderHeight(80);

    scrollY.value = 40;
    expect(isScrolled.value).toBe(false);

    scrollY.value = 120;
    expect(isScrolled.value).toBe(true);
  });
});
