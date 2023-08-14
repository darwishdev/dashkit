<script setup>
const props = defineProps({
    context: Object,
})

// const digits = Number(props.context.digits)

function handleInput(e) {
    props.context.node.input(Number(e.target.value))
}
</script>

<template>
    <input @input="handleInput" :placeholder="$t('enter_number')" class="formkit-input" type="number"
        :value="props.context._value" />
</template>