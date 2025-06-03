import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
import EgovTextarea from '@/components/common/EgovTextArea.vue'

describe('EgovTextarea.vue', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return mount(EgovTextarea, {
      props: {
        modelValue: '',
        ...props,
      },
      global: {
        // Add any necessary mocks or plugins here
      }
    })
  }

  describe('Component Rendering', () => {
    it('should mount successfully', () => {
      wrapper = createWrapper()
      expect(wrapper.find('.egov-textarea').exists()).toBe(true)
    })

    it('should render label when provided', () => {
      wrapper = createWrapper({ label: 'Test Label' })
      expect(wrapper.find('.text-subtitle-1').text()).toBe('Test Label')
    })

    it('should show required indicator when required', () => {
      wrapper = createWrapper({ label: 'Test', required: true })
      expect(wrapper.find('.required-indicator').text()).toBe('*')
    })

    // it('should show tooltip when helperText is provided', () => {
    //   wrapper = createWrapper({ helperText: 'Help text' })
    //   expect(wrapper.find('.custom-icon').exists()).toBe(true)
    // })
  })

  describe('Textarea Functionality', () => {
    beforeEach(() => {
      wrapper = createWrapper({ modelValue: 'initial value' })
    })

    it('should bind modelValue to textarea', () => {
      const textarea = wrapper.find('.egov-textarea')
      expect(textarea.element.value).toBe('initial value')
    })

    it('should emit update:modelValue when text changes', async () => {
      const textarea = wrapper.find('.egov-textarea')
      await textarea.setValue('new value')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value'])
    })

    it('should update localValue when prop changes', async () => {
      await wrapper.setProps({ modelValue: 'updated value' })
      expect(wrapper.vm.localValue).toBe('updated value')
    })
  })

  // describe('Props Validation', () => {
  //   it('should handle disabled state', () => {
  //     wrapper = createWrapper({ disabled: true })
  //     expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  //   })

  //   it('should handle readonly state', () => {
  //     wrapper = createWrapper({ readonly: true })
  //     expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
  //   })

  //   it('should apply correct variant', () => {
  //     wrapper = createWrapper({ variant: 'filled' })
  //     expect(wrapper.find('.v-field--variant-filled').exists()).toBe(true)
  //   })

  //   it('should show counter when maxLength is set', () => {
  //     wrapper = createWrapper({ maxLength: 100 })
  //     expect(wrapper.find('.v-counter').exists()).toBe(true)
  //   })

  //   it('should show error state and messages', () => {
  //     wrapper = createWrapper({
  //       error: true,
  //       errorMessages: 'Invalid input'
  //     })
  //     expect(wrapper.find('.v-field--error').exists()).toBe(true)
  //     expect(wrapper.find('.v-messages--error').text()).toContain('Invalid input')
  //   })

  //   it('should apply autoGrow when enabled', () => {
  //     wrapper = createWrapper({ autoGrow: true })
  //     expect(wrapper.find('.v-textarea').attributes('autogrow')).toBeDefined()
  //   })

  //   it('should show correct number of rows', () => {
  //     wrapper = createWrapper({ rows: 5 })
  //     expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  //   })
  // })

  // describe('Slots', () => {
  //   it('should render prepend slot content', () => {
  //     wrapper = mount(EgovTextarea, {
  //       slots: {
  //         prepend: '<v-icon>mdi-lock</v-icon>'
  //       }
  //     })
  //     expect(wrapper.find('.mdi-lock').exists()).toBe(true)
  //   })

  //   it('should render append slot content', () => {
  //     wrapper = mount(EgovTextarea, {
  //       slots: {
  //         append: '<v-icon>mdi-eye</v-icon>'
  //       }
  //     })
  //     expect(wrapper.find('.mdi-eye').exists()).toBe(true)
  //   })
  // })

  // describe('Edge Cases', () => {
  //   it('should handle null modelValue', async () => {
  //     wrapper = createWrapper({ modelValue: null })
  //     expect(wrapper.find('textarea').element.value).toBe('')
  //   })

  //   it('should handle undefined modelValue', async () => {
  //     wrapper = createWrapper({ modelValue: undefined })
  //     expect(wrapper.find('textarea').element.value).toBe('')
  //   })

  //   it('should prioritize error state over warning', () => {
  //     wrapper = createWrapper({
  //       error: true,
  //       warning: true,
  //       errorMessages: 'Error',
  //       warningMessages: 'Warning'
  //     })
  //     expect(wrapper.find('.v-field--error').exists()).toBe(true)
  //   })
  // })
})