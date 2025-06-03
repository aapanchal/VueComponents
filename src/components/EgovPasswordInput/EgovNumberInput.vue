// EgovNumberInput.vue with Improved Error Handling

<template>
  <div class="egov-number-input" :class="{
    'error': hasError,
    'warning': hasWarning,
    'disabled': disabled,
    'focus': isFocused
  }">
    <label v-if="label" class="egov-number-input__label">{{ label }}</label>

    <div class="egov-number-input__field">
      <!-- Critical: Use :value instead of v-model or :model-value for direct control -->
      <v-number-input 
        :value="internalValue" 
        :reverse="false" 
        controlVariant="default" 
        :hideInput="false" 
        inset
        variant="outlined" 
        :min="min" 
        :max="max" 
        :step="step" 
        :disabled="disabled" 
        :error="hasError"
        @focus="isFocused = true" 
        @blur="handleBlur" 
        density="compact"
        @input="handleInput"
      >
        <template #decrement>
          <!-- Use @mousedown.prevent for immediate action before other events -->
          <v-btn data-test="increment-btn"  variant="text" density="compact" :disabled="isDecrementDisabled" @mousedown.prevent="forceDecrement"
            class="number-input-btn">
            <v-icon>ri-subtract-line</v-icon>
          </v-btn>
        </template>

        <template #increment>
          <!-- Use @mousedown.prevent for immediate action before other events -->
          <v-btn data-test="decrement-btn" variant="text" density="compact" :disabled="isIncrementDisabled" @mousedown.prevent="forceIncrement"
            class="number-input-btn">
            <v-icon>ri-add-line</v-icon>
          </v-btn>
        </template>
      </v-number-input>
    </div>

    <div class="egov-number-input__helper">
      <span :class="{
        'error-text': hasError,
        'warning-text': hasWarning
      }">
        {{ helperMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  label: {
    type: String,
    default: 'Label',
  },
  helperText: {
    type: String,
    default: 'Helper text',
  },
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
  step: {
    type: Number,
    default: 1,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  warningMessage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const numberInputId = ref(`number-${uuidv4()}`)
const isFocused = ref(false)
const internalValue = ref(null)

const errorState = ref({
  hasParseError: false,
  parseErrorMessage: '',
  hasRangeError: false,
  rangeErrorMessage: '',
})

// Computed properties
const hasError = computed(() => {
  return !!props.errorMessage || errorState.value.hasParseError || errorState.value.hasRangeError
})

const hasWarning = computed(() => {
  return !hasError.value && !!props.warningMessage
})

const helperMessage = computed(() => {
  if (props.errorMessage) return props.errorMessage
  if (errorState.value.hasParseError) return errorState.value.parseErrorMessage
  if (errorState.value.hasRangeError) return errorState.value.rangeErrorMessage
  if (hasWarning.value) return props.warningMessage
  return props.helperText
})

const isDecrementDisabled = computed(() => {
  return props.disabled || (props.min !== null && internalValue.value <= props.min)
})

const isIncrementDisabled = computed(() => {
  return props.disabled || (props.max !== null && internalValue.value >= props.max)
})

// Methods
const parseValueToNumber = (value) => {
  errorState.value.hasParseError = false
  errorState.value.parseErrorMessage = ''

  if (value === null || value === undefined || value === '') {
    return props.min !== null ? props.min : 0
  }

  if (typeof value === 'number') return value

  const parsedValue = parseFloat(value)

  if (isNaN(parsedValue)) {
    errorState.value.hasParseError = true
    errorState.value.parseErrorMessage = `Invalid number format: "${value}"`
    return props.min !== null ? props.min : 0
  }

  return parsedValue
}

const validateValue = (value, isInitial = false) => {
  errorState.value.hasRangeError = false
  errorState.value.rangeErrorMessage = ''

  let validatedValue = value

  if (props.min !== null && value < props.min) {
    validatedValue = props.min
    if (!isInitial) {
      errorState.value.hasRangeError = true
      errorState.value.rangeErrorMessage = `Value cannot be less than ${props.min}`
    }
  } else if (props.max !== null && value > props.max) {
    validatedValue = props.max
    if (!isInitial) {
      errorState.value.hasRangeError = true
      errorState.value.rangeErrorMessage = `Value cannot exceed ${props.max}`
    }
  }

  return validatedValue
}

const updateValue = (newValue) => {
  if (newValue !== internalValue.value) {
    console.log('Updating value:', internalValue.value, '->', newValue)
    internalValue.value = newValue
    emit('update:modelValue', newValue)
  }
}

const handleInput = (value) => {
  try {
    console.log('Input event received with value:', value)
    const parsedValue = parseValueToNumber(value)
    const validatedValue = validateValue(parsedValue)
    updateValue(validatedValue)
  } catch (error) {
    console.error('Error handling input:', error)
  }
}

const handleBlur = () => {
  isFocused.value = false
  try {
    const validatedValue = validateValue(internalValue.value)
    updateValue(validatedValue)
  } catch (error) {
    console.error('Error handling blur:', error)
  }
}

const forceIncrement = () => {
  try {
    if (isIncrementDisabled.value) return

    console.log('Force increment clicked', internalValue.value, '+', props.step)
    const currentValue = Number(internalValue.value || 0)
    const stepValue = Number(props.step)
    const newValue = currentValue + stepValue

    console.log('New value after increment:', newValue)
    const validatedValue = validateValue(newValue)
    updateValue(validatedValue)
  } catch (error) {
    console.error('Error incrementing value:', error)
  }
}

const forceDecrement = () => {
  try {
    if (isDecrementDisabled.value) return

    console.log('Force decrement clicked', internalValue.value, '-', props.step)
    const currentValue = Number(internalValue.value || 0)
    const stepValue = Number(props.step)
    const newValue = currentValue - stepValue

    console.log('New value after decrement:', newValue)
    const validatedValue = validateValue(newValue)
    updateValue(validatedValue)
  } catch (error) {
    console.error('Error decrementing value:', error)
  }
}

// Initialize component
onMounted(() => {
  try {
    internalValue.value = parseValueToNumber(props.modelValue)
    validateValue(internalValue.value, true)
  } catch (error) {
    console.error('Error initializing number input:', error)
    internalValue.value = props.min !== null ? props.min : 0
  }
})

// Watch for modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    try {
      const parsed = parseValueToNumber(newVal)
      if (parsed !== internalValue.value) {
        console.log('Model value changed from parent:', newVal, 'parsed:', parsed)
        internalValue.value = parsed
      }
    } catch (error) {
      console.error('Error watching modelValue:', error)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.egov-number-input {
  margin-bottom: 16px;
  width: 100%;

  &__label {
    display: block;
    font-size: 12px;
    margin-bottom: 8px;
    color: #212121;
    font-weight: 500;
  }

  &__field {
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    :deep(.v-input__control) {
      min-height: 40px;
    }

    :deep(.v-field) {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  &__helper {
    display: flex;
    align-items: center;
    margin-top: 4px;
    font-size: 12px;
    color: #616161;
    min-height: 20px;
  }

  .error-text {
    color: #D32F2F;
  }

  .warning-text {
    color: #FFA000;
  }

  .number-input-btn {
    min-width: 36px !important;
    width: 36px !important;
    height: 36px !important;
    padding: 0 !important;
    margin: 0 !important;

    .v-icon {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.6);
    }

    &:disabled .v-icon {
      color: rgba(0, 0, 0, 0.26) !important;
    }

    &:hover:not(:disabled) .v-icon {
      color: rgba(0, 0, 0, 0.87);
    }
  }
}
</style>