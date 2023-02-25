import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
// element-plus 按需导入
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // element-plus 按需导入
    AutoImport({
      imports: ["vue"], // 自动导入vue相关的api，如：ref，reactive等
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: true } //eslint 会报 no-undef错误，添加这个配置会生成 .eslint-auto-import.json文件
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
