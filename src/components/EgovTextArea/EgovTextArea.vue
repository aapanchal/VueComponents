<template>
  <v-card class="egov-textarea" flat>
    <v-card-text v-if="label" class="title-wrapper pa-0 mb-2">
      <v-label :for="textareaId" class="text-subtitle-1">{{ label }}</v-label>
      <v-label v-if="required" class="required-indicator ml-1">*</v-label>
      <v-tooltip v-if="helperText" location="top">
        <template v-slot:activator="{ props }">
          <v-icon class="custom-icon" icon="$info" v-bind="props" size="x-small"></v-icon>
        </template>
        {{ helperText }}
      </v-tooltip>
    </v-card-text>

    <v-textarea
  :id="textareaId"
  variant="solo"
  v-model="localValue"
  :placeholder="placeholder"
  :maxLength="maxLength"
  :counter="maxLength ? true : counter"
  :rows="rows"
  :auto-grow="autoGrow"
  :disabled="disabled"
  :readonly="readonly"
  :error="error"
  :messages="error ? errorMessages : helperText"
  @update:model-value="updateValue"
  @blur="onBlur"
  @focus="onFocus"
>
  <template v-if="$slots.prepend" #prepend>
    <slot name="prepend" />
  </template>
  <template v-if="$slots.append" #append>
    <slot name="append" />
  </template>
</v-textarea>
  </v-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  helperText: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: [Number, String],
    default: undefined,
  },
  counter: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [Number, String],
    default: 3,
  },
  autoGrow: {
    type: Boolean,
    default: false,
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
  variant: {
    type: String,
    default: 'outlined',
    validator: (value) => ['outlined', 'filled', 'solo', 'plain', 'underlined'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])
const textareaId = ref(`textarea-${uuidv4()}`);

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  },
)

const textareaProps = computed(() => {
  const { ...rest } = props
  return {
    ...rest,
    counter: props.maxLength ? true : props.counter,
    maxlength: props.maxLength,
    messages: props.helperText,
    'persistent-counter': true,
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
.egov-textarea[data-v-6cfc33a2] .v-textarea .v-field .v-field__input {
  border: 4px solid #212121 !important;
}
:deep .textarea{
  border: 4px solid #212121 !important;
}
.custom-icon {
  width: 1rem;
  margin-left: 3px;
}
.egov-textarea {
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

  :deep(.v-textarea) {
    .v-field {
      border-radius: 4px;
      border: 1px solid #e0e0e0 !important;

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
            color: #d32f2f;
            border-width: 2px;
          }

          .v-label {
            color: #d32f2f;
          }
        }
      }

      .v-field__input {
        padding: 16px;
        color: #212121;
        font-size: 16px;
        min-height: 120px;

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

    &.v-textarea--disabled {
      .v-field {
        background-color: #f5f5f5;
        opacity: 0.7;

        .v-field__input,
        .v-label {
          color: rgba(0, 0, 0, 0.38);
        }
      }
    }

    .v-counter {
      color: #757575;
      font-size: 12px;
      margin-top: 4px;
    }

    .v-messages {
      min-height: 20px;
      padding-top: 4px;
      font-size: 12px;

      &.v-messages--error {
        color: #d32f2f;
      }
    }
  }
}
</style>