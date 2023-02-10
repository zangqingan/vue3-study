// 1.引入创建vue实例方法createApp
import { createApp } from 'vue'
// 全局css
import './style.css'
// 2.引入根组件
import App from './App.vue'
// 3.创建vue实例
createApp(App).mount('#app')
