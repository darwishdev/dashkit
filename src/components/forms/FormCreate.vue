<script  lang="ts">
import { FormOptions, SubmitHandler, FormSeciton, ToastHandler } from '@/types/types';
import { defineComponent, PropType } from 'vue'
import FormFactory from '@/utils/form/FormFactory'
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
// import Toast from 'primevue/toast';
import {
    handleSuccessToast,
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
                            if (destinationRoute != "") {
                                push({ name: destinationRoute })
                            }
                            resolve(null)
                            return
                        }
                        node.clearErrors()
                        node.input({ isBulkCreate: true });
                        resolve(null)
                    }).catch((error: any) => {
                        console.log('form create error', error)
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

    <!-- <toast>
            <template #message="slotProps">
                <div class="flex toast-inner flex-column align-items-center" style="flex: 1">
                    <div class="text-center">
                        <h1 class="font-bold text-4xl ">{{ slotProps.message.summary }}</h1>
                        <p class="my-1">{{ slotProps.message.detail }}</p>
                    </div>

                </div>
            </template>
        </toast> -->
</template>