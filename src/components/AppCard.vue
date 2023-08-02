<script  lang="ts">
import useDeleteRestoreDialog from '@/composables/useDeleteRestoreDialog';
import type { deleteRestoreDialogParms } from '@/composables/useDeleteRestoreDialog';
import { useDialogUpdate } from '@/composables/composables';
import type { dialogUpdateParms } from '@/composables/useDialogUpdate';

import type { FormUpdateParams, DeleteRestoreHandler } from '@/types/types'
import { inject } from 'vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { I18n } from 'vue-i18n/dist/vue-i18n.js';

import { useToast } from 'primevue/usetoast';
import { useDialog } from 'primevue/usedialog';
import { handleSuccessToast, getRouteVariation, Can } from '@/utils/helpers';

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
        const toast = useToast()
        const i18n = inject('i18n') as I18n
        const { t } = i18n.global
        let deleteRestoreDialog = undefined as any
        let updateDialog = undefined as any
        if (props.deleteRestoreHandler) {
            const deleteRestoreDialogParm: deleteRestoreDialogParms = {
                onConfirmed: () => {
                    emit('onDeleteRestore', props.recordId)
                    handleSuccessToast(props.deleteRestoreHandler!.toastHandler, toast, t, 'deleted')

                },
                deleteRestoreHandler: props.deleteRestoreHandler,
                useDialog,
                recordId: props.recordId,

            }
            deleteRestoreDialog = useDeleteRestoreDialog(deleteRestoreDialogParm);
        }
        if (props.updateForm) {
            const updateDialogParms: dialogUpdateParms = {
                onConfirmed: () => emit('onShowUpdateDialog', props.recordId),
                form: props.updateForm,
                useDialog,

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
            <div class="absolute top-0 right-0 p-2">
                <icon-btn v-if="showDeleteRestoreButton" class="list-icon" icon="trash" @click="deleteRestore" />
                <a v-if="showUpdateButton" class="icon-btn list-icon" @click.prevent="update">
                    <i class="pi pi-pencil text-white"></i>
                </a>
                <icon-btn v-if="showDeleteRestoreButton" class="restore-icon" icon="refresh" @click="deleteRestore" />
            </div>
            <slot name="end"> </slot>
        </div>

    </div>
</template>

