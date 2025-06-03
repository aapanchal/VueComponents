<template>
    <div class="egov-toggle">
        <div class="egov-toggle__label-container">
            <label class="egov-toggle__label">
                {{ label }}
                <span v-if="required" class="egov-required-asterisk">*</span>
                <v-tooltip v-if="tooltipText" location="top">
                    <template #activator="{ props }">
                        <i v-bind="props" class="ri-information-line ml-1"></i>
                    </template>
                    <span>{{ tooltipText }}</span>
                </v-tooltip>
            </label>
        </div>

        <v-switch
            v-model="internalValue"
            :disabled="disabled"
            :error="hasError"
            :error-messages="hasError ? errorMessage : ''"
            :hint="!hasError ? helperText : ''"
            persistent-hint
            color="#4CAF50"
            hide-details="auto"
            class="egov-toggle__switch"
            @update:modelValue="handleChange"
        >
            <template #label>
                <span class="egov-toggle__state-label">
                    {{ internalValue ? onLabel : offLabel }}
                </span>
            </template>
        </v-switch>
        <!-- Debug output -->
        <div style="font-size: 12px; color: #666;">Debug: Toggle Value = {{ internalValue }}</div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: 'Toggle'
    },
    onLabel: {
        type: String,
        default: 'On'
    },
    offLabel: {
        type: String,
        default: 'Off'
    },
    helperText: {
        type: String,
        default: ''
    },
    errorMessage: {
        type: String,
        default: ''
    },
    tooltipText: {
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
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
    console.log('Toggle modelValue updated:', newVal)
    internalValue.value = newVal
})

const hasError = computed(() => !!props.errorMessage)

const handleChange = (value) => {
    console.log('Toggle changed, new value:', value)
    emit('update:modelValue', value)
    emit('change', value)
}
</script>

<style lang="scss" scoped>
.egov-toggle {
    width: 100%;
    margin-bottom: 16px;

    &__label-container {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    &__label {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        color: #212121;
    }

    &__state-label {
        font-size: 14px;
        margin-left: 8px;
        color: #45464F;
    }

    :deep(.v-selection-control) {
        min-height: 40px;
        align-items: center;
    }

    :deep(.v-switch__track) {
        opacity: 1 !important;
        min-width: 50px !important;
        height: 29px !important;
        border-radius: 15px !important;
    }

    :deep(.v-switch__thumb) {
        background-color: #FFFFFF !important; // Thumb stays white
        height: 19px !important;
        width: 19px !important;
    }

    :deep(.v-switch.v-input--is-dirty .v-switch__track) {
        background-color: #030a42 !important; // Selected state (green)
        opacity: 1 !important;
    }

    :deep(.v-switch--disabled) {
        .v-switch__track {
            background-color: rgba(0, 0, 0, 0.26) !important; // Disabled state
        }
        .v-switch__thumb {
            background-color: #B0BEC5 !important;
        }
    }

    .egov-required-asterisk {
        color: #0e15d5;
        margin-left: 4px;
    }

    .ri-information-line {
        font-size: 16px;
        color: #45464F;
        margin-left: 4px;
    }

    :deep(.v-messages) {
        .v-messages__message {
            font-size: 12px;
            margin-top: 4px;
            color: #616161;

            &.error--text {
                color: #D32F2F;
            }
        }
    }
}
</style>