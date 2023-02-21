import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全局样式
import './assets/main.css'

// 创建实例
const app = createApp(App)

app.use(createPinia()) //注册全局状态管理
app.use(router) // 注册路由
// 挂载
app.mount('#app')
