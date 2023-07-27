<template>
  <div class="table-box">
    <!-- 头部可选切换栏 -->
    <slot name="tab"></slot>
    <!-- 表格展示区 -->
    <div class="table-content">
      <!-- 左右布局如果有的话 -->
      <slot name="aside"></slot>
      <el-table
        :data="tableData"
        v-bind="$attrs"
        style="width: 100%; height: 100%"
      >
        <el-table-column
          v-for="item in columnOptions"
          :key="item.prop"
          v-bind="item"
          :fixed="item.fixed"
        >
          <!-- 使用只有传入插槽内容时才使用默认插槽自定义内容 -->
          <template v-if="$slots[item.prop]" #default="{ row, column, $index }">
            <!-- 对外暴露插槽满足自定义需求 -->
            <!-- 同时通过插槽prop向外暴露当前行列下标信息 -->
            <slot :name="item.prop" v-bind="{ row, column, $index }"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div></div>
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default() {
      return [];
    },
  },
  columnOptions: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
});
</script>

<style lang="scss" scoped>
.table-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 500px;
  min-height: 500px;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 16px 20px;
}
.table-content {
  flex: 1;
  display: flex;
  min-height: 300px;
}
</style>
