import EgovSelectDropdownCombobox from "./EgovSelectDropdownCombobox.vue";

export default {
  title: "Forms/EgovSelectDropdownCombobox",
  component: EgovSelectDropdownCombobox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "solo", "plain", "underlined"],
    },
    density: {
      control: { type: "select" },
      options: ["default", "comfortable", "compact"],
    },
    modelValue: {
      control: { disable: true },
    },
  },
  args: {
    items: [
      { title: "California", value: "CA" },
      { title: "Texas", value: "TX" },
      { title: "Florida", value: "FL" },
      { title: "New York", value: "NY" },
      { title: "Washington", value: "WA" },
    ],
    label: "State",
    placeholder: "Select a state",
    variant: "outlined",
  },
};

const Template = (args) => ({
  components: { EgovSelectDropdownCombobox },
  setup() {
    return { args };
  },
  template: `
    <div style="max-width: 400px; padding: 20px;">
      <EgovSelectDropdownCombobox v-bind="args" />
    </div>
  `,
});

export const WithDefault = Template.bind({});
WithDefault.args = {
  label: "Select State",
  helperText: "Please select your state from the list",
};

export const WithMultiSelect = Template.bind({});
WithMultiSelect.args = {
  multiple: true,
  label: "Select State",
  helperText: "Please select your state from the list",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Select State",
};

export const Required = Template.bind({});
Required.args = {
  required: true,
  label: "Required Field",
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: "Please select your state from the list",
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  error: true,
  errorMessages: "This field is required",
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  tooltip: "Select your state from the dropdown list",
};
