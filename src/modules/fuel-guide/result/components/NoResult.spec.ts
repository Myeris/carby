import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import NoResult from './NoResult.vue';

const emptyStub = {
  template: '<div data-test="empty"><slot /></div>',
};

const emptyHeaderStub = {
  template: '<div data-test="empty-header"><slot /></div>',
};

const emptyMediaStub = {
  template: '<div data-test="empty-media"><slot /></div>',
};

const emptyTitleStub = {
  template: '<div data-test="empty-title"><slot /></div>',
};

const emptyDescriptionStub = {
  template: '<p data-test="empty-description"><slot /></p>',
};

describe('NoResult', () => {
  it('renders the encouraging empty state', () => {
    const wrapper = mount(NoResult, {
      global: {
        stubs: {
          Empty: emptyStub,
          EmptyHeader: emptyHeaderStub,
          EmptyMedia: emptyMediaStub,
          EmptyTitle: emptyTitleStub,
          EmptyDescription: emptyDescriptionStub,
        },
      },
    });

    expect(wrapper.text()).toContain("You're all set!");
    expect(wrapper.text()).toContain("You don't need anything! Just enjoy your workout.");
  });
});

