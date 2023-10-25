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

# 四、Element Plus 常用的图标集合使用。

Element Plus 提供了一套常用的图标集合，它跟饿了么组件一样也可以全局注册和按需自动导入两种方法。
安装：npm install @element-plus/icons-vue

## 4.1 全部导入注册成全局组件

在目录下新建一个 components/ElementUiIcon/index.js,如下暴露成 vue 插件，然后再入口文件 main.js 中引入注册插件即可完成全局注册。

```
//components/ElementUiIcon/index.js
import * as ElementPlusIcons from "@element-plus/icons-vue";

export default {
  install: (app) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
// main.js
import ElementPlusIcons from '@/components/ElementUiIcon/index.js'
app.use(ElementPlusIcons);全局注册图标

<!-- 使用 el-icon 为 SVG 图标提供属性 -->
<template>
  <div>
    <el-icon :size="size" :color="color">
      <Edit />
    </el-icon>
    <!-- 或者独立使用它，不从父级获取属性 -->
    <Edit />
  </div>
</template>


```

## 4.2 按需自动导入

和饿了么组件按需自动导入一样也需要使用 unplugin-icons
和 unplugin-auto-import 两个库就可以从 iconify 中自动导入任何图标集。
后一个已经安装所以只需要安装第一个即可。
安装：npm i unplugin-icons,然后在 vite 配置文件中进行配置即可。
配置文件保存重启后会自动安装 @iconify-json/ep 包。如果安装报错就手动安装
：npm install @iconify-json/ep

```
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 按需自动导入
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// 自动导入图标
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需自动导入
    Components({
      /* options */

      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
    }),
    AutoImport({
      /* options */
      // 要注册的全局导入:像vue、vue-router等都是插件预设自带的，写上接口自动导入API
      // 也就是自动导入 Vue 和vue-router 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],
      // 饿了么UI组件
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

// 使用：必须按照以下格式引入
<template>
    <!-- 自动导入必须遵循名称格式 {prefix：默认为i}-{collection：图标集合的名称}-{icon：图标名称}  -->
   <i-ep-expand />
    <el-icon><i-ep-expand /></el-icon>
</template>
```

# 五、实用工具库 lodash 学习

概述：Lodash 是一个一致性、模块化、高性能流行的 JavaScript 实用工具库，提供了许多常用的函数和工具，能够方便地处理集合、字符串、数值、函数等多种数据类型，减少编写重复代码的时间和精力。Lodash 的 API 设计与 ES6 的新特性相似，同时兼容了更早的浏览器版本。Lodash 支持模块化加载，可以通过 npm 或在浏览器中直接引入来使用。
简单说就是帮忙定义好了很多应对常见功能的函数。
比较常见的是：遍历 array、object 和 string。
安装：npm install lodash
引入：import \_ from 'lodash'
或者按需导入需要按个方法导入那个方法。
注意：原生的也能实现只是说这个封装好了方便使用。

## 5.1 数组相关
