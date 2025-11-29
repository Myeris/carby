import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import FormItem from './FormItem.vue';

describe('FormItem', () => {
  it('renders the title and slot content', () => {
    const wrapper = mount(FormItem, {
      props: {
        title: 'Hydration',
      },
      slots: {
        default: '<p data-test="slot-content">Slot content</p>',
      },
    });

    expect(wrapper.get('h3').text()).toBe('Hydration');
    expect(wrapper.get('[data-test="slot-content"]').text()).toBe('Slot content');
  });
});

