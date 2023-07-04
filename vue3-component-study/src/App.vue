<script setup>
import { ref, provide } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
// 监听子组件发射事件
const data = ref({});
const handleSubmit = (payload) => {
  console.log("payload", payload);
  data.value = payload;
};

// 依赖注入
provide("app", "app组件依赖注入的值");
</script>

<template>
  <div>
    <h3>我是父组件的内容</h3>
    <div>
      我是子组件传递出来的数据：姓名---{{ data.name }}---年龄{{ data.age }}
    </div>
  </div>
  <hr />
  <HelloWorld
    msg="Vite + Vue"
    component-type="detail"
    flag="haha"
    @submit="handleSubmit"
  />
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
