# vue3-basic-study

vue3 基础语法的学习,事实上 vue 的模板语法(也就是 Vue 基于标准 HTML 拓展的语法)在升级后并没有很大的变动,和 vue2 是大体一致,重新学习一遍即可。

# 使用 vue

基础语法部分依然是借助 script 标签直接通过 CDN 引入 来使用 Vue,这时 vue 的构建产物是 vue.global.js，和 jQuery 类似它就是一个 IIFE 全局构建版本，就是一个库。当然，现代浏览器大多都已原生支持 ES 模块因此也可以使用 ES 模块构建版本 vue.esm-browser.js，它跟全局构建版本只是使用方法上不同，需要使用 script type="module"生命是 ESM。
因为我们没有使用构建工具，但是又要使用 vue3 的组合式 api 这时我们需要使用 setup() 选项，在 setup() 函数中返回的对象会暴露给模板和组件实例。其他的选项也可以通过组件实例来获取 setup() 暴露的属性。这也是为什么到了组件的内容之后我们都是使用构建工具创建项目。

# vue、模板语法

# vue3、响应式基础

# vue3、计算属性

# vue3、Class 和 Style 绑定

# vue3、条件渲染

# vue3、列表渲染

# vue3、事件处理

# vue3、v-model 双向数据绑定

# vue3、生命周期

# vue3、侦听器

# vue3、模板引用

# vue3、组件基础
