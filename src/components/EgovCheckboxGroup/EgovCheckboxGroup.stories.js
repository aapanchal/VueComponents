import EgovCheckboxGroup from './EgovCheckboxGroup.vue'

export default {
  title: 'ABC/EgovCheckboxGroup',
  component: EgovCheckboxGroup,
  argTypes: {
    modelValue: { control: 'boolean' },
    label: { control: 'text' },
    checkboxText: { control: 'text' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    tooltip: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

const Template = (args) => ({
  components: { EgovCheckboxGroup },
  setup() {
    return { args }
  },
  template: '<EgovCheckboxGroup v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  modelValue: false,
  label: 'Label',
  checkboxText: 'Checkbox Label',
  required: false,
  helperText: 'Helper text.',
  error: false,
  errorMessage: '',
  tooltip: 'Required for legal compliance.',
  disabled: false,
}

export const Required = Template.bind({})
Required.args = {
  ...Default.args,
  required: true,
}

export const ErrorState = Template.bind({})
ErrorState.args = {
  ...Default.args,
  error: true,
  errorMessage: 'This field is required.',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true,
}

export const WithTooltip = Template.bind({})
WithTooltip.args = {
  ...Default.args,
  tooltip: 'More info about this checkbox',
}
