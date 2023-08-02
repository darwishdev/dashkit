
<script setup lang="ts">

const props = defineProps({
    icon: {
        type: String,
        default: 'bars'
    }
})
</script>
<template>
    <a class="icon-btn">
        <i :class="'pi pi-' + props.icon"></i>
    </a>
</template>
