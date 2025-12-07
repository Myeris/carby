import { useDark, useMediaQuery, usePreferredDark, useToggle } from '@vueuse/core';
import { onMounted } from 'vue';

export const THEME_STORAGE_KEY = 'carby-color-scheme';
const isDark = useDark({
  storageKey: THEME_STORAGE_KEY,
  valueDark: 'dark',
  valueLight: '',
});

const toggleDark = useToggle(isDark);

const isLargeScreen = useMediaQuery('(min-width: 40rem)');

export function useTheme() {
  onMounted(() => {
    const prefersDark = usePreferredDark();
    if (prefersDark.value !== isDark.value) {
      toggleDark(prefersDark.value);
    }
  });

  return {
    isDark,
    isLargeScreen,
    toggleDark,
  };
}
