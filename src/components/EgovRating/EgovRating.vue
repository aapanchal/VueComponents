<template>
  <div class="egov-rating">
    <v-label v-if="label" class="rating-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
      <v-tooltip v-if="tooltip" location="top">
        <template #activator="{ props }">
          <v-icon class="tooltip-icon" v-bind="props" size="x-small">ri-information-line</v-icon>
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
    </v-label>

    <v-rating
      v-model="internalValue"
      :length="max"
      :readonly="readonly"
      :disabled="disabled"
      active-color="#001849"
      color="#E0E0E0"
      empty-icon="ri-star-line"
      full-icon="ri-star-fill"
      half-icon="ri-star-half-line"
      hover
      @update:modelValue="handleRatingChange"
    />

    <div class="helper-text" v-if="helperText && !error">{{ helperText }}</div>
    <div class="error-text" v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: 'Rating'
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
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: 5
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const internalValue = ref(props.modelValue);

// Watch for changes from parent
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
});

// Handle rating changes
const handleRatingChange = (value) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<style scoped lang="scss">
.egov-rating {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  .rating-label {
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;

    .required {
      color: #d32f2f;
      margin-left: 2px;
    }

    .tooltip-icon {
      margin-left: 4px;
      color: #001849;
    }
  }

  :deep(.v-rating) {
    .v-icon {
      font-size: 24px;
      cursor: pointer;
      transition: color 0.2s ease;

      &.ri-star-fill {
        color: #001849;
      }

      &.ri-star-line, &.ri-star-half-line {
        color: #E0E0E0;
      }
    }

    .v-rating__item--hover {
      .v-icon {
        color: #001849 !important;
        opacity: 0.7;
      }
    }
  }

  .helper-text {
    font-size: 12px;
    color: #616161;
    margin-top: 4px;
  }

  .error-text {
    font-size: 12px;
    color: #d32f2f;
    margin-top: 4px;
  }
}
</style>