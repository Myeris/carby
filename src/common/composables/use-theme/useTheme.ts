import { useDark, usePreferredDark, useToggle } from '@vueuse/core';
import { onMounted } from 'vue';

export const THEME_STORAGE_KEY = 'carby-color-scheme';
const isDark = useDark({
  storageKey: THEME_STORAGE_KEY,
  valueDark: 'dark',
  valueLight: '',
});

const toggleDark = useToggle(isDark);

export function useTheme() {
  onMounted(() => {
    const prefersDark = usePreferredDark();
    if (prefersDark.value !== isDark.value) {
      toggleDark(prefersDark.value);
    }
  });

  return {
    isDark,
    toggleDark,
  };
}
