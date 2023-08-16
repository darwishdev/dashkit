
import { parseDate, compareDbDate, isFirstStringBigger, isFirstDateBigger } from "@/utils/helpers";
// import type { FormKitNode } from '@formkit/core'
import type { FilterInput, DisplayValueParams, filterFunctionParams } from '@/types/types'

// Implement the DefaultInput class
class DefaultInputFilter implements FilterInput {
    getDisplayValue(params: DisplayValueParams): string {
        return params.value
    }
    getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        return isFirstStringBigger(input.oldValue, input.newValue) ? 'applyFilter' : 'applyAllFilters'
    }
    filterFunction(params: filterFunctionParams): boolean {
        return params.data[params.input.name].toLowerCase().includes(params.input.value.toLowerCase())
    }
}

// Implement the BooleanFilter class
class BooleanInputFilter implements FilterInput {
    getDisplayValue(params: DisplayValueParams): string {
        return params.value ? "yes" : "no"
    }
    getEventType(_input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        return 'applyAllFilters'
    }
    filterFunction(params: filterFunctionParams): boolean {
        return params.data[params.input.name] == params.input.value
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

// Implement the NumberInput class
class NumberInputFilter implements FilterInput {
    getDisplayValue(params: DisplayValueParams): string {
        return `${params.value[0]} : ${params.value[1]}`
    }

    getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        console.log(input)
        return 'applyAllFilters'
    }
    filterFunction(params: filterFunctionParams): boolean {
        console.log('params.input first valie', params.input.value[0], 'data', params.data[params.input.name], 'params.input last valie', params.input.value[1],)

        const isBiggerThanSmallerInput = Number(params.data[params.input.name]) >= Number(params.input.value[0])
        const isLessThanBiggerInput = Number(params.data[params.input.name]) <= Number(params.input.value[1])
        console.log('is less than', isBiggerThanSmallerInput)
        console.log('is bigger than', isLessThanBiggerInput)
        return isBiggerThanSmallerInput && isLessThanBiggerInput
    }
}

// Implement the NumberInput class
// class BooleanInputFilter implements FilterInput {
//     getDisplayValue(params: DisplayValueParams): string {
//         return `${params.value[0]} : ${params.value[1]}`
//     }

//     getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
//         console.log(input)
//         return 'applyAllFilters'
//     }
//     filterFunction(params: filterFunctionParams): boolean {
//         console.log('params.input first valie', params.input.value[0], 'data', params.data[params.input.name], 'params.input last valie', params.input.value[1],)

//         const isBiggerThanSmallerInput = Number(params.data[params.input.name]) >= Number(params.input.value[0])
//         const isLessThanBiggerInput = Number(params.data[params.input.name]) <= Number(params.input.value[1])
//         console.log('is less than', isBiggerThanSmallerInput)
//         console.log('is bigger than', isLessThanBiggerInput)
//         return isBiggerThanSmallerInput && isLessThanBiggerInput
//     }
// }
// Implement the DateInput class
class DateInputFilter implements FilterInput {
    getDisplayValue(params: DisplayValueParams): string {
        return parseDate(params.value)
    }
    getEventType(input: { name, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters" {
        // if this value is false that means the new value is in the future
        // that means we will apply applyAllFilters on "Before" and apply filter on "After" and the oppisite is correct
        const isNewValueBigger = isFirstDateBigger(input.newValue, input.oldValue)
        if (input.name.includes("After")) {
            return isNewValueBigger ? 'applyFilter' : 'applyAllFilters'
        }
        if (input.name.includes("Before")) {
            return isNewValueBigger ? 'applyAllFilters' : 'applyFilter'
        }
        return 'applyAllFilters'
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
            const isInputDateBefore = compareDbDate(params.data[inputName], params.input.value)
            return isInputDateBefore
        }
        return params.data

    }
}
export const defaultFilter = new DefaultInputFilter()
export const listFilter = new ListInputFilter()
export const numberFilter = new NumberInputFilter()
export const dateFilter = new DateInputFilter()
export const booleanFilter = new BooleanInputFilter()
const inputTypes: Record<string, FilterInput> = {
    "dropdown": listFilter,
    "number": numberFilter,
    "typednumber": numberFilter,
    "datepicker": dateFilter,
    "toggle": booleanFilter,
}

export const getFilterInputInstance = (inputType: string) => {
    return inputTypes[inputType] ? inputTypes[inputType] : defaultFilter
}

