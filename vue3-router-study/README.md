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

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数,动态字段以冒号开始后面是参数名。
当一个路由被匹配时，它的 params(参数) 的值将在每个组件中以 this.$route.params 的形式暴露出来。
在同一个路由中设置有多个 路径参数，它们都会映射到 $route.params 上的相应字段。
而 vue3 则是使用 useRoute() 方法，同样是

```
// 这些都会传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
]
现在像 /users/johnny 和 /users/jolyne 这样的 URL 都会映射到同一个路由。

在同一个路由中设置有多个 路径参数，它们会映射到 $route.params 上的相应字段。
匹配模式	                          匹配路径	                $route.params
/users/:username	               /users/eduardo	          { username: 'eduardo' }
/users/:username/posts/:postId	/users/eduardo/posts/123	{ username: 'eduardo', postId: '123' }
```

动态路由时渲染的是相同的组件、也就是说组件实例会被复用从而导致组件的生命周期钩子不会被重新调用。
这时如果要对同一个组件中参数的变化做出响应的话，可以 watch 监听当前路由对象 route 上的任意属性。

```
import {useRoute} from 'vue-router'
const route = useRoute()
watch(() => route.params,() => {})

或者使用使用 组件内的 beforeRouteUpdate 导航守卫，它也可以取消导航。
async beforeRouteUpdate(to, from) {
    // 对路由变化做出响应...
    this.userData = await fetchUser(to.params.id)
  },
```

默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。

# 五、嵌套路由

每个路由配置对象都有一个 children 属性,它的是也是已个 routes 配置数组和外层一模一样。
同样地，一个被渲染的组件此时需要声明包含自己嵌套的 router-view 路由出口即可。

# 六、编程式导航

除了使用 router-link 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。这也就是编程式导航。

在 vue2 中通过 $router 访问路由实例。因此你可以调用 this.$router.push()方法导航到不同的位置，也就是编程式的声明跳转位置。这个方法的本质是向 history 历史信息栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。而且跳转时还可以添加查询参数、哈希值、动态路径参数。
不过要注意的是如果提供了 path 参数，此时动态路由参数会被忽略，这时要提供路由的 name 名字。
也就是说 params 不能与 path 一起使用。
router.push 和所有其他导航方法都会返回一个 Promise，让我们可以等到导航完成后才知道是成功还是失败。

实际上 router-link 标签内部也是调用这个方法。

```
声明式	                         编程式
<router-link :to="...">	    router.push(...)


这个方法的参数可以是一个字符串路径，或者一个描述地址的对象。
// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url。`params` 不能与 `path` 一起使用
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })

push方法是导航到不同的位置，而replace方法是用于替换当前位置，它不会向history历史信息栈添加新的记录。
router.replace({ path: '/home' })

横跨历史：router.go()该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 window.history.go(n)。
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)

```

实际上 router.push、router.replace 和 router.go 是 window.history.pushState、window.history.replaceState 和 window.history.go 的翻版。

# 七、命名路由

除了 path 之外，你还可以为任何路由提供 name 属性，也就是提供一个名字。
优点是：
没有硬编码的 URL
params 的自动编码/解码。
防止你在 url 中出现打字错误。
绕过路径排序（如显示一个）
这时无论是 router-link 还是 router.push() 方法都可以传递一个对象

```
下面两者是等价的，不过一个是声明式、一个是编程式。
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>

router.push({ name: 'user', params: { username: 'erina' } })
在这两种情况下，路由将导航到路径 /user/erina
```

# 八、路由历史模式

在创建路由器实例时，history 配置允许我们在不同的历史模式中进行选择。
vue3 路由也就是 vue-router4.x 版本直接在 createRouter 方法的 history 选项声明。
常用两种模式：
Hash 模式 ：用 createWebHashHistory() 创建的。
它在内部传递的实际 URL 之前使用了一个哈希字符（#）这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理。不过，它在 SEO 中确实有不好的影响。

HTML5 模式 ：用 createWebHistory() 创建 HTML5 模式，推荐使用这个模式。

# 九、导航守卫

正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。简单说就是一些函数、他们每一个都在指定的阶段执行。
在这里需要先知道
一个完整的导航解析流程(执行顺序)
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫(2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 9.1 全局导航守卫

也就是路由实例对象调用的钩子函数。
全局前置守卫：当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。
每个守卫方法接收 2 个参数：
to: 即将要进入的目标路由对象
from: 当前导航正要离开的路由对象

返回值：
false: 取消当前的导航。
一个路由地址: 通过一个路由地址跳转到一个不同的地址，就像你调用 router.push() 一样。

```
// 全局前置导航守卫
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})

// 全局解析钩子
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})

// 全局后置钩子
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

全局解析钩子：router.beforeResolve 和 router.beforeEach 类似，因为它在每次导航时都会触发，不同的是，解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。

全局后置钩子：和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身，它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

## 9.2 路由独享守卫

直接在路由配置对象上定义的守卫就是路由独享守卫。
beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。
例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。都不会重新执行一次。
它们只有在从一个不同的路由导航时，才会被触发。

```
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

## 9.3 组件内的守卫

在路由组件内直接定义路由导航守卫(传递给路由配置的)有 3 个：路由进入组件前、更新时、离开时。
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave

```
beforeRouteEnter(to, from) {
  // 在渲染该组件的对应路由被验证前调用
  // 不能获取组件实例 `this` ！
  // 因为当守卫执行时，组件实例还没被创建！
  // 可以通过传一个回调给 next 来访问组件实例。
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
},
beforeRouteUpdate(to, from) {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
  // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
},
beforeRouteLeave(to, from) {
  // 通常用来预防用户在还未保存修改前突然离开
  // 可以通过返回 false 来取消导航
  // 在导航离开渲染该组件的对应路由时调用
  // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
},
```

# 十、路由元信息

有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。这些事情可以通过接收属性对象的 meta 属性来实现，并且它可以在路由地址和导航守卫上都被访问到。定义路由的时候你可以这样配置 meta 字段
。
首先，我们称呼 routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配多个路由记录。
一个路由匹配到的所有路由记录会暴露为 $route 对象(还有在导航守卫中的路由对象)的$route.matched 数组。我们需要遍历这个数组来检查路由记录中的 meta 字段，但是 Vue Router 还为你提供了一个 $route.meta 方法，它是一个非递归合并所有 meta 字段的（从父字段到子字段）的方法。

# 十一、动态路由

对路由的添加通常是通过 routes 选项来完成的，但是在某些情况下，你可能想在应用程序已经运行的时候添加或删除路由。
实际上根据角色划分路由时本质上文件还是在本地的，只不过 routes 数组是后端返回的。
动态路由的实现主要通过两个函数实现：router.addRoute() 和 router.removeRoute()。
