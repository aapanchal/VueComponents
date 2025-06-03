import BaseIconButton from './BaseIconButton.vue';

export default {
  title: 'Design System/BaseIconButton',
  component: BaseIconButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['flat', 'outlined', 'text', 'tonal', 'elevated'],
      description: 'Button variant style',
    },
    icon: {
      control: 'text',
      description: 'RemixIcon class name',
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
    toggleIcon: {
      control: 'text',
      description: 'Icon to show when toggled',
    },
    density: {
      control: { type: 'select' },
      options: ['default', 'comfortable', 'compact'],
      description: 'Controls button padding',
    },
  },
};

const Template = (args) => ({
  components: { BaseIconButton },
  setup() {
    return { args };
  },
  template: `
    <div class="p-6">
      <BaseIconButton v-bind="args" />
    </div>
  `,
});

export const AllStates = () => ({
  components: { BaseIconButton },
  template: `
    <div class="p-6">
      <div class="mb-8">
        <h3 class="text-h6 mb-4">Standard Buttons</h3>
        <div class="d-flex gap-4 mb-4">
          <BaseIconButton icon="ri-home-line" variant="flat" />
          <BaseIconButton icon="ri-home-line" variant="flat" class="hover" />
          <BaseIconButton icon="ri-home-line" variant="flat" class="focus" />
          <BaseIconButton icon="ri-home-line" variant="flat" class="active" />
          <BaseIconButton icon="ri-home-line" variant="flat" disabled />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-h6 mb-4">Tonal Buttons</h3>
        <div class="d-flex gap-4 mb-4">
          <BaseIconButton icon="ri-add-line" variant="tonal" />
          <BaseIconButton icon="ri-add-line" variant="tonal" class="hover" />
          <BaseIconButton icon="ri-add-line" variant="tonal" class="focus" />
          <BaseIconButton icon="ri-add-line" variant="tonal" class="active" />
          <BaseIconButton icon="ri-add-line" variant="tonal" disabled />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-h6 mb-4">Outlined Buttons</h3>
        <div class="d-flex gap-4 mb-4">
          <BaseIconButton icon="ri-settings-line" variant="outlined" />
          <BaseIconButton icon="ri-settings-line" variant="outlined" class="hover" />
          <BaseIconButton icon="ri-settings-line" variant="outlined" class="focus" />
          <BaseIconButton icon="ri-settings-line" variant="outlined" class="active" />
          <BaseIconButton icon="ri-settings-line" variant="outlined" disabled />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-h6 mb-4">Text Buttons</h3>
        <div class="d-flex gap-4 mb-4">
          <BaseIconButton icon="ri-search-line" variant="text" />
          <BaseIconButton icon="ri-search-line" variant="text" class="hover" />
          <BaseIconButton icon="ri-search-line" variant="text" class="focus" />
          <BaseIconButton icon="ri-search-line" variant="text" class="active" />
          <BaseIconButton icon="ri-search-line" variant="text" disabled />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-h6 mb-4">Button Sizes</h3>
        <div class="d-flex align-center gap-4">
          <BaseIconButton icon="ri-home-line" size="x-small" />
          <BaseIconButton icon="ri-home-line" size="small" />
          <BaseIconButton icon="ri-home-line" size="default" />
          <BaseIconButton icon="ri-home-line" size="large" />
          <BaseIconButton icon="ri-home-line" size="x-large" />
        </div>
      </div>
    </div>
  `,
});

export const Standard = Template.bind({});
Standard.args = {
  variant: 'flat',
  icon: 'ri-home-line',
};

export const Tonal = Template.bind({});
Tonal.args = {
  variant: 'tonal',
  icon: 'ri-add-line',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  icon: 'ri-settings-line',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  icon: 'ri-search-line',
};

export const Toggle = Template.bind({});
Toggle.args = {
  variant: 'flat',
  icon: 'ri-heart-line',
  toggleIcon: 'ri-heart-fill',
  isToggle: true,
  color: 'error',
};