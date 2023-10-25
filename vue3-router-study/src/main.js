import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; //引入路由实例

const app = createApp(App);

app.use(router); //  注册

app.mount("#app");
