<template>
  <div class="egov-checkbox-group">
    <div class="label-wrapper" v-if="label">
      <label :for="checkboxId" class="checkbox-label">
        {{ label }}
        <span v-if="required" class="required">*</span>
        <v-tooltip v-if="tooltip" location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" size="x-small" class="tooltip-icon" icon="$info" />
          </template>
          {{ tooltip }}
        </v-tooltip>
      </label>
    </div>

    <v-checkbox
      v-model="internalValue"
      :disabled="disabled"
      :error="hasError"
      :id="checkboxId"
      hide-details="auto"
      @click="handleCheckboxClick"
    >
      <template #label>
        <div class="checkbox-label-wrapper">
          <v-icon
            size="25"
            class="checkbox-icon"
            :class="{ selected: internalValue, unselected: !internalValue }"
          >
            {{ internalValue ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line' }}
          </v-icon>
          <span class="checkbox-text">{{ checkboxText }}</span>
        </div>
      </template>
    </v-checkbox>

    <div class="helper-text">
      <span v-if="hasError && errorMessage" class="error-text">{{ errorMessage }}</span>
      <span v-else-if="helperText">{{ helperText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  checkboxText: { type: String, default: 'Checkbox' },
  required: { type: Boolean, default: false },
  helperText: { type: String, default: '' },
  errorMessage: { type: String, default: '' },
  tooltip: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const checkboxId = `egov-checkbox-${uuidv4()}`

// Internal value for the checkbox
const internalValue = ref(props.modelValue)

// Sync internalValue with modelValue
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal
})

// Emit updates to parent
watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal)
  emit('change', newVal)
})

// Handle checkbox click
const handleCheckboxClick = () => {
  if (!props.disabled) {
    internalValue.value = !internalValue.value
  }
}

// Computed property for error state
const hasError = computed(() => !!props.errorMessage)
</script>

<style scoped lang="scss">
.egov-checkbox-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  .label-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 4px;

    .checkbox-label {
      font-weight: 500;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 4px;

      .required {
        color: #d32f2f;
        margin-left: 2px;
      }

      .tooltip-icon {
        margin-left: 4px;
        color: #001849;
      }
    }
  }

  .v-checkbox {
    margin-top: 0;
    padding-top: 0;

    :deep(.v-selection-control) {
      min-height: auto;
      padding: 0;

      .v-selection-control__wrapper {
        display: none !important;
      }

      .v-selection-control__wrapper {
        display: flex;
        align-items: center;
      }
    }

    .checkbox-label-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: -12px; // Compensate for Vuetify's default padding

      .checkbox-icon {
        width: 50px!important;
        margin-right: 8px;
        transition: color 0.2s ease;

        &.unselected {
          color: #45464F;
        }

        &.selected {
          color: #00629E;
        }
      }

      .checkbox-text {
        font-size: 14px;
        color: #001849;
      }
    }
  }

  .helper-text {
    font-size: 12px;
    min-height: 20px;
    margin-top: 4px;

    .error-text {
      color: #d32f2f;
    }

    span {
      color: #616161;
    }
  }
}
</style>