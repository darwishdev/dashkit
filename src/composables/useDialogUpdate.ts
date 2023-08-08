
import { DialogUpdateParms } from '@/types/types';
import { h, ref, resolveComponent, defineComponent } from 'vue'
export default function useDialogUpdate(params: DialogUpdateParms) {
    const defaultWidth = "65vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }
    const findHandler = ref(params.form.findHandler);
    const UpdateFormComp = defineComponent({
        setup() {
            const formUpdateComponent = resolveComponent('form-update')
            return () => h(formUpdateComponent, {
                sections: params.form.sections,
                toastHandler: params.form.toastHandler,
                submitHandler: params.form.submitHandler,
                findHandler: findHandler.value,
                options: params.form.options

            })
        }
    })
    function openDialog(recordId: number) {
        const width = params.config && params.config.width ? params.config.width : defaultWidth
        const breakpoints = params.config && params.config.breakpoints ? params.config.breakpoints : defaultBreakPoint
        findHandler.value.requestValue = recordId
        params.dialog.open(UpdateFormComp, {
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
