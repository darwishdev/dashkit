<script setup lang="ts">
const props = defineProps({
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    iconOnly: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>
<template>
    <router-link :to="{ name: 'home_view' }" class="flex align-items-center logo-container" v-if="!props.disabled">
        <logo-icon v-if="iconOnly" />
        <logo v-else />
    </router-link>
    <div v-else class="logo-container">
        <logo-icon v-if="iconOnly" />
        <logo v-else />
    </div>
</template>
