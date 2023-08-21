
<script setup lang="ts">
import Image, { ImageSlots } from 'primevue/image';
import { h, inject } from 'vue';
import { AppImageParams } from '@/types/types'


const props = defineProps<AppImageParams>();
const slots = defineSlots<ImageSlots>();

// get needed urls provided by package config
const baseImageUrl = inject('baseImageUrl') as string
const fallBackImageUrl = inject('fallBackImageUrl') as string

// function to render the primevue image component
const renderImage = () => {
    let src = fallBackImageUrl
    if (props.src != "") src = baseImageUrl + props.src
    return h(Image, { src: src }, slots)
}

</script>

<template>
    <component :is="renderImage()" />
</template>
