
<script setup lang="ts">
import Image, { ImageSlots } from 'primevue/image';
import { h, inject } from 'vue';
import { AppImageParams } from '@/types/types'
const slots = defineSlots<ImageSlots>();
const baseImageUrl = inject('baseImageUrl') as string
const fallBackImageUrl = inject('fallBackImageUrl') as string
const props = defineProps<AppImageParams>();
const renderImage = () => {
    let src = fallBackImageUrl
    if (props.src != "") src = baseImageUrl + props.src
    return h(Image, { src: src }, slots)
}
</script>

<template>
    <component :is="renderImage()" />
</template>
