# 项目概述

vue3 全家桶的学习
vue3 依然是渐进式 JavaScript 框架，可以像 vue2 一样渐进式学习，但是没有必要。
因为在 vue3.2 之后，使用了 setup 语法糖，使得编写 vue 项目代码更加方便快捷。
基础语法还是单独学习，但是组件开始都是使用最新脚手架 vite 构建项目学习。
这个仓库 js 和 ts 都会使用到。
在 2022 年 2 月 7 日， Vue 3 代替了 Vue 2 成为 Vue 的默认版本
也就是说现在使用命令：npm i vue 默认安装的是 vue3 了，而不用像之前一样指定 vue@next。
此时如需要安装 2.x 的版本使用如下命令
安装 2.6.x 的最新版本：npm i vue@legacy
安装 2.7.x 的最新版本：npm i vue@v2-latest
vue2.0 版本一般是使用的 2.6.x 版本的，因为 2.7 是在 vue2 的基础上增加了对标 vue3 的内容。

# 一、vue 框架概述

## 1.1 vue.js 是什么

Vue (发音为 /vjuː/，类似 view)是一个用于构建用户界面的、渐进式的 JavaScript 框架，它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，能帮助用户高效地开发用户界面。
Vue 的两个核心功能：
声明式渲染：指 Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。
响应性：指 Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

它具有易学易用、性能出色、灵活多变 3 个特点。
易学易用：是因为 vuejs 基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API 和一流的文档。
性能出色：是因为 vuejs 经过编译器优化、完全响应式的渲染系统，几乎不需要手动优化。
灵活多变：是因为 vuejs 有着丰富的、可渐进式集成的生态系统，可以根据应用规模在库和框架间切换自如。
库是一个小的插件就跟以前的 jQuery 一样，我们学习 vue 的基础语法时使用 script 标签直接通过 CDN 来使用 Vue 此时它就是一个库。
而框架是一整套解决方案,根据项目需求可以添加路由、状态管理库、网络请求库等等这时它就是一个框架。而这也是渐进式的由来。

## 1.2 创建 vue 项目

### 1.2.1 使用 npm

vite 是 vue 作者开发的一个新的构建工具，使用它就可以创建 vite 项目。
语法：npm create vite@latest
即可创建一个基于 Vite 的最基础的项目，类似之前 vuecli 最基础的模板，它只安装了 vue。
如果需要用到 eslint、 Router 、 Vuex 、 ESLint 等程序，都需要再单独安装和配置。

也可以在选择 variant 时选择 create-vue，create-vue 算是 Vue 官方推出的一个新脚手架，用以代替基于 Webpack 的 Vue CLI ，它可以创建基于 Vite 的 Vue 基础模板，可以选择是否安装路由，pinia，eslint 等。按照提示选择需要的即可。这种选择也可以直接使用命令安装：npm init vue@latest 命令，这一指令将会安装并执行 create-vue。

项目的创建方式是多种多样的，不必纠结选择那种，完全可以自己手动从零搭建需要什么包安装什么包。
不论使用哪种方式创建项目，在项目的根目录下都会有一个名为 vite.config.js 或 vite.config.ts 的项目配置文件里面会有一些预设好的配置。实际开发中需要到什么 vite 官网查看配置即可。这个文件就跟 vuecli 创建的 vue2.x 项目的 vue.config.js 的作用一样的。

所以到了 vue3，可以使用两种方法创建基于 vite 的 vue3 项目，
一个是最基础的版本：npm create vite@latest
一个是可选配置的版本：npm init vue@latest

### 1.2.2 使用@vue/cli 创建项目

如果不习惯 vite，依然是可以使用 vue2.x 时的脚手架 vuecli 的。
注意如果需要使用它创建 vue3 项目，脚手架最低版本要求在 4.5.6。
查看脚手架版本信息: vue --version/-V。
创建项目：vue create 项目名。
根据提示选择需要的预设模板或者自己选择需要安装的包，只不过没有与 vue3 匹配的技术栈，如路由 pinia 等都需要自己安装。
而且可以明显看出这种创建方法比使用 vite 创建慢很多，所以如果要创建 vue3 项目是不推荐使用这种方法的。

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

其它需要的插件可以在 vscode 的插件市场里查看https://marketplace.visualstudio.com/

# 二、vue 项目版本的比对

