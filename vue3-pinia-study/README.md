# vue-pinia-study

vue3 状态管理官方库学习

# 一、概述

对比 vue2，vue3 官方的全局状态管理插件不再是 vuex，虽然你依然可以使用它。不过不推荐现在都是使用大菠萝 pinia。两者的作用和用法都比较相似，但 Pinia 的设计更贴近 Vue 3 组合式 API 的用法。
Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

## 1.1 安装和基本使用

安装：npm install pinia
在入口文件引入并使用 createPinia() 方法创建一个 pinia 实例(根 store)并将其传递给应用注册即可启用 pinia。
也可以像 vue2 一样在 src 目录下新建一个 stores 目录里建一个 index.js 文件导出一个 pinia 实例，但是不用直接在入口文件即可。

vue 应用注册 pinia 之后就可以使用了，此时一个 js 文件就是一个仓库引入即可使用里面管理的状态。可以说是非常方便了。

```
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 导入 Pinia
import App from '@/App.vue'

createApp(App)
.use(createPinia()) // 启用 Pinia
.mount('#app')
如此 Pinia 就集成到的项目里了。
```

pinia 和 vuex 以及 vue 组件的对比
作用 Vue-Component Vuex Pinia
数据管理 data state state
数据计算 computed getters getters
行为方法 methods mutations/actions actions
可以看到 Pinia 的结构和用途都和 Vuex 与 Component 非常相似，并且 Pinia 相对于 Vuex ，在行为方法部分去掉了 mutations （同步操作）和 actions （异步操作）的区分，更接近组件的结构，入门成本会更低一些。心智负担也更低。

# 二、核心概念

## 5.1 Store(仓库)

Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。换句话说，它承载着全局状态。它有点像一个永远存在的组件，每个组件都可以读取和写入它。

它有三个概念，state、getter 和 action，我们可以假设这些概念相当于组件中的 data、 computed 和 methods。
也就是 state 是 Store 的数据 (data)，getters 是 Store 的计算属性 (computed)，而 actions 则是方法 (methods)。
所以可以在 actions 里通过 this.变量名的形式访问 state 中定义的变量。

Store 就是仓库它是通过 defineStore() 方法来创建的，实际开发中一般一个 js 文件声明一个仓库或多个然后导出 defineStore 声明的仓库。可以理解为一个仓库就是一个 js 文件。

defineStore() 方法最终会返回一个仓库函数对象，可以对其进行任意命名，但最好使用约定的命名规范：用 store 的名字，同时以 use 开头且以 Store 结尾，也就是符合组合式函数(hooks)风格。如： useProductStore、useUserStore、useCartStore 等即：useXXXStore 格式命名。导出时使用的是 export const 而不是 export default 导出也是为了在使用的时候可以和其他的 Vue 组合函数保持一致。即在组件中都是通过 import { xxx } from 'xxx' 来导入。

defineStore() 方法有两种入参方式：一个参数、两个参数。

1. defineStore() 方法接收两个参数：

第一个参数是一个独一无二的名字被用作 id 用来唯一标识当前仓库，是必须传入的。Pinia 将用它来连接 store 和 devtools。
第二个参数有两种形式：Option Store(接收一个 Option 对象) 和 Setup Store(接收一个 Setup 函数)。

```
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。

// Option Store  可以与 Vue 的选项式 API 类似，传入一个带有 state、actions 与 getters 属性的 Option 对象。
// 这时可以认为state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
  state:() => ({
    // 保存的状态
    count: 0
  }),
  getters:{},
  actions:{}
})


// Setup Store 与 Vue 组合式 API 的 setup 函数 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。
//  这时ref() 就是 state 属性、computed() 就是 getters、function() 就是 actions
export const useAlertsStore = defineStore('alerts', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value \* 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// 使用
// 需要记住虽然已经定义了仓库store，但是在没有调用defineStore() 方法最终返回的仓库函数对象前，store实例不会被创建，里面的
// 状态也拿不到。而一旦 store 被实例化，就可以直接访问在 store 的 state、getters 和 actions 中定义的任何属性。
<script setup>
  import { useCounterStore } from '@/stores/counter'
  // 执行之后可以在组件中的任意位置访问 `store` 变量
  const store = useCounterStore()
  // 注意：store 是一个用 reactive 包装的对象，所以不能直接解构state、getters上的变量会丢失响应状态。
  // 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()方法它将为每一个响应式属性创建引用。

  / `name` 和 `doubleCount` 是响应式的 ref
  // 同时通过插件添加的属性也会被提取为 ref
  // 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
  const { name, doubleCount } = storeToRefs(store)
  // 作为 action 的 increment 可以直接解构
  const { increment } = store
</script>

```

Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何组合式函数。不过，请记住，使用组合式函数会让 SSR 变得更加复杂。选择自己觉得舒服的那种方式即可。

