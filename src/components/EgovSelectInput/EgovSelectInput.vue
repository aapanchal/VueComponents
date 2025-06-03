<template>
  <!-- Keep the same template as before -->
  <div class="egov-select-input">
    <label class="egov-select-label">
      <v-label data-test="password-title" class="text-subtitle-1">{{ label }}</v-label>
      <v-label data-test="required-indicator" v-if="required" class="required-indicator ml-1">*</v-label>
      <v-tooltip v-if="tooltip" location="top">
        <template v-slot:activator="{ props }">
          <v-icon class="custom-icon" icon="$info" v-bind="props" size="x-small"></v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </label>

    <v-select v-model="internalValue" :items="items" :clearable="clearable" :error="!!errorMessage" :variant="variant" :multiple="multiple"
      :disabled="disabled" item-text="name" item-value="id" density="compact" :menu-props="{ maxHeight: 300 }">
      <template #clear>
        <v-icon class="clear-icon" @click.stop="clearSelection">ri-close-circle-line</v-icon>
      </template>

      <template #append-inner>
        <v-icon class="dropdown-icon">ri-arrow-down-s-line</v-icon>
      </template>

      <template #item="{ item, props }">
        <v-list-item v-bind="props">
          <v-list-item-title :class="{ 'selected-item': isSelected(item) }">
            {{ item.name }}
          </v-list-item-title>
          <v-spacer />
          <v-icon v-if="isSelected(item)" class="check-icon">ri-check-line</v-icon>
        </v-list-item>
      </template>
    </v-select>

    <div class="egov-select-helper">
      <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
      <span v-else class="helper-text">{{ helperText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  },
  label: {
    type: String,
    default: 'Select'
  },
  items: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  helperText: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  tooltip: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'outlined'
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

const clearSelection = () => {
  internalValue.value = props.multiple ? [] : ''
}

const isSelected = (item) => {
  if (props.multiple && Array.isArray(internalValue.value)) {
    return internalValue.value.includes(item.id)
  }
  return internalValue.value === item.id
}
</script>

<style scoped lang="scss">
/* Keep the same styles as before */
.custom-icon {
  width: 1rem;
  margin-left: 3px;
}

.egov-select-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;

  .egov-select-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    gap: 4px;

    span {
      color: #001849;
    }

    .required-indicator {
      color: #d32f2f;
      font-weight: 500;
    }

    .info-icon {
      color: #757575;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: #212121;
      }
    }
  }

  .egov-select-helper {
    font-size: 12px;
    min-height: 20px;

    .error-text {
      color: #D32F2F;
    }

    .helper-text {
      color: #616161;
    }
  }

  ::v-deep(.v-select__menu-icon) {
    display: none !important;
  }

  ::v-deep(.v-select) {
    .v-field__clearable .clear-icon {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.54);

      &:hover {
        color: rgba(0, 0, 0, 0.87);
      }
    }

    .v-field__append-inner .dropdown-icon {
      color: rgba(0, 0, 0, 0.54);
    }

    .v-field__input {
      color: #001849; // Selected value color
    }
  }

  ::v-deep(.check-icon) {
    color: #4caf50;
    font-size: 18px;
  }

  ::v-deep(.v-list-item--active) {
    .v-list-item-title {
      color: #001849 !important;
    }
  }

  ::v-deep(.selected-item) {
    color: #001849 !important;
    font-weight: 500;
  }
}
</style>