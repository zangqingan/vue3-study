# vue3-study
vue3全家桶的学习
vue3依然可以像vue2一样渐进式学习，但是没有必要。
基础语法还是单独学习，但是组件开始都是最新脚手架vite构建项目学习。
在 2022 年 2 月 7 日， Vue 3 代替了 Vue 2 成为 Vue 的默认版本
也就是说现在使用命令：npm i vue 默认安装vue3了，而不用像之前一样指定vue@next。
此时如需要安装2.x的版本使用如下命令
安装 2.6.x 的最新版本：npm i vue@legacy
安装 2.7.x 的最新版本：npm i vue@v2-latest
一般用的2.6.x版本的，因为2.7是在vue2的基础上增加了对标vue3的内容。

# 一、vue项目的创建

## 1.1 使用vite 创建项目
vite是vue作者开发的一个新的构建工具，使用它就可以构建vite项目。
语法：npm create vite
语法：npm create vite@latest 
即可创建一个基于 Vite 的基础空项目，类似之前vuecli最基础的模板，只安装了vue。
如果需要用到 Router 、 Vuex 、 ESLint 等程序，都需要再单独安装和配置。

create-vue 则是 Vue 官方推出的一个新脚手架，用以代替基于 Webpack 的 Vue CLI ，它也可以创建基于 Vite 的 Vue 基础模板，可以选择是否安装路由，pinia，等。
语法：
npm init vue
npm create vue@3

create-preset 是 Awesome Starter 的 CLI 脚手架，提供快速创建预设项目的能力，可以创建一些有趣实用的项目启动模板，也可以用来管理的常用项目配置。除了创建vue项目还可以创建node项目。可以尝试
就跟@vue/cli 一样，全局安装到本地。
通过 preset -v 查看安装版本。
通过 preset init 命令来创建项目。

项目的创建方式是多种多样的，不必纠结选择那种，完全可以自己手动从零搭建需要什么包安装什么包。
不论使用上方哪种方式创建项目，在项目的根目录下都会有一个名为 vite.config.js 或 vite.config.ts 的项目配置文件里面会有一些预设好的配置。实际开发中需要到什么vite官网查看即可。这个文件就跟vuecli创建的vue2.x项目的 vue.config.js的作用一样的。

## 1.2 使用@vue/cli 创建项目
如果不习惯vite，依然是可以使用vue2.x时的脚手架vuecli的。
注意如果需要使用它创建vue3项目，最低版本要求在 4.5.6。
查看版本 vue --version
创建项目：vue create 项目名
根据提示选择需要的预设模板或者自己选择需要安装的包，只不过没有没有与vue3匹配的技术栈，如路由pinia等都需要自己安装。
Vue CLI 的配置文件是 vue.config.js需要时可以参考官网的说明文档调整各个选项配置。

