<script  lang="ts">
import { ParseFile, handleToastError, Can, getRouteVariation, handleSuccessToast, convertArrayToObjectArray } from '@/utils/helpers'
import Menu from 'primevue/menu';
import { saveAs } from 'file-saver';
import { useRouter } from 'vue-router';
import { PropType, ref, defineComponent } from 'vue'
import AccordionTab from 'primevue/accordiontab';
import Accordion from 'primevue/accordion';
import { useDialogCreate } from '@/composables/composables';

import type { CrudOptions, FormFilterParams, FormCreateParams, ToastError, DialogCreateParms, ImportHandler } from '@/types/types'
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
export default defineComponent({
    props: {
        options: {
            type: Object as PropType<CrudOptions>,
            required: true,
        },
        createForm: {
            type: Object as PropType<FormCreateParams>,
            required: false,
        },
        filterForm: {
            type: Object as PropType<FormFilterParams>,
            required: false,
        },
        importHandler: {
            type: Object as PropType<ImportHandler<any, any>>,
            required: false,
        },
    },
    components: {
        AccordionTab,
        Menu,
        Accordion,
    },
    setup(props, { emit }) {
        const toast = useToast();
        const { t } = useI18n()
        const { push, currentRoute } = useRouter()
        const imprtExportMenu = ref();
        const crudFilterForm = ref();
        let createDialog: any = undefined
        const filterModel = ref({})
        const modelDisplay = ref({})
        if (props.createForm) {
            const createDialogParms: DialogCreateParms = {
                onConfirmed: () => {
                    emit('onShowcreateDialog')
                },
                form: props.createForm,


            }
            createDialog = useDialogCreate(createDialogParms);
        }

        const create = () => {
            if (createDialog != undefined) {
                createDialog.openDialog()
            } else {
                const routeName = getRouteVariation(currentRoute.value.name as string, 'create');
                push({ name: routeName })
            }
        }
        const handleExport = () => {
            emit('export')
        }
        const handleDeletedFilter = (status: any) => {
            emit('showDeleted', status)
        }
        const handleImport = async (files: any, node: any) => {
            if (files.length == 0 || !props.importHandler) return
            const fileInstace = files[0].file
            const extension = fileInstace.name.split('.').pop().toLowerCase();
            const fileContent = await fileInstace.arrayBuffer();
            const data = convertArrayToObjectArray(ParseFile(fileContent, extension))
            props.importHandler.submit(data).then(res => {
                if (props.importHandler!.submitCallBack) props.importHandler!.submitCallBack(res)
                node.reset()
                handleSuccessToast(props.importHandler!.toastHandler, toast, t, 'imported')

            }).catch((err: any) => {
                const isErrorHandlerPassed = props.importHandler!.errorHandler && props.importHandler!.errorHandler[err as string]
                const toastErr: ToastError = isErrorHandlerPassed ? props.importHandler!.errorHandler![err as string] : { summary: 'failed', detail: 'import_filed' }
                handleToastError(toastErr, toast, t)
            })

            emit('imported', data);

        }
        let imprtExportOptions: any = []
        if (props.importHandler) {
            imprtExportOptions.push({
                label: 'Download template',
                icon: 'pi pi-download',
                command: () => {
                    const fileName = props.importHandler!.importTemplateLink as string
                    saveAs(fileName);
                }
            })
            if (props.options.showExportButton) {
                imprtExportOptions.push(
                    {
                        label: 'export',
                        icon: 'pi pi-upload',
                        command: handleExport
                    })
            }
        }

        const imprtExportMenuToggle = (event: any) => {
            imprtExportMenu.value.toggle(event);
        };


        const handleFilter = (filterObject: Object) => {
            emit('filtered', filterObject)

        }
        const removeFilter = (filter: string) => {
            crudFilterForm.value.removeFilter(filter)
            emit('removeFilter', filter)
        }
        const clearAllFilters = () => {
            crudFilterForm.value.clearAllFilters()
        }
        const showFiltersForm = props.filterForm && props.filterForm.inputs.length > 0
        const showImportOptions = typeof props.importHandler != 'undefined'
        const showCreateButton = props.options.showCreateButton && Can(`${props.options.feature}Create`)
        return {
            create,
            handleImport,
            handleExport,
            handleDeletedFilter,
            handleFilter,
            imprtExportMenuToggle,
            removeFilter,
            clearAllFilters,
            showCreateButton,
            showFiltersForm,
            crudFilterForm,
            showImportOptions,
            options: props.options,
            imprtExportMenu,
            imprtExportOptions,
            filterModel,
            modelDisplay,
            filterFormInputs: props.filterForm?.inputs,
        }
    }

})

</script>

