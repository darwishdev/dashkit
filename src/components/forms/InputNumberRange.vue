<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    context: Object,
})
const initialValue = computed(() => {
    if (props.context._value) {
        if (props.context._value.length == 1) {
            return [props.context._value[0], null]
        }
        if (props.context._value.length == 2) {
            return [props.context._value[0], props.context._value[1]]
        }
    }
    return [null, null]
})
const inputModel = ref([null, null])

// const digits = Number(props.context.digits)

function handleInputBefore(e) {
    inputModel.value[0] = e.target.value
    props.context.node.input(inputModel.value)
}

function handleInputAfter(e) {
    inputModel.value[1] = e.target.value
    props.context.node.input(inputModel.value)
}
</script>

<template>
    <div class="flex">
        <input name="before" @input="handleInputBefore" :placeholder="$t('number_from')" class="formkit-input mr-4"
            type="number" :value="initialValue[0]" />
        <input name="after" @input="handleInputAfter" :placeholder="$t('number_from_to')" class="formkit-input"
            type="number" :value="initialValue[1]" />
    </div>
</template>