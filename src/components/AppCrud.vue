
<script setup lang="ts">
import useDataFetcherList from '@/composables/useDataFetcherList';
import type { AppCrudParams, filterFunctionParams, ToastError } from '@/types/types'
import { ref, computed, onUnmounted, inject, onBeforeMount } from 'vue';
import { ListObjectKeysGet, ExportCSV, Can, handleToastSuccess, handleToastError, ParseFile, convertArrayToObjectArray, getRouteVariation } from '@/utils/helpers'
import LRU from '@/utils/lru';
import Toolbar from 'primevue/toolbar';
import { saveAs } from 'file-saver';
import Menu from 'primevue/menu';
import { useToast } from 'primevue/usetoast';
import Panel from 'primevue/panel';
import { useRouter } from 'vue-router';
import Sidebar from 'primevue/sidebar';
import { I18n } from 'vue-i18n/dist/vue-i18n.js';
const props = defineProps<AppCrudParams>();
const emit = defineEmits<{
    (e: 'showDeleted', status: boolean): void,
    (e: 'export'): void,
    (e: 'update:modelSelection', value: any): void;
    (e: 'imported', data: any[]): void,
}>();

const filtersSideBar = ref(false)
const mobileWindowWidth = 576
const toast = useToast();
// get the propery name for the save & deleted rows
const objectKeys = ListObjectKeysGet(props.options.feature)
// refs
const formFilterRef = ref()
const showDeletedData = ref(false)
const filterModel = ref({})
// const clearFilters = ref<boolean | undefined>()
const { responseData, loading, error, fetchData } = useDataFetcherList<any, any>(props.listFunction, {}, false);
const currentData = ref<any[]>([])

const i18n = inject('i18n') as I18n
const showImportOptions = typeof props.importHandler != 'undefined' && Can(`${props.options.feature}Create`)
const createPermission = props.createPermissionName ? props.createPermissionName : `${props.options.feature}Create`
const showCreateButton = props.options.showCreateButton && Can(createPermission)
const imprtExportMenu = ref();
let cache = new LRU<string, any[]>(3);
let imprtExportOptions: any = []
const { push, currentRoute } = useRouter()
const imprtExportMenuToggle = (event: any) => {
    imprtExportMenu.value.toggle(event);
};

