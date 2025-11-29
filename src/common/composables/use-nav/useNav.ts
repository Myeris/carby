import { useWindowScroll } from '@vueuse/core';
import { Banana, Home } from 'lucide-vue-next';
import { computed, ref } from 'vue';

export enum NavLink {
  Home = 'home',
  FuelGuide = 'fuel-guide',
}

export interface NavItem<T> {
  id: NavLink;
  name: string;
  path: string;
  icon: T;
}

type Icon = typeof Home | typeof Banana;

const navLinks: Record<NavLink, NavItem<Icon>> = {
  [NavLink.Home]: { name: 'Home', path: `#${NavLink.Home}`, id: NavLink.Home, icon: Home },
  [NavLink.FuelGuide]: {
    name: 'The Fuel Guide',
    path: `#${NavLink.FuelGuide}`,
    id: NavLink.FuelGuide,
    icon: Banana,
  },
};

const headerHeight = ref(0);
const headerMarginTop = computed(() => `-${headerHeight.value}px`);
const headerMarginBottom = computed(() => `${headerHeight.value}px`);

export function useNav() {
  const { y } = useWindowScroll();
  const isScrolled = computed(() => y.value > headerHeight.value);

  function setHeaderHeight(height: number) {
    headerHeight.value = height;
  }

  return {
    headerHeight,
    headerMarginBottom,
    headerMarginTop,
    isScrolled,
    navLinks,
    setHeaderHeight,
  };
}
