import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(),
  dts({ include: ["src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/types/types.ts", "src/utils/helpers.ts", "src/utils/form/filter.ts"] }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["./src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/utils/helpers.ts", "src/utils/form/filter.ts", "./src/assets/scss/app.scss"],
      formats: ["es"],
      name: "DashKit",
      fileName: (_, entry) => {
        if (entry == 'base') {
          return `components/base.js`
        }
        if (entry == 'froms') {
          return `froms/froms.js`
        }
        if (entry == 'views') {
          return `views/views.js`
        }
        if (entry == 'helpers') {
          return `utils/helpers.js`
        }
        if (entry == 'filter') {
          return `utils/form/filter.js`
        }
        if (entry == 'composables') {
          return `composables/composables.js`
        }


        return `${entry}.js`
      }
    },
    rollupOptions: {
      external: [
        "happy-dom",
        "vue",
        "@bufbuild/connect-web",
        "@formkit/icons",
        "@formkit/pro",
        "@formkit/vue",
        "@intlify/unplugin-vue-i18n",
        "file-saver",
        "formkit-builder",
        "primeicons",
        "primevue",
        "vue",
        "vue-i18n",
        "vue-router",
        "xlsx",
      ],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'primevue',
          i18n: 'i18n',

        },
      },
    },
  },
})
