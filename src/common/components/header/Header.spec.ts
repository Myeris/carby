import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, defineComponent, h, nextTick, ref } from 'vue';

const isScrolledMock = ref(false);
const isDarkMock = ref(false);
const toggleDarkMock = vi.fn();
const setHeaderHeightMock = vi.fn();

vi.mock('@/common/composables/useNav', () => ({
  useNav: () => ({
    isScrolled: computed(() => isScrolledMock.value),
    setHeaderHeight: setHeaderHeightMock,
  }),
}));

vi.mock('@/common/composables/useTheme', () => ({
  useTheme: () => ({
    isDark: isDarkMock,
    toggleDark: toggleDarkMock,
  }),
}));

vi.mock('@/common/components/header/logo/Logo.vue', () => ({
  default: defineComponent({
    name: 'LogoStub',
    setup() {
      return () => h('div', { 'data-test': 'logo-stub' }, 'Logo');
    },
  }),
}));

vi.mock('@/common/components/header/nav/Nav.vue', () => ({
  default: defineComponent({
    name: 'NavStub',
    setup() {
      return () => h('nav', { 'data-test': 'nav-stub' }, 'Nav');
    },
  }),
}));

vi.mock('lucide-vue-next', () => {
  const Sun = defineComponent({
    name: 'SunIconStub',
    setup() {
      return () => h('span', { 'data-test': 'sun-icon' }, 'sun');
    },
  });

  const Moon = defineComponent({
    name: 'MoonIconStub',
    setup() {
      return () => h('span', { 'data-test': 'moon-icon' }, 'moon');
    },
  });

  const Home = defineComponent({
    name: 'HomeIconStub',
    setup() {
      return () => h('span', { 'data-test': 'home-icon' }, 'home');
    },
  });

  const Banana = defineComponent({
    name: 'BananaIconStub',
    setup() {
      return () => h('span', { 'data-test': 'banana-icon' }, 'banana');
    },
  });

  return { Sun, Moon, Home, Banana };
});

import Header from './Header.vue';

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

function mountHeader() {
  return mount(Header, {
    global: {
      stubs: {
        Button: buttonStub,
      },
    },
  });
}

describe('Header', () => {
  beforeEach(() => {
    isScrolledMock.value = false;
    isDarkMock.value = false;
    toggleDarkMock.mockClear();
    setHeaderHeightMock.mockClear();
  });

  it('renders the logo and navigation components', () => {
    const wrapper = mountHeader();

    expect(wrapper.find('[data-test="logo-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="nav-stub"]').exists()).toBe(true);
  });

  it('updates styling when the header is scrolled', async () => {
    const wrapper = mountHeader();
    const header = wrapper.get('header');

    expect(header.classes()).toEqual(expect.arrayContaining(['bg-transparent', 'shadow-none']));

    isScrolledMock.value = true;
    await nextTick();

    expect(header.classes()).toEqual(
      expect.arrayContaining([
        'sticky',
        'inset-x-0',
        'top-0',
        'z-50',
        'flex',
        'flex-col',
        'gap-2',
        'p-4',
        'backdrop-blur',
        'transition-shadow',
        'bg-transparent',
        'shadow-none',
      ]),
    );
  });

  it('toggles the theme and updates the active icon', async () => {
    const wrapper = mountHeader();
    const button = wrapper.get('[data-cy="theme-toggle-button"]');

    expect(button.attributes('aria-pressed')).toBe('false');
    expect(wrapper.find('[data-test="moon-icon"]').exists()).toBe(true);

    await button.trigger('click');
    expect(button.attributes('aria-pressed')).toBe('true');

    isDarkMock.value = true;
    await nextTick();

    expect(button.attributes('aria-pressed')).toBe('true');
    expect(wrapper.find('[data-test="sun-icon"]').exists()).toBe(true);
  });
});
