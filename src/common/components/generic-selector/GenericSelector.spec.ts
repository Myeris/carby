import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import GenericSelector from './GenericSelector.vue';

const iconStub = defineComponent({
  name: 'IconStub',
  setup() {
    return () => h('span', { 'data-test': 'icon-stub' }, 'icon');
  },
});

const toggleGroupStub = defineComponent({
  name: 'ToggleGroupStub',
  emits: ['update:modelValue'],
  setup(_, { slots }) {
    return () => h('div', { 'data-test': 'toggle-group-stub' }, slots.default?.());
  },
});

const toggleGroupItemStub = defineComponent({
  name: 'ToggleGroupItemStub',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          'data-test': 'toggle-group-item-stub',
          ...attrs,
        },
        slots.default?.(),
      );
  },
});

const formItemStub = defineComponent({
  name: 'FormItemStub',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { 'data-test': 'form-item-stub' }, [
        h('h3', { 'data-test': 'form-item-title' }, props.title),
        slots.default?.(),
      ]);
  },
});

const defaultOptions = [
  { id: 'option-a', label: 'Option A' },
  { id: 'option-b', label: 'Option B', icon: iconStub },
];

function mountGenericSelector(options = defaultOptions) {
  return mount(GenericSelector, {
    props: {
      title: 'Test selector',
      options,
    },
    global: {
      stubs: {
        ToggleGroup: toggleGroupStub,
        ToggleGroupItem: toggleGroupItemStub,
        FormItem: formItemStub,
      },
    },
  });
}

describe('GenericSelector', () => {
  it('renders the provided title and options', () => {
    const wrapper = mountGenericSelector();

    expect(wrapper.find('[data-test="form-item-title"]').text()).toBe('Test selector');
    defaultOptions.forEach((option) => {
      const optionNode = wrapper.find(`[data-cy="${option.id}"]`);
      expect(optionNode.exists()).toBe(true);
      expect(optionNode.text()).toContain(option.label);
    });
  });

  it('emits optionSelected when ToggleGroup updates its value', () => {
    const wrapper = mountGenericSelector();
    const toggleGroup = wrapper.findComponent(toggleGroupStub);

    toggleGroup.vm.$emit('update:modelValue', 'option-b');

    expect(wrapper.emitted('optionSelected')).toEqual([['option-b']]);
  });

  it('renders option icons when provided', () => {
    const wrapper = mountGenericSelector();

    const optionWithIcon = wrapper.find('[data-cy="option-b"]');
    expect(optionWithIcon.find('[data-test="icon-stub"]').exists()).toBe(true);
  });
});