<template>
    <div class="app-crud bg-card p-4 border-round " :class="{ 'disabled': false }">
        <div class="flex flex-wrap border-round justify-content-between align-items-center border-1 border-200 p-3 mb-3">
            <div class="flex align-items-center">
                <div class="mx-3" v-if="showCreateButton">
                    <Button @click.prevent="create" label="New" severity="success" icon="pi pi-plus" />
                </div>
                <div class="options" v-if="showImportOptions">
                    <Button type="button" icon="pi pi-save" :label="$t('options')" @click="imprtExportMenuToggle"
                        aria-haspopup="true" aria-controls="overlay_menu" />
                    <Menu ref="imprtExportMenu" id="import_export_menu" :model="imprtExportOptions" :popup="true">
                        <template #end>
                            <div class="px-3">
                                <FormKit type="file" :label="$t('import')" placeholder="import" name="license"
                                    accept=".csv,.xls,.xlsx" @input="handleImport" />
                            </div>
                        </template>
                    </Menu>
                </div>
                <div class="export" v-else-if="options.showExportButton">
                    <Button type="button" icon="pi pi-upload" :label="$t('export')" @click="handleExport"
                        aria-haspopup="true" aria-controls="overlay_menu" />
                </div>
                <slot name="header-left-buttons" />
            </div>

            <slot name="filters" />
            <div class="crud-filter">
                <Accordion v-if="!$slots['filters'] && showFiltersForm" class="flex-grow list-filters">
                    <AccordionTab>
                        <template #header>
                            <div class="flex align-items-center w-full justiy-content-between">
                                <div class="title">
                                    <i class="pi pi-filter mr-3"></i>
                                    <span>{{ $t('show_filters') }}</span>
                                </div>
                                <div class="clear-icon" @click.prevent="clearAllFilters"
                                    v-if="Object.keys(filterModel).length > 0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--color-white)"
                                        viewBox="0 0 24 24">
                                        <path stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-miterlimit="10" stroke-width="1.5"
                                            d="M21.63 14.75c0 .89-.25 1.73-.69 2.45a4.709 4.709 0 0 1-4.06 2.3 4.73 4.73 0 0 1-4.06-2.3 4.66 4.66 0 0 1-.69-2.45c0-2.62 2.13-4.75 4.75-4.75s4.75 2.13 4.75 4.75Zm-3.481 1.24-2.51-2.51m2.491.03-2.51 2.51" />
                                        <path stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-miterlimit="10" stroke-width="1.5"
                                            d="M20.69 4.02v2.22c0 .81-.51 1.82-1.01 2.33l-1.76 1.55a4.42 4.42 0 0 0-1.04-.12c-2.62 0-4.75 2.13-4.75 4.75 0 .89.25 1.73.69 2.45.37.62.88 1.15 1.5 1.53v.34c0 .61-.4 1.42-.91 1.72L12 21.7c-1.31.81-3.13-.1-3.13-1.72v-5.35c0-.71-.41-1.62-.81-2.12L4.22 8.47c-.5-.51-.91-1.42-.91-2.02V4.12C3.31 2.91 4.22 2 5.33 2h13.34c1.11 0 2.02.91 2.02 2.02Z"
                                            opacity=".4" />
                                    </svg>

                                    <span>{{ $t('clear_filters') }}</span>
                                </div>

                            </div>
                        </template>
                        <form-filter ref="crudFilterForm" v-model="filterModel" v-model:modelDisplay="modelDisplay"
                            :options="{
                                showActiveFilters: false,
                                showClearFilters: false,
                            }" @filter="handleFilter" :inputs="filterFormInputs" />
                    </AccordionTab>
                </Accordion>
                <div v-if="modelDisplay" class="active-filters">
                    <div class="filter" v-for="(filter, index) in Object.keys(modelDisplay) " :key="index"
                        @click.prevent="removeFilter(filter)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="var(--color-white)"
                            viewBox="0 0 24 24">
                            <path stroke="#464455" stroke-linecap="round" stroke-linejoin="round"
                                d="M18 7h-2m-3.5-2H6c-.471 0-.707 0-.854.146C5 5.293 5 5.53 5 6v1.965c0 .262 0 .393.06.503.058.11.167.184.385.329l3.024 2.015c.872.582 1.308.873 1.544 1.315.237.442.237.966.237 2.014V19l3.5-1.75v-3.11c0-1.047 0-1.571.237-2.013.133-.25.331-.452.636-.686M20 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <h3 class=""> <strong>{{ $t(`${modelDisplay[filter].key}_filter`) }}</strong> : {{
                            modelDisplay[filter].value }} </h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="var(--color-white)"
                            viewBox="0 0 24 24">
                            <path stroke="var(--color-white)" stroke-linecap="round" stroke-width="2"
                                d="m16 8-8 8m0-8 8 8" />
                        </svg>
                    </div>
                </div>
            </div>

            <slot name="header-right-buttons" />
        </div>
        <div class="flex justify-content-between align-items-center border-y-1 border-200 py-3">
            <h2 v-if="!$slots['header-title']">{{ $t(options.title) }}</h2>
            <slot name="header-title" />

            <div class="flex justify-content-end align-items-center p-2">
                <form-kit v-if="!$slots['header-filters'] && options.showDeletedFilter" :classes="{ outer: 'm-0', }"
                    @input="handleDeletedFilter" type="toggle" name="toggle" :label="$t('show_deleted')" />
                <slot name="header-filters" />
            </div>
        </div>
        <!-- <div class="w-10 m-auto h-1rem" style="background-color: rgba(255, 255, 255, 0.15);"></div> -->
        <slot name="data" />

    </div>
</template>