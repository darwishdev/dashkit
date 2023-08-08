<script setup lang="ts">
const props = defineProps({
    msg: {
        type: String,
        required: false,
        default: "unknown_error"
    },
})

const emit = defineEmits<{
    (e: 'reload'): void
}>()
</script>
<template>
    <div class="error mt-4 text-center">
        <logo-error />
        <h2 class="text-3xl"> {{ $t(props.msg) }}</h2>
        <i class="pi pi-refresh text-3xl mt-4 cursor-pointer" @click="emit('reload')"></i>
    </div>
</template>
