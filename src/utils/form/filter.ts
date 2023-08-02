
import { parseDate } from "@/utils/helpers";
import type { FormKitNode } from '@formkit/core'
import type { FilterParser } from '@/types/types'

// Implement the DefaultInput class
export class DefaultInputFilter implements FilterParser {
    getDisplayValue(inputNode: FormKitNode): string {
        return inputNode.value as string
    }

}

// Implement the ListInput class
export class ListInputFilter implements FilterParser {
    getDisplayValue(inputNode: FormKitNode): string {
        return inputNode.props.options.find(option => option.value === `__mask_${inputNode.value}`).label
    }
}

// Implement the DateInput class
export class DateInputFilter implements FilterParser {
    getDisplayValue(inputNode: FormKitNode): string {
        return parseDate(inputNode.value as string)
    }
}
const defaultFilter = new DefaultInputFilter()
const listFilter = new ListInputFilter()
const dateFilter = new DateInputFilter()
const inputTypes: Record<string, FilterParser> = {
    "dropdown": listFilter,
    "datepicker": dateFilter,
}

export const getInputParser = (inputType: string) => {
    return inputTypes[inputType] ? inputTypes[inputType] : defaultFilter
}

