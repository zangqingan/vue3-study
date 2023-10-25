<template>
  <div class="box">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-bind="$attrs"
      :layout="customLayout"
      :total="customTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup>
const props = defineProps({
  // 分页组件需要显示的内容，用逗号分隔，布局元素会依次显示。
  customLayout: {
    type: String,
    default: "total, prev, pager, next, sizes, jumper",
  },
  // 当前页由外部传入
  customPage: {
    type: Number,
    default: 1,
  },
  // 每一页显示的条数
  customLimitNum: {
    type: Number,
    default: 10,
  },
  // 分页总数
  customTotal: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits([
  "update:customPage",
  "update:customLimitNum",
  "page-change",
]);

// 双向绑定当前页
const currentPage = computed({
  get() {
    return props.customPage;
  },
  set(newValue) {
    emits("update:customPage", newValue);
  },
});

// 双向绑定页码大小即-每一页显示的条数
const pageSize = computed({
  get() {
    return props.customLimitNum;
  },
  set(newValue) {
    emits("update:customLimitNum", newValue);
  },
});

// 页码大小即每页显示条数改变
const handleSizeChange = (val) => {
  // 当前页码重置为第一页
  currentPage.value = 1;
  emits("page-change", { page: 1, size: val });
};

// 当前页改变
const handleCurrentChange = (val) => {
  // 把当前页码，一页显示数量抛出
  emits("page-change", { page: val, size: pageSize.value });
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
}
</style>
