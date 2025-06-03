<template>
  <div class="egov-time-picker">
    <div class="label-container">
      <label :for="`time-input-${uid}`" class="time-picker-label">
        {{ label }}
        <span v-if="required" class="required-flag">*</span>
      </label>
      <v-tooltip v-if="tooltip" location="top">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" size="small" class="tooltip-icon">mdi-information</v-icon>
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
    </div>

    <div class="time-input-container" :class="{ 'error-state': props.error }">
      <v-text-field
        :id="`time-input-${uid}`"
        v-model="timeValue"
        type="text"
        class="time-input"
        density="compact"
        variant="outlined"
        placeholder="HH:MM"
        :error="!!props.error"
        hide-details
        @update:model-value="handleTimeInput"
      ></v-text-field>
      
      <v-select
        v-model="period"
        :items="periodItems"
        density="compact"
        variant="outlined"
        class="period-select"
        hide-details
        menu-icon=""
        @update:model-value="handlePeriodChange"
      ></v-select>
    </div>

    <div v-if="helperText && !props.error" class="helper-text">{{ helperText }}</div>
    <div v-if="props.error" class="error-text">{{ props.error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const uid = ref(Math.random().toString(36).substring(2, 11))

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Choose a time'
  },
  required: {
    type: Boolean,
    default: false
  },
  helperText: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  tooltip: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const timeValue = ref('')
const period = ref('AM')
const periodItems = [
  { title: 'AM', value: 'AM' },
  { title: 'PM', value: 'PM' }
]

// Watch for external modelValue changes
watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    timeValue.value = ''
    period.value = 'AM'
    return
  }
  
  const [time, periodValue] = newVal.split(' ')
  if (time && periodValue) {
    timeValue.value = time
    if (['AM', 'PM'].includes(periodValue.toUpperCase())) {
      period.value = periodValue.toUpperCase()
    }
  }
}, { immediate: true })

const handleTimeInput = (value) => {
  // Filter non-digit characters
  let filteredValue = value.replace(/\D/g, '')
  
  // Limit to 4 digits
  if (filteredValue.length > 4) {
    filteredValue = filteredValue.slice(0, 4)
  }
  
  // Auto-insert colon after 2 digits
  if (filteredValue.length > 2) {
    filteredValue = filteredValue.slice(0, 2) + ':' + filteredValue.slice(2)
  }
  
  timeValue.value = filteredValue
  emitTime()
}

const handlePeriodChange = () => {
  emitTime()
}

const emitTime = () => {
  emit('update:modelValue', timeValue.value ? `${timeValue.value} ${period.value}` : '')
}

// Parse initial value if provided
onMounted(() => {
  if (props.modelValue) {
    const [time, periodValue] = props.modelValue.split(' ')
    timeValue.value = time
    if (periodValue && ['AM', 'PM'].includes(periodValue.toUpperCase())) {
      period.value = periodValue.toUpperCase()
    }
  }
})
</script>

<style lang="scss" scoped>
.egov-time-picker {
  font-family: 'Public Sans', sans-serif;
  max-width: 141px;

  .label-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .time-picker-label {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-right: 8px;
    }

    .required-flag {
      color: #d63638;
      margin-left: 2px;
    }

    .tooltip-icon {
      color: #555;
    }
  }

  .time-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;

    &.error-state {
      .v-input {
        .v-field {
          border-color: #d63638 !important;
        }
      }
    }

    .time-input,
    .period-select {
      width: 120px;

      .v-field {
        min-height: 40px;
        font-size: 14px;
      }
    }
  }

  .helper-text {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }

  .error-text {
    font-size: 12px;
    color: #d63638;
    margin-top: 4px;
  }
}
</style>