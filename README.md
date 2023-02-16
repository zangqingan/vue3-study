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
而Vue 3 是使用了 Proxy API 的 getter/setter 来实现数据的响应性。




