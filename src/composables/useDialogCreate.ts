import { DialogCreateParms } from '@/types/types';
import { h, resolveComponent, defineComponent } from 'vue'
import { useDialog } from 'primevue/usedialog'

export default function useDialogCreate(params: DialogCreateParms) {
    const dialog = useDialog()

    const defaultWidth = "65vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }
    const UpdateFormComp = defineComponent({
        setup() {
            const formCreateComponent = resolveComponent('form-create')
            return () => h(formCreateComponent, {
                sections: params.form.sections,
                toastHandler: params.form.toastHandler,
                submitHandler: params.form.submitHandler,
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
