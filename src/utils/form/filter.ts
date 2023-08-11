
import { parseDate, compareDbDate, isFirstStringBigger, isFirstDateBigger } from "@/utils/helpers";
// import type { FormKitNode } from '@formkit/core'
import type { FilterInput, DisplayValueParams, filterFunctionParams } from '@/types/types'

// Implement the DefaultInput class
class DefaultInputFilter implements FilterInput {
    getDisplayValue(params: DisplayValueParams): string {
        return params.value
    }
    getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        return isFirstStringBigger(input.oldValue, input.newValue) ? 'applyAllFilters' : 'applyFilter'
    }

    filterFunction(params: filterFunctionParams): boolean {
        return params.data[params.input.name].toLowerCase().includes(params.input.value.toLowerCase())
    }


}

// Implement the ListInput class
class ListInputFilter implements FilterInput {
    getDisplayValue(params: DisplayValueParams): string {
        return params.options!.find(option => option.value === `__mask_${params.value}`).label
    }

    getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        return isFirstStringBigger(input.oldValue, input.newValue) ? 'applyAllFilters' : 'applyFilter'
    }
    filterFunction(params: filterFunctionParams): boolean {
        return params.data[params.input.name] == params.input.value

    }
}

// Implement the DateInput class
class DateInputFilter implements FilterInput {

    getDisplayValue(params: DisplayValueParams): string {
        return parseDate(params.value)
    }
    getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        const isNewValueBigger = isFirstDateBigger(input.newValue, input.oldValue)
        if (input.name.includes("After")) {
            return isNewValueBigger ? 'applyFilter' : 'applyAllFilters'
        }
        if (input.name.includes("Before")) {
            return isNewValueBigger ? 'applyAllFilters' : 'applyFilter'
        }
        return 'applyFilter'
    }
    filterFunction(params: filterFunctionParams): boolean {
        const name = params.input.name
        if (name.includes("After")) {
            const inputName = name.slice(0, -5);
            const isInputDateAfter = compareDbDate(params.input.value, params.data[inputName])
            return isInputDateAfter

        }
        if (name.includes("Before")) {
            const inputName = name.slice(0, -6);
            const isInputDateAfter = compareDbDate(params.input.value, params.data[inputName])
            return !isInputDateAfter
        }
        return params.data

    }
}
export const defaultFilter = new DefaultInputFilter()
export const listFilter = new ListInputFilter()
export const dateFilter = new DateInputFilter()
const inputTypes: Record<string, FilterInput> = {
    "dropdown": listFilter,
    "datepicker": dateFilter,
}

export const getFilterInputInstance = (inputType: string) => {
    return inputTypes[inputType] ? inputTypes[inputType] : defaultFilter
}

