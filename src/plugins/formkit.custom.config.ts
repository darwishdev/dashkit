import { InputUpload, InputPermissions, InputNumberTyped } from "@/components/forms/index"
import { createInput } from '@formkit/vue'
import type { DefaultConfigOptions } from '@formkit/vue'
import customPlugins from './formkitPlugins'

const getWrappedConfig = (defaultConfig: DefaultConfigOptions, options: { activateFileUpload: boolean }) => {
    const permissionsInput = createInput(InputPermissions, {
        props: ['permissions'],
    })
    const typedNumberInput = createInput(InputNumberTyped, {
        props: ['isFloat'],
    })
    const fileUploadInput = createInput(InputUpload, {
        props: ['fileUpload'],
    })
    const inputs = {
        'permissions': permissionsInput,
        'typednumber': typedNumberInput,

    }
    if (options.activateFileUpload) inputs['fileUpload'] = fileUploadInput
    defaultConfig.inputs = defaultConfig.inputs ? { ...defaultConfig.inputs, ...inputs } : inputs
    defaultConfig.plugins = defaultConfig.plugins ? defaultConfig.plugins.concat(customPlugins) : customPlugins
    return defaultConfig

}


export default getWrappedConfig
