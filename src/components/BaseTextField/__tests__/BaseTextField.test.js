import { mount } from '@vue/test-utils';
import { describe, it, expect } from '@jest/globals';
import BaseTextField from '../BaseTextField.vue';

describe('BaseTextField', () => {
  // Test default rendering
  it('renders correctly with default props', () => {
    const wrapper = mount(BaseTextField);
    expect(wrapper.classes()).toContain('base-text-field');
  });

  // Test label rendering
  it('renders label correctly', () => {
    const wrapper = mount(BaseTextField, {
      props: {
        label: 'Test Label',
        required: true
      }
    });
    expect(wrapper.text()).toContain('Test Label');
    expect(wrapper.find('.required-indicator').exists()).toBe(true);
  });

  // Test input value binding
  it('updates model value correctly', async () => {
    const wrapper = mount(BaseTextField);
    const input = wrapper.find('input');
    await input.setValue('test value');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['test value']);
  });

  // Test error state
  it('displays error state correctly', () => {
    const wrapper = mount(BaseTextField, {
      props: {
        error: true,
        errorMessages: 'Error message'
      }
    });
    expect(wrapper.find('.v-messages__message').text()).toBe('Error message');
  });

  // Test tooltip
  it('renders tooltip when helper text is provided', () => {
    const wrapper = mount(BaseTextField, {
      props: {
        tooltip: 'Helper text'
      }
    });
    expect(wrapper.find('.info-icon').exists()).toBe(true);
  });

  // Test disabled state
  it('applies disabled state correctly', () => {
    const wrapper = mount(BaseTextField, {
      props: { disabled: true }
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  // Test readonly state
  it('applies readonly state correctly', () => {
    const wrapper = mount(BaseTextField, {
      props: { readonly: true }
    });
    expect(wrapper.find('input').attributes('readonly')).toBeDefined();
  });

  // Test placeholder
  it('renders placeholder correctly', () => {
    const wrapper = mount(BaseTextField, {
      props: { placeholder: 'Enter text' }
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text');
  });

  // Test clearable functionality
  it('shows clear button when clearable is true', () => {
    const wrapper = mount(BaseTextField, {
      props: {
        clearable: true,
        modelValue: 'test'
      }
    });
    expect(wrapper.find('.v-input__append-inner').exists()).toBe(true);
  });
});