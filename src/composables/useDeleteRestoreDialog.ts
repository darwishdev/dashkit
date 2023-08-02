import { markRaw } from 'vue';
import AppDialogContent from '@/components/AppDialogContent.vue';
import AppDialogFooter from '@/components/AppDialogFooter.vue';
import type { DeleteRestoreHandler } from '@/types/types'

export interface deleteRestoreDialogParms {
    onConfirmed?: Function,
    deleteRestoreHandler: DeleteRestoreHandler<any>,
    recordId: number,
    useDialog: Function,

    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export default function useCreateDialog(params: deleteRestoreDialogParms) {
    const dialog = params.useDialog();
    const defaultWidth = "25vw"
    const defaultBreakPoint = {
        '960px': '75vw',
        '640px': '90vw',
    }

    function openDialog() {
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
