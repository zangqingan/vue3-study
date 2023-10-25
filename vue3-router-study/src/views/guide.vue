<template>
  <div>
    <h1>我是导航守卫</h1>
    <hr />
    <div>下面是按钮点击跳转路由</div>
    <button @click="handleHome">跳转首页</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const handleHome = () => {
  console.log("back home");
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
