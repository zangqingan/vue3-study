# Vue 3 setup语法糖学习

# 一、单文件组件概述
在vue2时就知道一个 Vue 单文件组件 (SFC)，通常使用 *.vue 作为文件扩展名，它是一种使用了类似 HTML 语法的自定义文件格式，用于定义 Vue 组件。一个 Vue 单文件组件在语法上是兼容 HTML 的。
每一个 *.vue 文件都由三种顶层语言块构成：
template:页面的骨架也就是html结构,每个 .vue文件最多一个顶层的template块,内部可以嵌套,语块包裹的内容将会被提取、传递给@vue/compiler-dom，预编译为 JavaScript 渲染函数，并附在导出的组件上作为其 render 选项。最终通过render函数渲染成虚拟dom。
script:书写vue3逻辑代码也就是js代码的地方,这里书写的脚本代码将作为es模块执行。默认导出的是vue的组件选项对象。
script setup: vue3的语法糖形式它是被预处理为组件的setup()函数,每个 .vue文件最多有一个。
style:template块中html结构对应的css样式, 每个 .vue文件可以有多个,添加 scoped 属性时只在当前组件生效。
以及一些其他的自定义块。
三个块都可以使用lang 属性可以声明预想的预处理器语言
template lang="pug"
script lang="ts"
style lang="scss"
注意他们的处理都需要依赖工具链

# 二、setup语法糖
我们知道在vue3.0时是使用setup()选项钩子替代了创建时的两个生命钩子,组合式api要在它里面书写才起作用。
但是依然是比较繁琐的,所以在vue3.2版本之后,利用构建工具形成了setup语法糖的开发格式。
script setup 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。当同时使用 SFC 与组合式 API 时该语法是默认推荐。相比于普通的 script 语法，它具有更多优势：
  更少的样板内容，更简洁的代码。
  能够使用纯 TypeScript 声明 props 和自定义事件。
  更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。
  更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。
具体使用如下:
要启用该语法，需要在 <script> 代码块上添加 setup attribute,里面的代码就会被编译成组件 setup() 函数的内容。这样每次组件实例被创建时就会执行一次。


