import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import Credits from './Credits.vue';

const buttonStub = defineComponent({
  name: 'ButtonStub',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          'data-test': 'button-stub',
          ...attrs,
        },
        slots.default?.(),
      );
  },
});

function createDialogStub(componentName: string) {
  const testId = componentName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

  return defineComponent({
    name: `${componentName}Stub`,
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () =>
        h(
          'div',
          {
            'data-test': `${testId}-stub`,
            ...attrs,
          },
          slots.default?.(),
        );
    },
  });
}

const dialogStub = createDialogStub('Dialog');
const dialogTriggerStub = createDialogStub('DialogTrigger');
const dialogContentStub = createDialogStub('DialogContent');
const dialogDescriptionStub = createDialogStub('DialogDescription');
const dialogHeaderStub = createDialogStub('DialogHeader');
const dialogTitleStub = createDialogStub('DialogTitle');

const expectedDataSources = [
  {
    name: 'Jeukendrup, A. (2014). A step towards personalized sports nutrition.',
    url: 'https://www.mysportscience.com/post/how-much-carbohydrate-can-you-really-absorb-per-hour',
  },
  {
    name: 'Jeukendrup, A. E. (2010). Carbohydrate and exercise performance.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20351006/',
  },
  {
    name: 'Thomas, D. T. et al. (2016). Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the ACSM: Nutrition and Athletic Performance.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26891166/',
  },
  {
    name: 'IOC Consensus Statement on Sports Nutrition (2010 & updates)',
    url: 'https://bjsm.bmj.com/content/44/10/647',
  },
  {
    name: 'ACSM Position Stand – Exercise and Fluid Replacement',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15235353/',
  },
  {
    name: 'Sawka et al. (2007). Human hydration research',
    url: 'https://pubmed.ncbi.nlm.nih.gov/17622298/',
  },
  {
    name: 'Cheuvront & Kenefick. (2017). Sodium, fluid balance, and sweat rate references',
    url: 'https://journals.physiology.org/doi/full/10.1152/japplphysiol.00914.2016',
  },
  {
    name: 'Precision Hydration sweat-rate data',
    url: 'https://www.precisionhydration.com/pages/science',
  },
  {
    name: 'Baker et al. (2019). Variability of sweat sodium concentration in athletes',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30480738/',
  },
  {
    name: 'GSSI – sweat composition analysis',
    url: 'https://www.gssiweb.org/sports-science-exchange/article/sweat-rate-and-fluid-replacement',
  },
  {
    name: 'Precision Hydration – salt loss research summary',
    url: 'https://www.precisionhydration.com/pages/why-we-lose-salt-when-we-sweat',
  },
];

function mountCredits() {
  return mount(Credits, {
    global: {
      stubs: {
        Button: buttonStub,
        Dialog: dialogStub,
        DialogTrigger: dialogTriggerStub,
        DialogContent: dialogContentStub,
        DialogDescription: dialogDescriptionStub,
        DialogHeader: dialogHeaderStub,
        DialogTitle: dialogTitleStub,
      },
    },
  });
}

describe('Credits', () => {
  it('renders the credits trigger button', () => {
    const wrapper = mountCredits();

    const triggerButton = wrapper.find('[data-test="button-stub"]');
    expect(triggerButton.exists()).toBe(true);
    expect(triggerButton.text()).toContain('Credits');
  });

  it('lists every data source with the correct link', () => {
    const wrapper = mountCredits();

    const listItems = wrapper.findAll('ul li');
    expect(listItems).toHaveLength(expectedDataSources.length);

    expectedDataSources.forEach((source, index) => {
      const link = listItems[index]!.find('a');
      expect(link.text()).toBe(source.name);
      expect(link.attributes('href')).toBe(source.url);
      expect(link.attributes('target')).toBe('_blank');
    });
  });
});
