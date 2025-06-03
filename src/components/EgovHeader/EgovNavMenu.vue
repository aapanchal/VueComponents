<template>
  <nav aria-label="Commonwealth of Pennsylvania" class="egov-nav-menu">
    <ul class="nav-list">
      <EgovNavItem
        v-for="(item, index) in menuItems"
        :key="index"
        :item="item"
        :depth="0"
        @close-all="closeAllDropdowns"
      />
    </ul>
  </nav>
</template>

<script setup>
import EgovNavItem from './EgovNavItem.vue'

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close-all'])

const closeAllDropdowns = () => {
  emit('close-all')
}
</script>

<style scoped lang="scss">
.egov-nav-menu {
  background-color: #fff;
  max-width: 1200px;
  margin: 0 auto;

  .nav-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>