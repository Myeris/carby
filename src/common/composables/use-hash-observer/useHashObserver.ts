import { useIntersectionObserver } from '@vueuse/core';
import { type MaybeRef, onBeforeUnmount, onMounted, ref, unref } from 'vue';

type MaybeArray<T> = T[] | Set<T>;

function normalizeIds(ids: MaybeArray<string>) {
  return Array.from(ids).filter(Boolean);
}

function getUrlWithHash(hash: string) {
  const { pathname, search } = window.location;
  return `${pathname}${search}${hash}`;
}

function syncHashWithSection(sectionId: string) {
  if (typeof window === 'undefined' || !sectionId) return;

  const nextHash = `#${sectionId}`;

  if (window.location.hash === nextHash) {
    return;
  }

  window.history.replaceState(window.history.state, '', getUrlWithHash(nextHash));
}

function getTopEntry(entries: IntersectionObserverEntry[]) {
  const visibleEntries = entries.filter((entry) => entry.isIntersecting);

  if (!visibleEntries.length) return undefined;

  return visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
}

export function useHashObserver(sectionIds: MaybeRef<MaybeArray<string>>) {
  const activeSection = ref<string | null>(null);
  const sectionElements = ref<HTMLElement[]>([]);
  let stopObserver: (() => void) | null = null;

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    const topEntry = getTopEntry(entries);
    if (!topEntry) return;

    const sectionId = (topEntry.target as HTMLElement).id;

    if (sectionId && sectionId !== activeSection.value) {
      activeSection.value = sectionId;
      syncHashWithSection(sectionId);
    }
  }

  onMounted(() => {
    if (!window?.IntersectionObserver) {
      return;
    }

    const ids = normalizeIds(unref(sectionIds));
    sectionElements.value = ids
      .map((sectionId) => document.getElementById(sectionId))
      .filter((sectionEl): sectionEl is HTMLElement => Boolean(sectionEl));

    const observer = useIntersectionObserver(
      () => sectionElements.value,
      (entries) => handleIntersection(entries),
      { threshold: [0, 0.25, 0.5, 0.75, 0.9, 1] },
    );

    stopObserver = observer.stop;
  });

  onBeforeUnmount(() => {
    stopObserver?.();
    stopObserver = null;
  });

  return {
    activeSection,
  };
}
