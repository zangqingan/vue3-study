import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 按需自动导入
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需自动导入
    Components({
      /* options */
      // 饿了么UI组件
      resolvers: [ElementPlusResolver()],
    }),
    AutoImport({
      /* options */
      // 要注册的全局导入:像vue、vue-router等都是插件预设自带的，写上接口自动导入API
      // 也就是自动导入 Vue 和vue-router 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],
      // 饿了么UI组件
      resolvers: [
        ElementPlusResolver(), // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
