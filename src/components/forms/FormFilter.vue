<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { FormKitSchemaNode } from '@formkit/core'
import FormFactory from '@/utils/form/FormFactory'
import { debounce } from 'lodash'
import { getInputParser } from '@/utils/form/filter'
import { getNode } from '@formkit/core'
import { FormFilterOptions } from '@/types/types'

export default defineComponent({
    props: {
        inputs: {
            type: Array as PropType<Array<FormKitSchemaNode>>,
            required: true,
        },
        options: {
            type: Object as PropType<FormFilterOptions>,
            required: false,
            default: {
                showActiveFilters: false,
                showClearFilters: true,
            },
        },
        modelValue: {
            type: Object,
            required: false,
        },
        modelDisplay: {
            type: Object,
            required: false,
        },
    },
    setup(props, { emit }) {

        // Function to initialize the form schema
        const formSchema = FormFactory.CreateFormFilter(props.inputs)

        // Reactive variables
        const formData = ref({})
        const activeFilters = ref({})

        // Initialize the formData if modelValue prop is provided
        if (props.modelValue) {
            formData.value = { ...props.modelValue }
        }

        // Debounced emit function for the filter event
        const emitFilter = ref(debounce((filterObject: any) => {
            emit('filter', filterObject)
        }, 500))

        // Function to handle form value changes
        const updateFormValue = async (value: any, node: any) => {
            const filteredFormData = filterNonNullValues(value)

            if (props.modelValue) {
                emit('update:modelValue', filteredFormData)
            }

            const keys = Object.keys(filteredFormData)
            for (const input of keys) {
                const isBinded = isFilterBinded(activeFilters.value[input], filteredFormData[input])
                if (!isBinded) {
                    const currentInput = node.at(input)
                    const parser = getInputParser(currentInput.props.type)
                    const displayValue = parser.getDisplayValue(currentInput)
                    activeFilters.value[input] = { key: input, value: displayValue }
                    emitFilter.value({ key: input, value: currentInput.value })
                    if (props.modelDisplay) {
                        emit('update:modelDisplay', activeFilters.value)
                    }
                    return
                }
            }
        }

        // Function to remove a specific filter
        const removeFilter = (filter: string) => {
            delete activeFilters.value[filter]
            const node = getNode('filter-form')
            if (node?._value) {
                node._value[filter] = undefined
            }
            node?.input(node._value)
            emit('removeFilter', filter)
        }

        // Function to clear all filters
        const clearAllFilters = () => {
            const node = getNode('filter-form')
            if (props.modelDisplay) {
                emit('update:modelDisplay', {})
            }
            node?.input({})
        }

        // Helper functions

        // Function to filter non-null values from an object
        const filterNonNullValues = (value: any) => {
            return Object.fromEntries(Object.entries(value).filter(([key, value]) => {
                const isNotNull = value !== null && value !== "" && value !== undefined
                if (!isNotNull && activeFilters.value[key]) {
                    delete activeFilters.value[key]
                }
                return isNotNull
            }))
        }

        // Function to check if a filter is already binded
        const isFilterBinded = (filter: any, value: any) => {
            return typeof filter !== 'undefined' && filter.value === value
        }

        return {
            formSchema,
            activeFilters,
            formData,
            updateFormValue,
            removeFilter,
            clearAllFilters,
            inputs: props.inputs,
            options: props.options,
            modelValue: props.modelValue,
            display: props.modelDisplay,
        }
    },
})
</script>
<template>
    <div class="grid align-items-center w-full">
        <div :class="{ 'col-11': options.showClearFilters, 'col-12': !options.showClearFilters }">
            <FormKit id="filter-form" :value="modelValue" @input="updateFormValue" type="form" :actions="false">
                <FormKitSchema :schema="formSchema" />
            </FormKit>

        </div>
        <div v-if="options.showClearFilters" class="col-1">
            <svg @click="clearAllFilters" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                fill="var(--color-white)" viewBox="0 0 24 24">
                <path stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                    stroke-width="1.5"
                    d="M21.63 14.75c0 .89-.25 1.73-.69 2.45a4.709 4.709 0 0 1-4.06 2.3 4.73 4.73 0 0 1-4.06-2.3 4.66 4.66 0 0 1-.69-2.45c0-2.62 2.13-4.75 4.75-4.75s4.75 2.13 4.75 4.75Zm-3.481 1.24-2.51-2.51m2.491.03-2.51 2.51" />
                <path stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                    stroke-width="1.5"
                    d="M20.69 4.02v2.22c0 .81-.51 1.82-1.01 2.33l-1.76 1.55a4.42 4.42 0 0 0-1.04-.12c-2.62 0-4.75 2.13-4.75 4.75 0 .89.25 1.73.69 2.45.37.62.88 1.15 1.5 1.53v.34c0 .61-.4 1.42-.91 1.72L12 21.7c-1.31.81-3.13-.1-3.13-1.72v-5.35c0-.71-.41-1.62-.81-2.12L4.22 8.47c-.5-.51-.91-1.42-.91-2.02V4.12C3.31 2.91 4.22 2 5.33 2h13.34c1.11 0 2.02.91 2.02 2.02Z"
                    opacity=".4" />
            </svg>
        </div>
    </div>
    <div v-if="options.showActiveFilters && activeFilters" class="active-filters">
        <div class="filter" v-for="(filter, index) in Object.keys(activeFilters) " :key="index"
            @click.prevent="removeFilter(filter)">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="var(--color-white)" viewBox="0 0 24 24">
                <path stroke="#464455" stroke-linecap="round" stroke-linejoin="round"
                    d="M18 7h-2m-3.5-2H6c-.471 0-.707 0-.854.146C5 5.293 5 5.53 5 6v1.965c0 .262 0 .393.06.503.058.11.167.184.385.329l3.024 2.015c.872.582 1.308.873 1.544 1.315.237.442.237.966.237 2.014V19l3.5-1.75v-3.11c0-1.047 0-1.571.237-2.013.133-.25.331-.452.636-.686M20 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <h3 class=""> <strong>{{ $t(`${activeFilters[filter].key}_filter`) }}</strong> : {{
                activeFilters[filter].value }} </h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="var(--color-white)" viewBox="0 0 24 24">
                <path stroke="var(--color-white)" stroke-linecap="round" stroke-width="2" d="m16 8-8 8m0-8 8 8" />
            </svg>
        </div>
    </div>
</template>