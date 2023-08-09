import { createApp } from 'vue'
// 导入全局状态管理pinia
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入样式
import '@/assets/styles/index.scss'
// 支持SVG
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia()) // 启用 Pinia
app.use(router)

app.mount('#app')
