# elementui-plus 学习

# 一、安装及使用

安装：npm install element-plus --save
安装之后就可以在项目中使用 Element Plus，有两种用法：完整引入、按需导入。
无论是个人练习还是实际开发都推荐使用按需导入的方式使用 elementui 组件库。

## 1.1 完整导入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。
只需要在 vue 项目的入口文件引入注册即可。

```
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'// 引入
import 'element-plus/dist/index.css' 、// 引入全局样式
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus) // 注册
app.mount('#app')

```

## 1.2 按需导入

按需导入才是主流，按需导入需要使用额外的插件来帮忙导入要使用的组件。

1. 首先你需要安装 unplugin-vue-components 和 unplugin-auto-import 这两款插件

安装：npm install -D unplugin-vue-components unplugin-auto-import，
这两个插件不只是能配置 elementui 的按需导入，还可以配置 vue、vue-router 等的 API 自动按需导入。

2. 然后需要在你的 Vite 配置文件中配置如下代码

```
// vite.config.ts
import { defineConfig } from 'vite'

// 饿了么ui组件库按需自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})

```

3. vite 配置文件配置好了之后就可以直接在 vue 组件中使用而不需要引入了。

```
<script setup>
const handleClick1 = () => {
  ElMessage("我是饿了么UI的弹窗");
};
const handleClick2 = () => {
  ElMessage({
    message: "我是接收一个对象的成功状态的信息弹窗",
    type: "success",
  });
};
</script>

<template>
  <div>
    <h3>我是首页</h3>
    <el-button @click="handleClick1">我是 ElButton1</el-button>
    <el-button @click="handleClick2">我是 ElButton2</el-button>
  </div>
</template>

```

# 二、常用全局配置

由于 Element Plus 的默认语言为英语，如果你需要设置其它的语言就需要修改它的全局配置。
主要是 3 个
1：用于设置表单组件的默认尺寸的 size 属性。
2：用于设置弹出组件的层级的 zIndex 属性。
3：用于日期组件等的语言设置的 locale 属性。

根据导入方式的不同也分为两种方式设置

## 2.1 全局导入时的配置

在入口文件中配置

```
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文
import App from './App.vue'

const app = createApp(App)

// Element Plus 全局配置
app.use(ElementPlus, { size: 'small', zIndex: 3000,locale: zhCn, })

```

## 2.2 按需导入时的配置

按需导入时 Element Plus 还提供了一个 Vue 组件 ConfigProvider 用于全局配置如：国际化的设置。
它是在 App.vue 组件中使用。

```
<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale = ref(zhCn);
const zIndex = ref(2001);
const size = ref("default");
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>

```

# 三、常用组件二次封装

对于一个组件库来说可能某些组件时非常常用的，所以我们可以二次封装，方便使用。

## 3.1 Feedback 反馈组件

用来和用户交互的非常常用，比如弹窗提醒、加载动画、信息提示、信息通知等组件。
可以统一定义到一个对象里全局注入到 vue 应用实例上，这样在任意层级的组件都可以使用。

```
// 对饿了么ui常见反馈组件的二次封装，主要是信息提示类的
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
// options接收和官网一样的配置项
export default {
  // 默认状态的消息提示
  msg(options) {
    ElMessage.info(options);
  },
  // 成功状态的消息提示
  successMsg(options) {
    ElMessage.success(options);
  },
  // 警告状态的消息提示
  warningMsg(options) {
    ElMessage.warning(options);
  },
  // 错误状态的消息提示
  errorMsg(options) {
    ElMessage.error(options);
  },
};

```
