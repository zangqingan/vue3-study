import "./assets/styles/index.css"; // 所有全局样式导入

import { createApp } from "vue";
import { createPinia } from "pinia";
import installPlugins from "@/plugins/index.js"; // 自定义全局插件
import installDirectives from "@/directives/index.js"; // 自定义全局指令
import installGlobalComponent from "@/components/index.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// installPlugins(app); // 批量全局注入依赖函数形式
// installGlobalComponent(app); // 批量注册全局组件函数形式

app.use(installPlugins); // 批量全局注入依赖插件形式
app.use(installGlobalComponent); // 批量注册全局组件插件形式
app.use(installDirectives); // 批量注册全局指令插件形式

app.use(createPinia());

app.use(router);

app.mount("#app");
