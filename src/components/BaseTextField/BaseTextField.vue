<template>
  <div class="base-text-field">
    <div v-if="title" class="title-wrapper mb-2">
      <span class="text-subtitle-1">{{ title }}</span>
      <span v-if="required" class="required-indicator ml-1">*</span>
      <v-tooltip v-if="tooltip" location="top">
        <template v-slot:activator="{ props }">
          <i class="ri-information-line info-icon ml-2" v-bind="props"></i>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </div>
    <v-text-field
      v-bind="textFieldProps"
      :model-value="modelValue"
      @update:model-value="updateValue"
      @blur="onBlur"
      @focus="onFocus"
    >
      <!-- Prepend Icon Slot -->
      <template v-if="prependIcon" #prepend>
        <i :class="prependIcon"></i>
      </template>
      <template v-else-if="$slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      
      <!-- Append Icon Slot -->
      <template v-if="appendIcon" #append>
        <i :class="appendIcon"></i>
      </template>
      <template v-else-if="$slots.append" #append>
        <slot name="append" />
      </template>
      
      <!-- Append Inner Slot -->
      <template v-if="appendInnerIcon" #append-inner>
        <i :class="appendInnerIcon"></i>
      </template>
      <template v-else-if="$slots['append-inner']" #append-inner>
        <slot name="append-inner" />
      </template>
      
      <!-- Prepend Inner Slot -->
      <template v-if="prependInnerIcon" #prepend-inner>
        <i :class="prependInnerIcon"></i>
      </template>
      <template v-else-if="$slots['prepend-inner']" #prepend-inner>
        <slot name="prepend-inner" />
      </template>
      
      <!-- Message Slot -->
      <template v-if="$slots.message" #message="{ message }">
        <slot name="message" v-bind:message="message" />
      </template>
    </v-text-field>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'outlined',
    validator: (value) => ['outlined', 'filled', 'solo', 'plain', 'underlined'].includes(value),
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: [String, Array],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  prependIcon: {
    type: String,
    default: '',
  },
  appendIcon: {
    type: String,
    default: '',
  },
  prependInnerIcon: {
    type: String,
    default: '',
  },
  appendInnerIcon: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  counter: {
    type: [Boolean, Number, String],
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  density: {
    type: String,
    default: undefined,
    validator: (val) => ['default', 'compact', 'comfortable', undefined].includes(val),
  },
  color: {
    type: String,
    default: 'primary',
  },
  success: {
    type: Boolean,
    default: false,
  },
  successMessages: {
    type: [String, Array],
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'clear']);

const textFieldProps = computed(() => {
  const { modelValue, title, tooltip, ...rest } = props;
  return rest;
});

const updateValue = (value) => {
  emit('update:modelValue', value);
};

const onBlur = (event) => {
  emit('blur', event);
};

const onFocus = (event) => {
  emit('focus', event);
};
</script>

<style lang="scss" scoped>
.base-text-field {
  font-family: 'Roboto', sans-serif;
  margin-bottom: 24px;

  .title-wrapper {
    display: flex;
    align-items: center;
    
    .required-indicator {
      color: #D32F2F;
    }
    
    .info-icon {
      color: #757575;
      font-size: 1.125rem;
      cursor: help;
    }
  }

  :deep(.v-field) {
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
    
    &.v-field--variant-outlined {
      .v-field__outline {
        color: #E0E0E0;
      }
      
      &:hover .v-field__outline {
        color: #BDBDBD;
      }
      
      &.v-field--focused {
        .v-field__outline {
          color: #1976D2;
          border-width: 2px;
        }
        
        .v-label {
          color: #1976D2;
        }
      }
      
      &.v-field--error {
        .v-field__outline {
          color: #D32F2F;
          border-width: 2px;
        }
        
        .v-label {
          color: #D32F2F;
        }
      }
    }
    
    .v-field__input {
      min-height: 56px;
      padding: 16px;
      color: #212121;
      font-size: 16px;
      
      &::placeholder {
        color: #757575;
      }
    }
    
    .v-label {
      color: #757575;
      font-size: 16px;
      transition: all 0.2s ease-in-out;
      
      &.v-label--floating {
        font-size: 12px;
      }
    }
  }

  :deep(.v-field--disabled) {
    background-color: #F5F5F5;
    opacity: 0.7;
    
    .v-field__input,
    .v-label {
      color: rgba(0, 0, 0, 0.38);
    }
  }

  :deep(.v-messages) {
    min-height: 20px;
    padding-top: 4px;
    font-size: 12px;
    
    &.v-messages--error {
      color: #D32F2F;
    }
  }
}
</style>