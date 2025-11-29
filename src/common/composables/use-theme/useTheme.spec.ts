import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Ref } from 'vue';
import { defineComponent } from 'vue';

const themeMocks = vi.hoisted(() => {
  const toggleDarkMock = vi.fn();
  const isDarkRef = { value: false } as Ref<boolean>;
  const preferredDarkRef = { value: false } as Ref<boolean>;

  return { toggleDarkMock, isDarkRef, preferredDarkRef };
});

vi.mock('@vueuse/core', () => ({
  useDark: vi.fn(() => themeMocks.isDarkRef),
  usePreferredDark: vi.fn(() => themeMocks.preferredDarkRef),
  useToggle: vi.fn(() => themeMocks.toggleDarkMock),
}));

import { useTheme } from './useTheme.ts';

const TestComponent = defineComponent({
  setup() {
    return useTheme();
  },
  template: '<div />',
});

describe('useTheme', () => {
  beforeEach(() => {
    themeMocks.isDarkRef.value = false;
    themeMocks.preferredDarkRef.value = false;
    themeMocks.toggleDarkMock.mockClear();
  });

  it('exposes the reactive dark state and toggle fn', () => {
    const wrapper = mount(TestComponent);

    expect(wrapper.vm.isDark).toBe(themeMocks.isDarkRef);
    expect(wrapper.vm.toggleDark).toBe(themeMocks.toggleDarkMock);
  });

  it('syncs the theme with the preferred scheme on mount when they differ', () => {
    themeMocks.preferredDarkRef.value = true;

    mount(TestComponent);

    expect(themeMocks.toggleDarkMock).toHaveBeenCalledTimes(1);
    expect(themeMocks.toggleDarkMock).toHaveBeenCalledWith(true);
  });

  it('avoids toggling when the stored theme already matches the preference', () => {
    themeMocks.preferredDarkRef.value = false;
    themeMocks.isDarkRef.value = false;

    mount(TestComponent);

    expect(themeMocks.toggleDarkMock).not.toHaveBeenCalled();
  });
});
