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
    dts({ include: ["src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/types/types.ts", "src/utils/helpers.ts", "src/utils/form/FormFilter.ts", "src/utils/table/TableHeader.ts"] })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["./src/DashKit.ts", "src/composables/composables.ts", "src/components/base.ts", "src/views/views.ts", "src/forms/forms.ts", "src/utils/helpers.ts", "src/utils/form/FormFilter.ts", "src/utils/table/TableHeader.ts", "./src/assets/scss/app.scss"],
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
        if (entry == "FormFilter") {
          return `utils/form/FormFilter.js`;
        }
        if (entry == "TableHeader") {
          return `utils/table/TableHeader.js`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L2Rhc2gta2l0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L2Rhc2gta2l0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Rldi9kYXJ3aXNoZGV2L3ByaXZhdGUvcGFja2FnZXMvdnVlL2Rhc2gta2l0LXByb2plY3QvZGFzaC1raXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgc3ZnTG9hZGVyKCksXG4gIGR0cyh7IGluY2x1ZGU6IFtcInNyYy9EYXNoS2l0LnRzXCIsIFwic3JjL2NvbXBvc2FibGVzL2NvbXBvc2FibGVzLnRzXCIsIFwic3JjL2NvbXBvbmVudHMvYmFzZS50c1wiLCBcInNyYy92aWV3cy92aWV3cy50c1wiLCBcInNyYy9mb3Jtcy9mb3Jtcy50c1wiLCBcInNyYy90eXBlcy90eXBlcy50c1wiLCBcInNyYy91dGlscy9oZWxwZXJzLnRzXCIsIFwic3JjL3V0aWxzL2Zvcm0vRm9ybUZpbHRlci50c1wiLCBcInNyYy91dGlscy90YWJsZS9UYWJsZUhlYWRlci50c1wiXSB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBbXCIuL3NyYy9EYXNoS2l0LnRzXCIsIFwic3JjL2NvbXBvc2FibGVzL2NvbXBvc2FibGVzLnRzXCIsIFwic3JjL2NvbXBvbmVudHMvYmFzZS50c1wiLCBcInNyYy92aWV3cy92aWV3cy50c1wiLCBcInNyYy9mb3Jtcy9mb3Jtcy50c1wiLCBcInNyYy91dGlscy9oZWxwZXJzLnRzXCIsIFwic3JjL3V0aWxzL2Zvcm0vRm9ybUZpbHRlci50c1wiLCAnc3JjL3V0aWxzL3RhYmxlL1RhYmxlSGVhZGVyLnRzJywgXCIuL3NyYy9hc3NldHMvc2Nzcy9hcHAuc2Nzc1wiXSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgICAgbmFtZTogXCJEYXNoS2l0XCIsXG4gICAgICBmaWxlTmFtZTogKF8sIGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChlbnRyeSA9PSAnYmFzZScpIHtcbiAgICAgICAgICByZXR1cm4gYGNvbXBvbmVudHMvYmFzZS5qc2BcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkgPT0gJ2Zyb21zJykge1xuICAgICAgICAgIHJldHVybiBgZnJvbXMvZnJvbXMuanNgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5ID09ICd2aWV3cycpIHtcbiAgICAgICAgICByZXR1cm4gYHZpZXdzL3ZpZXdzLmpzYFxuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRyeSA9PSAnaGVscGVycycpIHtcbiAgICAgICAgICByZXR1cm4gYHV0aWxzL2hlbHBlcnMuanNgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5ID09ICdGb3JtRmlsdGVyJykge1xuICAgICAgICAgIHJldHVybiBgdXRpbHMvZm9ybS9Gb3JtRmlsdGVyLmpzYFxuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRyeSA9PSAnVGFibGVIZWFkZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGB1dGlscy90YWJsZS9UYWJsZUhlYWRlci5qc2BcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkgPT0gJ2NvbXBvc2FibGVzJykge1xuICAgICAgICAgIHJldHVybiBgY29tcG9zYWJsZXMvY29tcG9zYWJsZXMuanNgXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBgJHtlbnRyeX0uanNgXG4gICAgICB9XG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcImhhcHB5LWRvbVwiLFxuICAgICAgICBcInZ1ZVwiLFxuICAgICAgICBcIkBidWZidWlsZC9jb25uZWN0LXdlYlwiLFxuICAgICAgICBcIkBmb3Jta2l0L2ljb25zXCIsXG4gICAgICAgIFwiQGZvcm1raXQvcHJvXCIsXG4gICAgICAgIFwiQGZvcm1raXQvdnVlXCIsXG4gICAgICAgIFwiQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG5cIixcbiAgICAgICAgXCJmaWxlLXNhdmVyXCIsXG4gICAgICAgIFwiZm9ybWtpdC1idWlsZGVyXCIsXG4gICAgICAgIFwicHJpbWVpY29uc1wiLFxuICAgICAgICBcInByaW1ldnVlXCIsXG4gICAgICAgIFwidnVlXCIsXG4gICAgICAgIFwidnVlLWkxOG5cIixcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsXG4gICAgICAgIFwieGxzeFwiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgICBwcmltZXZ1ZTogJ3ByaW1ldnVlJyxcbiAgICAgICAgICBpMThuOiAnaTE4bicsXG5cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLFNBQVMsb0JBQW9CO0FBQ3haLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxTQUFTO0FBSjhOLElBQU0sMkNBQTJDO0FBTS9SLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLElBQUk7QUFBQSxJQUFHLFVBQVU7QUFBQSxJQUMzQixJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixrQ0FBa0MsMEJBQTBCLHNCQUFzQixzQkFBc0Isc0JBQXNCLHdCQUF3QixnQ0FBZ0MsZ0NBQWdDLEVBQUUsQ0FBQztBQUFBLEVBQzNQO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsS0FBSztBQUFBLE1BQ0gsT0FBTyxDQUFDLG9CQUFvQixrQ0FBa0MsMEJBQTBCLHNCQUFzQixzQkFBc0Isd0JBQXdCLGdDQUFnQyxrQ0FBa0MsNEJBQTRCO0FBQUEsTUFDMVAsU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxHQUFHLFVBQVU7QUFDdEIsWUFBSSxTQUFTLFFBQVE7QUFDbkIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLFNBQVM7QUFDcEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLFNBQVM7QUFDcEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLFdBQVc7QUFDdEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLGNBQWM7QUFDekIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLGVBQWU7QUFDMUIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxTQUFTLGVBQWU7QUFDMUIsaUJBQU87QUFBQSxRQUNUO0FBR0EsZUFBTyxHQUFHLEtBQUs7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixNQUFNO0FBQUEsUUFFUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
