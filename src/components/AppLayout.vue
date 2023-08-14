<script  setup lang="ts">
import { onBeforeMount, onMounted, computed, provide, ref, inject } from 'vue'
import Sidebar from 'primevue/sidebar';
import AppNav from '@/components/AppNav.vue';
import { useRouter } from 'vue-router'
import DynamicDialog from 'primevue/dynamicdialog';
import ProgressSpinner from 'primevue/progressspinner';
import { AppMenu } from "@/components/base"
import { I18n } from 'vue-i18n/dist/vue-i18n.js';
import { LoginHandler } from '@/types/types';
const loading = ref(true)
const { authorize } = inject('loginHandler') as LoginHandler
const { currentRoute, push } = useRouter()
const isMenuOpened = ref(false)
const dialogRef = ref()
const i18n = inject('i18n') as I18n
const isSideBarVisible = ref(false)
const sidebarPosition = computed(() => {
    const isRtl = i18n.global.locale.value == 'ar'
    return isRtl ? "right" : "left"
})
const toggleDesktopMenu = () => {
    isMenuOpened.value = !isMenuOpened.value
    localStorage.setItem('asideOpened', isMenuOpened.value.toString())
}

const redirectToLogin = () => {
    if (currentRoute.value.name == 'login') {
        return
    }
    localStorage.removeItem('permissions')
    localStorage.removeItem('sideBar')
    push({ name: 'login' })
}
const toggleMobileMenu = () => {
    isSideBarVisible.value = !isSideBarVisible.value
    localStorage.setItem('asideOpened', isMenuOpened.value.toString())
}
const removeLoading = () => {
    setTimeout(() => { loading.value = false }, 3000)
}
onMounted(() => {
    provide("dialogRef", dialogRef)
})

onBeforeMount(() => {
    const token = localStorage.getItem('token')
    if (!token || token == "") {
        redirectToLogin()
    }
    authorize({}).catch(() => {
        redirectToLogin()
        return
    })
    if (localStorage.getItem('asideOpened') == 'true') {
        toggleDesktopMenu()
    }
    removeLoading()

}) 
</script>
<template>
    <div v-if="loading" class="loading-page">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
    <div class="layout-wrapper" :class="{ 'layout-sidebar-active': isMenuOpened }">
        <aside class="desktop-menu">
            <div class="desktop-menu-header">
                <app-logo class="all-logo" />
                <app-logo iconOnly class="icon-logo" />
                <app-icon-btn id="sidebar-lock-icon" :icon="isMenuOpened ? 'lock' : 'lock-open'"
                    @click.prevent="toggleDesktopMenu" />
            </div>
            <KeepAlive>
                <app-menu />
            </KeepAlive>
        </aside>
        <app-nav @toggleSideBar="toggleMobileMenu" />
        <div class="layout-main">
            <!-- <Breadcrumb :home="breadCrumbHome" v-if="breadCrumbs" :model="breadCrumbs" /> -->
            <main class="page-content" :class="currentRoute.name">
                <RouterView />
            </main>
        </div>
        <Sidebar class="p-sidebar-sm" v-model:visible="isSideBarVisible" :position="sidebarPosition">
            <template #header>
                <app-logo class="all-logo" />
            </template>
            <KeepAlive>
                <app-menu />
            </KeepAlive>

        </Sidebar>
        <app-toast />
        <dynamic-dialog ref="dialogRef" />
    </div>
</template>