2. 第二种入参形式是直接传入一个配置对象，仓库名以 id 字段声明。(用的不多)

```
export const useStore = defineStore({
   id: 'main',
   // Store 选项...
})
```

## 5.2 State

Pinia 是在 state 里面定义状态数据,在 Pinia 中，state 被定义为一个返回初始状态的函数。这是为了保证每一个 store 仓库都维护一份自己的状态数据。同时为了完整类型推理，推荐使用箭头函数，如果不显式 return ，箭头函数的返回值需要用圆括号 () 套起来。
用法上和 Vuex 很相似，但有一点区别是，pinia 的 state 数据是直接挂在 store 上的，而不是 store.state 上面。所以默认情况下，你可以通过 store 实例访问 state，直接对其进行读写。注意：对 state 的访问，修改，重置等操作都是响应性的，所以也不能解构不然会丢失响应式。

```

import { defineStore } from 'pinia'
// 显性return返回
const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})

// 不显性return返回
const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => ({
   // 所有这些属性都将自动推断出它们的类型
   count: 0,
   name: 'Eduardo',
   isAdmin: true,
   items: [],
   hasChanged: true,
  })
})

// 访问 state
const store = useStore()
store.count++

```

## 5.3 Getter

Pinia 的 getters 是用来计算数据的，相当于计算属性，也就是说它依赖于 state 也可能会使用其他 getter。
也推荐使用箭头函数，并且它将接收 state 作为第一个参数, this 访问到整个 store 实例
想要使用另一个 store 的 getter 的话，那就直接在 getter 内使用就好。
使用和 state 一样，它也是直接挂载在 store 下面的，直接访问即可。

```
import { defineStore } from 'pinia'
import { useOtherStore } from './other-store'
export const useStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    // es6简写
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置，如果使用ts时
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注。 this 来引用 getter
      return this.doubleCount + 1
    },
    // 使用其它store仓库的getter
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})

// 使用
<script setup>
   import { useCounterStore } from './counterStore'
   const store = useCounterStore()
   store.doubleCount
</script>
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

```

## 5.4 actions

Pinia 只需要用 actions 就可以解决各种数据操作，无需像 Vuex 一样区分为 mutations / actions 两大类。
可以为当前 Store 封装一些可以开箱即用的方法，支持同步和异步。
类似 getter，action 也可通过 this 访问整个 store 实例，并支持完整的类型标注(以及自动补全)。不同的是，action 可以是异步的，也就是你可以在它们里面 await 调用任何 API，以及其他 store 的 action！

```
import { useAuthStore } from './auth-store'
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
    // 使用其它store的action
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
使用：Action 可以像函数或者通常意义上的方法一样被调用，不需要和 Vuex 一样执行 commit 或者 dispatch，在 Pinia ，不需要，不需要。

它可以直接从store实例中解构出来执行，就像函数或者通常意义上的方法一样被调用。
<script setup>
const store = useCounterStore()
// 将 action 作为 store 的方法进行调用
store.randomizeCounter()
// 解构
const {randomizeCounter} = store
</script>
<template>
  <!-- 即使在模板中也可以 -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>

```

## 5.5 插件

类似 vue 添加 pinia 为插件一样，pinia 也可以添加插件。
如为 store 添加新的属性
定义 store 时增加新的选项
为 store 增加新的方法
包装现有的方法
改变甚至取消 action
实现副作用，如本地存储

插件是通过 pinia.use() 添加到 pinia 实例的,这对添加全局对象很有用，如路由器、modal 或 toast 管理器。最简单的例子是通过返回一个对象将一个静态属性添加到所有 store。

```
import { createPinia } from 'pinia'

// 创建的每个 store 中都会添加一个名为 `secret` 的属性。
// 在安装此插件后，插件可以保存在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将该插件交给 Pinia
pinia.use(SecretPiniaPlugin)

// 在另一个文件中
const store = useStore()
store.secret // 'the cake is a lie'

// 本质
// Pinia 插件是一个函数，可以选择性地返回要添加到 store 的属性。它接收一个可选参数，即 context。
export function myPiniaPlugin(context) {
  context.pinia // 用 `createPinia()` 创建的 pinia。
  context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  context.store // 该插件想扩展的 store
  context.options // 定义传给 `defineStore()` 的 store 的可选对象。
  // ...
}

然后用 pinia.use() 将这个函数传给 pinia
pinia.use(myPiniaPlugin)
插件只会应用于在 pinia 传递给应用后创建的 store，否则它们不会生效。


```
