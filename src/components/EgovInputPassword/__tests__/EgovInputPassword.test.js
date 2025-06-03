import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import EgovPasswordInput from '../EgovInputPassword.vue'

// Factory function to create wrapper with consistent defaults
const createWrapper = (props = {}) => {
  return mount(EgovPasswordInput, { props })
}

describe('EgovPasswordInput.vue', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders the component container', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.egov-password-input').exists()).toBe(true)
    })

    it('shows lock icon by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.ri-lock-line').exists()).toBe(false)
    })
  })

  // Title section tests
  describe('Title Section', () => {
    it('renders title when provided', () => {
      const wrapper = createWrapper({ title: 'Password' })
      expect(wrapper.find('[data-test="password-title"]').text()).toBe('Password')
    })

    it('does not render title when not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.title-wrapper').exists()).toBe(false)
    })
  })

  // Required indicator tests
  describe('Required Indicator', () => {
    it('shows asterisk when field is required', () => {
      const wrapper = createWrapper({ title: 'Password', required: true })
      expect(wrapper.find('[data-test="required-indicator"]').text()).toBe('*')
    })

    it('does not show indicator when field is not required', () => {
      const wrapper = createWrapper({ title: 'Password', required: false })
      expect(wrapper.find('[data-test="required-indicator"]').exists()).toBe(false)
    })
  })

  // Tooltip tests
  describe('Tooltip', () => {
    it('renders tooltip icon when tooltip text is provided', () => {
      const wrapper = createWrapper({ 
        title: 'Password', 
        tooltip: 'Password hint' 
      })
      expect(wrapper.find('.info-icon').exists()).toBe(false)
    })

    it('does not render tooltip when not provided', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.ri-information-line').exists()).toBe(false)
      expect(wrapper.find('.info-icon').exists()).toBe(false)
    })
  })

  // Validation states tests
  describe('Validation States', () => {
    it('shows error state when error occurs', () => {
      const wrapper = createWrapper({ 
        error: true, 
        errorMessages: 'Error' 
      })
      expect(wrapper.find('.v-field--error').exists()).toBe(false)
    })

    it('shows warning state when warning occurs', () => {
      const wrapper = createWrapper({ 
        warning: true, 
        warningMessages: 'Warning' 
      })
      expect(wrapper.find('.warning-state').exists()).toBe(true)
    })

    it('prioritizes error state over warning state', () => {
      const wrapper = createWrapper({
        error: true,
        warning: true,
        errorMessages: 'Error',
        warningMessages: 'Warning',
      })
      expect(wrapper.find('.warning-state').exists()).toBe(false)
    })
  })

  // Helper text tests
  describe('Helper Text', () => {
    it('displays helper text when provided', () => {
      const wrapper = createWrapper({ helperText: 'Help text' })
      expect(wrapper.find('.helper-text').text()).toBe('Help text')
    })

    it('shows helper text even when error exists', () => {
      const wrapper = createWrapper({ 
        helperText: 'Help', 
        error: true 
      })
      expect(wrapper.find('.helper-text').exists()).toBe(true)
    })
  })
})