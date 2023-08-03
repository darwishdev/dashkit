<script  lang="ts">
import { defineComponent, ref } from 'vue'
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Toolbar from 'primevue/toolbar';
import Breadcrumb from 'primevue/breadcrumb';
import { useRouter } from 'vue-router'
import type { MenuItem } from 'primevue/menuitem'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n';
// import { AppLogo } from "@/components"
import { AppMenu } from "@/components/base"

// import i18n from '@/plugins/i18n'
export default defineComponent({
    components: {
        Menu,
        AppMenu,
        Toolbar,
        Avatar,
        Breadcrumb
    },
    beforeCreate() {
        if (localStorage.getItem('isRtl') == 'true') {
            this.isRtl = true
        }
    },
    setup(_, { emit }) {
        const i18n = useI18n()
        const { currentRoute, push } = useRouter()
        const breadCrumbs: Ref<MenuItem[]> = currentRoute.value.meta.breadCrumbs as Ref<MenuItem[]>
        const isRtl = ref(false)
        const profileMenu = ref();

        const breadCrumbHome = {
            icon: 'pi pi-home',
            to: '/',
        }
        const toggleRtl = () => {
            isRtl.value = !isRtl.value;
            localStorage.setItem('isRtl', isRtl.value.toString())
            document.body.classList.toggle('rtl')
            i18n.locale.value = isRtl.value ? 'ar' : 'en'
        }

        const toggleProfileMenu = (event: Event) => {
            profileMenu.value.toggle(event)
        }

        const toggleMobileSidebar = () => emit('toggleSideBar')
        const logout = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('permissions')
            localStorage.removeItem('sidebar')
            push({ name: 'login' })
        }
        return { breadCrumbs, breadCrumbHome, logout, toggleRtl, toggleProfileMenu, currentRoute, isRtl, toggleMobileSidebar, profileMenu }
    },

})
</script>
<template>
    <Toolbar class="app-nav">
        <template #start>
            <app-icon-btn icon="bars" class="sidebar-toggler" @click.prevent="toggleMobileSidebar" />
            <app-logo />

            <Breadcrumb :home="breadCrumbHome" v-if="breadCrumbs" :model="breadCrumbs" />
        </template>
        <template #end>
            <slot name="end" />

            <app-icon-btn v-if="!$slots['end']" id="locale-toggler" icon="globe" @click.prevent="toggleRtl" />
            <app-icon-btn v-if="!$slots['end']" id="profile-toggler" icon="user" @click="toggleProfileMenu" />
            <Menu v-if="!$slots['end']" ref="profileMenu" id="overlay-menu" :popup="true">
                <template #start>
                    <router-link :to="{ name: 'profile_view' }"
                        class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2"
                            shape="circle" />
                        <div class="flex flex-column align">
                            <span class="text-sm">{{ $t('profile') }}</span>
                        </div>
                    </router-link>
                </template>
                <template #end>
                    <button @click="logout" id="logout-btn"
                        class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround">
                        <i class="pi pi-sign-out" />
                        <span class="ml-2">{{ $t('logout') }}</span>
                    </button>
                </template>
            </Menu>
        </template>
    </Toolbar>
</template>
