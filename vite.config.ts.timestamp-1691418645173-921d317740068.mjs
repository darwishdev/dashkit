// vite.config.ts
import { defineConfig } from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/dash-kit/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
import vue from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/dash-kit/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import svgLoader from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/dash-kit/node_modules/vite-svg-loader/index.js";
import dts from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/dash-kit/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/dash-kit/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    dts({ include: ["src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/types/types.ts", "src/utils/helpers.ts"] })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["./src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/utils/helpers.ts", "./src/assets/scss/app.scss"],
      formats: ["es"],
      name: "DashKit",
      fileName: (_, entry) => {
        if (entry == "base") {
          return `components/base.js`;
        }
        if (entry == "froms") {
          return `froms/froms.js`;
        }
        if (entry == "views") {
          return `views/views.js`;
        }
        if (entry == "helpers") {
          return `utils/helpers.js`;
        }
        if (entry == "composables") {
          return `composables/composables.js`;
        }
        return `${entry}.js`;
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
        "xlsx"
      ],
      output: {
        globals: {
          vue: "Vue",
          primevue: "primevue",
          i18n: "i18n"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L2Rhc2gta2l0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L2Rhc2gta2l0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Rldi9kYXJ3aXNoZGV2L3ByaXZhdGUvcGFja2FnZXMvdnVlL2Rhc2gta2l0LXByb2plY3QvZGFzaC1raXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgc3ZnTG9hZGVyKCksXG4gIGR0cyh7IGluY2x1ZGU6IFtcInNyYy9EYXNoS2l0LnRzXCIsIFwic3JjL2NvbXBvc2FibGVzL2NvbXBvc2FibGVzLnRzXCIsIFwic3JjL2NvbXBvbmVudHMvYmFzZS50c1wiLCBcInNyYy92aWV3cy92aWV3cy50c1wiLCBcInNyYy9mb3Jtcy9mb3Jtcy50c1wiLCBcInNyYy90eXBlcy90eXBlcy50c1wiLCBcInNyYy91dGlscy9oZWxwZXJzLnRzXCJdIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IFtcIi4vc3JjL0Rhc2hLaXQudHNcIiwgXCJzcmMvY29tcG9zYWJsZXMvY29tcG9zYWJsZXMudHNcIiwgXCJzcmMvY29tcG9uZW50cy9iYXNlLnRzXCIsIFwic3JjL3ZpZXdzL3ZpZXdzLnRzXCIsIFwic3JjL2Zvcm1zL2Zvcm1zLnRzXCIsIFwic3JjL3V0aWxzL2hlbHBlcnMudHNcIiwgXCIuL3NyYy9hc3NldHMvc2Nzcy9hcHAuc2Nzc1wiXSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgICAgbmFtZTogXCJEYXNoS2l0XCIsXG4gICAgICBmaWxlTmFtZTogKF8sIGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChlbnRyeSA9PSAnYmFzZScpIHtcbiAgICAgICAgICByZXR1cm4gYGNvbXBvbmVudHMvYmFzZS5qc2BcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkgPT0gJ2Zyb21zJykge1xuICAgICAgICAgIHJldHVybiBgZnJvbXMvZnJvbXMuanNgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5ID09ICd2aWV3cycpIHtcbiAgICAgICAgICByZXR1cm4gYHZpZXdzL3ZpZXdzLmpzYFxuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRyeSA9PSAnaGVscGVycycpIHtcbiAgICAgICAgICByZXR1cm4gYHV0aWxzL2hlbHBlcnMuanNgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5ID09ICdjb21wb3NhYmxlcycpIHtcbiAgICAgICAgICByZXR1cm4gYGNvbXBvc2FibGVzL2NvbXBvc2FibGVzLmpzYFxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gYCR7ZW50cnl9LmpzYFxuICAgICAgfVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgXCJoYXBweS1kb21cIixcbiAgICAgICAgXCJ2dWVcIixcbiAgICAgICAgXCJAYnVmYnVpbGQvY29ubmVjdC13ZWJcIixcbiAgICAgICAgXCJAZm9ybWtpdC9pY29uc1wiLFxuICAgICAgICBcIkBmb3Jta2l0L3Byb1wiLFxuICAgICAgICBcIkBmb3Jta2l0L3Z1ZVwiLFxuICAgICAgICBcIkBpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuXCIsXG4gICAgICAgIFwiZmlsZS1zYXZlclwiLFxuICAgICAgICBcImZvcm1raXQtYnVpbGRlclwiLFxuICAgICAgICBcInByaW1laWNvbnNcIixcbiAgICAgICAgXCJwcmltZXZ1ZVwiLFxuICAgICAgICBcInZ1ZVwiLFxuICAgICAgICBcInZ1ZS1pMThuXCIsXG4gICAgICAgIFwidnVlLXJvdXRlclwiLFxuICAgICAgICBcInhsc3hcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgICAgcHJpbWV2dWU6ICdwcmltZXZ1ZScsXG4gICAgICAgICAgaTE4bjogJ2kxOG4nLFxuXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyWCxTQUFTLG9CQUFvQjtBQUN4WixTQUFTLGVBQWUsV0FBVztBQUNuQyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sU0FBUztBQUo4TixJQUFNLDJDQUEyQztBQU0vUixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFBQyxJQUFJO0FBQUEsSUFBRyxVQUFVO0FBQUEsSUFDM0IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxrQkFBa0Isa0NBQWtDLDBCQUEwQixzQkFBc0Isc0JBQXNCLHNCQUFzQixzQkFBc0IsRUFBRSxDQUFDO0FBQUEsRUFDekw7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUEsTUFDSCxPQUFPLENBQUMsb0JBQW9CLGtDQUFrQywwQkFBMEIsc0JBQXNCLHNCQUFzQix3QkFBd0IsNEJBQTRCO0FBQUEsTUFDeEwsU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxHQUFHLFVBQVU7QUFDdEIsWUFBSSxTQUFTLFFBQVE7QUFDbkIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLFNBQVM7QUFDcEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLFNBQVM7QUFDcEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLFdBQVc7QUFDdEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLGVBQWU7QUFDMUIsaUJBQU87QUFBQSxRQUNUO0FBR0EsZUFBTyxHQUFHLEtBQUs7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixNQUFNO0FBQUEsUUFFUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
