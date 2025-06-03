import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import EgovIconButton from './EgovIconButton.vue'

describe('EgovIconButton.vue', () => {
  // Basic rendering test
  it('renders correctly with default props', () => {
    const wrapper = mount(EgovIconButton)
    expect(wrapper.find('.v-icon-btn').exists()).toBe(true)
    expect(wrapper.find('.mdi-arrow-right').exists()).toBe(true)
  })

  // Variant tests
  describe('Button Variants', () => {
    it('applies flat variant styles', () => {
      const wrapper = mount(EgovIconButton, {
        props: { variant: 'flat' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--variant-flat')
    })

    it('applies outlined variant styles', () => {
      const wrapper = mount(EgovIconButton, {
        props: { variant: 'outlined' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--variant-outlined')
    })

    it('applies tonal variant styles', () => {
      const wrapper = mount(EgovIconButton, {
        props: { variant: 'tonal' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--variant-tonal')
    })

    it('applies text variant styles', () => {
      const wrapper = mount(EgovIconButton, {
        props: { variant: 'text' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--variant-text')
    })

    it('applies elevated variant styles', () => {
      const wrapper = mount(EgovIconButton, {
        props: { variant: 'elevated' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--variant-elevated')
    })
  })

  // Size tests
  describe('Button Sizes', () => {
    it('applies x-small size', () => {
      const wrapper = mount(EgovIconButton, {
        props: { size: 'x-small' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--size-x-small')
    })

    it('applies small size', () => {
      const wrapper = mount(EgovIconButton, {
        props: { size: 'small' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--size-small')
    })

    it('applies large size', () => {
      const wrapper = mount(EgovIconButton, {
        props: { size: 'large' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--size-large')
    })

    it('applies x-large size', () => {
      const wrapper = mount(EgovIconButton, {
        props: { size: 'x-large' }
      })
      expect(wrapper.classes()).toContain('v-icon-btn--size-x-large')
    })
  })

  // State tests
  describe('Button States', () => {
    it('disables the button when disabled prop is true', () => {
      const wrapper = mount(EgovIconButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.classes()).toContain('v-icon-btn--disabled')
    })

    it('shows loading state', () => {
      const wrapper = mount(EgovIconButton, {
        props: { loading: true }
      })
      expect(wrapper.find('.v-icon-btn__loading').exists()).toBe(true)
    })
  })

  // Icon tests
  describe('Icon Handling', () => {
    it('renders custom icon', () => {
      const wrapper = mount(EgovIconButton, {
        props: { icon: 'mdi-cog' }
      })
      expect(wrapper.find('.mdi-cog').exists()).toBe(true)
    })

    it('applies custom icon size', () => {
      const wrapper = mount(EgovIconButton, {
        props: { iconSize: 24 }
      })
      const icon = wrapper.find('.v-icon')
      expect(icon.attributes('style')).toContain('font-size: 24px')
    })

    it('uses toggle icon when toggled', async () => {
      const wrapper = mount(EgovIconButton, {
        props: { 
          isToggle: true,
          icon: 'mdi-heart-outline',
          toggleIcon: 'mdi-heart'
        }
      })
      
      // Initial state
      expect(wrapper.find('.mdi-heart-outline').exists()).toBe(true)
      
      // Toggle and check icon change
      await wrapper.trigger('click')
      expect(wrapper.find('.mdi-heart').exists()).toBe(true)
    })
  })

  // Toggle functionality tests
  describe('Toggle Functionality', () => {
    it('toggles state when clicked', async () => {
      const wrapper = mount(EgovIconButton, {
        props: { isToggle: true }
      })
      
      expect(wrapper.vm.toggled).toBe(false)
      await wrapper.trigger('click')
      expect(wrapper.vm.toggled).toBe(true)
    })

    it('emits toggle event', async () => {
      const wrapper = mount(EgovIconButton, {
        props: { isToggle: true }
      })
      
      await wrapper.trigger('click')
      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')[0]).toEqual([true])
    })

    it('changes color when toggled if toggleColor is provided', async () => {
      const wrapper = mount(EgovIconButton, {
        props: { 
          isToggle: true,
          color: 'primary',
          toggleColor: 'error'
        }
      })
      
      // Initial color
      expect(wrapper.classes()).toContain('text-primary')
      
      // Toggle and check color change
      await wrapper.trigger('click')
      expect(wrapper.classes()).toContain('text-error')
    })
  })

  // Event tests
  describe('Event Handling', () => {
    it('emits click event', async () => {
      const wrapper = mount(EgovIconButton)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(EgovIconButton, {
        props: { disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has aria-label when provided', () => {
      const wrapper = mount(EgovIconButton, {
        props: { ariaLabel: 'Custom button' }
      })
      expect(wrapper.attributes('aria-label')).toBe('Custom button')
    })

    it('has default aria-label when not provided', () => {
      const wrapper = mount(EgovIconButton)
      expect(wrapper.attributes('aria-label')).toBe('Icon button')
    })

    it('has aria-pressed when toggleable', () => {
      const wrapper = mount(EgovIconButton, {
        props: { isToggle: true }
      })
      expect(wrapper.attributes('aria-pressed')).toBe('false')
    })
  })
})