import { markRaw } from 'vue';
import AppDialogContent from '@/components/AppDialogContent.vue';
import AppDialogFooter from '@/components/AppDialogFooter.vue';
import type { DialogDeleteRestoreParms } from '@/types/types'
import { useDialog } from 'primevue/usedialog'
export default function useDialogDeleteRestore(params: DialogDeleteRestoreParms) {
    const defaultWidth = "25vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }

    function openDialog() {
        const dialog = useDialog()
        const width = params.config && params.config.width ? params.config.width : defaultWidth
        const breakpoints = params.config && params.config.breakpoints ? params.config.breakpoints : defaultBreakPoint
        dialog.open(AppDialogContent, {
            props: {
                dismissableMask: true,
                header: "Confirm",

                style: {
                    width
                },
                breakpoints,
                modal: true,
            },
            templates: {
                footer: markRaw(AppDialogFooter)
            },
            onClose: (options: any) => {
                const data = options!.data;
                if (data) {
                    if (data.confirmed) {
                        const req = {} as any
                        const prop = params.deleteRestoreHandler.requestPropertyName!
                        req[prop] = params.recordId
                        params.deleteRestoreHandler.deleteRestore(req).then(() => {
                            if (params.onConfirmed) params.onConfirmed();

                        })

                    }
                }
            }
        });

    }

    return {
        openDialog,
    };
}
