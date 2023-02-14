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

使用vite 创建项目
vite是vue作者开发的一个新的构建工具，使用它就可以构建vite项目。
语法：npm create vite
语法：npm create vite@latest 
即可创建一个基于 Vite 的基础空项目，类似之前vuecli最基础的模板，只安装了vue。
如果需要用到 Router 、 Vuex 、 ESLint 等程序，都需要再单独安装和配置。

create-vue 是 Vue 官方推出的一个新脚手架，用以代替基于 Webpack 的 Vue CLI ，它也可以创建基于 Vite 的 Vue 基础模板。
语法：npm create vue@3