vue2 版本升级到 vue3 之后，开发思路其实是没变的。下面是罗列的一个不同之处。
可以说 vue3 更加的方便、直观、友好。

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
Vue 2 生命周期 Vue 3 生命周期 执行时间说明
beforeCreate setup 组件创建前执行
created setup 组件创建后执行
beforeMount onBeforeMount 组件挂载到节点上之前执行
mounted onMounted 组件挂载完成后执行
beforeUpdate onBeforeUpdate 组件更新之前执行
updated onUpdated 组件更新完成之后执行
beforeDestroy onBeforeUnmount 组件卸载之前执行
destroyed onUnmounted 组件卸载完成后执行
errorCaptured onErrorCaptured 当捕获一个来自子孙组件的异常时激活钩子函数

可以看出 vue2 中创建接口的两个钩子在 vue3 中已经被 setup 替代，其它的阶段一样只是名字叫法不同。

## 2.3 响应式数据的区别

Vue 2 是使用了 Object.defineProperty API 的 getter/setter 来实现数据的响应性。
而 Vue 3 是使用了 对象代理 Proxy API 的 getter/setter 来实现数据的响应性。
那么为什么 Vue 3 要舍弃 Object.defineProperty ，换成 Proxy 呢？主要原因在于 Object.defineProperty 有以下的不足：
无法侦听数组下标的变化，通过 arr[i] = newValue 这样的操作无法实时响应
无法侦听数组长度的变化，例如通过 arr.length = 10 去修改数组长度，无法响应
只能侦听对象的属性，对于整个对象需要遍历，特别是多级对象更是要通过嵌套来深度侦听
使用 Object.assign() 等方法给对象添加新属性时，也不会触发更新
实际开发就是，vue2 中在 data 选项中声明的变量就是响应式变量
而 vue3 则是需要使用新的响应式 API 声明

### 2.3.1 响应式 API 之 ref

ref 是最常用的一个响应式 API，它可以用来定义所有类型的数据，包括 Node 节点和组件。
ref API 是一个函数，通过接受一个泛型入参，返回一个响应式对象，所有的值都通过 .value 属性获取或重新赋值。
但是在模板中不用 .value 可以直接使用。ref()本质是对 reactive 方法的封装。
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

对于数组类型 ref 操作不会丢失响应式也就是说在日常业务中，像在对接服务端 API 的接口数据时，可以自由的使用数组的遍历方法如： forEach、map、filter 等方法操作 Ref 数组，或者直接重置它，而不必担心数据失去响应性。

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

可以看出使用 ts 时和 ref 声明对象，数组的方法是不太一样的，ref 是接受入参，而 reactive 是写在变量一侧。
使用时也不用像 ref 一样 .value，另一个不同是对数组重置时 直接 赋值空数组 reactive 会丢失响应式。这时应该通过重置数组的 length 长度来实现数据的重置。
同时不要直接对 reactive 变量进行解构，因为解构后得到的变量会失去响应性。

### 2.3.3 响应式 API 之 toRef 与 toRefs

为了方便开发者使用， Vue 3 还推出了两个与之相关的 API ： toRef 和 toRefs ，都是用于 reactive 向 ref 转换。
这两个 API 在拼写上非常接近，顾名思义，一个是只转换一个字段，一个是转换所有字段，转换后将得到新的变量，并且新变量和原来的变量可以保持同步更新。也就是保持响应式。
toRef(reactive 对象/数组,这个对象上的要转换的属性名/数组下标,可选默认值) 创建一个新的 Ref 变量，转换 Reactive 对象的某个字段为 Ref 变量。注意可选默认值仅对所声明的 Ref 变量有效，而不会影响原 Reactive 字段的值。

toRefs(reactive 变量) 创建一个新的对象，它的每个字段都是 Reactive 对象各个字段的 Ref 变量。与 toRef 不同的是 toRefs 只接收了一个参数，是一个 reactive 变量。

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
当然在 vue3.2 使用 setup 语法糖之后更是方便直接在 script 块中声明即可使用。

## 2.5 数据的侦听

Vue 3 在保留原来的 watch 功能之外，还新增了一个 watchEffect 帮助更简单的进行侦听。
在 Vue 2 中监听器 是和 data 、 methods 同级的配置，并且声明语法类型很多。
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

### 2.5.1 侦听的数据源 source

