<script setup lang="ts">
import CommonAside from '@/components/Layout/CommonAside.vue'
import CommonHeader from '@/components/Layout/CommonHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <CommonAside />
      <el-container>
        <CommonHeader />
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
