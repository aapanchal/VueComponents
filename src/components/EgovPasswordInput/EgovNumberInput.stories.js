import EgovNumberInput from './EgovNumberInput.vue';

export default {
  title: 'Components/EgovNumberInput',
  component: EgovNumberInput,
  argTypes: {
    modelValue: {
      control: { type: 'number' },
      description: 'Current value of the input'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the input'
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value'
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value'
    },
    step: {
      control: { type: 'number' },
      description: 'Step value for increment and decrement'
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display'
    },
    warningMessage: {
      control: { type: 'text' },
      description: 'Warning message to display'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    thousandSeparator: {
      control: { type: 'text' },
      description: 'Character used as thousand separator'
    },
    decimalSeparator: {
      control: { type: 'text' },
      description: 'Character used as decimal separator'
    },
    decimalPlaces: {
      control: { type: 'number' },
      description: 'Number of decimal places to display'
    }
  }
};

const Template = (args) => ({
  components: { EgovNumberInput },
  setup() {
    return { args };
  },
  template: '<EgovNumberInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  modelValue: 1000,
  label: 'Label',
  helperText: 'Helper text',
  min: 0,
  max: 10000,
  step: 1,
  errorMessage: '',
  warningMessage: '',
  disabled: false,
  thousandSeparator: ',',
  decimalSeparator: '.',
  decimalPlaces: 0
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  modelValue: 15000,
  errorMessage: 'Value exceeds maximum limit',
};

export const WithWarning = Template.bind({});
WithWarning.args = {
  ...Default.args,
  modelValue: 9000,
  warningMessage: 'Value is close to maximum limit',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const WithDecimals = Template.bind({});
WithDecimals.args = {
  ...Default.args,
  modelValue: 1000.5,
  decimalPlaces: 2,
};

export const CustomStepSize = Template.bind({});
CustomStepSize.args = {
  ...Default.args,
  step: 10,
  helperText: 'Step size: 10',
};