watch API 的第 1 个参数 source 是要侦听的数据源，它的 TS 类型如下：
export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T)
可以看到能够用于侦听的数据，是通过
响应式 API 定义的变量（ Ref<T> ），
或者是一个 计算数据 （ ComputedRef<T> ），
或者是一个 getter 函数 （ () => T ）如果要侦听响应式对象里面的某个值时使用。
也就是说想定义的 watch 能够做出预期的行为(执行后面的回调函数)，数据源必须具备响应性或者是一个 getter ，如果只是通过 let 定义一个普通变量，然后去改变这个变量的值，这样是无法侦听的。

### 2.5.2 侦听到变化后要执行的回调函数 callback

watch API 的第 2 个参数 callback 是侦听到数据变化时要做出的行为，它的 TS 类型如下：

export declare type WatchCallback<V = any, OV = any> = (
value: V,
oldValue: OV,
onCleanup: OnCleanup
) => any

value 变化后的新值，类型和数据源保持一致
oldValue 变化前的旧值，类型和数据源保持一致
onCleanup 注册一个清理函数
注意：第一个参数是新值，第二个才是原来的旧值！这里新值和旧值名字可以随意命名，不过最好语义化。
如果侦听的数据源是一个 引用类型 时\*
value 和 oldValue 是完全相同的，因为指向同一个对象。
另外，默认情况下，watch 是惰性的，也就是只有当被侦听的数据源发生变化时才执行回调。
// 定义一个响应式数据
const userInfo = reactive({
name: 'Petter',
age: 18,
})

// 2s 后改变数据
setTimeout(() => {
userInfo.name = 'Tom'
}, 2000)

/\*\*
_ 可以直接侦听这个响应式对象
_ callback 的参数如果不用可以不写
\*/
watch(userInfo, () => {
console.log('侦听整个 userInfo ', userInfo.name)
})

/\*\*
_ 也可以侦听对象里面的某个值
_ 此时数据源需要写成 getter 函数
\*/
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

// 2s 后改变数据
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

### 2.5.3 侦听选项 options

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
选项 类型 默认值 可选值 作用
deep boolean false true | false 是否进行深度侦听
immediate boolean false true | false 是否立即执行侦听回调
flush string 'pre' 'pre' | 'post' | 'sync' 控制侦听回调的调用时机
onTrack (e) => void 在数据源被追踪时调用
onTrigger (e) => void 在侦听回调被触发时调用
注意：在侦听 reactive 对象或数组时，deep 会默认为 true。
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
可以理解为一个简化版本的 watch，它是立即执行传入的副作用回调函数，同时响应式追踪其依赖，并且在其依赖变更时会自动重新执行改函数。
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
跟 watch 类似，不过没有参数一。

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

// 2s 后改变第一个数据
setTimeout(() => {
name.value = 'Tom'
}, 2000)

// 4s 后改变第二个数据
setTimeout(() => {
age.value = 20
}, 4000)

// 直接侦听调用函数，在每个数据产生变化的时候，它都会自动执行
watchEffect(getUserInfo)

和 watch 的区别：
watch 可以访问侦听状态变化前后的值，而 watchEffect 没有。
watch 是在属性改变的时候才执行，而 watchEffect 则默认会执行一次，然后在属性改变的时候也会执行。

回调函数是和 watch 一样的，而可选的侦听选项对比 watch API ，它不支持 deep 和 immediate 选项，请记住这一点，其他的选项用法是一样的。

## 2.7 计算属性

和 Vue 2.0 一样，数据的计算也是使用 computed API ，它可以通过现有的响应式数据，去通过计算得到新的响应式变量，用过 Vue 2.0 的开发者应该不会太陌生，但是在 Vue 3.0 ，在使用方式上也是变化非常大！
它可以是接收一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 对象通过 .value 访问具体的返回值。
也可以接受一个带有 getter 和 setter 函数的对象来创建一个可读可写的 ref 对象,请注意，必须使用 get 和 set 这 2 个方法名，也只接受这 2 个方法。
语法：
computed(getter)
computed({
get(){},
set(newValue) {}
})
ts 类型：
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

在 vue2 中 computed 和 data 在同级配置，并且不可以和 data 里的数据同名重复定义
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

而 vue3 跟 watch 类似也是统一了写法，减少心智负担。就两种一种只读，一种可读写。
// 定义基本的数据
const firstName = ref<string>('Bill')
const lastName = ref<string>('Gates')

