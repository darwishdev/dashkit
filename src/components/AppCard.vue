<script  lang="ts">

import { useDialogUpdate, useDialogDeleteRestore } from '@/composables/composables';


import type { FormUpdateParams, DialogDeleteRestoreParms, DialogUpdateParms, DeleteRestoreHandler } from '@/types/types'
import { inject } from 'vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { I18n } from 'vue-i18n/dist/vue-i18n.js';

import { useToast } from 'primevue/usetoast';
import { handleSuccessToast, getRouteVariation, Can } from '@/utils/helpers';
import { useDialog } from 'primevue/usedialog';

export default defineComponent({
    props: {
        feature: {
            type: String,
            required: true
        },
        recordId: {
            type: Number,
            required: true,
        },
        updateForm: {
            type: Object as PropType<FormUpdateParams>,
            required: false,
        },
        deleteRestoreHandler: {
            type: Object as PropType<DeleteRestoreHandler<any>>,
            required: false,
        },
    },
    setup(props, { emit }) {
        const { push, currentRoute } = useRouter()
        const dialog = useDialog()
        const toast = useToast()
        const i18n = inject('i18n') as I18n
        const { t } = i18n.global
        let deleteRestoreDialog = undefined as any
        let updateDialog = undefined as any
        if (props.deleteRestoreHandler) {
            const deleteRestoreDialogParm: DialogDeleteRestoreParms = {
                onConfirmed: () => {
                    emit('onDeleteRestore', props.recordId)
                    handleSuccessToast(props.deleteRestoreHandler!.toastHandler, toast, t, 'deleted')

                },
                dialog,
                deleteRestoreHandler: props.deleteRestoreHandler,
                recordId: props.recordId,

            }
            deleteRestoreDialog = useDialogDeleteRestore(deleteRestoreDialogParm);
        }
        if (props.updateForm) {
            props.updateForm.findHandler.requestValue = props.recordId
            const updateDialogParms: DialogUpdateParms = {
                onConfirmed: () => emit('onShowUpdateDialog', props.recordId),
                form: props.updateForm,
                dialog,
            }
            updateDialog = useDialogUpdate(updateDialogParms);
        }
        const update = () => {
            if (updateDialog != undefined) {
                updateDialog.openDialog()
            } else {
                const routeName = getRouteVariation(currentRoute.value.name as string, 'update');
                push({ name: routeName, params: { id: props.recordId } })
            }
        }
        const deleteRestore = () => {
            if (deleteRestoreDialog != undefined) {
                deleteRestoreDialog.openDialog()
            }
        }
        const showDeleteRestoreButton = Can(`${props.feature}DeleteRestore`)
        const showUpdateButton = Can(`${props.feature}Update`)
        return {
            deleteRestore,
            update,
            showDeleteRestoreButton,
            showUpdateButton
        }
    }
})


</script>
<template>
    <div class="app-card  flex border-round bg-card my-3">
        <div class="start text-center">
            <slot name="start"></slot>
        </div>
        <div class="flex-grow-1 end flex align-items-center justify-content-center">
            <div class="absolute z-5 top-0 right-0 p-2">
                <app-icon-btn v-if="showDeleteRestoreButton" class="list-icon" icon="trash" @click="deleteRestore" />
                <a v-if="showUpdateButton" class="icon-btn list-icon" @click.prevent="update">
                    <i class="pi pi-pencil text-white"></i>
                </a>
                <app-icon-btn v-if="showDeleteRestoreButton" class="restore-icon" icon="refresh" @click="deleteRestore" />
            </div>
            <slot name="end"> </slot>
        </div>

    </div>
</template>

@/composables/useDialogDeleteRestore