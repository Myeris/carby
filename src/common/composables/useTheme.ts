import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  storageKey: 'carby-color-scheme',
  valueDark: 'dark',
  valueLight: ''
});

const toggleDark = useToggle(isDark);

export function useTheme() {
  return {
    isDark,
    toggleDark
  };
}