// 定义需要计算拼接结果的数据
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// 这里配合 setter 的需要，改成了另外一种写法
const fullName = computed({
// getter 还是返回一个拼接起来的全名
get() {
return `${firstName.value} ${lastName.value}`
},
// setter 这里改成只更新 firstName，注意参数也定义 TS 类型
set(newFirstName: string) {
firstName.value = newFirstName
},
})
console.log(fullName.value) // 输出 Bill Gates

创建一个只读的计算属性 ref：
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

计算属性和方法区别 1.性能优势计算属性是基于它们的响应依赖关系缓存的，只在相关响应式依赖发生改变时它们才会重新求值。

实际开发中：数据的拼接和计算就可以考虑使用计算属性。组件复用时也可以考虑使用。

## 2.8 指令

和 vue2 没什么区别，不过是删除了一些，新增了一些。
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
在子组件中,使用 slot 标签接收即可。
<template>
<slot />
</template>
有时候可能需要指定多个插槽，并且每个插槽内容还不一样这时就需要具名插槽。
所谓具名插槽就是有名字的插槽，就是给 slot 标签添加上 name 属性。

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
使用 CSS 预处理器 在 vue2 中使用除了安装依赖之外还需要配置 loader。而 vue3 使用 vite 时已经内置了对预处理文件的处理。安装依赖之后在 style 标签的 lang 属性指明使用哪个预处理器即可直接编写对应的代码。

# 三、vue3 组件通信

vue3 的组件通信和 vue2 本质上没区别，不同在于使用方式。

## 3.1 父子组件通信

vue 中最常见也是最常用的通信，它是指，B 组件引入到 A 组件里渲染，此时 A 是 B 的父级；B 组件的一些数据需要从 A 组件拿，B 组件有时也要告知 A 组件一些数据变化情况。
和 vue2 一样最常使用方法是 props 和 emit 实现，此外还有 v-model/emits，ref/emits，provide/inject，eventbus，pinia 这些常见的。

### 3.1.1 props / emits

这是 Vue 跨组件通信最常用，也是基础的一个方案，它的通信过程是：
父组件 Father.vue 通过 props 向子组件 Child.vue 传值
子组件 Child.vue 则可以通过 emits 向父组件 Father.vue 发起事件通知
最常见的场景就是统一在父组件发起 AJAX 请求，拿到数据后，再根据子组件的渲染需要传递不同的 props 给不同的子组件使用。
同 vue2 一样，先在父组件中定义好变量，然后把要传递的数据通过属性的方式绑定在子组件标签上。

<!-- Father.vue -->
<template>
  <Child
    title="用户信息"
    :index="1"
    :uid="userInfo.id"
    :user-name="userInfo.name"
  />
</template>
这样就完成了 props 数据的下发传递。不使用v-bind就是传的普通字符串，如果是变量名就使用v-bind动态绑定
注意：官方文档推荐对 camelCase 风格（小驼峰）命名的 props和emits函数名 ，在绑定时使用和 HTML attribute 一样的 kebab-case 风格（短横线），例如使用 user-name 代替 userName 传递。
对于组件名我们推荐使用 PascalCase（大驼峰）命名，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素。
子组件接收：在vue3.2之后一个组件可以使用 defineProps() 宏来显式声明它所需要接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute。
可以使用字符串数组来声明 prop 外，还可以使用对象的形式。
对于以对象形式声明中的每个属性，key 是 prop 的名称，而值则是该 prop 预期类型的构造函数。
比如，如果要求一个 prop 的值是 number 类型，则可使用 Number 构造函数作为其声明的值。
<!-- child.vue -->
const props = defineProps(['foo'])
// 或者
const props = defineProps({
  title: {
    type: String,//构造函数
    default: ''
  }
})
这种被称之为“运行时声明”，因为defineProps() 宏函数支持从它的参数中推导类型。所以传递给 defineProps() 的参数会作为运行时的 props 选项使用。

而在 ts 里可以将 props 的类型移入一个单独的接口中，通过泛型参数来定义 props 的类型。这被称之为“基于类型的声明”。
注意：基于类型的声明或者运行时声明可以择一使用，但是不能同时使用。
// 或者
interface Props {
title?: string
id?: number
name?: string
}
const props = defineProps<Props>()
使用和 vue2 一样在模板 template 中可以直接使用，而在 script 中需要使用 props.属性名的方式访问。

