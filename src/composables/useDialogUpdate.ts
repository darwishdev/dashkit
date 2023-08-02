
// import type { DeleteRestoreHandler } from '@/types/types'


import { FormUpdateParams } from '@/types/types';
import { h, resolveComponent, defineComponent } from 'vue'

export interface dialogUpdateParms {
    onConfirmed?: Function,
    useDialog: Function,
    form: FormUpdateParams,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export default function useDialogUpdate(params: dialogUpdateParms) {
    const dialog = params.useDialog();
    const defaultWidth = "65vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }
    const UpdateFormComp = defineComponent({
        setup() {
            const formUpdateComponent = resolveComponent('form-update')
            return () => h(formUpdateComponent, {
                sections: params.form.sections,
                toastHandler: params.form.toastHandler,
                submitHandler: params.form.submitHandler,
                findHandler: params.form.findHandler,
                options: params.form.options

            })
        }
    })
    function openDialog() {
        const width = params.config && params.config.width ? params.config.width : defaultWidth
        const breakpoints = params.config && params.config.breakpoints ? params.config.breakpoints : defaultBreakPoint

        console.log("diuallsl")
        dialog.open(UpdateFormComp, {
            props: {
                dismissableMask: true,
                header: "Confirm",

                style: {
                    width
                },
                breakpoints,
                modal: true,
            },
            onClose: (options: any) => {
                const data = options!.data;
                if (data) {
                    if (data.confirmed && params.onConfirmed) params.onConfirmed();
                }
            }
        });

    }

    return {
        openDialog,
    };
}
