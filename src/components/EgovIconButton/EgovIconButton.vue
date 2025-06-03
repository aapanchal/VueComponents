<template>
  <v-icon-btn v-bind="buttonProps" @click="handleClick">
    <v-icon icon="$next" :class="[iconClasses]" :style="iconStyle" />
  </v-icon-btn>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'flat',
    validator: (value) => ['flat', 'outlined', 'text', 'tonal', 'elevated'].includes(value),
  },
  size: {
    type: String,
    default: 'default',
    validator: (val) => ['x-small', 'small', 'default', 'large', 'x-large'].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'primary',
  },
  isToggle: {
    type: Boolean,
    default: false,
  },
  initialToggled: {
    type: Boolean,
    default: false,
  },
  toggleColor: {
    type: String,
    default: '',
  },
  density: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'comfortable', 'compact'].includes(val),
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  iconSize: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits(['click', 'toggle'])
const toggled = ref(props.initialToggled)

const handleClick = (event) => {
  emit('click', event)
  if (props.isToggle) {
    toggled.value = !toggled.value
    emit('toggle', toggled.value)
  }
}

const iconClasses = computed(() => ({
  'icon--toggled': toggled.value && props.isToggle,
}))

const iconStyle = computed(() => {
  if (props.iconSize) {
    return { fontSize: isNaN(props.iconSize) ? props.iconSize : `${props.iconSize}px` }
  }
  return {}
})

const buttonProps = computed(() => {
  const currentColor = props.isToggle && toggled.value && props.toggleColor ? props.toggleColor : props.color

  return {
    variant: props.variant,
    disabled: props.disabled,
    loading: props.loading,
    color: currentColor,
    density: props.density,
    size: props.size,
    'aria-label': props.ariaLabel || 'Icon button',
    ...(props.isToggle && { 'aria-pressed': toggled.value })
  }
})
</script>

<style lang="scss" scoped>
.v-icon-btn {
  border-radius: 5% !important;
  min-width: unset;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  i {
    font-size: 1.25rem;
    line-height: 1;
    transition: all 0.2s ease;
  }

  &--size-x-small i {
    font-size: 1rem;
  }

  &--size-small i {
    font-size: 1.125rem;
  }

  &--size-large i {
    font-size: 1.375rem;
  }

  &--size-x-large i {
    font-size: 1.5rem;
  }
}
</style>