如果使用那种工具创建，其实本质区别不大，无非是叫法使用方法的不同。具体看项目的技术需求。
tips：如果是ts项目并且配置了alias也就是路径别名，因为 TypeScript 不认识里面配置的 alias 别名，所以需要再对 tsconfig.json 做一点调整，增加对应的 paths ，否则在 VSCode 里可能会路径报红，提示找不到模块或其相应的类型声明。配置如下：paths 的配置全部要以 /* 结尾，代表该目录下的文件都可以被匹配，而不是指向某一个文件。
{
  "compilerOptions": {
    // ...
    "paths": {
      "@/*": ["src/*"],
      "@img/*": ["src/assets/img/*"],
      "@less/*": ["src/assets/less/*"],
      "@libs/*": ["src/libs/*"],
      "@plugins/*": ["src/plugins/*"],
      "@cp/*": ["src/components/*"],
      "@views/*": ["src/views/*"]
    },
  },
  // ...
}

## 1.3 规范化
现在的项目一般也是团队协作开发，为了更好的阅读体验和维护性能，以及开发效率。统一的编码风格是很有必要的。这也是前端工程化规范化的要求。

### 1.3.1 编辑器配置 Editor Config 
在项目根目录下再增加一个名为 .editorconfig 的文件。这个文件的作用是强制编辑器以该配置来进行编码，比如缩进统一为空格而不是 Tab ，每次缩进都是 2 个空格而不是 4 个等等。
具体配置查看 https://editorconfig.org/

### 1.3.2 代码格式化 Prettier 
Prettier 是目前最流行的代码格式化工具，可以约束的代码风格不会乱七八糟。
比如 2 个空格的缩进、无需写分号结尾、数组 / 对象每一项都带有尾逗号等等
如果需要手动增加功能支持，在项目根目录下再增加.prettierrc 的文件即可。
具体配置查看官网https://prettier.io/docs/en/options.html

### 1.3.3 代码监测 ESLint 
ESLint 是一个查找 JavaScript / TypeScript 代码问题并提供修复建议的工具，换句话说就是可以约束的代码不会写出一堆 BUG ，它是代码健壮性的重要保障。
可以通过脚手架创建的项目通常都会帮配置好 ESLint 规则，如果有一些项目是一开始没有，后面想增加 ESLint 检查，也可以手动配置具体规则。查看官网https://eslint.org/docs/latest/use/configure/
在项目根目录下创建一个名为 .eslintrc.js 文件，写入以下内容：
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}

### 1.3.4 编辑器 VSCode 
要问现在前端工程师用的最多的代码编辑器是哪个，肯定是 Visual Studio Code 了！
与其他的编辑器相比，有这些优点：
  背靠 Microsoft ，完全免费并且开源，开箱即用
  可以通过简单的配置调整来满足之前在其他编辑器上的习惯（ e.g. Sublime Text ）
  轻量级但功能强大，内置了对 JavaScript、TypeScript 和 Node.js 的支持，
  丰富的插件生态，可以根据的需要，安装提高编码效率的功能支持，以及其他的语言扩展
  智能的代码补全、类型推导、代码检查提示、批量编辑、引用跳转、比对文件等功能支持
  登录的 GitHub 账号即可实现配置自动同步，在其他电脑上直接使用的最习惯配置和插件
这里主要说说常用的插件
Chinese (Simplified) 汉化配置

Volar:Vue 官方推荐的 VSCode 扩展，用以代替 Vue 2 时代的 Vetur ，提供了 Vue 3 的语言支持、 TypeScript 支持、基于 vue-tsc 的类型检查等功能。

Vue VSCode Snippets :从实际使用 Vue 的角度提供 Vue 代码片段的生成，可以通过简单的命令，在 .vue 文件里实现大篇幅的代码片段生成

Auto Close Tag: 可以快速完成 HTML 标签的闭合
Auto Rename Tag:插件会自动把闭合部分也同步修改

EditorConfig for VSCode:一个可以让编辑器遵守协作规范的插件

Prettier for VSCode:这是 Prettier 在 VSCode 的一个扩展，不论项目有没有安装 Pretter 依赖，安装该扩展之后，单纯在 VSCode 也可以使用 Pretter 进行代码格式化。

ESLint for VSCode:这是 ESLint 在 VSCode 的一个扩展， TypeScript 项目基本都开了 ESLint ，编辑器也建议安装该扩展支持以便获得更好的代码提示。

其它需要的插件可以在vscode的插件市场里查看https://marketplace.visualstudio.com/


# 二、vue项目版本的比对

## 2.1 入口文件的区别
在 Vue 3 项目中，初始化阶段对比 Vue 2 是发生了一些变化的
Vue 2 在导入各种依赖之后，通过 new Vue() 执行 Vue 的初始化，相关的 Vue 生态和插件，有的是使用 Vue.use() 来进行初始化，有的是作为 new Vue() 的入参：
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pluginA from 'pluginA'
import pluginB from 'pluginB'
import pluginC from 'pluginC'

// 使用了 `use` 方法激活
Vue.use(pluginA)
Vue.use(pluginB)
Vue.use(pluginC)

Vue.config.productionTip = false

// 作为 `new Vue()` 的入参激活
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

而在 Vue 3 ，使用 createApp 执行 Vue 的初始化，另外不管是 Vue 生态里的东西，还是外部插件、 UI 框架，统一都是由 use() 进行激活，非常统一和简洁：
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pluginA from 'pluginA'
import pluginB from 'pluginB'
import pluginC from 'pluginC'

createApp(App)
  .use(store)
  .use(router)
  .use(pluginA)
  .use(pluginB)
  .use(pluginC)
  .mount('#app')


## 2.2 生命周期的区别
从 Vue 2 升级到 Vue 3 ，在保留对 Vue 2 的生命周期支持的同时，Vue 3 也带来了一定的调整。
Vue 2 的生命周期写法名称是 Options API （选项式 API ）， Vue 3 新的生命周期写法名称是 Composition API （组合式 API ）。具体差异如下：
Vue 2 生命周期	          Vue 3 生命周期	       执行时间说明
beforeCreate	             setup	              组件创建前执行
created	                   setup	              组件创建后执行
beforeMount	               onBeforeMount	      组件挂载到节点上之前执行
mounted	                   onMounted	          组件挂载完成后执行
beforeUpdate	             onBeforeUpdate	      组件更新之前执行
updated	                   onUpdated	          组件更新完成之后执行
beforeDestroy	             onBeforeUnmount	    组件卸载之前执行
destroyed	                 onUnmounted	        组件卸载完成后执行
errorCaptured	             onErrorCaptured	    当捕获一个来自子孙组件的异常时激活钩子函数

可以看出vue2中创建接口的两个钩子在vue3中已经被setup替代，其它的阶段一样只是名字叫法不同。

## 2.3 响应式数据的区别
Vue 2 是使用了 Object.defineProperty API 的 getter/setter 来实现数据的响应性。
而Vue 3 是使用了 对象代理Proxy API 的 getter/setter 来实现数据的响应性。
那么为什么 Vue 3 要舍弃 Object.defineProperty ，换成 Proxy 呢？主要原因在于 Object.defineProperty 有以下的不足：
    无法侦听数组下标的变化，通过 arr[i] = newValue 这样的操作无法实时响应
    无法侦听数组长度的变化，例如通过 arr.length = 10 去修改数组长度，无法响应
    只能侦听对象的属性，对于整个对象需要遍历，特别是多级对象更是要通过嵌套来深度侦听
    使用 Object.assign() 等方法给对象添加新属性时，也不会触发更新
实际开发就是，vue2中在data选项中声明的变量就是响应式变量
而vue3则是需要使用新的响应式API声明

### 2.3.1 响应式 API 之 ref
ref 是最常用的一个响应式 API，它可以用来定义所有类型的数据，包括 Node 节点和组件。
ref API 是一个函数，通过接受一个泛型入参，返回一个响应式对象，所有的值都通过 .value 属性获取或重新赋值。
但是在模板中不用 .value可以直接使用。ref()本质是对reactive方法的封装。
如：
// 字符串，显式指定 `msg.value` 是 `string` 类型
const msg = ref<string>('Hello World!')

// 数值
const count = ref<number>(1)

// 布尔值
const isVip = ref<boolean>(false)

// 先声明对象的格式
interface Member {
  id: number
  name: string
}

// 在定义对象时指定该类型
const userInfo = ref<Member>({
  id: 1,
  name: 'Tom',
})

// 数值数组
const uids = ref<number[]>([1, 2, 3])

// 字符串数组
const names = ref<string[]>(['Tom', 'Petter', 'Andy'])

// 声明对象的格式
interface Member {
  id: number
  name: string
}

// 定义一个对象数组
const memberList = ref<Member[]>([
  {
    id: 1,
    name: 'Tom',
  },
  {
    id: 2,
    name: 'Petter',
  },
])

除了可以定义数据，ref 也有熟悉的用途，就是用来挂载节点，也可以挂在子组件上，也就是对应在 Vue 2 时常用的 this.$refs.xxx 获取 DOM 元素信息的作用。

模板部分依然是熟悉的用法，在要引用的 DOM 上添加一个 ref 属性：

<template>
  <!-- 给 DOM 元素添加 `ref` 属性 -->
  <p ref="msg">请留意该节点，有一个 ref 属性</p>

  <!-- 子组件也是同样的方式添加 -->
  <Child ref="child" />
</template>

在 <script /> 部分有三个最基本的注意事项：

    在 <template /> 代码里添加的 ref 属性的值，是对应 <script /> 里使用 ref API 声明的变量的名称；

    请保证视图渲染完毕后再执行 DOM 或组件的相关操作（需要放到生命周期的 onMounted 或者 nextTick 函数里，这一点在 Vue 2 也是一样）；这个是至关重要的。

    该 Ref 变量必须 return 出去才可以给到 <template /> 使用，这一点是 Vue 3 生命周期的硬性要求，子组件的数据和方法如果要给父组件操作，也要 return 出来才可以。当然在vue3.2之后使用setup语法糖是不需要使用的。


平时对于普通变量的值，读取的时候都是直接调用其变量名即可。

// 读取一个字符串
const msg: string = 'Hello World!'
console.log(msg)

// 读取一个数组
const uids: number[] = [1, 2, 3]
console.log(uids[1])


对于数组类型ref操作不会丢失响应式也就是说在日常业务中，像在对接服务端 API 的接口数据时，可以自由的使用数组的遍历方法如： forEach、map、filter 等方法操作 Ref 数组，或者直接重置它，而不必担心数据失去响应性。

const data = ref<string[]>([])
// 提取接口的数据
data.value = api.data.map((item: any) => item.text)

// 重置数组
data.value = []

### 2.3.2 响应式 API 之 reactive 
reactive 是继 ref 之后最常用的一个响应式 API 了，相对于 ref ，它的局限性在于只适合对象、数组。
记住只用来声明对象和数组这很关键。

// 声明对象的类型
interface Member {
  id: number
  name: string
}

// 定义一个对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom',
})

const uids: number[] = reactive([1, 2, 3])

// 再定义一个为对象数组
const userList: Member[] = reactive([
  {
    id: 1,
    name: 'Tom',
  },
  {
    id: 2,
    name: 'Petter',
  },
  {
    id: 3,
    name: 'Andy',
  },
])

// 读取用户名
console.log(userInfo.name)

// 修改用户名
userInfo.name = 'Petter'

可以看出使用ts时和ref声明对象，数组的方法是不太一样的，ref是接受入参，而reactive是写在变量一侧。
使用时也不用像ref一样 .value，另一个不同是对数组重置时 直接 赋值空数组reactive会丢失响应式。这时应该通过重置数组的 length 长度来实现数据的重置。
同时不要直接对reactive 变量进行解构，因为解构后得到的变量会失去响应性。


### 2.3.3 响应式 API 之 toRef 与 toRefs 
为了方便开发者使用， Vue 3 还推出了两个与之相关的 API ： toRef 和 toRefs ，都是用于 reactive 向 ref 转换。
这两个 API 在拼写上非常接近，顾名思义，一个是只转换一个字段，一个是转换所有字段，转换后将得到新的变量，并且新变量和原来的变量可以保持同步更新。也就是保持响应式。
toRef(reactive对象/数组,这个对象上的要转换的属性名/数组下标,可选默认值)	创建一个新的 Ref 变量，转换 Reactive 对象的某个字段为 Ref 变量。注意可选默认值仅对所声明的 Ref 变量有效，而不会影响原 Reactive 字段的值。

toRefs(reactive变量)	创建一个新的对象，它的每个字段都是 Reactive 对象各个字段的 Ref 变量。与 toRef 不同的是toRefs 只接收了一个参数，是一个 reactive 变量。

interface Member {
  id: number
  name: string
}

const userInfo: Member = reactive({
  id: 1,
  name: 'Petter',
})

const name = toRef(userInfo, 'name')
console.log(name.value) // Petter

// 传给 `toRefs` 作为入参
const userInfoRefs = toRefs(userInfo)
此时这个新的 userInfoRefs 变量，它的 TS 类型就不再是 Member 了。而是 ToRefs<Member>。

等号左侧的 name 变量此时是一个 Ref 变量，这里因为 TypeScript 可以对其自动推导，因此声明时可以省略 TS 类型的显式指定，实际上该变量的类型是 Ref<string> 。
之后在读取和赋值时，就需要使用 name.value 来操作，注意在重新赋值时会同时更新 name 和 userInfo.name 的值。
// 修改前先查看初始值
const name = toRef(userInfo, 'name')
console.log(name.value) // Petter
console.log(userInfo.name) // Petter

// 修改 Ref 变量的值，两者同步更新
name.value = 'Tom'
console.log(name.value) // Tom
console.log(userInfo.name) // Tom

// 修改 Reactive 对象上该属性的值，两者也是同步更新
userInfo.name = 'Jerry'
console.log(name.value) // Jerry
console.log(userInfo.name) // Jerry


经过转换后的 Reactive 对象或数组就支持 ES6 的解构，并且不会失去响应性，因为解构后的每一个变量都具备响应性。
// 为了提高开发效率，可以直接将 Ref 变量直接解构出来使用
const { name } = toRefs(userInfo)
console.log(name.value) // Petter

// 此时对解构出来的变量重新赋值，原来的变量也可以同步更新
name.value = 'Tom'
console.log(name.value) // Tom
console.log(userInfo.name) // Tom





## 2.4 函数的声明和使用
在 Vue 2 ，函数通常是作为当前组件实例上的方法在 methods 里声明，然后再在 mounted 等生命周期里调用，或者是在模板里通过 Click 等行为触发，由于组件内部经常需要使用 this 获取组件实例，因此不能使用箭头函数。
export default {
  data: () => {
    return {
      num: 0,
    }
  },
  mounted: function () {
    this.add()
  },
  methods: {
    // 不可以使用 `add: () => this.num++`
    add: function () {
      this.num++
    },
  },
}

在 Vue 3 则灵活了很多，可以使用普通函数、 Class 类、箭头函数、匿名函数等等进行声明，可以将其写在 setup 里直接使用，也可以抽离在独立的 .js / .ts 文件里再导入使用。
export default defineComponent({
  setup() {
    const msg = ref<string>('Hello World!')

    // 这个要暴露给模板使用，必须 `return` 才可以使用
    function updateMsg() {
      msg.value = 'Hi World!'
    }

    // 这个要在页面载入时执行，无需 `return` 出去
    const init = () => {
      console.log('init')
    }

    onMounted(() => {
      init()
    })

    return {
      msg,
      updateMsg,
    }
  },
})
当然在vue3.2使用setup语法糖之后更是方便直接在script块中声明即可使用。

## 2.5 数据的侦听
Vue 3 在保留原来的 watch 功能之外，还新增了一个 watchEffect 帮助更简单的进行侦听。
在 Vue 2中监听器 是和 data 、 methods 同级的配置，并且声明语法类型很多。
export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 4,
      },
      e: 5,
      f: 6,
    }
  },
  // 注意这里，放在 `data` 、 `methods` 同个级别
  watch: {
    // 侦听顶级 Property
    a(val, oldVal) {
      console.log(`new: ${val}, old: ${oldVal}`)
    },

    // 字符串方法名
    b: 'someMethod',

    // 该回调会在任何被侦听的对象的 Property 改变时被调用，不论其被嵌套多深
    c: {
      handler(val, oldVal) {
        console.log('c changed')
      },
      deep: true,
    },

    // 侦听单个嵌套 Property
    'c.d': function (val, oldVal) {
      // do something
    },

    // 该回调将会在侦听开始之后被立即调用
    e: {
      handler(val, oldVal) {
        console.log('e changed')
      },
      immediate: true,
    },

    // 可以传入回调数组，它们会被逐一调用
    f: [
      'handle1',
      function handle2(val, oldVal) {
        console.log('handle2 triggered')
      },
      {
        handler: function handle3(val, oldVal) {
          console.log('handle3 triggered')
        },
        /* ... */
      },
    ],
  },
  methods: {
    someMethod() {
      console.log('b changed')
    },
    handle1() {
      console.log('handle 1 triggered')
    },
  },
}

