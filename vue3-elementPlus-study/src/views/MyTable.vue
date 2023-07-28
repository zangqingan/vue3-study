<template>
  <div class="app-content">
    <SearchForm
      :form-data="queryParams"
      :options-data="searchOptions"
      @on-search="handleQuery"
      @on-reset="handleReset"
    />
    <div class="divide"></div>
    <CommonTable
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      :total="total"
      :table-data="tableData"
      :column-options="columnOptions"
      @page-change="handlePageChange"
      border
    >
      <template #gender="{ row }">
        <div>
          {{ row.gender === 0 ? "男" : "女" }}
        </div>
      </template>
      <template #action="{ row }">
        <el-button @click="handleEdit(row)"> 编辑 </el-button>
      </template>
    </CommonTable>
  </div>
</template>

<script setup>
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  title: undefined,
  dispatcherName: undefined,
  taskNo: undefined,
});
const total = ref(200);
const searchOptions = [
  { name: "文章名称", props: "title" },
  { name: "创建人", props: "dispatcherName" },
  { name: "任务单号", props: "taskNo" },
];
const handleQuery = () => {
  console.log("query", queryParams);
  // 请求接口
};

const handleReset = () => {
  console.log("query", queryParams);
};

const tableData = [
  {
    name: "张三",
    age: 23,
    gender: 0,
    address: "浙江省",
  },
  {
    name: "李四",
    age: 45,
    gender: 1,
    address: "贵州省",
  },
  {
    name: "王五",
    age: 28,
    gender: 1,
    address: "山西省",
  },
  {
    name: "马六",
    age: 13,
    gender: 0,
    address: "陕西省",
  },
  {
    name: "鬼脚七",
    age: 33,
    gender: 1,
    address: "广东省",
  },
];
const columnOptions = [
  { label: "序号", width: "80", align: "center", type: "index" },
  { label: "姓名", prop: "name", align: "left" },
  {
    label: "年龄",
    prop: "age",
    align: "left",
  },
  { label: "性别", prop: "gender", align: "left" },
  { label: "籍贯", prop: "address", align: "left" },
  {
    label: "操作",
    prop: "action",
    align: "left",
    width: "100",
    fixed: "right",
  },
];

// 编辑
const handleEdit = (row) => {
  console.log("row", row);
};

// 页码或当前页改变
const handlePageChange = (payload) => {
  console.log("payload", payload);
  console.log("queryParams", queryParams);
};
</script>

<style lang="scss" scoped>
.divide {
  margin: 20px 0;
}
:deep(.el-table th.el-table__cell) {
  background-color: var(--el-fill-color-light);
}
</style>
