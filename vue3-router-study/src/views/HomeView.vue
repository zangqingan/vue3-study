<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const handleProgram = () => {
  router.push({ path: "/program" });
};
const handleAbout = () => {
  router.push({
    name: "about",
    hash: "#hello",
    query: { plan: "private", name: "lisi" },
    params: { id: "lisi" },
  });
};
</script>

<template>
  <div class="home">
    <h1>我是主页</h1>
    <div>下面是按钮点击跳转路由</div>
    <button @click="handleProgram">跳转编程式导航页</button>
    <hr />
    <div>下面是跳转动态路由页面，并传递hash值、查询参数</div>
    <button @click="handleAbout">跳转动态路由页面</button>
  </div>
</template>
<style scoped></style>
