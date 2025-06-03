<template>
    <li class="nav-item" :class="{ 'has-dropdown': item.children?.length }">
      <!-- Top-Level Item or Sub-Item -->
      <div class="nav-item-wrapper">
        <!-- If the item has children, render as a disclosure button -->
        <button
          v-if="item.children?.length"
          :id="`nav-button-${item.id}`"
          :aria-controls="`dropdown-${item.id}`"
          :aria-expanded="isOpen.toString()"
          class="nav-button"
          @click="toggleDropdown"
          @keydown.space.prevent="toggleDropdown"
          @keydown.enter.prevent="toggleDropdown"
          @keydown.esc="closeDropdown"
          @focus="handleFocus"
          @blur="handleBlur"
        >
          <span class="nav-label">{{ item.label }}</span>
          <v-icon v-if="item.icon" :icon="item.icon" class="nav-icon" />
        </button>
  
        <!-- If the item has no children, render as a link -->
        <a
          v-else
          :href="item.href || '#'"
          class="nav-link"
          :class="{ 'aria-current': item.isCurrent }"
          :aria-current="item.isCurrent ? 'page' : undefined"
          @click="handleLinkClick"
          @keydown.enter.prevent="handleLinkClick"
          @keydown.esc="closeDropdown"
          @focus="handleFocus"
          @blur="handleBlur"
        >
          <span class="nav-label">{{ item.label }}</span>
          <v-icon v-if="item.icon" :icon="item.icon" class="nav-icon" />
        </a>
      </div>
  
      <!-- Dropdown Menu (if children exist) -->
      <ul
        v-if="item.children?.length"
        :id="`dropdown-${item.id}`"
        class="dropdown-menu"
        :class="{ 'is-open': isOpen }"
      >
        <EgovNavItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :depth="depth + 1"
          @close-all="closeAllDropdowns"
        />
      </ul>
    </li>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
  })
  
  const emit = defineEmits(['close-all'])
  
  const isOpen = ref(false)
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      emit('close-all') // Close other dropdowns
    }
  }
  
  const closeDropdown = () => {
    isOpen.value = false
  }
  
  const closeAllDropdowns = () => {
    if (isOpen.value) {
      closeDropdown()
    }
  }
  
  const handleLinkClick = (event) => {
    // Simulate setting aria-current (for demo purposes)
    if (!props.item.children?.length) {
      console.log('Link activated:', props.item.label)
      emit('close-all') // Close all dropdowns when a link is activated
    }
  }
  
  const handleFocus = () => {
    // Keep dropdown open if focus is within the nav item
  }
  
  const handleBlur = (event) => {
    // Close dropdown if focus leaves the nav item and its descendants
    const relatedTarget = event.relatedTarget
    const navItem = event.currentTarget.closest('.nav-item')
    if (!navItem.contains(relatedTarget)) {
      closeDropdown()
    }
  }
  
  // Handle global close-all event
  onMounted(() => {
    props.$on('close-all', closeAllDropdowns)
  })
  
  onUnmounted(() => {
    props.$off('close-all', closeAllDropdowns)
  })
  </script>
  
  <style scoped lang="scss">
  .nav-item {
    position: relative;
  
    &.has-dropdown {
      .nav-button {
        position: relative;
        padding-right: 24px; /* Space for caret */
  
        /* Caret using ::after pseudo-element */
        &::after {
          content: '';
          position: absolute;
          right: 8px;
          top: 50%;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #616161;
          transition: transform 0.3s ease;
        }
  
        &[aria-expanded='true']::after {
          transform: rotate(180deg);
        }
      }
    }
  
    .nav-item-wrapper {
      display: flex;
      align-items: center;
    }
  
    .nav-button,
    .nav-link {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #00629e;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
  
      .nav-label {
        margin-right: 8px;
      }
  
      .nav-icon {
        font-size: 16px;
      }
  
      &:hover {
        background-color: #e3f2fd;
        color: #00629e;
      }
  
      &:focus {
        outline: 2px solid #1976d2;
        outline-offset: 2px;
      }
  
      &.aria-current {
        color: #00629e;
        font-weight: 600;
      }
    }
  
    .dropdown-menu {
      display: none;
      list-style: none;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      z-index: 1000;
  
      &.is-open {
        display: block;
      }
  
      .nav-item {
        /* Indent grandchild items */
        padding-left: calc(8px * v-bind(depth));
  
        .nav-link,
        .nav-button {
          width: 100%;
          text-align: left;
          padding: 8px 16px;
        }
      }
    }
  
    /* Depth-based indentation for sub-items */
    &:not(:first-child) {
      .nav-link,
      .nav-button {
        padding-left: calc(16px + (8px * v-bind(depth)));
      }
    }
  }
  </style>