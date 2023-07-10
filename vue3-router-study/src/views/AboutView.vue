<template>
  <div class="about">
    <h1>动态路由</h1>
    <div>
      很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个
      User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router
      中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数 ：
    </div>
    <div>我是动态路由中的路径参数：{{ params }}</div>
    <hr />
    <div>下面是嵌套子路由</div>
    <router-link class="link" to="/about/zhangsan/child1"
      >嵌套路由1</router-link
    >
    <router-link class="link" to="/about/zhangsan/child2"
      >嵌套路由2</router-link
    >
    <router-view></router-view>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { useRoute, RouterView } from "vue-router";
const route = useRoute();
const params = route.params;
// 使用watch监听
watch(
  () => route.params,
  (val) => {
    console.log("val", val);
  },
  {
    immediate: true,
  }
);
// 使用导航守卫
</script>
<style></style>
