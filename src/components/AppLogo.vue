<script setup lang="ts">
const baseImage = import.meta.env.VITE_IMG_URL
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
    <router-link to="/dashboard" class="flex align-items-center logo-container" v-if="!props.disabled">
        <img :src="`${baseImage}/logo.svg`">
    </router-link>
    <div v-else class="logo-container">
        <img v-if="iconOnly" :src="`${baseImage}/icon.svg`" />
        <img v-else :src="`${baseImage}/logo.svg`" />
    </div>
</template>
