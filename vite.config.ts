import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue'
const entries = {
  DashKit: "./src/DashKit.ts",
  composables: "src/composables/composables.ts",
  base: "src/components/base.ts",
  views: "src/views/views.ts",
  froms: "src/forms/forms.ts",
  helpers: "src/utils/helpers.ts",
  app: "./src/assets/scss/app.scss"
}
const dtsFiles = ["src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/views/LoginView.vue", "src/views/ProfileView.vue", "src/forms/forms.ts", "src/types/types.ts", "src/utils/helpers.ts"]
const external = [
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
]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(),
  dts({ include: dtsFiles })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["./src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/utils/helpers.ts", "./src/assets/scss/app.scss"],
      formats: ["es"],
      name: "DashKit",
      fileName: (_, entry) => {
        return entries[entry]
      }
    },
    rollupOptions: {
      external,
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
