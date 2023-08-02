<script  lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from 'primevue/sidebar';
import AppNav from '@/components/AppNav.vue';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Toolbar from 'primevue/toolbar';
import Breadcrumb from 'primevue/breadcrumb';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
// import {} from "@/components"
import { AppMenu } from "@/components/base"

// import i18n from '@/plugins/i18n'
export default defineComponent({
    components: {
        Sidebar,
        DynamicDialog,
        AppMenu,
        AppNav,
        Menu,
        Toolbar,
        Avatar,
        Breadcrumb,
        Toast
    },
    beforeCreate() {
        if (localStorage.getItem('asideOpened') == 'true') {
            this.toggleDesktopMenu()
        }
    },
    setup() {
        const { currentRoute } = useRouter()
        const isMenuOpened = ref(false)
        const i18n = useI18n()
        const isSideBarVisible = ref(false)
        const toggleDesktopMenu = () => {
            isMenuOpened.value = !isMenuOpened.value
            localStorage.setItem('asideOpened', isMenuOpened.value.toString())
        }
        const toggleMobileMenu = () => {
            isSideBarVisible.value = !isSideBarVisible.value
            localStorage.setItem('asideOpened', isMenuOpened.value.toString())
        }
        return { toggleDesktopMenu, toggleMobileMenu, currentRoute, isMenuOpened, isSideBarVisible, isRtl: i18n.locale.value == 'ar' }
    },
})
</script>
<template>
    <div class="layout-wrapper" :class="{ 'layout-sidebar-active': isMenuOpened }">
        <aside class="desktop-menu">
            <div class="desktop-menu-header">
                <app-logo />
                <icon-btn id="sidebar-lock-icon" :icon="isMenuOpened ? 'lock' : 'lock-open'"
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
        <Sidebar class="p-sidebar-sm" v-model:visible="isSideBarVisible" :position="isRtl ? 'right' : 'left'">
            <template #header>
                <app-logo />
            </template>
            <app-menu />
        </Sidebar>
        <toast>
            <template #message="slotProps">
                <div class="flex toast-inner flex-column align-items-center" style="flex: 1">
                    <div class="text-center">
                        <h1 class="font-bold text-4xl ">{{ slotProps.message.summary }}</h1>
                        <p class="my-1">{{ slotProps.message.detail }}</p>
                    </div>

                </div>
            </template>
        </toast>
        <dynamic-dialog />
    </div>
</template>
