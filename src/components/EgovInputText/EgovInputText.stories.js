import EgovTextInput from "./EgovInputText.vue";

export default {
  title: "common/EgovTextInput",
  component: EgovTextInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: "text",
      description: "Current value of the text field",
    },
    title: {
      control: "text",
      description: "Title text displayed above the input",
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    tooltip: {
      control: "text",
      description: "Tooltip text to show additional information",
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "solo", "plain", "underlined"],
      description: "Style variant of the text field",
    },
    label: {
      control: "text",
      description: "Label for the text field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
    },
    readonly: {
      control: "boolean",
      description: "Whether the field is readonly",
    },
    error: {
      control: "boolean",
      description: "Whether the field is in error state",
    },
    errorMessages: {
      control: "text",
      description: "Error messages to display",
    },
    success: {
      control: "boolean",
      description: "Whether the field is in success state",
    },
    successMessages: {
      control: "text",
      description: "Success messages to display",
    },
    clearable: {
      control: "boolean",
      description: "Whether the field can be cleared",
    },
    counter: {
      control: "number",
      description: "Maximum character count (0 for no counter)",
    },
    density: {
      control: { type: "select" },
      options: ["default", "compact", "comfortable", undefined],
      description: "Density of the input field",
    },
    prependIcon: {
      control: "text",
      description: "Icon to display before the input (RemixIcon class name)",
    },
    appendIcon: {
      control: "text",
      description: "Icon to display after the input (RemixIcon class name)",
    },
    prependInnerIcon: {
      control: "text",
      description:
        "Icon to display at the start of the input (RemixIcon class name)",
    },
    appendInnerIcon: {
      control: "text",
      description:
        "Icon to display at the end of the input (RemixIcon class name)",
    },
    loading: {
      control: "boolean",
      description: "Whether to show a loading indicator",
    },
    color: {
      control: "text",
      description: "Color when the input is active",
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "HTML input type",
    },
  },
  args: {
    placeholder: "Enter text here",
    variant: "outlined",
    modelValue: "",
  },
  parameters: {
    docs: {
      description: {
        component:
          "TextInput component for collecting user input in forms following the design system guidelines.",
      },
    },
  },
};

// Base Template
const Template = (args) => ({
  components: { EgovTextInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: args.modelValue,
    };
  },
  template: `
    <div style="padding: 1rem; borderRadious:5%">
      <EgovTextInput
        v-bind="args"
        v-model="value"
      />
    </div>
  `,
});

// Stories
export const Default = Template.bind({});
Default.args = {
  title: "Label",
  required: true,
  placeholder: "Enter some text",
  variant: "outlined",
  tooltip: "This is a helpful tooltip",
  helperText: "Helper text"
};

export const WithTitleAndTooltip = Template.bind({});
WithTitleAndTooltip.args = {
  title: "Field Title",
  tooltip: "This is a helpful tooltip",
  placeholder: "Enter some text",
};

export const Required = Template.bind({});
Required.args = {
  title: "Required Field",
  required: true,
  placeholder: "This field is required",
};

export const WithError = Template.bind({});
WithError.args = {
  title: "Error State",
  error: true,
  errorMessages: "This field has an error",
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  title: "With Icons",
  prependInnerIcon: "ri-search-line",
  appendInnerIcon: "ri-close-line",
  clearable: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: "Disabled Field",
  disabled: true,
  placeholder: "This field is disabled",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  title: "This field is read-only",
  readonly: true,
  modelValue: "This field is read-only",
};

