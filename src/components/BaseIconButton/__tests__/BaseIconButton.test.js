import { mount } from '@vue/test-utils';
import { describe, it, expect } from '@jest/globals';
import BaseIconButton from '../BaseIconButton.vue';

describe('BaseIconButton', () => {
  // Test default rendering
  it('renders correctly with default props', () => {
    const wrapper = mount(BaseIconButton);
    expect(wrapper.classes()).toContain('v-btn');
    expect(wrapper.find('i').exists()).toBe(true);
  });

  // Test icon prop
  it('renders correct icon', () => {
    const wrapper = mount(BaseIconButton, {
      props: { icon: 'ri-home-line' }
    });
    expect(wrapper.find('i').classes()).toContain('ri-home-line');
  });

  // Test toggle functionality
  it('handles toggle state correctly', async () => {
    const wrapper = mount(BaseIconButton, {
      props: {
        isToggle: true,
        icon: 'ri-heart-line',
        toggleIcon: 'ri-heart-fill'
      }
    });
    
    await wrapper.trigger('click');
    expect(wrapper.emitted().toggle[0]).toEqual([true]);
    expect(wrapper.find('i').classes()).toContain('ri-heart-fill');
  });

  // Test disabled state
  it('applies disabled state correctly', () => {
    const wrapper = mount(BaseIconButton, {
      props: { disabled: true }
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  // Test loading state
  it('shows loading state correctly', () => {
    const wrapper = mount(BaseIconButton, {
      props: { loading: true }
    });
    expect(wrapper.classes()).toContain('v-btn--loading');
  });

  // Test size variants
  it.each(['x-small', 'small', 'default', 'large', 'x-large'])('applies correct size class: %s', (size) => {
    const wrapper = mount(BaseIconButton, {
      props: { size }
    });
    expect(wrapper.classes()).toContain(`v-btn--size-${size}`);
  });

  // Test custom icon size
  it('applies custom icon size style', () => {
    const wrapper = mount(BaseIconButton, {
      props: { iconSize: '24px' }
    });
    expect(wrapper.find('i').attributes('style')).toContain('font-size: 24px');
  });

  // Test aria-label
  it('sets correct aria-label', () => {
    const wrapper = mount(BaseIconButton, {
      props: { ariaLabel: 'Close button' }
    });
    expect(wrapper.attributes('aria-label')).toBe('Close button');
  });
});