import EgovPasswordInput from './EgovInputPassword.vue'

export default {
  title: 'Common/EgovPasswordInput',
  component: EgovPasswordInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Current value of the password field',
    },
    title: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
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
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether to show error state',
    },
    errorMessages: {
      control: 'text',
      description: 'Error messages to display',
    },
    warning: {
      control: 'boolean',
      description: 'Whether to show warning state',
    },
    warningMessages: {
      control: 'text',
      description: 'Warning messages to display',
    },
  },
}

export const Default = {
  args: {
    title: 'Password',
    placeholder: 'Enter your password',
    tooltip: 'Enter a strong password',
    required: true,
    density: 'compact',
    variant: 'outlined',
    helperText: 'Helper text',
  },
}

export const WithError = {
  args: {
    title: 'Password',
    modelValue: 'invalid',
    error: true,
    errorMessages: 'Invalid password format',
    tooltip: 'Enter a strong password',
    required: true,
    density: 'compact',
    variant: 'outlined',
  },
}

export const WithWarning = {
  args: {
    title: 'Password',
    modelValue: 'weak',
    warning: true,
    warningMessages: 'Password should be stronger ',
    tooltip: 'Enter a strong password',
    required: true,
    density: 'compact',
    variant: 'outlined',
  },
}

export const Disabled = {
  args: {
    title: 'Password',
    placeholder: 'Enter your password',
    disabled: true,
    tooltip: 'Enter a strong password',
    required: true,
    density: 'compact',
    variant: 'outlined',
    helperText: 'Helper text',
  },
}