import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, type PropType } from 'vue';

const intersectionObserverMocks = vi.hoisted(() => {
  const storage: {
    callback: ((entries: IntersectionObserverEntry[]) => void) | null;
    stopObserver: ReturnType<typeof vi.fn>;
    mockFn: ReturnType<typeof vi.fn>;
  } = {
    callback: null,
    stopObserver: vi.fn(),
    mockFn: vi.fn(),
  };

  storage.mockFn = vi.fn(
    (_targetsGetter, callback: (entries: IntersectionObserverEntry[]) => void) => {
      storage.callback = callback;
      return { stop: storage.stopObserver };
    },
  );

  return storage;
});

vi.mock('@vueuse/core', () => ({
  useIntersectionObserver: intersectionObserverMocks.mockFn,
}));

import { useHashObserver } from './useHashObserver.ts';

const ObserverComponent = defineComponent({
  props: {
    ids: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const { activeSection } = useHashObserver(props.ids);
    return { activeSection };
  },
  template: '<span data-test="active-section">{{ activeSection }}</span>',
});

function createSection(id: string) {
  const el = document.createElement('section');
  el.id = id;
  document.body.appendChild(el);
  return el;
}

describe('useHashObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.IntersectionObserver = vi.fn() as unknown as typeof IntersectionObserver;
    intersectionObserverMocks.stopObserver.mockClear();
    intersectionObserverMocks.mockFn.mockClear();
    intersectionObserverMocks.callback = null;
    window.location.hash = '';
  });

  it('updates the active section and the URL hash when the top entry changes', async () => {
    const sectionA = createSection('section-a');
    const sectionB = createSection('section-b');
    const replaceSpy = vi.spyOn(window.history, 'replaceState');

    const wrapper = mount(ObserverComponent, {
      props: { ids: ['section-a', 'section-b'] },
    });

    expect(intersectionObserverMocks.mockFn).toHaveBeenCalledTimes(1);
    expect(intersectionObserverMocks.callback).toBeTruthy();

    intersectionObserverMocks.callback?.([
      {
        isIntersecting: true,
        intersectionRatio: 0.4,
        target: sectionA,
      } as unknown as IntersectionObserverEntry,
      {
        isIntersecting: true,
        intersectionRatio: 0.9,
        target: sectionB,
      } as unknown as IntersectionObserverEntry,
    ]);

    await nextTick();
    expect(wrapper.get('[data-test="active-section"]').text()).toBe('section-b');
    expect(replaceSpy).toHaveBeenCalledWith(
      window.history.state,
      '',
      expect.stringContaining('#section-b'),
    );

    replaceSpy.mockRestore();
  });

  it('stops the observer when the component unmounts', () => {
    createSection('section-a');
    const wrapper = mount(ObserverComponent, { props: { ids: ['section-a'] } });

    wrapper.unmount();

    expect(intersectionObserverMocks.stopObserver).toHaveBeenCalledTimes(1);
  });

  it('does not initialize when the browser lacks IntersectionObserver support', () => {
    // @ts-expect-error: explicitly unset for the test
    window.IntersectionObserver = undefined;
    createSection('section-a');

    mount(ObserverComponent, { props: { ids: ['section-a'] } });

    expect(intersectionObserverMocks.mockFn).not.toHaveBeenCalled();
  });
});
