import EgovTab from "./EgovTab.vue";
import "remixicon/fonts/remixicon.css";

export default {
  title: "Components/EgovTab",
  component: EgovTab
};

const Template = (args) => ({
  components: { EgovTab },
  setup() {
    return { args };
  },
  template: '<EgovTab v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      text: "List",
      icon: "ri-list-unordered",
      value: "tab1",
      content: "This is list tab content"
    },
    {
      text: "Map",
      icon: "ri-map-2-line",
      value: "tab2",
      content: "This is map tab content"
    }
  ]
};