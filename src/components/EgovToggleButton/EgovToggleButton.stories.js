import EgovToggleButton from './EgovToggleButton.vue'

export default {
  title: 'Components/EgovToggleButton',
  component: EgovToggleButton,
  argTypes: {
    modelValue: { control: 'boolean' },
    label: { control: 'text' },
    onLabel: { control: 'text' },
    offLabel: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    tooltipText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'update:modelValue': { action: 'update:modelValue' },
    change: { action: 'change' }
  }
}

const Template = (args) => ({
  components: { EgovToggleButton },
  setup() {
    return { args }
  },
  template: '<EgovToggleButton v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Toggle element label',
  onLabel: 'On',
  offLabel: 'Off'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  ...Default.args,
  helperText: 'This is helper text'
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  errorMessage: 'This field is required'
}

export const WithTooltip = Template.bind({})
WithTooltip.args = {
  ...Default.args,
  tooltipText: 'Additional information about this toggle'
}

export const Required = Template.bind({})
Required.args = {
  ...Default.args,
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}

export const CustomLabels = Template.bind({})
CustomLabels.args = {
  ...Default.args,
  onLabel: 'Enabled',
  offLabel: 'Disabled'
}