
<script setup lang="ts">
import type { FormFilterParams } from '@/types/types'
import FormFactory from '@/utils/form/FormFactory'
import { debounce } from 'lodash'
import { ref } from 'vue';
// Function to initialize the form schema
const filterForm = ref()
const activeFilters = ref({})
const props = defineProps<FormFilterParams>();
const formSchema = FormFactory.CreateFormFilter(props.inputs)
// const activeFilters = ref({})


const emit = defineEmits<{
    (e: 'applyFilter', input: string): void;
    (e: 'applyAllFilters'): void;
    (e: 'clearFilters'): void;
    (e: 'update:modelValue', value: any): void;
}>();


// Debounced function to emit the filter event
const debouncedFilterEmit = debounce((input: string) => {
    emit('applyFilter', input);
}, 200);

// Function to filter non-null values from form data
const filterNonNullValues = (value: any) => {
    let somValueCleared = false
    const formData = Object.fromEntries(Object.entries(value).filter(([key, value]) => {
        const isNotNull = value !== null && value !== "" && value !== undefined
        if (!isNotNull && activeFilters.value[key]) {
            delete activeFilters.value[key]
            somValueCleared = true
        }
        return isNotNull
    }))

    return {
        formData,
        somValueCleared
    }
}

const removeFilter = (input: string) => {
    const node = filterForm.value.node
    if (node?._value) {
        node._value[input] = undefined
    }
    node.input(node?._value)
}

const clearFilters = () => {
    const node = filterForm.value.node
    node._value = {}
    node?.input({})
}
// Function to handle form value changes
const updateFormValue = async (formValue: any, _node: any) => {
    const { formData, somValueCleared } = filterNonNullValues(formValue)
    emit('update:modelValue', formData)
    const keys = Object.keys(formData)
    if (keys.length == 0) {
        emit('clearFilters')
        return
    }
    if (somValueCleared) {
        emit('applyAllFilters')
        return
    }
    for (const input of keys) {
        const currentInputValue = formData[input] as string
        const currentInputFilter = props.filters[input]
        const isOldValueUndefined = activeFilters.value[input] == undefined || activeFilters.value[input] == "" || activeFilters.value[input] == null
        const isValueUndefined = currentInputValue == undefined || currentInputValue == "" || currentInputValue == null
        const isValueFirstInitilization = isOldValueUndefined && !isValueUndefined
        if (isValueFirstInitilization) {
            activeFilters.value[input] = currentInputValue
            debouncedFilterEmit(input)
            return
        }

        // if we reach here that means that the input was in active filters and user types into the input it has some value in it
        // so we will make sure first that the old value and new value are not the same because if they the same we will not do anything
        // if they diffrent then we will get the event type by the filter prop
        // this will simply return 'applyFilter or applyAllFilters' and it takes the old value and new value
        // we use this trick to be able diffrent input types like date inputs for example
        // we will compare the date and decide which emit we will use
        // we do that by check the value if it increased then we cann  apply the current filter  on the current filtered data
        // but if the user deletes somthing we will need to refilter the whole dataset because we will expect that the result may equal or bigger thant the current filtered data

        const isValuesDiffrent = activeFilters.value[input] != currentInputValue
        if (isValuesDiffrent) {
            const eventType = currentInputFilter.getEventType({ name: input, oldValue: activeFilters.value[input], newValue: currentInputValue })
            if (eventType == 'applyFilter') {
                activeFilters.value[input] = currentInputValue
                debouncedFilterEmit(input)
                return
            } else {
                activeFilters.value[input] = currentInputValue
                emit('applyAllFilters')
                return
            }
        }


    }
}
defineExpose({ removeFilter, clearFilters })
</script>

<template>
    <FormKit id="filter-form" ref="filterForm" :value="modelValue" @input="updateFormValue" type="form" :actions="false">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>
