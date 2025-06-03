import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import EgovSelectDropdown from './EgovSelectDropdown.vue'

describe('EgovSelectDropdown', () => {
  let wrapper
  const items = [
    { title: 'Option 1', value: '1' },
    { title: 'Option 2', value: '2' },
    { title: 'Option 3', value: '3' }
  ]

  beforeEach(() => {
    wrapper = mount(EgovSelectDropdown, {
      props: {
        items,
        itemTitle: 'title',
        itemValue: 'value'
      }
    })
  })

  // Test Case 1: Basic Rendering and Props
  it('renders correctly with default props', () => {
    // Check main elements
    expect(wrapper.find('.egov-select-dropdown').exists()).toBe(true)
    expect(wrapper.find('v-combobox-stub').exists()).toBe(true)
    
    // Default props
    expect(wrapper.props('placeholder')).toBe('Select an option')
    expect(wrapper.props('multiple')).toBe(false)
    expect(wrapper.props('clearable')).toBe(false)
  })

  // Test Case 2: Label and Required Indicator
  it('displays label and required indicator when provided', async () => {
    await wrapper.setProps({ label: 'Test Label', required: true })
    
    const label = wrapper.find('.egov-select-label')
    expect(label.text()).toContain('Test Label')
    expect(label.find('.required-indicator').text()).toBe('*')
  })

  // Test Case 3: Tooltip Functionality
  it('shows tooltip when provided', async () => {
    await wrapper.setProps({ tooltip: 'Test tooltip text' })
    
    const tooltip = wrapper.find('v-tooltip-stub')
    expect(tooltip.attributes('text')).toBe('Test tooltip text')
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  // Test Case 4: Selection Handling
  it('handles single selection correctly', async () => {
    await wrapper.setProps({ modelValue: '1' })
    expect(wrapper.vm.isSelected(items[0])).toBe(true)
    expect(wrapper.vm.isSelected(items[1])).toBe(false)
  })

  // Test Case 5: Multiple Selection
  it('handles multiple selection correctly', async () => {
    await wrapper.setProps({ multiple: true, modelValue: ['1', '2'] })
    expect(wrapper.vm.isSelected(items[0])).toBe(true)
    expect(wrapper.vm.isSelected(items[1])).toBe(true)
    expect(wrapper.vm.isSelected(items[2])).toBe(false)
  })

  // Test Case 6: Clear Selection
  it('clears selection when clear icon is clicked', async () => {
    await wrapper.setProps({ modelValue: '1', clearable: true })
    await wrapper.find('.clear-icon').trigger('click')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
  })

  // Test Case 7: Disabled State
  it('applies disabled state correctly', async () => {
    await wrapper.setProps({ disabled: true })
    const combobox = wrapper.find('v-combobox-stub')
    expect(combobox.attributes('disabled')).toBe('true')
  })

  // Test Case 8: Error State
  it('shows error state and messages', async () => {
    const errorMsg = 'This field is required'
    await wrapper.setProps({ error: true, errorMessages: errorMsg })
    
    const combobox = wrapper.find('v-combobox-stub')
    expect(combobox.attributes('error')).toBe('true')
    expect(combobox.attributes('error-messages')).toBe(errorMsg)
  })

  // Test Case 9: Item Rendering
  it('renders dropdown items correctly', () => {
    const itemProps = {
      props: {
        title: 'Test Item',
        value: 'test'
      }
    }
    
    const itemSlot = wrapper.vm.$slots.item({ 
      props: {}, 
      item: itemProps 
    })
    
    expect(itemSlot[0].children).toContain('Test Item')
    expect(itemSlot[0].children.some(c => c.type === 'v-icon')).toBe(true)
  })

  // Test Case 10: Variant and Density
  it('applies variant and density props', async () => {
    await wrapper.setProps({ variant: 'filled', density: 'compact' })
    const combobox = wrapper.find('v-combobox-stub')
    
    expect(combobox.attributes('variant')).toBe('filled')
    expect(combobox.attributes('density')).toBe('compact')
  })
})