
import { genesisIcons } from "@formkit/icons"
import type { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)

const config: DefaultConfigOptions = {
    plugins: [pro],
    icons: { ...genesisIcons },

}

export default config
