import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h, markRaw } from 'vue';

import ResultItem from './ResultItem.vue';

const IconStub = defineComponent({
  name: 'IconStub',
  setup() {
    return () => h('span', { 'data-test': 'icon-stub' }, 'icon');
  },
});

describe('ResultItem', () => {
  it('renders the icon, title, and provided slot', () => {
    const wrapper = mount(ResultItem, {
      props: {
        title: 'Calories',
        icon: markRaw(IconStub),
      },
      slots: {
        default: '<div data-test="slot-content">42 g</div>',
      },
    });

    expect(wrapper.get('h4').text()).toContain('Calories');
    expect(wrapper.find('[data-test="icon-stub"]').exists()).toBe(true);
    expect(wrapper.get('[data-test="slot-content"]').text()).toBe('42 g');
  });
});

