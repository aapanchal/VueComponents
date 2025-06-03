import BaseIconButton from './BaseIconButton.vue';

export default {
  title: 'Design System/EgovIconButton',  // Changed title to make it unique
  component: BaseIconButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['flat', 'outlined', 'text'],
      description: 'Button variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'default', 'large', 'x-large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner',
    },
    isToggle: {
      control: 'boolean',
      description: 'Makes it a toggle button',
    },
    initialToggled: {
      control: 'boolean',
      description: 'Initial toggle state',
    },
    density: {
      control: { type: 'select' },
      options: ['default', 'comfortable', 'compact'],
      description: 'Controls button padding',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label',
    },
    iconSize: {
      control: 'text',
      description: 'Custom icon size (px or em)',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
    onToggle: {
      action: 'toggled',
      description: 'Toggle state change handler',
    },
  },
  args: {
    variant: 'flat',
    size: 'default',
    disabled: false,
    loading: false,
    isToggle: false,
    initialToggled: false,
  },
};

// Template
const Template = (args) => ({
  components: { BaseIconButton },
  setup() {
    return { args };
  },
  template: '<div :style="{ padding: \'1rem\' }"><BaseIconButton v-bind="args" @click="args.onClick" @toggle="args.onToggle" /></div>',
});

// Stories
export const Solid = Template.bind({});
Solid.args = {
  variant: 'flat',
};

// Sizes
export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

// States
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

// Icon button states
export const IconButtonStates = (args) => ({
  components: { BaseIconButton },
  template: '<div :style="{ padding: \'1rem\' }"><div :style="{ display: \'flex\', gap: \'1rem\', marginBottom: \'1rem\' }"><BaseIconButton variant="flat" /><BaseIconButton variant="flat" disabled /><BaseIconButton variant="flat" loading /></div><div :style="{ display: \'flex\', gap: \'1rem\', marginBottom: \'1rem\' }"><BaseIconButton variant="outlined" /><BaseIconButton variant="outlined" disabled /><BaseIconButton variant="outlined" loading /></div><div :style="{ display: \'flex\', gap: \'1rem\' }"><BaseIconButton variant="text" /><BaseIconButton variant="text" disabled /><BaseIconButton variant="text" loading /></div></div>',
});