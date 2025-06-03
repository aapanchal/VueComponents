import CustomCheckbox from './CustomCheckbox.vue';

export default {
  title: 'Components/Checkbox',
  component: CustomCheckbox,
  argTypes: {
    value: {
      control: 'boolean',
      description: 'The checkbox value (v-model)'
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox'
    },
    color: {
      control: 'color',
      description: 'Custom color for the checked state'
    },
    onChange: { action: 'changed' }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CustomCheckbox },
  template: `
    <custom-checkbox
      v-model="value"
      :label="label"
      :disabled="disabled"
      :color="color"
      @change="onChange"
    />
  `,
  data() {
    return {
      value: args.value
    };
  }
});

export const Default = Template.bind({});
Default.args = {
  value: false,
  label: 'I agree to terms',
  disabled: false
};

export const Checked = Template.bind({});
Checked.args = {
  value: true,
  label: 'I agree to terms',
  disabled: false
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: false,
  label: 'Disabled checkbox',
  disabled: true
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  value: true,
  label: 'Custom color checkbox',
  disabled: false,
  color: '#ff5722'
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  value: false,
  label: '',
  disabled: false
};