import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import Footer from './Footer.vue';

const buttonStub = defineComponent({
  name: 'ButtonStub',
  setup(_, { slots }) {
    return () => h('button', { 'data-test': 'button-stub' }, slots.default?.());
  },
});

const creditsStub = defineComponent({
  name: 'CreditsStub',
  setup() {
    return () => h('div', { 'data-test': 'credits-stub' }, 'Credits');
  },
});

function mountFooter() {
  return mount(Footer, {
    global: {
      stubs: {
        Button: buttonStub,
        Credits: creditsStub,
      },
    },
  });
}

describe('Footer', () => {
  it('renders the current year notice', () => {
    const wrapper = mountFooter();
    const currentYear = new Date().getFullYear();

    expect(wrapper.text()).toContain(`© ${currentYear} Carby. All rights reserved.`);
  });

  it('includes a link to the developer profile', () => {
    const wrapper = mountFooter();

    const link = wrapper.get('a[href="https://github.com/Myeris"]');
    expect(link.text()).toContain('Developed by Marie Foussette');
  });

  it('renders the credits entry', () => {
    const wrapper = mountFooter();

    expect(wrapper.find('[data-test="credits-stub"]').exists()).toBe(true);
  });
});
