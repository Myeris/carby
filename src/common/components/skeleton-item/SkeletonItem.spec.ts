import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import SkeletonItem from './SkeletonItem.vue';

const skeletonStub = defineComponent({
  name: 'SkeletonStub',
  inheritAttrs: false,
  setup(_, { attrs }) {
    return () => h('div', { 'data-test': 'skeleton-stub', ...attrs }, 'loading');
  },
});

describe('SkeletonItem', () => {
  it('renders the Skeleton placeholder when loading', () => {
    const wrapper = mount(SkeletonItem, {
      props: {
        isLoading: true,
      },
      slots: {
        default: '<p data-test="slot-content">Content</p>',
      },
      global: {
        stubs: {
          Skeleton: skeletonStub,
        },
      },
    });

    expect(wrapper.find('[data-test="skeleton-stub"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="slot-content"]').exists()).toBe(false);
  });

  it('renders slot content when not loading', () => {
    const wrapper = mount(SkeletonItem, {
      props: {
        isLoading: false,
      },
      slots: {
        default: '<p data-test="slot-content">Content</p>',
      },
      global: {
        stubs: {
          Skeleton: skeletonStub,
        },
      },
    });

    expect(wrapper.find('[data-test="skeleton-stub"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="slot-content"]').text()).toBe('Content');
  });
});

