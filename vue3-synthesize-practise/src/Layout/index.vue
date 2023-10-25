<script setup lang="ts">
import CommonAside from './components/CommonAside.vue'
import CommonHeader from './components/CommonHeader.vue'
</script>

<template>
  <div class="common-layout h-100">
    <el-container class="h-100">
      <CommonAside />
      <div class="w-100 d-flex flex-column">
        <CommonHeader />
        <el-main>
          <router-view></router-view>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<style scoped></style>