Vue 2 还可以通过实例方法 this.$watch() 这个 API 的用法来实现对某个数据的侦听，它接受三个参数： source 、 callback 和 options 。

 // 生命周期钩子
  mounted() {
    this.$watch('a', (newVal, oldVal) => {
      // ...
    }, { immediate: true})
  },

在 Vue 3 的组合式 API 写法， watch 是一个可以接受 3 个参数的函数（保留了 Vue 2 的 this.$watch 这种用法，跟它非常像），在使用层面上简单了很多。
// 一个用法走天下
watch(
  source, // 必传，要侦听的数据源
  callback // 必传，侦听到变化后要执行的回调函数
  options // 可选，一些侦听选项
)
它返回一个可以用来停止侦听的函数。

### 2.5.1 侦听的数据源source
watch API 的第 1 个参数 source 是要侦听的数据源，它的 TS 类型如下：
export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T)
可以看到能够用于侦听的数据，是通过 
响应式 API 定义的变量（ Ref<T> ），
或者是一个 计算数据 （ ComputedRef<T> ），
或者是一个 getter 函数 （ () => T ）如果要侦听响应式对象里面的某个值时使用。
也就是说想定义的 watch 能够做出预期的行为(执行后面的回调函数)，数据源必须具备响应性或者是一个 getter ，如果只是通过 let 定义一个普通变量，然后去改变这个变量的值，这样是无法侦听的。

