<script  lang="ts">
import { FormOptions, SubmitHandler, FormSeciton, ToastHandler, FindHandler } from '@/types/types';
import { defineComponent, inject, PropType } from 'vue'
import FormFactory from '@/utils/form/FormFactory'
import { useToast } from 'primevue/usetoast';
import { useDataFetcherFind } from '@/composables/composables'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import {
    handleToastSuccess,
    handleError,
    getRouteVariation
} from '@/utils/helpers'

export default defineComponent({
    props: {
        sections: {
            type: Array as PropType<Array<FormSeciton>>,
            required: true,
        },
        options: {
            type: Object as PropType<FormOptions>,
            required: true,
        },
        submitHandler: {
            type: Object as PropType<SubmitHandler<any, any, any>>,
            required: true,
        },
        toastHandler: {
            type: Object as PropType<ToastHandler>,
            required: false,
        },
        findHandler: {
            type: Object as PropType<FindHandler<any, any, any>>,
            required: true,
        }
    },
    setup(props) {
        const log = console.log
        const formSchema = FormFactory.CreateForm(props.options, props.sections)
        const toast = useToast();
        const dialog = inject('dialogRef') as any

        const { t } = useI18n()
        const { push } = useRouter()
        const { params, name } = useRoute()

        type FindResponseType = ReturnType<typeof props.findHandler.findFunction>;
        type FindRequestType = Record<string, number>
        const req: FindRequestType = {}
        const requestValue = props.findHandler.requestValue ? props.findHandler.requestValue : parseInt(params.id as string)
        console.log('req')
        console.log(req)
        req[props.findHandler.requestPropertyName] = requestValue
        const { responseData, loading, error } = useDataFetcherFind<FindRequestType, FindResponseType>(props.findHandler.findFunction, req, props.findHandler.mapFunction);

        const submitHandler = async (req: any, node: any) => {

            const handler = props.submitHandler
            if (handler.mapFunction) {
                req = handler.mapFunction(req)
            }
            if (handler.requestPropertyName) {
                req[handler.requestPropertyName] = requestValue
            } else {
                req[props.findHandler.requestPropertyName] = requestValue
            }
            await new Promise((resolve) => {
                handler.submit(req)
                    .then(async (res: any) => {

                        node.clearErrors()
                        if (handler.submitCallBack) await handler.submitCallBack(res)
                        handleToastSuccess(props.toastHandler, toast, t, props.options.title)
                        // check if the form is opened on dialog to close it after submit
                        try {
                            node.reset()
                        } catch (e: any) {
                            console.log("reset form has error", e)
                        }
                        if (dialog) {
                            if (dialog.value.close) dialog.value.close()
                            resolve(null)
                            return
                        }
                        const destinationRoute = handler.redirectRoute ? handler.redirectRoute : getRouteVariation(name as string, "list")
                        if (destinationRoute != "") {
                            push({ name: destinationRoute })
                            resolve(null)
                            return
                        }
                    }).catch((error: any) => {
                        console.log('form update error', error.message)
                        handleError(error, node, toast, handler.errorHandler, t)
                        resolve(null)
                    })
            })
        }
        return {
            formSchema,
            log,
            id: props.options.id as string,
            responseData,
            loading,
            error,
            submitHandler
        }
    }
})

</script>

<template>
    <form-loading v-if="loading" />
    <form-loading v-else-if="error" :error="error" />
    <FormKit v-else :id="id" :value="responseData" type="form" @submit-invalid="log" :actions="false"
        @submit="submitHandler">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>