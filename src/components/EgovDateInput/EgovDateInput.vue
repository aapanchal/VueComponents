<template>
  <div class="egov-date-input">
    <v-text-field
      :model-value="inputText"
      @update:model-value="onInput"
      variant="outlined"
      density="compact"
      :label="label"
      :placeholder="placeholder || 'MM/DD/YYYY'"
      :required="required"
      :error="error"
      :error-messages="errorMessages"
      :success="success"
      :success-messages="successMessages"
      :readonly="readonly"
      :disabled="disabled"
      @blur="onBlur"
      @focus="onFocus"
      class="calendar-input"
    >
      <template #append-inner>
        <i class="ri-calendar-line calendar-icon" @click.stop="showDatePicker = true"></i>
      </template>
    </v-text-field>

    <v-dialog v-model="showDatePicker" width="290">
      <v-date-picker
        v-model="localDate"
        :min="min"
        :max="max"
        :show-adjacent-months="showAdjacentMonths"
        :show-week="showWeek"
        :first-day-of-week="firstDayOfWeek"
        @update:model-value="handleChange"
        :title="pickerTitle"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  required: Boolean,
  tooltip: String,
  placeholder: String,
  min: String,
  max: String,
  firstDayOfWeek: { type: Number, default: 0 },
  showAdjacentMonths: { type: Boolean, default: true },
  showWeek: { type: Boolean, default: false },
  pickerTitle: { type: String, default: 'Select Date' },
  variant: {
    type: String,
    default: 'outlined',
    validator: (value) =>
      ['outlined', 'filled', 'solo', 'plain', 'underlined'].includes(value),
  },
  disabled: Boolean,
  readonly: Boolean,
  error: Boolean,
  errorMessages: [String, Array],
  success: Boolean,
  successMessages: [String, Array],
})

const emit = defineEmits(['update:model-value', 'blur', 'focus', 'change'])

const localDate = ref(props.modelValue)
const inputText = ref('')
const showDatePicker = ref(false)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date)) return ''
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const parseDateInput = (val) => {
  const clean = val.replace(/\D/g, '').slice(0, 8)
  let formatted = ''
  if (clean.length >= 2) formatted += clean.slice(0, 2) + '/'
  if (clean.length >= 4) formatted += clean.slice(2, 4) + '/'
  if (clean.length > 4) formatted += clean.slice(4)
  else if (clean.length > 2) formatted += clean.slice(2)
  return formatted
}

const onInput = (val) => {
  inputText.value = parseDateInput(val)

  const parts = inputText.value.split('/')
  if (parts.length === 3 && parts[2]?.length === 4) {
    const date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    if (!isNaN(date.getTime())) {
      const iso = date.toISOString().split('T')[0]
      localDate.value = iso
      emit('update:model-value', iso)
      emit('change', iso)
    }
  }
}

const handleChange = (val) => {
  localDate.value = val
  inputText.value = formatDate(val)
  emit('update:model-value', val)
  emit('change', val)
  showDatePicker.value = false
}

const onBlur = (event) => emit('blur', event)
const onFocus = (event) => emit('focus', event)

watch(
  () => props.modelValue,
  (newVal) => {
    localDate.value = newVal
    inputText.value = formatDate(newVal)
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.calendar-input :deep(.v-field) {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.calendar-icon {
  font-size: 20px;
  cursor: pointer;
  color: #757575;
}

.calendar-icon:hover {
  color: #424242;
}

.egov-date-input {
  font-family: 'Inter', sans-serif;
  margin-bottom: 24px;
}

:deep(.v-dialog) {
  z-index: 1000;
}
</style>

<style lang="scss" scoped>
.calendar-input :deep(.v-field) {
  border: 1px solid #ccc;
  /* Light gray border */
  border-radius: 4px;
}

.calendar-icon {
  font-size: 20px;
  cursor: pointer;
  color: #757575;
}

.calendar-icon:hover {
  color: #424242;
}

.calendar-input :deep(.v-field__input) {
  cursor: pointer;
}

.calendar-icon {
  font-size: 20px;
  cursor: pointer;
  color: #757575;
}

.calendar-icon:hover {
  color: #424242;
}

.calendar-input :deep(.v-field__input) {
  cursor: pointer;
}

.egov-date-input {
  font-family: 'Inter', sans-serif;
  margin-bottom: 24px;

  .title-wrapper {
    display: flex;
    align-items: center;

    .required-indicator {
      color: #D32F2F;
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
    font-family: 'Inter', sans-serif;

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
          color: #D32F2F !important;
          border-width: 2px;
        }

        .v-label {
          color: #D32F2F !important;
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

  :deep(.v-input__append-inner) {
    color: #757575;
    cursor: pointer;

    &:hover {
      color: #424242;
    }
  }

  .date-picker-header {
    padding: 16px;
    font-weight: 500;
    text-align: center;
    background-color: #1976D2;
    color: white;
  }
}
</style>