import EgovRadioButton from './EgovRadioButton.vue'

export default {
  title: 'Components/EgovRadioButton',
  component: EgovRadioButton,
  argTypes: {
    modelValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    options: { control: { type: 'object' } },
    helperText: { control: { type: 'text' } },
    errorMessage: { control: { type: 'text' } },
    warningMessage: { control: { type: 'text' } },
    infoText: { control: { type: 'text' } },
    required: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    'update:modelValue': { action: 'update:modelValue' }
  }
}

const Template = (args) => ({
  components: { EgovRadioButton },
  setup() {
    return { args }
  },
  template: '<EgovRadioButton v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Radio group label',
  options: [
    { label: 'Radio One', value: 'one' },
    { label: 'Radio Two', value: 'two' },
    { label: 'Radio Three', value: 'three' }
  ],
  helperText: 'This is helper text',
  modelValue: 'one'
}

export const Required = Template.bind({})
Required.args = {
  ...Default.args,
  required: true
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  errorMessage: 'This field is required'
}

export const WithWarning = Template.bind({})
WithWarning.args = {
  ...Default.args,
  warningMessage: 'This selection might have consequences'
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  ...Default.args,
  infoText: 'Additional information about this radio group'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  ...Default.args,
  options: [
    { label: 'Radio One', value: 'one' },
    { label: 'Radio Two (disabled)', value: 'two', disabled: true },
    { label: 'Radio Three', value: 'three' }
  ]
}