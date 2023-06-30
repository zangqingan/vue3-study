import { ref } from "https://unpkg.com/vue@3.3.4/dist/vue.esm-browser.prod.js";

export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子函数，当不使用构建工具时就要使用它
  // 在 setup() 函数中手动暴露大量的状态和方法显然非常繁琐。幸运的是，在vue3.2之后我们可以通过使用构建工具来简化该操作。
  // 当使用单文件组件（SFC）时，我们可以使用 setup语法糖 <script setup> 来大幅度地简化代码。
  setup() {
    const count = ref(0);
    const msg = ref("组件基础");
    console.log("子组件");
    return {
      msg,
      count,
    };
  },
  //
  template: `
  <h2>我是子组件中的标题：{{msg}}</h2>
  <button @click="count++">
    点击的是子组件的数据 {{ count }} 次.
  </button>`,
};