### 2.5.2 侦听到变化后要执行的回调函数callback
watch API 的第 2 个参数 callback 是侦听到数据变化时要做出的行为，它的 TS 类型如下：

export declare type WatchCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  onCleanup: OnCleanup
) => any

value	变化后的新值，类型和数据源保持一致
oldValue	变化前的旧值，类型和数据源保持一致
onCleanup	注册一个清理函数
注意：第一个参数是新值，第二个才是原来的旧值！这里新值和旧值名字可以随意命名，不过最好语义化。
如果侦听的数据源是一个 引用类型 时*
value 和 oldValue 是完全相同的，因为指向同一个对象。
另外，默认情况下，watch 是惰性的，也就是只有当被侦听的数据源发生变化时才执行回调。
// 定义一个响应式数据
const userInfo = reactive({
    name: 'Petter',
    age: 18,
})

// 2s后改变数据
setTimeout(() => {
    userInfo.name = 'Tom'
}, 2000)

/**
    * 可以直接侦听这个响应式对象
    * callback 的参数如果不用可以不写
    */
watch(userInfo, () => {
    console.log('侦听整个 userInfo ', userInfo.name)
})

/**
    * 也可以侦听对象里面的某个值
    * 此时数据源需要写成 getter 函数
    */
watch(
    // 数据源，getter 形式
    () => userInfo.name,

    // 回调函数 callback
    (newValue, oldValue) => {
        console.log('只侦听 name 的变化 ', userInfo.name)
        console.log('打印变化前后的值', { oldValue, newValue })
    }
)
如果有多个数据源要侦听，并且侦听到变化后要执行的行为一样，那么可以使用 批量侦听 。和 基础用法 的区别在于，数据源和回调参数都变成了数组的形式。
数据源：以数组的形式传入，里面每一项都是一个响应式数据。
回调参数：原来的 value 和 newValue 也都变成了数组，每个数组里面的顺序和数据源数组排序一致。


