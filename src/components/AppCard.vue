<script  lang="ts">



import type { FormUpdateParams, DeleteRestoreHandler } from '@/types/types'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// import { useToast } from 'primevue/usetoast';
import { getRouteVariation, Can } from '@/utils/helpers';
// import { useDialog } from 'primevue/usedialog';

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
        dialogUpdate: {
            type: Object as PropType<{ openDialog: (recordId: number) => void }>,
            required: false
        },
        dialogDeleteRestore: {
            type: Object as PropType<{ openDialog: (recordIds: number[]) => void }>,
            required: false
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
    setup(props) {
        const { push, currentRoute } = useRouter()


        const update = () => {
            if (props.dialogUpdate) {
                props.dialogUpdate.openDialog(props.recordId)
                return
            }
            const routeName = getRouteVariation(currentRoute.value.name as string, 'update');
            push({ name: routeName, params: { id: props.recordId } })
        }
        const deleteRestore = () => {
            if (props.dialogDeleteRestore) {
                props.dialogDeleteRestore.openDialog([props.recordId])
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