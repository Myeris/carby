import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import Hero from './Hero.vue';

describe('Landing Hero', () => {
  it('renders the background artwork with responsive sources', () => {
    const wrapper = mount(Hero);

    const picture = wrapper.get('picture');
    expect(picture.findAll('source').length).toBeGreaterThan(0);

    const img = wrapper.get('img');
    expect(img.attributes('src')).toBe('/assets/images/landing_1200.jpg');
    expect(img.attributes('alt')).toContain('Marathon runners');

    const overlay = wrapper.get('[class*="bg-black/70"]');
    expect(overlay.classes()).toContain('bg-black/70');
  });
});

