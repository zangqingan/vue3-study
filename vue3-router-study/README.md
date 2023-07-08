# vue3-router-study

vue3 路由学习项目

# 一、路由概述

服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。当我们在一个传统的服务端渲染的 web 应用中点击一个链接时，浏览器会从服务端获得全新的 HTML，然后重新加载整个页面。

前端路由：在单页面应用中，客户端的 JavaScript 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。这样通常可以带来更顺滑的用户体验，尤其是在更偏向“应用”的场景下，因为这类场景下用户通常会在很长的一段时间中做出多次交互。在这类单页应用中，“路由”是在客户端执行的。一个客户端路由器的职责就是利用诸如 History API 或是 hashchange 事件这样的浏览器 API 来管理应用当前应该渲染的视图。

前端路由也就是由前端来维护一份路由表。而 vue 官方提供的路由库是 vue-router。它的本质是利用诸如 History API 或是 hashchange 事件这样的浏览器 API 来管理应用当前应该渲染的视图。

# 二、 vue-router

Vue.js 的官方路由为 Vue.js 提供富有表现力、可配置的、方便的路由。vue3 版本的路由对应 vue-router 的 v4.x 及以上版本。

## 2.1 安装和使用

安装:npm install vue-router@4，也可以使用 vite 脚手架初始化项目时直接选择。
用 Vue + Vue Router 创建单页应用非常简单：通过 Vue.js，我们已经用组件组成了我们的应用。当加入 Vue Router 时，我们需要做的就是将我们的组件映射到路由上，并让 Vue Router 知道在哪里渲染它们即可。
使用：单独在 src 下建立一个 router 文件夹里面新建一个 index.js 用来创建路由实例，然后在入口文件中引入并注册到 vue 应用实例 app 上即可。

# 三、路由声明

vue3 对应的 v4.x 版本路由和 vue2 路由版本略有不同，其它使用思想是一样的。
vue3 路由使用 createRouter 方法创建路由实例，它接收两个参数：
路由模式 history(也就是 vue2 路由里的 mode 字段)、
路由表配置 routes(和 vue2 一样)是一个对象数组。

```
// 1. 引入createRouter方法用来创建路由实例
import { createRouter, createWebHistory } from 'vue-router'

// 2. 创建实例
const router = createRouter({
  // 指定路由模式为history
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由表对象
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
// 导出
export default router

// 入口文件main.js中引入注册
import router from "./router"; //引入路由实例

const app = createApp(App);

app.use(router); //  注册
至此整个应用都支持路由了

```

在 vue2 里注册路由之后
可以通过 this.$router 的形式在任意组件中访问路由实例对象
可以通过 this.$route 的形式在任意组件中访问当前路由对象

而在 vue3 里要在 setup 函数里访问这两个对象需要使用 useRouter 和 useRoute 函数
const router = useRouter()
const route = useRoute()

路由实例对象 用来跳转路由。
当前路由对象用来获取路由参数等。

# 四、动态路由
