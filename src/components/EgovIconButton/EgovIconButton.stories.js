import EgovIconButton from "./EgovIconButton.vue";

export default {
  title: "Common/EgovIconButton",
  component: EgovIconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["flat", "outlined", "standard", "tonal", "elevated"],
      description: "Button variant style",
    },
    icon: {
      control: "text",
      description: "Vuetify icon name (mdi-*)",
    },
    size: {
      control: { type: "select" },
      options: ["x-small", "small", "default", "large", "x-large"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner",
    },
    isToggle: {
      control: "boolean",
      description: "Makes it a toggle button",
    },
    toggleIcon: {
      control: "text",
      description: "Icon to show when toggled",
    },
    density: {
      control: { type: "select" },
      options: ["default", "comfortable", "compact"],
      description: "Controls button padding",
    },
  },
};

// Template for single button
const Template = (args) => ({
  components: { EgovIconButton },
  setup() {
    return { args };
  },
  template:
    '<div :style="{ padding: \'1rem\' }"><EgovIconButton v-bind="args" /></div>',
});

// Stories for different variants
export const Standard = Template.bind({});
Standard.args = {
  variant: "standard",
  icon: "mdi-arrow-right",
};

export const Filled = Template.bind({});
Filled.args = {
  variant: "flat",
  icon: "mdi-arrow-right",
};

export const Tonal = Template.bind({});
Tonal.args = {
  variant: "tonal",
  icon: "mdi-arrow-right",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
  icon: "mdi-arrow-right",
};

export const Elevated = Template.bind({});
Elevated.args = {
  variant: "elevated",
  icon: "mdi-arrow-right",
};

// Toggle button example
export const Toggle = Template.bind({});
Toggle.args = {
  variant: "flat",
  icon: "mdi-heart-outline",
  toggleIcon: "mdi-heart",
  isToggle: true,
  color: "error",
};