// 定义多个数据源
const message = ref<string>('')
const index = ref<number>(0)

// 2s后改变数据
setTimeout(() => {
    message.value = 'Hello World!'
    index.value++
}, 2000)

watch(
    // 数据源改成了数组
    [message, index],

    // 回调的入参也变成了数组，每个数组里面的顺序和数据源数组排序一致
    ([newMessage, newIndex], [oldMessage, oldIndex]) => {
        console.log('message 的变化', { newMessage, oldMessage })
        console.log('index 的变化', { newIndex, oldIndex })
    }
)

### 2.5.3 侦听选项options
watch API 还接受第 3 个参数 options ，可选的一些侦听选项。它的 TS 类型如下：
export declare interface WatchOptions<Immediate = boolean>
  extends WatchOptionsBase {
  immediate?: Immediate
  deep?: boolean
}

// 继承的 base 类型
export declare interface WatchOptionsBase extends DebuggerOptions {
  flush?: 'pre' | 'post' | 'sync'
}

// 继承的 debugger 选项类型
export declare interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

也就是说 options 是一个对象的形式传入，有以下几个选项：
选项	     类型	      默认值	      可选值	                   作用
deep	    boolean	      false     	 true | false	             是否进行深度侦听
immediate	boolean	      false	         true | false	             是否立即执行侦听回调
flush	    string	      'pre'	         'pre' | 'post' | 'sync'	 控制侦听回调的调用时机
onTrack	    (e) => void			                                     在数据源被追踪时调用
onTrigger	(e) => void			                                     在侦听回调被触发时调用
注意：在侦听 reactive 对象或数组时，deep会默认为 true。
{
    deep：true,
    immediate：true,
    flush：'post'
    ....
}


