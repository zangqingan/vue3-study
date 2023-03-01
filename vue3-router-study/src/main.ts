import { createApp } from 'vue'
// 导入全局状态管理pinia
import { createPinia } from 'pinia'
// 自定义插件
import myI18nPlugin from '@/plugins/my-i18n'
import myDirective from '@/plugins/my-directive'
import App from './App.vue'
import router from './router'

// 引入样式
import './assets/css/index.scss'

const app = createApp(App)

app.use(createPinia()) // 启用 Pinia
app.use(router)
// 使用插件
app.use(myI18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
app.use(myDirective, {
  highlight: {
    backgroundColor: '#ddd'
  }
})
app.mount('#app')
