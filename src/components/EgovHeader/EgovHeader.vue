<template>
    <header class="egov-header">
        <!-- Skip Link -->
        <a href="#content" class="skip-main">Skip to content</a>

        <!-- Navigation Menu -->
        <EgovNavMenu :menu-items="menuItems" />
    </header>
</template>

<script setup>
import { ref } from 'vue'
import EgovNavMenu from './EgovNavMenu.vue'

const props = defineProps({
    menuItems: {
        type: Array,
        default: () => [],
    },
})

const searchQuery = ref('')

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        console.log('Search for:', searchQuery.value)
        // Implement search functionality here
    }
}
</script>

<style scoped lang="scss">
.egov-header {
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
    padding: 16px;

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    .header-branding {
        .logo-text {
            font-size: 20px;
            font-weight: 700;
            color: #00629e;
        }
    }

    .header-search {
        width: 300px;

        .search-input {
            :deep(.v-field) {
                border-radius: 4px;
            }
        }
    }

    /* Skip Link Styling */
    .skip-main {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        background-color: #1976d2;
        color: #fff;
        font-weight: 600;
        padding: 8px 16px;
        text-decoration: none;

        &:focus {
            clip: auto;
            height: auto;
            margin: 0;
            overflow: visible;
            position: absolute;
            width: auto;
            z-index: 1000;
            top: 8px;
            left: 8px;
        }
    }
}
</style>