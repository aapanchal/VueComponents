<template>
  <div class="egov-radio-group">
      <v-radio-group
          v-model="internalValue"
          :label="label"
          :rules="rules"
          :error="hasError"
          :error-messages="errorMessage"
          :hint="helperText"
          persistent-hint
          :required="required"
          :disabled="disabled"
          :key="internalValue"
      >
          <template #label>
              <div class="egov-radio-group__label">
                  {{ label }}
                  <v-tooltip v-if="infoText" location="top">
                      <template #activator="{ props }">
                          <i v-bind="props" class="ri-information-line ml-1" style="font-size: 1rem;"></i>
                      </template>
                      <span>{{ infoText }}</span>
                  </v-tooltip>
                  <span v-if="required" class="egov-required-asterisk">*</span>
              </div>
          </template>

          <v-radio
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled || disabled"
              @click="handleRadioClick(option.value)"
          >
              <!-- Use #default for Vuetify 3.x -->
              <template #default="{ isSelected, isDisabled }">
                  <span style="display: none;">{{ console.log('isSelected:', isSelected, 'value:', option.value) }}</span>
                  <i
                      :class="[
                          isSelected ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line',
                          {
                              'text-disabled': isDisabled,
                              'text-primary': isSelected && !isDisabled
                          }
                      ]"
                  ></i>
              </template>

              <!-- Uncomment this for Vuetify 2.x if #default doesn't work -->
              <!--
              <template #radio="{ isSelected, isDisabled }">
                  <span style="display: none;">{{ console.log('isSelected:', isSelected, 'value:', option.value) }}</span>
                  <i
                      :class="[
                          isSelected ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line',
                          {
                              'text-disabled': isDisabled,
                              'text-primary': isSelected && !isDisabled
                          }
                      ]"
                  ></i>
              </template>
              -->
          </v-radio>

          <template #message="{ message }">
              <div
                  class="egov-radio-group__message"
                  :class="{
                      'error-text': hasError,
                      'warning-text': hasWarning
                  }"
              >
                  {{ message }}
              </div>
          </template>
      </v-radio-group>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
      type: [String, Number, Boolean],
      default: null
  },
  label: {
      type: String,
      default: ''
  },
  options: {
      type: Array,
      required: true,
      validator: (options) => {
          return options.every(option => 'label' in option && 'value' in option)
      }
  },
  helperText: {
      type: String,
      default: ''
  },
  errorMessage: {
      type: String,
      default: ''
  },
  warningMessage: {
      type: String,
      default: ''
  },
  infoText: {
      type: String,
      default: ''
  },
  required: {
      type: Boolean,
      default: false
  },
  disabled: {
      type: Boolean,
      default: false
  },
  rules: {
      type: Array,
      default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

// Sync internalValue with modelValue
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal
})

// Emit updates to parent
watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal)
})

const hasError = computed(() => !!props.errorMessage)
const hasWarning = computed(() => !hasError.value && !!props.warningMessage)

// Manual click handler to ensure selection updates
const handleRadioClick = (value) => {
  if (!props.disabled && !props.options.find(opt => opt.value === value).disabled) {
      internalValue.value = value
  }
}
</script>

<style lang="scss" scoped>
.text-disabled {
  color: rgba(0, 0, 0, 0.26) !important; // Disabled color
}

.text-primary {
  color: #00629E !important; // Selected color
}

.egov-radio-group {
  width: 100%;
  margin-bottom: 16px;

  &__label {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #212121;
      margin-bottom: 8px;
  }

  &__message {
      font-size: 12px;
      margin-top: 4px;
  }

  :deep(.v-selection-control) {
      min-height: 40px;
      align-items: center;
  }

  :deep(.v-radio) {
      .v-label {
          color: #212121;
          font-size: 14px;
          opacity: 1;
          margin-left: 8px;
      }

      &.v-selection-control--disabled {
          .v-label {
              color: rgba(0, 0, 0, 0.38);
          }

          .ri-checkbox-blank-circle-line,
          .ri-checkbox-circle-fill {
              color: rgba(0, 0, 0, 0.26) !important;
          }
      }
  }

  .ri-checkbox-blank-circle-line,
  .ri-checkbox-circle-fill {
      font-size: 1.25rem;
      color: #45464F; // Default unselected color
  }

  .ri-checkbox-circle-fill {
      color: #00629E; // Selected color
  }

  .error-text {
      color: #D32F2F;
  }

  .warning-text {
      color: #FFA000;
  }

  .egov-required-asterisk {
      color: #D32F2F;
      margin-left: 4px;
  }
}
</style>