import EgovHeader from "./EgovHeader.vue";

export default {
  title: "Components/EgovHeader",
  component: EgovHeader,
  parameters: {
    docs: {
      description: {
        component:
          "A header component with navigation menu, skip link, and search form, built with Vuetify and designed for accessibility.",
      },
    },
  },
};

const Template = (args) => ({
  components: { EgovHeader },
  setup() {
    return { args };
  },
  template: '<EgovHeader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      id: "2",
      label: "Dropdown Label",
      children: [
        {
          id: "2-1",
          label: "Education",
          href: "#education",
          icon: "mdi-school",
        },
        {
          id: "2-2",
          label: "Health",
          children: [
            {
              id: "2-2-1",
              label: "Hospitals",
              href: "#hospitals",
            },
            {
              id: "2-2-2",
              label: "Clinics",
              href: "#clinics",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      label: "Dropdown Label",
      children: [
        {
          id: "3-1",
          label: "History",
          href: "#history",
        },
        {
          id: "3-2",
          label: "Contact Us",
          href: "#contact",
          icon: "mdi-email",
        },
      ],
    },
    {
      id: "1",
      label: "Button Label",
      href: "#",
      isCurrent: true,
    },
  ],
};

export const WithOpenDropdown = Template.bind({});
WithOpenDropdown.args = {
  ...Default.args,
};
WithOpenDropdown.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates the header with an open dropdown menu. Use browser dev tools to inspect the open state.",
    },
  },
};
