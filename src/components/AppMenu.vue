<script   lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import PanelMenu from 'primevue/panelmenu';
import { defineComponent, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
export default defineComponent({
    components: {
        PanelMenu
    },
    props: {
        model: {
            type: Object as PropType<MenuItem[]>,
            required: false,
            default: [
                { key: '0', label: 'dashboard', icon: 'pi pi-fw pi-chart-bar', to: { name: 'dashboard_view' } },
            ]
        }
    },
    mounted() {
        if (this.$route.fullPath == '/') {
            this.$router.push({ name: 'home_view' }).then(() => this.setExpandedKeyByRoute())
        } else {
            this.setExpandedKeyByRoute()

        }

    },
    setup(props) {
        let parsedPermissions = null
        const route = useRoute()
        const expandedKeys = ref<Record<string, boolean>>();
        const { t } = useI18n()
        if (localStorage.getItem('sideBar') != null) {
            const decoded = JSON.parse(atob(localStorage.getItem('sideBar') as string))
            parsedPermissions = decoded.map((item: any) => {
                if (item.items != '{}') {
                    item.items = JSON.parse(item.items)
                } else {
                    delete item.items
                }
                if (item.icon) {
                    item.icon = item.icon
                } else {
                    delete item.icon
                }

                return item
            })
        }

        const isModelPassed = !(props.model.length == 1 && props.model[0].label == 'dashboard')
        const model = parsedPermissions == null || isModelPassed ? props.model : parsedPermissions




        const findMenuItemByRoute = (items: MenuItem[], path: string) => {
            for (const item of items) {
                if (item.to === path) {
                    return item.key; // Return the key in an array to set as expandedKeys
                } else if (item.items) {
                    const foundKey = findMenuItemByRoute(item.items, path);
                    if (foundKey.length > 0) {
                        return foundKey; // Return the current key and the found keys
                    }
                }
            }
            return ""; // Return an empty array if not found
        };
        const createObject = (input: string): void => {
            const keys = input.split('.');
            const output: Record<string, boolean> = {};

            for (let i = 1; i < keys.length; i++) {
                const slicedKeys = keys.slice(0, i);
                output[slicedKeys.join('.')] = true;
            }

            expandedKeys.value = output
        }
        // Get the first level of the current route path and open the corresponding menu item
        const setExpandedKeyByRoute = () => {
            const currentPath = route.path;
            const item = findMenuItemByRoute(translatedModel, currentPath);
            createObject(item)
        };
        const translateMenuItems = (items: MenuItem[]) => {
            return items.map((item) => {
                item.label = t((item.label as string).toLowerCase());
                if (item.items) {
                    item.items = translateMenuItems(item.items);
                    // Recursive call
                }
                return item
            });
        }

        const translatedModel = translateMenuItems(model)
        return { translatedModel, setExpandedKeyByRoute, expandedKeys }

    }
})

</script>

<template>
    <div class="app-menu">
        <PanelMenu :model="translatedModel" v-model:expandedKeys="expandedKeys">
            <template #headericon="{ item }">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
            </template>
            <template #itemicon="{ item }">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
            </template>
        </PanelMenu>
    </div>
</template>
