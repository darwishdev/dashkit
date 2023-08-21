
<script setup lang="ts">
import { h, resolveComponent, inject } from 'vue';
import { AppTableParams } from '@/types/types';
import { VNode } from "vue";
import { I18n } from 'vue-i18n/dist/vue-i18n.js';
import { getRouteVariation } from '@/utils/helpers';
import { ClassComponent } from 'primevue/ts-helpers';
import { ColumnProps, ColumnSlots, ColumnEmits } from 'primevue/column';
import { DataTableProps, DataTableSlots, DataTableEmits } from 'primevue/datatable';
import { useRouter } from 'vue-router'
const props = defineProps<AppTableParams>();
const i18n = inject('i18n') as I18n
const { push, currentRoute } = useRouter()
const { t } = i18n.global





const generateActions = (data: any): VNode[] => {
    const appIconBtn = resolveComponent('app-icon-btn')
    const actions: VNode[] = []
    const userCanUpdate = true
    const userCanDeleteRestore = true
    if (userCanUpdate) {
        let updateFunc: () => void
        if (props.dialogUpdate) {
            updateFunc = () => {
                props.dialogUpdate?.openDialog(data[props.dataKey])
            }
        } else {
            updateFunc = () => {
                const routeName = getRouteVariation(currentRoute.value.name as string, 'update');
                push({ name: routeName, params: { id: data[props.dataKey] } })
            }
        }
        const updateBtn = h(appIconBtn, {
            icon: 'pencil',
            onClick: () => updateFunc()
        })
        actions.push(updateBtn)
    }
    if (userCanDeleteRestore && props.dialogDeleteRestore) {
        const deleteRestoreFunc: () => void = () => {
            props.dialogDeleteRestore?.openDialog([data[props.dataKey]])
        }
        const deleteBtn = h(appIconBtn, {
            class: "remove-icon",
            onClick: deleteRestoreFunc,
            icon: 'trash',
        })
        const restoreBtn = h(appIconBtn, {
            class: "restore-icon",
            onClick: deleteRestoreFunc,
            icon: 'refresh'
        })
        actions.push(deleteBtn, restoreBtn)
    }
    return actions
}
const renderTable = () => {
    const dataTableComponent = resolveComponent('data-table') as ClassComponent<DataTableProps, DataTableSlots, DataTableEmits>
    const columnComponent = resolveComponent('column') as ClassComponent<ColumnProps, ColumnSlots, ColumnEmits>
    const columns: VNode[] = []

    // first check for options to see if we want to show the checkbox column or not
    if (props.options) {
        if (props.options.showSelectAll) {
            const column = h(columnComponent, {
                selectionMode: "multiple",
                exportable: false,
                style: "width: 3rem"
            })
            columns.push(column)
        }
    }
    const hederKeys = Object.keys(props.headers)
    for (const key of hederKeys) {
        const header = props.headers[key]
        const slots = {}
        if (header.renderHtml) {
            slots['body'] = ({ data }) => header.renderHtml!(data)
        }

        let columnProps: ColumnProps = {
            field: key,
            header: t(key),
        }
        if (header.columnProps) {
            columnProps = { ...columnProps, ...header.columnProps }
        }
        const columnComp = h(columnComponent, columnProps, slots)
        columns.push(columnComp)

    }

    if (props.options.showActions) {
        // const actions = 
        const column = h(columnComponent, {
            exportable: false,
        }, {
            body: ({ data }: any) => h('div', generateActions(data)),
            header: () => h('th', t(`actions`))
        })
        columns.push(column)
    }
    return h(dataTableComponent, { value: props.data }, () => columns);
}
</script>

<template>
    <component class="app-table" :is="renderTable()" />
</template>
