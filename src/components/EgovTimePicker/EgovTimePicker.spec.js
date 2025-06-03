// EgovTimePicker.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EgovTimePicker from './EgovTimePicker.vue'
import { vuetify } from '@/plugins/vuetify' // Make sure to import your Vuetify instance

describe('EgovTimePicker', () => {
  it('renders with default props', () => {
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      }
    })
    
    expect(wrapper.find('.time-picker-label').text()).toBe('Choose a time')
    expect(wrapper.find('.time-input').exists()).toBe(true)
    expect(wrapper.find('.period-select').exists()).toBe(true)
  })

  it('accepts and displays custom label', () => {
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      },
      props: {
        label: 'Select Time'
      }
    })
    
    expect(wrapper.find('.time-picker-label').text()).toBe('Select Time')
  })

  it('shows required flag when required prop is true', () => {
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      },
      props: {
        required: true
      }
    })
    
    expect(wrapper.find('.required-flag').exists()).toBe(true)
  })

  it('validates time input format', async () => {
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      },
      props: {
        required: true
      }
    })
    
    const input = wrapper.find('.time-input input')
    await input.setValue('invalid')
    await input.trigger('blur')
    
    expect(wrapper.find('.v-messages__message').text()).toContain('Please enter time in HH:MM format')
  })

  it('emits update event when time changes', async () => {
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      }
    })
    
    const input = wrapper.find('.time-input input')
    await input.setValue('12:30')
    await wrapper.find('.period-select').setValue('PM')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[1]).toEqual(['12:30 PM'])
  })

  it('auto-formats time input', async () => {
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      }
    })
    
    const input = wrapper.find('.time-input input')
    await input.setValue('1230')
    
    expect(wrapper.vm.timeValue).toBe('12:30')
  })

  it('shows error message when provided', () => {
    const errorMsg = 'Invalid time format'
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      },
      props: {
        error: errorMsg
      }
    })
    
    expect(wrapper.find('.error-text').text()).toBe(errorMsg)
  })

  it('shows helper text when provided', () => {
    const helperText = 'Select a time between 9AM and 5PM'
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      },
      props: {
        helperText
      }
    })
    
    expect(wrapper.find('.helper-text').text()).toBe(helperText)
  })

  it('shows tooltip when provided', async () => {
    const tooltipText = 'Select your preferred time'
    const wrapper = mount(EgovTimePicker, {
      global: {
        plugins: [vuetify]
      },
      props: {
        tooltip: tooltipText
      }
    })
    
    const tooltipIcon = wrapper.find('.tooltip-icon')
    expect(tooltipIcon.exists()).toBe(true)
    
    // Note: Testing tooltip content might require additional setup
    // depending on how Vuetify implements tooltips
  })
})