import EgovFileUpload from "./EgovFileUpload.vue";

export default {
  title: "Components/EgovFileUpload",
  component: EgovFileUpload,
  argTypes: {
    variant: {
      control: "select",
      options: ["button", "drag-drop"],
      description: "Choose the upload variant: button or drag-and-drop",
    },
    disabled: {
      control: "boolean",
      description: "Disable the file uploader",
    },
    title: {
      control: "text",
      description: "Title of the file uploader",
    },
    helperText: {
      control: "text",
      description: "Helper text for the file uploader",
    },
  },
};

const Template = (args) => ({
  components: { EgovFileUpload },
  setup() {
    return { args };
  },
  template: '<EgovFileUpload v-bind="args" />',
});

export const ButtonDefault = Template.bind({});
ButtonDefault.args = {
  variant: "button",
  title: "Upload files",
  helperText: "Max file size is 1MB. Supported file types are .jpg and .png.",
  disabled: false,
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  ...ButtonDefault.args,
  disabled: true,
};

export const DragDropDefault = Template.bind({});
DragDropDefault.args = {
  variant: "drag-drop",
  title: "Upload files",
  helperText: "Max file size is 1MB. Supported file types are .jpg and .png.",
  disabled: false,
};


export const DragDropDisabled = Template.bind({});
DragDropDisabled.args = {
  ...DragDropDefault.args,
  disabled: true,
};