注意：使用泛型参数时必须是以下几种类型之一
一个类型字面量
defineProps<{ /_... _/ }>()
类型字面量可以抽离用一个变量名接收，或者接口，或者类型别名。
所以可以是同一个文件中的：对象类型字面量的引用，接口，类型别名。
interface Props {/_ ... _/}
const Props = {}
type Props = {}
defineProps<Props>()
注意：对象类型字面量的引用，接口，类型别名可以从其他文件导入。但是，传递给 defineProps 的泛型参数本身不能是一个导入的类型而必须是在同一个文件中定义的变量。
这是因为 Vue 组件是单独编译的，编译器目前不会抓取导入的文件以分析源类型。

当使用基于类型的声明时，我们失去了为 props 声明默认值的能力。
这可以通过 withDefaults 编译器宏解决,它被编译为等效的运行时 props default 选项。
对象和数组类型默认值跟原来一样需要使用一个函数返回。

子组件传值给父组件,和 vue2 一样发射事件出去，然后然父组件使用 v-on(缩写为 @) 来监听发射的事件即可。
和 props 一样，emits 也是显式地通过 defineEmits() 宏来声明它要触发的事件,defineEmits() 会返回一个与$emit 相同作用的函数供我们使用。有字符串数组来声明 emits 和使用对象的两种形式。
同时 emit 函数的类型标注也可以通过运行时声明或是类型声明进行
// 运行时
const emit = defineEmits(['change', 'update'])
// 发射事件
emit('change', payload)
payload 可以是一个变量，也可以是一个对象(最好使用对象的形式传递)

// 基于类型
const emit = defineEmits<{
(e: 'change', id: number): void
(e: 'update', value: string): void
}>()

注意：和 vue2 一样的 vue3 所有的 props 也遵循着单向绑定原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。

### 3.1.2 v-model / emits

和 Vue 2 不同， Vue 3 可以直接绑定 v-model ，而无需在子组件指定 model 选项 ，并且 Vue 3 的 v-model 需要使用英文冒号 : 指定要绑定的属性名，同时也支持绑定多个 v-model 写多个 v-model 即可。
默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的要发射的事件名字。当然也可以在冒号: 指定要修改的名字。
它是利用 v-model 可以在组件上使用以实现双向绑定。

<!-- Father.vue -->
<template>
  <Child
    v-model:uid="userInfo.id"
    v-model:username="userInfo.name"
    v-model:age="userInfo.age"
  />
</template>
一个 v-model 其实就是一个 prop ，它支持的数据类型和 prop 是一样的，所以子组件在接收数据的时候，完全按照 props 去定义就可以了。不同在于数据流不再是单向的。
不同在于emits的声明上。
update:要绑定的属性名，都需要添加update:前缀。之后父组件不用v-on显式监听因为使用了语法糖v-model已经帮忙监听了。
defineEmits(['update:title'])

### 3.1.3 ref / emits

和 vue2 一样可以给一个元素或者组件添加 ref 属性定义一个名字，类似 html 标签的 id 属性。就可以获取到元素对象实例。
与 vue2 不同的是，vue3 使用 composition api ref(null)定义一个一样名字的 ref 即可获取到对应的实例。

<!-- Father.vue -->
<template>
  <Child ref="child" />
</template>
然后在 script 部分定义好对应的变量名称 child,即可通过该变量操作子组件上暴露出来的变量或方法。
子组件需要使用 defineExpose() 宏显性地声明要暴露出去的变量或方法这样别人才能通过ref组件实例访问到。
const child = ref(null)
不过需要注意的是请保证视图渲染完毕后再执行操作，一种方法是在挂载后生命周期内执行，一种是使用全局方法nextTick()
onMounted(async () => {
  // 执行子组件里面的 AJAX 请求函数
  await child.value!.queryList()
  // 显示子组件里面的弹窗
  child.value!.isShowDialog = true
})

nextTick(() => {
// 执行子组件里面的 AJAX 请求函数
await child.value!.queryList()
// 显示子组件里面的弹窗
child.value!.isShowDialog = true
})

而子组件如果想主动向父组件通讯，也需要使用 emits 和之前是一样的。

### 3.1.4 provide / inject

