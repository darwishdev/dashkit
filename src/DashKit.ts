
import type { App } from "vue"
import * as components from "@/components"
import * as formComponents from "@/components/forms"
import Button from 'primevue/button';
import FormFactory from "@/utils/form/FormFactory"
// import cash from "@/utils/CacheSingleton"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import initI18n from '@/plugins/i18n'
import PrimeVue from 'primevue/config'
import { plugin, defaultConfig } from '@formkit/vue'
import getWrappedConfig from '@/plugins/formkit.custom.config'
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import { useDialog } from "primevue/usedialog";
import { DashKitConfig } from "@/types/types"
import type { DefaultConfigOptions } from '@formkit/vue'
export default {
    install: (app: App, config: DashKitConfig) => {
        // check if the use passed uploadHandler to handler the custom inputs array
        const activateFileUpload = config && typeof config.uploadHandler != 'undefined'
        let formKitConfig: DefaultConfigOptions
        // get formkit configuration with custom inputs and plugins
        formKitConfig = getWrappedConfig(config.formKitConfig, { activateFileUpload })
        // get i18n instance from the json files passed by the consumer via tramslatin
        const i18n = initI18n(config.translations)

        // use the packages
        app.use(PrimeVue)
            .use(i18n)
            .use(ToastService)
            .use(DialogService)
            .use(plugin, defaultConfig(formKitConfig))

        FormFactory.InitTranslation(i18n)


        if (config.loginHandler) {
            app.provide('loginHandler', config.loginHandler)
        }
        const baseImageUrl = config.baseImageUrl ? config.baseImageUrl : ""
        const fallBackImageUrl = config.fallBackImageUrl ? config.fallBackImageUrl : ""
        app.provide('baseImageUrl', baseImageUrl)
        app.provide('fallBackImageUrl', fallBackImageUrl)
        app.provide('i18n', i18n)
        app.provide('i18n', i18n)
        app.provide('useDialog', useDialog)
        app.provide('uploadHandler', config.uploadHandler)
        // const dialog = useDialog()
        // app.provide('useDialog', useDialog)

        // add button to global components
        app.component('Button', Button)
        app.component('DataTable', DataTable)
        app.component('Column', Column)
        // add all componets exported by components/index.ts as global components
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key as keyof typeof components])
        });
        // add all form componets exported by components/forms/index.ts as global components
        Object.keys(formComponents).forEach((key: string) => {
            app.component(key, formComponents[key as keyof typeof formComponents])
        });
    }
}