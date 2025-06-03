<template>
  <v-sheet class="egov-tab-sheet" elevation="3" rounded="lg">
    <v-tabs
      v-model="internalTab"
      class="egov-tabs"
      align-tabs="center"
      height="60"
      show-arrows
    >
      <v-tab
        v-for="(t, index) in tabs"
        :key="index"
        :value="t.value"
        class="egov-tab"
      >
        <i :class="t.icon" class="tab-icon"></i>
        <span class="tab-text">{{ t.text }}</span>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="internalTab">
      <v-tabs-window-item
        v-for="(t, index) in tabs"
        :key="index"
        :value="t.value"
        class="pa-4"
      >
        <slot :name="t.value">{{ t.content }}</slot>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [
      {
        text: "Tab label",
        icon: "ri-list-unordered",
        value: "tab1",
        content: "Tab 1 content"
      },
      {
        text: "Tab label",
        icon: "ri-map-2-line",
        value: "tab2",
        content: "Tab 2 content"
      }
    ]
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Initialize with prop value or first tab's value
const internalTab = ref(props.modelValue || props.tabs[0]?.value || '')

// Watch for changes from parent
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalTab.value) {
    internalTab.value = newValue
  }
})

// Emit changes to parent
watch(internalTab, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
})
</script>

<style lang="scss" scoped>
.egov-tab-sheet {
  background-color: white;
}

.egov-tabs {
  background-color: white;

  .v-tab {
    color: #5f6368;
    font-weight: 500;
    text-transform: none;
    display: flex;
    align-items: center;
    gap: 8px;

    &.v-tab--active {
      color: #001849;

      .tab-icon {
        color: #001849;
      }
    }
  }

  .v-tabs-bar {
    border-bottom: 3px solid transparent;

    .v-tab--active {
      border-bottom: 3px solid #00629e !important;
    }
  }
}

.tab-icon {
  font-size: 1.2rem;
  pointer-events: none; // ensures click behavior stays with the tab, not icon
}
</style>