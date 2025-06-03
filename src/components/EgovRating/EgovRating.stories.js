import EgovRating from './EgovRating.vue'

export default {
  title: 'Components/EgovRating',
  component: EgovRating,
  argTypes: {
    modelValue: { control: 'number' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    tooltip: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    max: { 
      control: { type: 'number', min: 1, max: 10, step: 1 },
      defaultValue: 5
    },
    size: { 
      control: { type: 'number', min: 16, max: 48, step: 4 },
      defaultValue: 24
    },
    'update:modelValue': { action: 'update:modelValue' },
    change: { action: 'change' }
  }
}

const Template = (args) => ({
  components: { EgovRating },
  setup() {
    return { args }
  },
  template: `
    <EgovRating
      v-bind="args"
      @update:modelValue="args['update:modelValue']"
      @change="args['change']"
    />
  `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Rate your experience',
  modelValue: 3
}

export const Required = Template.bind({})
Required.args = {
  ...Default.args,
  required: true
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  ...Default.args,
  helperText: 'Select a rating from 1 to 5'
}

export const ErrorState = Template.bind({})
ErrorState.args = {
  ...Default.args,
  error: 'Rating is required'
}

export const WithTooltip = Template.bind({})
WithTooltip.args = {
  ...Default.args,
  tooltip: '1 = Poor, 5 = Excellent'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}

export const Readonly = Template.bind({})
Readonly.args = {
  ...Default.args,
  readonly: true,
  modelValue: 4
}

export const CustomMaxRating = Template.bind({})
CustomMaxRating.args = {
  ...Default.args,
  max: 10,
  size: 20
}