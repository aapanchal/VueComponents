import EgovDateInput from './EgovDateInput.vue';

export default {
  title: 'Components/EgovDateInput',
  component: EgovDateInput,
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Selected date in YYYY-MM-DD format',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    min: {
      control: 'text',
      description: 'Minimum selectable date (YYYY-MM-DD)',
    },
    max: {
      control: 'text',
      description: 'Maximum selectable date (YYYY-MM-DD)',
    },
    dateFormat: {
      control: 'text',
      description: 'Date display format',
      defaultValue: 'MM/dd/yyyy'
    },
    firstDayOfWeek: {
      control: { type: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
      description: 'First day of week (0=Sunday)',
      defaultValue: 0
    },
    showAdjacentMonths: {
      control: 'boolean',
      description: 'Whether to show adjacent months',
      defaultValue: true
    },
    showWeek: {
      control: 'boolean',
      description: 'Whether to show week numbers',
      defaultValue: false
    },
    pickerTitle: {
      control: 'text',
      description: 'Title for the date picker',
      defaultValue: 'Select Date'
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'solo', 'plain', 'underlined'],
      description: 'Input field variant',
      defaultValue: 'outlined'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
      defaultValue: false
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the field is readonly',
      defaultValue: false
    },
    error: {
      control: 'boolean',
      description: 'Whether to show error state',
      defaultValue: false
    },
    errorMessages: {
      control: 'text',
      description: 'Error messages to display',
    },
    success: {
      control: 'boolean',
      description: 'Whether to show success state',
      defaultValue: false
    },
    successMessages: {
      control: 'text',
      description: 'Success messages to display',
    },
  },
};

const Template = (args) => ({
  components: { EgovDateInput },
  setup() {
    return { args };
  },
  template: '<EgovDateInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Date',
  required: true,
  tooltip: 'Select a date',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Selected Date',
  modelValue: '2024-03-15',
  required: true,
  tooltip: 'Current selected date',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Date',
  error: true,
  errorMessages: 'Please select a valid date',
  required: true,
  tooltip: 'Fix the date selection',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Date',
  disabled: true,
  modelValue: '2024-03-15',
  required: true,
  tooltip: 'This field is disabled',
};