### 2.5.4 停止监听
当在定义一个 watch 行为的时候，它会返回一个用来停止侦听的函数。
需要注意的是，如果启用了 immediate 选项 ，不能在第一次触发侦听回调时执行它。
// 定义一个取消观察的变量，它是一个函数
const unwatch = watch(message, () => {
  // ...
})

// 在合适的时期调用它，可以取消这个侦听
unwatch()

## 2.6 watchEffect 副作用函数
如果一个函数里包含了多个需要侦听的数据，一个一个数据去侦听太麻烦了，在 Vue 3 ，可以直接使用 watchEffect API 来简化的操作。它也是返回一个用于停止监听的函数。
可以理解为一个简化版本的watch，它是立即执行传入的副作用回调函数，同时响应式追踪其依赖，并且在其依赖变更时会自动重新执行改函数。
语法：
watchEffect(
  callback // 必传，侦听到变化后要执行的回调函数
  options // 可选，一些侦听选项
)
// watchEffect 部分的 TS 类型
// ...
export declare type WatchEffect = (onCleanup: OnCleanup) => void

export declare function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle
// ...
跟watch类似，不过没有参数一。

例子：
 // 单独定义两个数据，后面用来分开改变数值
const name = ref<string>('Petter')
const age = ref<number>(18)