const handleExport = () => {
    ExportCSV(currentData.value)
    emit('export')
}
if (showImportOptions) {
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

const cacheKey = computed(() => {
    return `${props.options.feature}.${JSON.stringify(filterModel.value)}${showDeletedData.value ? '.deleted' : ''}`
})


const sidebarPosition = computed(() => {
    const isRtl = i18n.global.locale.value == 'ar'
    return isRtl ? "left" : "right"

})

const filtersDisplayModel = computed(() => {
    const keys = Object.keys(filterModel.value)
    if (keys.length == 0) {
        return undefined
    }
    const displayModel = {}
    for (let input of keys) {
        displayModel[input] = props.filterForm?.filters[input].getDisplayValue({ value: filterModel.value[input] })
    }
    return displayModel
})
onBeforeMount(() => {
    reFetchData()
})

onUnmounted(() => {
    cache.clear()
})



const reFetchData = () => {
    cache.clear()
    loading.value = true
    fetchData().then(() => {
        if (showDeletedData.value && typeof responseData.value[objectKeys.deletedRows] == 'undefined') {
            currentData.value = []
            loading.value = false
            return
        }
        applyAllFilters()
        loading.value = false
    })

}

const handleDeletedFilter = (status: any) => {
    showDeletedData.value = status
    applyAllFilters()
    emit('showDeleted', status)
}


// const printAllCache()
const handleClearFilters = () => {
    cache.clear()
    loading.value = true
    if (responseData.value) {
        currentData.value = showDeletedData.value ? responseData.value[objectKeys.deletedRows] : responseData.value[objectKeys.rows];
    }
    loading.value = false

}

const applyFilter = (input: string) => {
    const cachedData = cache.read(cacheKey.value)
    if (cachedData) {
        currentData.value = cachedData
        return
    }
    currentData.value = currentData.value.filter((row: any) => {
        const value = filterModel.value[input]
        const filter = props.filterForm?.filters[input]
        const params: filterFunctionParams = {
            input: {
                name: input,
                value
            },
            data: row
        }
        const matched = filter?.filterFunction(params)
        return matched ? row : null
    })

    cache.write(cacheKey.value, currentData.value)
}

const clearAllFilters = () => {
    filterModel.value = {}
    formFilterRef.value.clearFilters()

}

const removeFilter = (input: string) => {
    delete filterModel.value[input]
    formFilterRef.value.removeFilter(input)
}
const applyAllFilters = () => {
    if (error.value) {
        console.log('error existed', error.value)
        return
    }
    const cachedData = cache.read(cacheKey.value)
    if (cachedData) {
        currentData.value = cachedData
        return
    }
    loading.value = true
    // get current data by the showDeletedData flag congrolled by the swithch
    if (showDeletedData.value && !responseData.value[objectKeys.deletedRows]) {
        currentData.value = []
        loading.value = false
        return
    }
    if (!showDeletedData.value && !responseData.value[objectKeys.rows]) {
        currentData.value = []
        loading.value = false
        return
    }

    const data = showDeletedData.value ? responseData.value[objectKeys.deletedRows] : responseData.value[objectKeys.rows];
    if (data.length == 0) {
        currentData.value = []
        loading.value = false
        return
    }
    const keys = Object.keys(filterModel.value!)

    if (keys.length == 0) {
        currentData.value = data
        loading.value = false
        return
    }
    currentData.value = data.filter((row: any) => {
        let matched
        matched = false
        for (let key of keys) {
            const value = filterModel.value[key]
            const filter = props.filterForm?.filters[key]
            const params: filterFunctionParams = {
                input: {
                    name: key,
                    value
                },
                data: row
            }
            matched = filter?.filterFunction(params)
        }
        return matched ? row : null
    })
    cache.write(cacheKey.value, currentData.value)
    loading.value = false
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
        reFetchData()
        handleToastSuccess(props.importHandler!.toastHandler, toast, i18n.global.t, 'imported')
    }).catch((err: any) => {
        const isErrorHandlerPassed = props.importHandler!.errorHandler && props.importHandler!.errorHandler[err as string]
        const toastErr: ToastError = isErrorHandlerPassed ? props.importHandler!.errorHandler![err as string] : { summary: 'failed', detail: 'import_filed' }
        handleToastError(toastErr, toast, i18n.global.t)
    })
}

const showFilters = props.filterForm && props.filterForm.inputs.length > 0
const showDektopFilters = (window.innerWidth > mobileWindowWidth && showFilters)
const showMobileFilters = (window.innerWidth <= mobileWindowWidth && showFilters)
const create = () => {
    if (props.dialogCreate != undefined) {
        props.dialogCreate.openDialog()
    } else {
        const routeName = getRouteVariation(currentRoute.value.name as string, 'create');
        push({ name: routeName })
    }
}
defineExpose({ reFetchData })
</script>

