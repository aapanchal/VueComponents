import EgovTimePicker from './EgovTimePicker.vue'

export default {
  title: 'Components/EgovTimePicker',
  component: EgovTimePicker,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Choose a time'
    },
    required: {
      control: 'boolean',
      defaultValue: false
    },
    helperText: {
      control: 'text',
      defaultValue: ''
    },
    error: {
      control: 'text',
      defaultValue: ''
    },
    tooltip: {
      control: 'text',
      defaultValue: ''
    },
    modelValue: {
      control: 'text',
      defaultValue: ''
    }
  }
}

const Template = (args) => ({
  components: { EgovTimePicker },
  setup() {
    return { args }
  },
  template: '<EgovTimePicker v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Choose a time'
}

export const Required = Template.bind({})
Required.args = {
  label: 'Choose a time',
  required: true
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Choose a time',
  helperText: 'Select a time between 9:00 AM and 5:00 PM'
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Choose a time',
  error: 'Please enter a valid time'
}

export const WithTooltip = Template.bind({})
WithTooltip.args = {
  label: 'Choose a time',
  tooltip: 'Select the time for your appointment'
}

export const WithValue = Template.bind({})
WithValue.args = {
  label: 'Choose a time',
  modelValue: '02:30 PM'
}