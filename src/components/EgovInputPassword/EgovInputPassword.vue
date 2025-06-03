<template>
  <v-card class="egov-password-input">
    <v-card-text v-if="title" class="title-wrapper mb-2 pa-0">
      <v-label :for="textPasswordId" data-test="password-title" class="text-subtitle-1">{{ title }}</v-label>
      <v-label data-test="required-indicator" v-if="required" class="required-indicator ml-1">*</v-label>
      <v-tooltip v-if="tooltip" location="top">
        <template v-slot:activator="{ props }">
          <v-icon class="custom-icon" icon="$info" v-bind="props" size="x-small"></v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </v-card-text>
    <v-text-field v-model="internalValue" :id="textPasswordId" :type="visible ? 'text' : 'password'"
      :append-inner-icon="visible ? 'ri-eye-off-line' : 'ri-eye-line'" prepend-inner-icon="ri-lock-line"
      @click:append-inner.stop.prevent="toggleVisibility" @blur="onBlur" @focus="onFocus"
      :class="{ 'warning-state': warning && !error }" :messages="warning && !error ? warningMessages : undefined"
      data-test="password-input">

      <template v-if="warning && !error && warningMessages" #message>
        <v-label class="warning-message">{{ warningMessages }}</v-label>
      </template>
    </v-text-field>

    <v-card-text v-if="helperText && !hasError && !hasWarning" class="helper-text pa-0">
      {{ helperText }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
  helperText: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
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
  placeholder: {
    type: String,
    default: 'Enter your password',
  },
  variant: {
    type: String,
    default: 'outlined',
    validator: (value) => ['outlined', 'filled', 'solo', 'plain', 'underlined'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
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
  warning: {
    type: Boolean,
    default: false,
  },
  warningMessages: {
    type: [String, Array],
    default: () => [],
  },
  density: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'comfortable', 'compact'].includes(val),
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])
const textPasswordId = ref(`textPassword-${uuidv4()}`);
const visible = ref(false)

const toggleVisibility = (e) => {
  e.preventDefault(); // Prevent default behavior that might clear the input
  visible.value = !visible.value
}

const textFieldProps = computed(() => {
  const { modelValue, ...rest } = props
  return {
    ...rest,
    'persistent-placeholder': true,
  }
})

const updateValue = (value) => {
  emit('update:modelValue', value)
}

const onBlur = (event) => {
  emit('blur', event)
}

const onFocus = (event) => {
  emit('focus', event)
}
</script>

<style lang="scss" scoped>
.v-card--variant-elevated {
  box-shadow: none;
}

.title-text {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 125%;
  align-items: center;
  color: #001849;
}

.helper-text {
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 125%;
  color: #45464f;
}

.custom-icon {
  width: 1rem;
  margin-left: 3px;
}

.egov-password-input {
  margin-bottom: 24px;

  .title-wrapper {
    display: flex;
    align-items: center;

    .required-indicator {
      color: #d32f2f;
      font-weight: 500;
    }

    .info-icon {
      color: #757575;
      font-size: 1.125rem;
      cursor: help;
    }
  }

  :deep(.v-field) {
    border-radius: 4px;
    color: #424242;
    border-width: 2px;
    border: 0.5px solid #808080;

    &.v-field--variant-outlined {
      .v-field__outline {
        color: #e0e0e0;
      }

      &:hover .v-field__outline {
        color: #bdbdbd;
      }

      &.v-field--focused {
        .v-field__outline {
          color: #1976d2;
          border-width: 2px;
        }

        .v-label {
          color: #1976d2;
        }
      }

      &.v-field--error {
        .v-field__outline {
          color: #d32f2f !important;
          border-width: 2px;
        }

        .v-label {
          color: #d32f2f !important;
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

  :deep(.warning-state) {
    .v-field__outline {
      color: #fb8c00 !important;
      border-width: 2px !important;
    }

    .v-label {
      color: #fb8c00 !important;
      font-size: 12px;
    }

    .warning-message {
      color: #fb8c00 !important;
    }
  }

  :deep(.v-field--disabled) {
    background-color: #f5f5f5;
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
      color: #d32f2f;
    }

    .warning-message {
      color: #fb8c00;
    }
  }

  :deep(.v-input__append-inner),
  :deep(.v-input__prepend-inner) {
    color: #757575;
    cursor: pointer;

    &:hover {
      color: #424242;
    }
  }
}
</style>