<template>
    <div class="app-crud">
        <toolbar>
            <template #start>
                <slot name="header-title" />
                <h2 v-if="!$slots['header-title']">{{ $t(options.title) }}</h2>
            </template>
            <template #center>
                <div v-if="showDektopFilters" class="descktop-filters">
                    <Panel header="Header" collapsed toggleable>
                        <template #header>
                            <div class="title">
                                <span class="material-symbols-outlined">
                                    filter_alt
                                </span>
                                <h2>{{ $t('show_filters') }}</h2>
                            </div>
                        </template>
                        <template #togglericon="{ collapsed }">
                            <div class="icon">
                                <span v-if="collapsed" class="material-symbols-outlined">
                                    chevron_right
                                </span>
                                <span v-else class="material-symbols-outlined">
                                    expand_more
                                </span>
                            </div>
                        </template>
                        <template #icons>
                            <div class="clear-icon" @click.prevent="clearAllFilters"
                                v-if="Object.keys(filterModel).length > 0">
                                <span class="material-symbols-outlined">
                                    filter_alt_off
                                </span>
                                <span>{{ $t('clear_filters') }}</span>
                            </div>
                        </template>
                        <form-filter v-if="props.filterForm" :filters="props.filterForm.filters" ref="formFilterRef"
                            v-model="filterModel" :options="{
                                showActiveFilters: false,
                                showClearFilters: false,
                            }" :inputs="props.filterForm.inputs" @applyFilter="applyFilter"
                            @applyAllFilters="applyAllFilters" @clearFilters="handleClearFilters" />
                    </Panel>
                    <div v-if="filtersDisplayModel" class="active-filters">
                        <div class="filter" v-for="(filter, index) in Object.keys(filtersDisplayModel) " :key="index"
                            @click.prevent="removeFilter(filter)">
                            <span class="material-symbols-outlined">
                                filter_alt_off
                            </span>
                            <h3 class=""> <strong>{{ $t(`${filter}_filter`) }}</strong> : {{
                                filtersDisplayModel[filter] }} </h3>
                            <span class="material-symbols-outlined">
                                close
                            </span>
                        </div>
                    </div>
                </div>
                <Button v-else-if="showMobileFilters" class="bg-card" :aria-label="$t('show_filters')"
                    @click="filtersSideBar = true">
                    <span class="material-symbols-outlined">
                        filter_alt
                    </span>
                    <span class="px-3">{{ $t('show_filters') }}</span>
                </Button>
            </template>
            <template #end>
                <form-kit v-if="options.showDeletedFilter" :classes="{ outer: 'm-0', }" @input="handleDeletedFilter"
                    type="toggle" name="toggle" :label="$t('show_deleted')" />
            </template>

        </toolbar>
        <div class="toolbar">
            <Button v-if="showCreateButton" @click.prevent="create" label="New" severity="success" icon="pi pi-plus" />
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
            <Button :aria-label="$t('export')" v-else-if="options.showExportButton" @click="handleExport">
                <span class="material-symbols-outlined">
                    filter_alt
                </span>
                <span class="px-3">{{ $t('export') }}</span>
            </Button>

            <slot name="actions" />

        </div>
        <div class="grid" v-if="loading">
            <app-card-loading v-if="options.loadingType == 'card'" class="col " v-for="i in 3" :key="i" />
            <app-table-loading v-else class="col-12" />

        </div>
        <div v-else-if="error">
            <app-error :msg="error" @reload="reFetchData()" />
        </div>
        <div v-else-if="currentData.length == 0">
            <app-error :msg="`empty_${props.options.feature}`" @reload="reFetchData()" />
        </div>
        <slot v-else :data="currentData" />
    </div>
    <Sidebar class="filter-sidebar" v-if="showMobileFilters" :position="sidebarPosition" v-model:visible="filtersSideBar">
        <div class="clear-icon" @click.prevent="clearAllFilters" v-if="Object.keys(filterModel).length > 0">
            <span class="material-symbols-outlined">
                filter_alt_off
            </span>
            <span>{{ $t('clear_filters') }}</span>
        </div>
        <div v-if="filtersDisplayModel" class="active-filters">
            <div class="filter" v-for="(filter, index) in Object.keys(filtersDisplayModel) " :key="index"
                @click.prevent="removeFilter(filter)">
                <span class="material-symbols-outlined">
                    filter_alt_off
                </span>
                <h3 class=""> <strong>{{ $t(`${filter}_filter`) }}</strong> : {{
                    filtersDisplayModel[filter] }} </h3>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>
        </div>
        <form-filter v-if="props.filterForm" :filters="props.filterForm.filters" ref="formFilterRef" v-model="filterModel"
            :options="{
                showActiveFilters: false,
                showClearFilters: false,
            }" :inputs="props.filterForm.inputs" @applyFilter="applyFilter" @applyAllFilters="applyAllFilters"
            @clearFilters="handleClearFilters" />


    </Sidebar>
</template>
