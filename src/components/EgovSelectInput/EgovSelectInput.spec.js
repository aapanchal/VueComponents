import { mount } from '@vue/test-utils'
import EgovSelectInput from '@/components/EgovSelectInput.vue' // Adjust the import path as needed

describe('EgovSelectInput', () => {
  const items = [
    { id: 1, name: 'Texas' },
    { id: 2, name: 'California' },
    { id: 3, name: 'Florida' },
  ]

  // Basic mount test
  it('renders the component', () => {
    const wrapper = mount(EgovSelectInput, {
      props: {
        label: 'Select State',
        items: items,
        modelValue: '',
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.egov-select-label').text()).toBe('Select State')
  })


  // Test the error message rendering
  it('displays the error message when provided', () => {
    const wrapper = mount(EgovSelectInput, {
      props: {
        label: 'Select State',
        items: items,
        errorMessage: 'This field is required.',
      },
    })
    expect(wrapper.find('.error-text').text()).toBe('This field is required.')
  })

  // Test helper text rendering when no error message
  it('displays the helper text when no error message', () => {
    const wrapper = mount(EgovSelectInput, {
      props: {
        label: 'Select State',
        items: items,
        helperText: 'Please select a state.',
      },
    })
    expect(wrapper.find('.helper-text').text()).toBe('Please select a state.')
  })

  // Test the required asterisk rendering
  it('displays the required asterisk if required is true', () => {
    const wrapper = mount(EgovSelectInput, {
      props: {
        label: 'Select State',
        items: items,
        required: true,
      },
    })
    expect(wrapper.find('.required').exists()).toBe(true)
  })
})