// 定义一个调用这两个数据的函数
const getUserInfo = (): void => {
  console.log({
    name: name.value,
    age: age.value,
  })
}

// 2s后改变第一个数据
setTimeout(() => {
  name.value = 'Tom'
}, 2000)

// 4s后改变第二个数据
setTimeout(() => {
  age.value = 20
}, 4000)

// 直接侦听调用函数，在每个数据产生变化的时候，它都会自动执行
watchEffect(getUserInfo)

和watch的区别：
  watch 可以访问侦听状态变化前后的值，而 watchEffect 没有。
  watch 是在属性改变的时候才执行，而 watchEffect 则默认会执行一次，然后在属性改变的时候也会执行。

回调函数是和watch一样的，而可选的侦听选项对比 watch API ，它不支持 deep 和 immediate 选项，请记住这一点，其他的选项用法是一样的。

## 2.7 计算属性
和 Vue 2.0 一样，数据的计算也是使用 computed API ，它可以通过现有的响应式数据，去通过计算得到新的响应式变量，用过 Vue 2.0 的开发者应该不会太陌生，但是在 Vue 3.0 ，在使用方式上也是变化非常大！
它可以是接收一个getter函数，返回一个只读的响应式ref对象。该ref对象通过 .value访问具体的返回值。
也可以接受一个带有getter和setter函数的对象来创建一个可读可写的ref对象,请注意，必须使用 get 和 set 这 2 个方法名，也只接受这 2 个方法。
语法：
computed(getter)
computed({
  get(){},
  set(newValue) {}
})
ts类型：
// 只读
function computed<T>(
  getter: () => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>

在vue2中computed 和 data 在同级配置，并且不可以和 data 里的数据同名重复定义
data() {
  return {
    firstName: 'Bill',
    lastName: 'Gates',
  }
},

// 注意这里定义的变量，都要通过函数的形式来返回它的值
computed: {
  // 普通函数可以直接通过熟悉的 this 来拿到 data 里的数据
  fullName() {
    return `${this.firstName} ${this.lastName}`
  },
  // 箭头函数则需要通过参数来拿到实例上的数据
  fullName2: (vm) => `${vm.firstName} ${vm.lastName}`,
},

而vue3 跟watch类似也是统一了写法，减少心智负担。就两种一种只读，一种可读写。
// 定义基本的数据
const firstName = ref<string>('Bill')
const lastName = ref<string>('Gates')

// 定义需要计算拼接结果的数据
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// 这里配合setter的需要，改成了另外一种写法
const fullName = computed({
  // getter还是返回一个拼接起来的全名
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  // setter这里改成只更新firstName，注意参数也定义TS类型
  set(newFirstName: string) {
    firstName.value = newFirstName
  },
})
console.log(fullName.value) // 输出 Bill Gates


创建一个只读的计算属性ref：
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value) // 2
plusOne.value++ // 错误

