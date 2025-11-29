import { useWindowScroll } from '@vueuse/core';
import { computed } from 'vue';

export enum NavLink {
  Home = 'home',
  FuelGuide = 'fuel-guide',
}

export interface NavItem {
  id: NavLink;
  name: string;
  path: string;
}

const navLinks: Record<NavLink, NavItem> = {
  [NavLink.Home]: { name: 'Home', path: `#${NavLink.Home}`, id: NavLink.Home },
  [NavLink.FuelGuide]: {
    name: 'The Fuel Guide',
    path: `#${NavLink.FuelGuide}`,
    id: NavLink.FuelGuide,
  },
};

export function useNav() {
  const { y } = useWindowScroll();
  const isScrolled = computed(() => y.value > 0);

  return {
    navLinks,
    isScrolled,
  };
}
