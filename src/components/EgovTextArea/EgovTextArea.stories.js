import EgovTextArea from './EgovTextArea.vue';
import 'remixicon/fonts/remixicon.css'

export default {
  title: 'Common/EgovTextArea',
  component: EgovTextArea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The content of the textarea',
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters allowed',
    },
    counter: {
      control: 'boolean',
      description: 'Whether to show character counter',
    },
    rows: {
      control: 'number',
      description: 'Number of rows to display',
    },
    autoGrow: {
      control: 'boolean',
      description: 'Whether textarea should auto-grow',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the textarea is readonly',
    },
    error: {
      control: 'boolean',
      description: 'Whether to show error state',
    },
    errorMessages: {
      control: 'text',
      description: 'Error messages to display',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'solo', 'plain', 'underlined'],
      description: 'The variant style of the textarea',
    },
  },
};

export const Default = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Placeholder Text',
    helperText: 'Helper Text',
  },
};

export const WithCounter = {
  args: {
    label: 'Limited Input',
    placeholder: 'Type your message',
    maxLength: 150,
    counter: true,
    helperText: 'Maximum 150 characters',
  },
};

export const Required = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    helperText: 'This field must be filled out',
  },
};

export const WithError = {
  args: {
    label: 'Error State',
    placeholder: 'Enter text',
    error: true,
    errorMessages: 'This field contains invalid input',
    modelValue: 'Invalid content',
  },
};