创建一个可写的计算属性 ref：
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0

计算属性和方法区别
1.性能优势计算属性是基于它们的响应依赖关系缓存的，只在相关响应式依赖发生改变时它们才会重新求值。

实际开发中：数据的拼接和计算就可以考虑使用计算属性。组件复用时也可以考虑使用。

## 2.8 指令
和vue2没什么区别，不过是删除了一些，新增了一些。
也是分为内置和自定义两种。

## 2.9 插槽
Vue 在使用子组件的时候，子组件在 template 里类似一个 HTML 标签，可以在这个子组件标签里传入任意模板代码以及 HTML 代码，这个功能就叫做 “插槽” 。
组件名
  其它内容
组件名
默认情况下，子组件使用 <slot /> 标签即可渲染父组件传下来的插槽内容，例如
<template>
  <Child>
    <!-- 注意这里，子组件标签里面传入了 HTML 代码 -->
    <p>这是插槽内容</p>
  </Child>
</template>
在子组件中,使用slot标签接收即可。
<template>
  <slot />
</template>
有时候可能需要指定多个插槽，并且每个插槽内容还不一样这时就需要具名插槽。
所谓具名插槽就是有名字的插槽，就是给slot标签添加上name属性。
<!-- 显示标题的插槽内容 -->
<div class="title">
  <slot name="title" />
</div>

<!-- 显示作者的插槽内容 -->
<div class="author">
  <slot name="author" />
</div>

<!-- 其他插槽内容放到这里 -->
<div class="content">
  <slot />
</div>
使用时父组件通过 template 标签绑定 v-slot指令绑定插槽名字，来指定传入哪个插槽里：
  <Child>
    <!-- 传给标题插槽 -->
    <template v-slot:title>
      <h1>这是标题</h1>
    </template>

    <!-- 传给作者插槽 -->
    <template v-slot:author>
      <h1>这是作者信息</h1>
    </template>

    <!-- 传给默认插槽 -->
    <p>这是插槽内容</p>
  </Child>
v-slot指令有语法糖别名 # ，所以也可以写成如下
<Child>
    <!-- 传给标题插槽 -->
    <template #title>
      <h1>这是标题</h1>
    </template>

    <!-- 传给作者插槽 -->
    <template #author>
      <h1>这是作者信息</h1>
    </template>

    <!-- 传给默认插槽 -->
    <p>这是插槽内容</p>
  </Child>
可以给 slot 标签添加内容，例如 <slot>默认内容</slot> ，当父组件没有传入插槽内容时，会使用默认内容来显示，默认插槽和具名插槽均支持该功能。
有一条规则需要记住：
  父组件里的所有内容都是在父级作用域中编译的
  子组件里的所有内容都是在子作用域中编译的

## 2.10 CSS 样式与预处理器 
Vue 组件的 CSS 样式部分，Vue 3 保留着和 Vue 2 完全一样的写法。
深度操作符：
使用 scoped 后，父组件的样式将不会渗透到子组件中，但也不能直接修改子组件的样式。
如果确实需要进行修改子组件的样式，必须通过 ::v-deep（完整写法） 或者 :deep（快捷写法） 操作符来实现。
新的 deep 写法是作为一个类似 JS “函数” 那样去使用，需要深度操作的样式或者元素名，作为 “入参” 去传入。
:deep(.类名) {
  //样式
}
使用 CSS 预处理器 在vue2中使用除了安装依赖之外还需要配置loader。而vue3使用vite时已经内置了对预处理文件的处理。安装依赖之后在style标签的lang属性指明使用哪个预处理器即可直接编写对应的代码。



# 三、vue3组件通信

# 四、vue3路由

# 五、vue3状态管理

# 六、vue3插件

# 七、vue3综合练习 vue3-synthesize-practise





