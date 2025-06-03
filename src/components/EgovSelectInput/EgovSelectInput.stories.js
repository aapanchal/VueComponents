import EgovSelectInput from "./EgovSelectInput.vue";

export default {
  title: "Common/EgovSelectInput",
  component: EgovSelectInput,
  argTypes: {
    modelValue: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    multiple: { control: "boolean" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    tooltip: { control: "text" },
  },
};

const Template = (args) => ({
  components: { EgovSelectInput },
  setup() {
    return { args };
  },
  template: '<EgovSelectInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  modelValue: "",
  label: "State",
  required: true,
  helperText: "Select your state",
  errorMessage: "",
  items: ["California", "Colorado", "Florida", "Georgia", "Texas", "Wyoming"],
  multiple: false,
  clearable: true,
  tooltip: "Select your state",
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  errorMessage: "This field is required.",
};

export const WithDisable = Template.bind({});
WithDisable.args = {
  ...Default.args,
  disabled: true,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  modelValue: [],
  multiple: true,
  label: "Select Multiple States",
};
