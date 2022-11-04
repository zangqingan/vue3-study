# 一、Vite概述
Vite（法语意为 "快速的"，发音 /vit/，发音同 "veet"）是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：
    一个开发服务器，它基于 原生 ES 模块 提供了丰富的内建功能，如速度快到惊人的模块热更新（HMR）。
    一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。
Vite 意在提供开箱即用的配置，同时它的 插件 API 和 JavaScript API 带来了高度的可扩展性，并有完整的类型支持。

# 二、安装使用
$ npm create vite@latest，然后按照提示操作即可！

# 三、项目目录结构
vite构建的vue项目和vuecli构建的项目，目录结构整体上区别不到
项目名
--public 静态文件
--src  源码
  --assets 全局组件相关的静态资源
  --components 全局组件
  --App.vue 根组件
  --main.ts vue实例初始化挂载
  --style.css 默认样式
  --vite-env.d.ts 开发环境声明文件
--index.html 项目入口文件
--package.json 包管理文件
--tsconfig.json ts配置文件
--vite.config.ts vite配置文件

# 四、vite.config.ts配置文件
当以命令行方式运行 vite 时也就是，Vite 会自动解析 项目根目录 下名为 vite.config.js 的文件。它和vuecli类似也是导出一个配置对象。
使用defineConfig()工具函数
export default defineConfig({
  //配置
  
  
})

