<script  lang="ts">
import { FormOptions, SubmitHandler, FormSeciton, ToastHandler } from '@/types/types';
import { defineComponent, PropType, inject } from 'vue'
import FormFactory from '@/utils/form/FormFactory'
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
// import Toast from 'primevue/toast';
import {
    handleToastSuccess,
    handleError,
    getRouteVariation
} from '@/utils/helpers'


export default defineComponent({
    // components:{
    //     Toast
    // },
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
        const dialog = inject('dialogRef') as any
        const { push, currentRoute } = useRouter()
        const submitHandler = async (req: any, node: any) => {


            const handler = props.submitHandler
            if (handler.mapFunction) {
                req = handler.mapFunction!(req)
            }


            await new Promise((resolve) => {
                handler.submit(req)
                    .then(async (res: any) => {
                        // console.log("heloo")
                        // return

                        if (handler.submitCallBack) await handler.submitCallBack!(res)
                        handleToastSuccess(props.toastHandler, toast, t, props.options.title)
                        if (!req.isBulkCreate) {
                            // check if the form is opened on dialog to close it after submit
                            if (dialog) {
                                if (dialog.value.close) dialog.value.close()

                                resolve(null)
                                return
                            }
                            const destinationRoute = handler.redirectRoute ? handler.redirectRoute : getRouteVariation(currentRoute.value.name as string, "list")
                            if (destinationRoute != "") {
                                push({ name: destinationRoute })
                            }

                            return
                        }
                        node.clearErrors()
                        try {
                            node.reset()
                        } catch (e: any) {
                            console.log("reset form has error", e)
                        }
                        node.input({ isBulkCreate: true });

                        resolve(null)
                    }).catch((error: any) => {
                        console.log('form create error', error.message)
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