依赖注入，通常情况下，当我们需要从父组件向子组件传递数据时，会使用 props。但是当有多层级嵌套的组件，孙层级的需要到祖先级别组件的数据时。一种方法是一层一层 props 传递。但是这种方法无疑是非常繁琐而且不利于维护阅读。
这时可以使用依赖注入。这个方法可以用在父子，祖孙，或更多曾经的祖孙组件间的通信。
一个祖先组件相对于其所有的后代组件，会作为依赖提供者通过 provide 向后代组件提供数据和方法。
函数接收两个参数。第一个参数被称为注入名，可以是一个字符串或是一个 Symbol。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 provide()，使用不同的注入名，注入不同的依赖值。
第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref。
provide(/_ 注入名 _/, /_ 值 _/)
provide('message','hello!')
最后，如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值。
provide('read-only-count', readonly(count))

后代组件通过 inject 函数 注入祖先组件提供数据和方法。
如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。
inject(/_ 注入名 _/, /_ 默认值 _/)
const message = inject('message')

注意： 1.无论组件层次结构有多深，发起 provide 的组件都可以作为其所有下级组件的依赖提供者。
2.provide 不是响应式的，如果要使其具备响应性，需要传入响应式数据。 3.当提供 / 注入响应式的数据时，建议尽可能将任何对响应式状态的变更都保持在供给方组件中。

## 3.2 兄弟组件通信

兄弟组件是指两个组件都挂载在同一个 Father.vue 下，但两个组件之间并没有什么直接的关联。
这种层级关系下，如果组件之间要进行通信，目前通常有这两类选择
1。还是可以通过 props 先传递给父组件再传给兄弟组件，不过不推荐。
2。借助 全局组件通信 的方案达到目的
这个和 vue2 时一样的，可以说就两种中央事件总线 eventbus 以及 vue 官方提供的全局状态管理插件。
所以不做展开而是在下一节的全局组件通信中一起说明。

## 3.3 全局组件通信

所谓全局组件通信是指项目下两个任意组件，不管是否有直接关联（例如父子关系、爷孙关系）都可以直接进行交流的通信方案。
在 vue2 中有 eventbus 和 vuex，而 vue3 类似的也有 eventbus 和 pinia。思想是一样的，不同在于使用方式上。

### 3.3.1 EventBus 中央事件总线

在 Vue 2 ，使用 EventBus 无需导入第三方插件，而是通过再创建一个 vue 实例来实现的。
比如可以在项目下的 utils 文件夹里，创建一个名为 eventBus.ts 的文件，导出一个新的 Vue 实例即可。
// src/utils/eventBus.ts
import Vue from 'vue'
export default new Vue()

先在负责接收事件的组件里，利用 Vue 的生命周期，通过 eventBus.$on 添加事件侦听，通过 eventBus.$off 移除事件侦听。
mounted() {
// 在组件创建时，添加一个名为 `hello` 的事件侦听
eventBus.$on('hello', () => {
      console.log('Hello World')
    })
  }
  beforeDestroy() {
    // 在组件销毁前，通过 `hello` 这个名称移除该事件侦听
    eventBus.$off('hello')
}

然后在另外一个组件里通过 eventBus.$emit 触发事件侦听。
methods: {
  sayHello() {
    // 触发名为 `hello` 的事件
    eventBus.$emit('hello')
}
}

而 Vue 3 应用实例不再实现事件触发接口，因此移除了 $on 、 $off 和 $once 这几个事件 API ，无法像 Vue 2 一样利用 Vue 实例创建 EventBus。只能通过第三方插件了，这里使用工作中实际使用过的 mitt。 注意：因为是第三方插件所以会有多种不同的选择，根据实际情况出发即可。
安装：npm i mitt
使用上和 vue2 类似
// src/utils/eventBus.ts
import mitt from 'mitt'
export default mitt()

on 注册一个侦听事件，用于接收数据
emit 调用方法发起数据传递
off 用来移除侦听事件
clear 清空所有。

const emitter from 'src/utils/eventBus.ts'
emitter.emit('hello', hello)
emitter.on('hello', e => console.log('foo', e))
function hello() {}
emitter.on('hello', hello)  
emitter.off('hello', hello)  
emitter.all.clear()

// 在组件卸载之前移除侦听
onBeforeUnmount(() => {
// 一个一个手动销毁
emitter.off('hello', hello)  
 // 全部销毁
emitter.all.clear()
})

### 3.3.2 官方插件 pinia

这个单独放到 vue3 状态管理上

# 四、vue3 路由

