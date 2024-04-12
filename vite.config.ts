import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import progress from "vite-plugin-progress"
import viteCompression from "vite-plugin-compression"
import { createHtmlPlugin } from "vite-plugin-html"
import PostcssPresetEnv from "postcss-preset-env"
import legacy from "@vitejs/plugin-legacy"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

export default defineConfig(() => {
  return {
    base: "/Choice/",
    plugins: [
      vue(),
      progress(),
      legacy(),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "./src/typings/components.d.ts"
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue"],
        dts: "./src/typings/auto-imports.d.ts"
      }),
      createHtmlPlugin({ minify: true }),
      viteCompression({ threshold: 10240 })
    ],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
    },
    server: { open: true, host: "0.0.0.0", port: 8080 },
    css: {
      postcss: { plugins: [PostcssPresetEnv()] },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/scss/vendors/el-theme.scss";
            @import "@/assets/styles/scss/base/_variables.scss";
            @import "@/assets/styles/scss/base/_mixins.scss";
          `
        }
      }
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: "js/[hash].js",
          entryFileNames: "js/[hash].js",
          assetFileNames: "assets/[ext]/[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"
            }
          }
        }
      }
    }
  }
})
