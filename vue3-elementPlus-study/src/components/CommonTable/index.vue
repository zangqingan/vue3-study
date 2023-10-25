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
    <div>
      <Pagination
        v-model:custom-page="pageComputed"
        v-model:custom-limit-num="limitComputed"
        :custom-total="total"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 表格数据
  tableData: {
    type: Array,
    default() {
      return [];
    },
  },
  // 表格列配置
  columnOptions: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  // 当前页
  page: {
    type: Number,
    default: 1,
  },
  // 页码大小
  limit: {
    type: Number,
    default: 10,
  },
  // 页码总数
  total: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["update:page", "update:limit", "pageChange"]);
// 双向绑定page
const pageComputed = computed({
  get() {
    return props.page;
  },
  set(newValue) {
    emits("update:page", newValue);
  },
});

// 双向绑定limit
const limitComputed = computed({
  get() {
    return props.limit;
  },
  set(newValue) {
    emits("update:limit", newValue);
  },
});

// 页码或当前页改变
const handlePageChange = (payload) => {
  emits("pageChange", { ...payload });
};
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