Vue 3 路由和 vue2 路由没有本质上的区别，引入路由的方式和 Vue 2 一样，路由的管理也是放在 src/router 这个目录下。只是使用方法上有区别
src
│ # 路由目录
├─router
│ # 路由入口文件
├───index.ts
│ # 路由配置，如果路由很多，可以再拆分模块文件
├───routes.ts
│ # 项目入口文件
└─main.ts

# 五、vue3 状态管理

和 vue2 相比，vue3 使用了新的状态管理库 pinia，虽然依然可以使用 vuex。但是不推荐了，原因是 Pinia 在生态系统中能够承担相同的职责且能做得更好，它提供了更简洁直接的 API，并提供了组合式风格的 API，最重要的是，在使用 TypeScript 时它提供了更完善的类型推导。

# 六、vue3 插件

## 6.1 vue 专属插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。通过 Vue Plugins 设计规范 开发出来的插件，在 npm 上通常是以 vue-xxx 这样带有 vue 关键字的格式命名。比如官方路由 vue-router 等等。一般放在 plugins 目录下。
vue3 依然使用 vue 实例的 use()方法注册插件，一般是初始化为全局插件。
一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身。
安装函数会接收到安装它的应用实例和传递给 app.use() 的额外选项作为参数。
这是因为 use()方法就是接受两个参数的。
参数一：plugin object | function 插件，一般是在 import 时使用的名称
参数二：options object 插件的参数，有些插件在初始化时可以配置一定的选项

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：
通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令。
通过 app.provide() 使一个资源可被注入进整个应用。
向 app.config.globalProperties 中添加一些全局实例属性或方法
一个可能上述三种都包含了的功能库 (例如 vue-router)。

而声明 Vue 插件的时候，需要遵循 Vue 官方撰写的 Vue Plugins 设计规范 ，并且做好必要的代码注释，除了标明插件 API 的 “用途、入参、返回值” 之外，最好在注释内补充一个 Example 或者 Tips 说明，功能丰富的插件最好直接写个 README 文档。
例如：
myPlugin.ts
// 对象格式
export default const myPlugin = {
install(app, options) {
// 配置此应用
}
}

// 函数格式，Vue 会直接调用这个函数

export default function (app, options) {
// 逻辑代码...
}

## 6.2 通用插件

通用插件它是针对具体的业务，或者涉及到一些经常用到的功能模块，也是可以抽离出来封装成项目专用的插件。
其实就是封装的工具类方法了，比较常见的如验证类的方法可以统一封装一下。一般放在 utils 目录或者 libs 目录下。
而通用插件可以用时导入也可以全局注册，即将其挂载到 Vue 上，使其成为 Vue 的全局变量。
一般是对于一些使用频率比较高的插件方法挂载，少数几个页面使用就没必要全局挂载了。
因为如果在整个应用中使用不同插件注入的太多全局属性，很容易让应用变得难以理解和维护。

在 Vue 2 ，可以通过 prototype 的方式来挂载全局变量，然后通过 this 关键字来从 Vue 原型上调用该方法。
Vue.prototype.$md5 = md5
访问
const md5Msg = this.$md5('message')

而在 vue3 中，已经不再支持 prototype 这样使用了，在 main.ts 里没有了 Vue，在组件的生命周期里也没有了 this。

如果依然想要挂载全局变量，需要挂载在 vue 实例对象的 config 对象的 globalProperties 属性上来实现。
globalProperties 是一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。也就是说添加到这个对象上的属性或方法能被应用内的所有组件访问到。
注意：如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。
同时在 Vue 3 实际上并不是特别推荐使用全局变量，Vue 3 比较推荐按需引入使用，这也是在构建过程中可以更好的做到代码优化。

// 把插件的 API 挂载全局变量到实例上
app.config.globalProperties.$md5 = md5
// 也可以自己写一些全局函数去挂载
app.config.globalProperties.$log = (text: string): void => {
console.log(text)
}

只能说尽力不使用，确实需要全局 api 啥的可以在入口文件就依赖注入，或者 pinia。

# 七、vue3 综合练习 vue3-synthesize-practise

# 八、其它

## 8.1 高效开发

vue3 进入 3.2 版本使用 setup 语法糖之后可以说是真香了。
它是为了让熟悉 Vue 3 的开发者可以更高效率地开发组件，减少编码过程中的心智负担，只需要给 script / 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用无需再一个个 return 了。脚手架帮我们做了。

