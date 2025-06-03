<template>
    <div>
      <div v-if="title" class="title-wrapper">
        <span class="title-text">{{ title }}</span>
        <span v-if="required" class="required-indicator">*</span>
        <v-tooltip v-if="tooltip" location="top">
          <template v-slot:activator="{ props }">
            <i class="ri-information-line info-icon" v-bind="props"></i>
          </template>
          {{ tooltip }}
        </v-tooltip>
      </div>
      <v-text-field
        density="compact"
        variant="outlined"
        v-bind="textFieldProps"
        :model-value="modelValue"
        @update:model-value="updateValue"
        @blur="onBlur"
        @focus="onFocus"
        class="input-text"
      >
        <!-- Slots -->
        <template v-if="prependIcon" #prepend>
          <i :class="prependIcon"></i>
        </template>
        <template v-else-if="$slots.prepend" #prepend>
          <slot name="prepend" />
        </template>
  
        <template v-if="appendIcon" #append>
          <i :class="appendIcon"></i>
        </template>
        <template v-else-if="$slots.append" #append>
          <slot name="append" />
        </template>
  
        <template v-else-if="$slots['append-inner']" #append-inner>
          <slot name="append-inner" />
        </template>
        <template v-else-if="$slots['prepend-inner']" #prepend-inner>
          <slot name="prepend-inner" />
        </template>
  
        <template v-if="$slots.message" #message="{ message }">
          <slot name="message" v-bind:message="message" />
        </template>
      </v-text-field>
      <div v-if="helperText && !hasError && !hasWarning" class="helper-text">
        {{ helperText }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  /**
   * BaseTextField - A customized text input component based on Vuetify's v-text-field
   * following the design system guidelines.
   */
  const props = defineProps({
    helperText: {
      type: String,
      default: '',
    },
    /**
     * The current value of the text field
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
     * Title text displayed above the input
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Whether the field is required
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * Tooltip text to show additional information
     */
    tooltip: {
      type: String,
      default: '',
    },
    /**
     * Label text for the input
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Placeholder text when input is empty
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * Specifies the input variant
     * @values outlined, filled, solo, plain, underlined
     */
    variant: {
      type: String,
      default: 'outlined',
      validator: (value) => ['outlined', 'filled', 'solo', 'plain', 'underlined'].includes(value),
    },
    /**
     * Whether the field is readonly
     */
    readonly: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the field is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the field is in error state
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * Error messages to display
     */
    errorMessages: {
      type: [String, Array],
      default: () => [],
    },
    /**
     * Whether to display a loading indicator
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * Prepend icon (RemixIcon format e.g., 'ri-user-line')
     */
    prependIcon: {
      type: String,
      default: '',
    },
    /**
     * Append icon (RemixIcon format e.g., 'ri-search-line')
     */
    appendIcon: {
      type: String,
      default: '',
    },
    /**
     * Prepend inner icon (RemixIcon format)
     */
    prependInnerIcon: {
      type: String,
      default: '',
    },
    /**
     * Append inner icon (RemixIcon format)
     */
    appendInnerIcon: {
      type: String,
      default: '',
    },
    /**
     * Whether to display a clearable button
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * Input type (text, password, number, etc.)
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * Density of the input
     * @values default, compact, comfortable, undefined
     */
    density: {
      type: String,
      default: undefined,
      validator: (val) => ['default', 'compact', 'comfortable', undefined].includes(val),
    },
    /**
     * Color for the input when focused or valid
     */
    color: {
      type: String,
      default: 'primary',
    },
    /**
     * Success state
     */
    success: {
      type: Boolean,
      default: false,
    },
    /**
     * Success messages
     */
    successMessages: {
      type: [String, Array],
      default: () => [],
    },
  })
  
  const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'clear'])
  
  // Merge props to pass to v-text-field
  const textFieldProps = computed(() => {
    const { ...rest } = props
    return rest
  })
  
  // Handle value updates
  const updateValue = (value) => {
    emit('update:modelValue', value)
  }
  
  // Handle blur event
  const onBlur = (event) => {
    emit('blur', event)
  }
  
  // Handle focus event
  const onFocus = (event) => {
    emit('focus', event)
  }
  </script>
  
  <style lang="scss" scoped>
  :deep(.v-field) {
    border-radius: 4px;
  }
  
  :deep(.v-label) {
    font-size: 12px !important;
  }
  
  .v-field__field {
    flex: 1 0;
    grid-area: field;
    position: relative;
    align-items: flex-start;
    display: flex;
    font-size: 12px;
  }
  .title-text {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 125%;
    align-items: center;
    color: #001849;
  }
  .title-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  
    .required-indicator {
      color: red;
      margin-left: 0.25rem;
    }
  
    .info-icon {
      color: var(--secondary);
      font-size: 0.825rem;
      cursor: help;
      margin-left: 0.2rem;
    }
  }
  .helper-text {
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 125%;
    color: #45464f;
  }
  
  .v-text-field {
    border-radius: 15% !important;
    transition: all var(--transition-base);
  
    &--error {
      .v-field__outline {
        color: var(--error) !important;
      }
    }
  
    &--success {
      .v-field__outline {
        color: var(--success) !important;
      }
    }
  
    .v-field__input {
      font-size: 12px;
  
      &::placeholder {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.38);
      }
    }
  
    .v-field {
      &--variant-filled {
        border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
      }
  
      &--variant-outlined {
        .v-field__outline {
          border-radius: var(--border-radius-md);
        }
      }
  
      &--variant-solo {
        box-shadow: var(--shadow-sm);
        border-radius: var(--border-radius-md);
      }
    }
  }
  </style>
  