import { mount } from '@vue/test-utils'
import EgovNumberInput from './EgovNumberInput.vue'

describe('EgovNumberInput', () => {
  let wrapper

  const factory = (props = {}) => {
    return mount(EgovNumberInput, {
      props: {
        modelValue: 0,
        ...props
      }
    })
  }

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Initialization', () => {
    it('initializes with default value', async () => {
      wrapper = factory()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(0)
    })

    it('accepts initial value from props', async () => {
      wrapper = factory({ modelValue: 5 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(5)
    })

    it('handles string input values', async () => {
      wrapper = factory({ modelValue: '10' })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(10)
    })

    it('handles invalid string input', async () => {
      wrapper = factory({ modelValue: 'abc', min: 0 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(0)
      expect(wrapper.vm.errorState.hasParseError).toBe(true)
    })
  })

  describe('Value Handling', () => {
    it('updates internal value when prop changes', async () => {
      wrapper = factory({ modelValue: 5 })
      await wrapper.setProps({ modelValue: 10 })
      expect(wrapper.vm.internalValue).toBe(10)
    })

    it('emits update event when value changes', async () => {
      wrapper = factory()
      await wrapper.findComponent({ name: 'v-number-input' }).vm.$emit('input', 5)
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([5])
    })

    it('handles decimal steps', async () => {
      wrapper = factory({ modelValue: 1, step: 0.1 })
      wrapper.vm.forceIncrement()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(1.1)
    })
  })

  describe('Increment/Decrement', () => {
    it('increments value by step', async () => {
      wrapper = factory({ modelValue: 5, step: 2 })
      await wrapper.find('[data-test="increment-btn"]').trigger('mousedown')
      expect(wrapper.vm.internalValue).toBe(7)
    })

    it('decrements value by step', async () => {
      wrapper = factory({ modelValue: 5, step: 2 })
      await wrapper.find('[data-test="decrement-btn"]').trigger('mousedown')
      expect(wrapper.vm.internalValue).toBe(3)
    })

    it('respects max value', async () => {
      wrapper = factory({ modelValue: 9, max: 10, step: 2 })
      await wrapper.find('[data-test="increment-btn"]').trigger('mousedown')
      expect(wrapper.vm.internalValue).toBe(10)
      expect(wrapper.vm.errorState.hasRangeError).toBe(true)
    })

    it('respects min value', async () => {
      wrapper = factory({ modelValue: 2, min: 0, step: 3 })
      await wrapper.find('[data-test="decrement-btn"]').trigger('mousedown')
      expect(wrapper.vm.internalValue).toBe(0)
      expect(wrapper.vm.errorState.hasRangeError).toBe(true)
    })

    it('disables increment button at max', async () => {
      wrapper = factory({ modelValue: 10, max: 10 })
      expect(wrapper.find('[data-test="increment-btn"]').attributes('disabled')).toBeDefined()
    })

    it('disables decrement button at min', async () => {
      wrapper = factory({ modelValue: 0, min: 0 })
      expect(wrapper.find('[data-test="decrement-btn"]').attributes('disabled')).toBeDefined()
    })
  })

  describe('Validation', () => {
    it('validates min boundary', async () => {
      wrapper = factory({ modelValue: 5, min: 10 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(10)
      expect(wrapper.vm.errorState.hasRangeError).toBe(true)
    })

    it('validates max boundary', async () => {
      wrapper = factory({ modelValue: 15, max: 10 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(10)
      expect(wrapper.vm.errorState.hasRangeError).toBe(true)
    })

    it('clears errors on valid input', async () => {
      wrapper = factory({ modelValue: 'abc', min: 0 })
      await wrapper.setProps({ modelValue: 5 })
      expect(wrapper.vm.errorState.hasParseError).toBe(false)
    })
  })

  describe('UI States', () => {
    it('shows error state', async () => {
      wrapper = factory({ errorMessage: 'Test error' })
      expect(wrapper.classes()).toContain('error')
      expect(wrapper.find('.error-text').text()).toBe('Test error')
    })

    it('shows warning state', async () => {
      wrapper = factory({ warningMessage: 'Test warning' })
      expect(wrapper.classes()).toContain('warning')
      expect(wrapper.find('.warning-text').text()).toBe('Test warning')
    })

    it('shows disabled state', async () => {
      wrapper = factory({ disabled: true })
      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.findComponent({ name: 'v-number-input' }).props('disabled')).toBe(true)
    })

    it('shows focus state', async () => {
      wrapper = factory()
      await wrapper.findComponent({ name: 'v-number-input' }).vm.$emit('focus')
      expect(wrapper.classes()).toContain('focus')
    })
  })

  describe('Edge Cases', () => {
    it('handles null initial value with min', async () => {
      wrapper = factory({ modelValue: null, min: 5 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(5)
    })

    it('handles undefined initial value', async () => {
      wrapper = factory({ modelValue: undefined, min: 0 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(0)
    })

    it('handles empty string input', async () => {
      wrapper = factory({ modelValue: '', min: 0 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.internalValue).toBe(0)
    })
  })
})