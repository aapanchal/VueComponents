import BaseTextField from './BaseTextField.vue';

export default {
  title: 'Design System/BaseTextField',
  component: BaseTextField,
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Current value of the text field',
    },
    title: {
      control: 'text',
      description: 'Title text displayed above the input',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text to show additional information',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'solo', 'plain', 'underlined'],
      description: 'Style variant of the text field',
    },
    label: {
      control: 'text',
      description: 'Label for the text field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the field is readonly',
    },
    error: {
      control: 'boolean',
      description: 'Whether the field is in error state',
    },
    errorMessages: {
      control: 'text',
      description: 'Error messages to display',
    },
    success: {
      control: 'boolean',
      description: 'Whether the field is in success state',
    },
    successMessages: {
      control: 'text',
      description: 'Success messages to display',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the field can be cleared',
    },
    counter: {
      control: 'number',
      description: 'Maximum character count',
    },
  },
};

const Template = (args) => ({
  components: { BaseTextField },
  setup() {
    return { args };
  },
  template: `
    <div class="p-6">
      <BaseTextField v-bind="args" />
    </div>
  `,
});

export const AllStates = () => ({
  components: { BaseTextField },
  template: `
    <div class="p-6">
      <div class="d-flex flex-column gap-6">
        <BaseTextField
          title="Default Input"
          label="Label"
          placeholder="Enter text..."
        />

        <BaseTextField
          title="Required Field"
          label="Email"
          placeholder="Enter email..."
          required
          tooltip="Enter your primary email address"
        />

        <BaseTextField
          title="With Value"
          label="Username"
          model-value="johndoe"
        />

        <BaseTextField
          title="With Counter"
          label="Bio"
          placeholder="Tell us about yourself..."
          counter="100"
        />

        <BaseTextField
          title="With Icons"
          label="Search"
          placeholder="Search..."
          prepend-inner-icon="ri-search-line"
          append-inner-icon="ri-close-line"
          clearable
        />

        <BaseTextField
          title="Error State"
          label="Password"
          type="password"
          error
          error-messages="Password must be at least 8 characters"
        />

        <BaseTextField
          title="Success State"
          label="Username"
          model-value="available_username"
          success
          success-messages="Username is available"
        />

        <BaseTextField
          title="Disabled State"
          label="Account ID"
          model-value="12345"
          disabled
        />

        <BaseTextField
          title="Readonly State"
          label="API Key"
          model-value="ak_123456789"
          readonly
        />
      </div>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Default Text Field',
  label: 'Input Label',
  placeholder: 'Enter some text',
};

export const Required = Template.bind({});
Required.args = {
  title: 'Required Field',
  label: 'Email',
  placeholder: 'Enter email address',
  required: true,
  tooltip: 'Enter your primary email address',
};

export const WithError = Template.bind({});
WithError.args = {
  title: 'Error State',
  label: 'Password',
  type: 'password',
  error: true,
  errorMessages: 'Password is required',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  title: 'Search',
  label: 'Search',
  placeholder: 'Search...',
  prependInnerIcon: 'ri-search-line',
  appendInnerIcon: 'ri-close-line',
  clearable: true,
};