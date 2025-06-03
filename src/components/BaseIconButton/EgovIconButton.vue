<template>
  <v-btn
    :icon="true"
    v-bind="buttonProps"
    @click="handleClick"
  >
    <i class="ri-arrow-right-line" :style="iconStyle"></i>
  </v-btn>
</template>

<script setup>

/**
 * BaseIconButton - A customized icon button component based on Vuetify's v-btn
 * following the design system guidelines.
 */
const props = defineProps({
  /**
   * The variant of the button
   * @values flat, outlined, text, elevated, plain, tonal
   */
  variant: {
    type: String,
    default: 'flat',
    validator: (value) => ['flat', 'outlined', 'text', 'elevated', 'plain', 'tonal'].includes(value)
  },
  /**
   * The size of the icon button
   * @values x-small, small, default, large, x-large
   */
  size: {
    type: String,
    default: 'default',
    validator: (val) => ['x-small', 'small', 'default', 'large', 'x-large'].includes(val)
  },
  /**
   * Whether the button is disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Whether the button is in a loading state
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * Color of the button
   */
  color: {
    type: String,
    default: 'primary'
  },
  /**
   * Whether the button can be toggled on/off
   */
  isToggle: {
    type: Boolean,
    default: false
  },
  /**
   * Initial toggle state (when isToggle is true)
   */
  initialToggled: {
    type: Boolean,
    default: false
  },
  /**
   * Color to use when toggled (when isToggle is true)
   */
  toggleColor: {
    type: String,
    default: '',
  },
  /**
   * Density of the button
   * @values default, comfortable, compact
   */
  density: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'comfortable', 'compact'].includes(val)
  },
  /**
   * Aria label for accessibility
   */
  ariaLabel: {
    type: String,
    default: '',
  },
  /**
   * Icon size in pixels
   */
  iconSize: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['click', 'toggle']);

// Toggle state
const toggled = ref(props.initialToggled);

// Handle click and toggle behavior
const handleClick = (event) => {
  emit('click', event);
  
  if (props.isToggle) {
    toggled.value = !toggled.value;
    emit('toggle', toggled.value);
  }
};

// Icon styling
const iconStyle = computed(() => {
  if (props.iconSize) {
    return { fontSize: isNaN(props.iconSize) ? props.iconSize : `${props.iconSize}px` };
  }
  return {};
});

// Compute props to pass to v-btn
const buttonProps = computed(() => {
  const currentColor = props.isToggle && toggled.value && props.toggleColor 
    ? props.toggleColor 
    : props.color;
  
  // Map size to dimensions for icon buttons
  const sizeMap = {
    'x-small': 24,
    'small': 32,
    'default': 40,
    'large': 48,
    'x-large': 56,
  };
  
  const width = sizeMap[props.size];
  const height = width;
  
  const btnProps = {
    variant: props.variant,
    disabled: props.disabled,
    loading: props.loading,
    color: currentColor,
    density: props.density,
    width: width,
    height: height,
    'aria-label': props.ariaLabel || 'Right arrow',
  };
  
  if (props.isToggle) {
    btnProps['aria-pressed'] = toggled.value;
  }
  
  return btnProps;
});
</script>

<style lang="scss" scoped>
:deep(.v-btn) {
  border-radius: 50%;
  min-width: unset;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  // Solid button
  &.v-btn--variant-flat {
    background-color: #00629E !important;
    color: #FFFFFF !important;
    
    &:hover {
      filter: brightness(108%);
      box-shadow: 1px 0px 2px 1px rgba(0,29,52,0.3);
    }
    
    &:focus {
      filter: brightness(108%);
      outline: 2px solid #0F62FE;
      outline-offset: 2px;
    }
    
    &:active {
      filter: brightness(112%);
    }
    
    &.v-btn--disabled {
      color: rgba(0, 24, 73, 0.38) !important;
      background-color: rgba(0, 24, 73, 0.12) !important;
    }
  }
  
  // Outlined button
  &.v-btn--variant-outlined {
    border-color: #757680 !important;
    color: #00629E !important;
    background-color: #ffffff !important;
    
    &:hover {
      background-color: rgba(0, 98, 158, 0.08) !important;
    }
    
    &:focus {
      background-color: rgba(0, 98, 158, 0.12) !important;
      border-color: #0F62FE !important;
    }
    
    &:active {
      background-color: rgba(0, 98, 158, 0.12) !important;
      border-color: #757680 !important;
    }
    
    &.v-btn--disabled {
      color: rgba(0, 24, 73, 0.38) !important;
      border-color: rgba(0, 24, 73, 0.12) !important;
    }
  }
  
  // Text button
  &.v-btn--variant-text {
    color: #00629E !important;
    background-color: transparent !important;
    
    &:hover {
      background-color: rgba(0, 98, 158, 0.08) !important;
    }
    
    &:focus {
      background-color: rgba(0, 98, 158, 0.12) !important;
      outline: 2px solid #0F62FE;
      outline-offset: 2px;
    }
    
    &:active {
      background-color: rgba(0, 98, 158, 0.12) !important;
    }
    
    &.v-btn--disabled {
      color: rgba(0, 24, 73, 0.38) !important;
    }
  }
  
  i {
    font-size: 1.25rem;
    line-height: 1;
    transition: all 0.2s ease;
  }
  
  &--size-x-small i {
    font-size: 1rem;
  }
  
  &--size-small i {
    font-size: 1.125rem;
  }
  
  &--size-large i {
    font-size: 1.375rem;
  }
  
  &--size-x-large i {
    font-size: 1.5rem;
  }
}
</style>