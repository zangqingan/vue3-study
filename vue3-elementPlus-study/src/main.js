import "./assets/styles/index.css"; // 所有全局样式导入

import { createApp } from "vue";
import { createPinia } from "pinia";
import installPlugins from "@/plugins/index.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

installPlugins(app); // 批量注册依赖
app.use(createPinia());
app.use(router);

app.mount("#app");