在 script-setup 模式下，新增了 4 个全局编译器宏，他们无需 import 就可以直接使用。
也就是我们之前说的：defineProps、defineEmits、defineExpose、withDefaults
它们分别用于 props 的声明接收，emits 事件的声明发射，组件要向外暴露的属性和方法，ts 时带默认值的 props。

两个辅助函数：useSlots() 和 useAttrs()
在 script setup 使用 slots 和 attrs 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 $slots 和 $attrs 来访问它们。如果需要就使用这两个辅助函数。

// 获取 attrs
const attrs = useAttrs()
// attrs 是个对象，和 props 一样，需要通过 `key` 来得到对应的单个 attr
console.log(attrs.msg)

同时 script 标签中声明变量无需进行 return,因为所有数据只是默认隐式 return 给模板使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。子组件需要使用 defineExpose 宏显式声明暴露出去。
子组件引入后无需手动注册，即可在模板中使用。

## 8.2 命名技巧

在工作中，很多开发团队都会有语义化命名的规范要求，严格的团队会有 Code Review 环节，使用无意义命名的代码将无法通过审查。所以命名规范时很关键的，当然每个公司都不一样，个人习惯也不一样。
进入公司后应该先找公司的标准，然后是 vue 官方推荐的，然后是自己的爱好习惯。
无所谓大驼峰 PascalCase 还是小驼峰 camelCase 还是 kebab-case 短横线风格，或者是 snake_case 下划线风格其实都是可以的。关键是要统一规定好。

vue 组件命名规范
全局通用组件 -- @/components 目录下，使用大驼峰。这是 vue 官网的一个组件命名推荐。
业务路由页面组件 -- @/views 目录下的，使用 kebab-case 短横线风格

变量命名遵循 JavaScript 标识符命名规范，同时使用小驼峰并尽量语义化。
字符串类-搭配英文单词名称
布尔值类-搭配 is 、 has 等 Be 动词或判断类的动词作为前缀命名，并视情况搭配行为动词和目标名词，或者直接使用一些状态形容词。
数组-对于数组，通常使用名词的复数形式，或者名词加上 List 结尾作为命名。
函数-对于函数一般使用 save 、 update 、 delete 等会变更数据的动词作为前缀。
一般情况下：
数据存储可以统一使用 save
如果要区分新建或者更新操作，可以对新建操作使用 create ，对更新操作使用 update
删除使用 delete 或 remove
如果是 Node.js 程序需要对文件写入内容，使用 write
表单验证合法性等场景，可以使用 verify 或 check
切换可见性可以用 show 和 hide ，如果是写在一个函数里，可以使用 toggle
发送验证码、发送邮件等等可以使用 send
打开路由、打开外部 URL 可以使用 open

## 8.3 npm 包的开发和发布

开发一个 npm 包，并将其发布到 npmjs 上可供其他项目安装使用。
对一个 npm 包来说，最重要的文件莫过于 package.json 项目清单，其中有三个字段是必填的：
字段 是否必填 作用
name 必填 npm 包的名称，遵循 项目名称的规则
version 必填 npm 包的版本号，遵循 语义化版本号的规则
main 必填 项目的入口文件，通常指向构建产物所在目录的某个文件，该文件通常包含了所有模块的导出。

如果只指定了 main 字段，则使用 require 和 import 以及浏览器访问 npm 包的 CDN 时，都将默认调用该字段指定的入口文件。

如果有指定 module 和 browser 字段，则通常对应 cjs 格式的文件，对应 CommonJS 规范。
module 否 当项目使用 import 引入 npm 包时对应的入口文件，通常指向一个 es 格式的文件，对应 ES Module 规范。
browser 否 当项目使用了 npm 包的 CDN 链接，在浏览器访问页面时的入口文件，通常指向一个 umd 格式的文件，对应 UMD 规范。
types 否 一个 .d.ts 类型声明文件，包含了入口文件导出的方法 / 变量的类型声明，如果项目有自带类型文件，那么在使用者在使用 TypeScript 开发的项目里，可以得到友好的类型提示
files 否 指定发布到 npm 上的文件范围，格式为 string[] 支持配置多个文件名或者文件夹名称。

通常可以只指定构建的输出目录，例如 dist 文件夹，如果不指定，则发布的时候会把所有源代码一同发布。

**加粗文本**
[链接文本](https://example.com)
