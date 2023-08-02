<script  lang="ts">
import { FormOptions, SubmitHandler, FormSeciton, ToastHandler } from '@/types/types';
import { defineComponent, PropType } from 'vue'
import FormFactory from '@/utils/form/FormFactory'
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
    handleSuccessToast,
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
        }
    },
    setup(props) {
        const log = console.log
        const formSchema = FormFactory.CreateForm(props.options, props.sections)
        const toast = useToast();
        const { t } = useI18n()
        const { push, currentRoute } = useRouter()
        const submitHandler = async (req: any, node: any) => {
            const handler = props.submitHandler
            if (handler.mapFunction) {
                req = handler.mapFunction(req)
            }

            await new Promise((resolve) => {
                handler.submit(req)
                    .then(async (res: any) => {
                        node.reset()
                        if (handler.submitCallBack) await handler.submitCallBack(res)
                        handleSuccessToast(props.toastHandler, toast, t, props.options.title)
                        if (!req.isBulkCreate) {
                            const destinationRoute = handler.redirectRoute ? handler.redirectRoute : getRouteVariation(currentRoute.value.name as string, "list")
                            push({ name: destinationRoute })
                            resolve(null)
                            return
                        }
                        node.clearErrors()
                        node.input({ isBulkCreate: true });
                        resolve(null)
                    }).catch((error: any) => {
                        handleError(error, node, toast, handler.errorHandler, t)
                        resolve(null)
                    })
            })
        }
        return {
            formSchema,
            id: props.options.id as string,
            log,
            submitHandler
        }
    }
})

</script>

<template>
    <FormKit :id="id" type="form" @submit-invalid="log" :actions="false" @submit="submitHandler">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>