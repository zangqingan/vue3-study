# 一、通用列表组件封装

表格用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。
在饿了么 ui 中 el-table 元素中注入 data 对象数组后，在 el-table-column 中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。 可以使用 width 属性来定义列宽。所以封装也是很简单到只传入数据即可
常见列表中中数据的展示
tab 页
表格部分
分页
从上到下三部分，其中 tab 页使用插槽自定义传入，其中表格部分也可以划分为左右布局。
tableData 是列表数据，columnOptions 则是每一个 el-table-column 的数据，
tableData 和 columnOptions 都是一个数组对象，前者一般是接口请求回来的数据，而后者则是列表列名、居中方式等等配置信息数组。
也对整个 el-table 使用透传，对每个 el-table-column 也动态绑定循环的 item 对象。这样他就依然支持原来饿了么 ui 支持的属性和方法。同时只有传入插槽内容时每个 column 的内容才使用默认插槽分发(模板这里直接使用$slots 访问即可)，默认插槽里再定义对外暴露的插槽 slot，这样外部可以自定义 column 里的内容，同时通过插槽 prop 把当前行列索引信息向外暴露。

# 二、具体使用方法

```
<template>
  <div class="app-content">
    <SearchForm
      :form-data="queryParams"
      :options-data="searchOptions"
      @on-search="handleQuery"
      @on-reset="handleReset"
    />
    <div class="divide"></div>
    <CommonTable :table-data="tableData" :column-options="columnOptions" border>
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
</script>

<style lang="scss" scoped>
.divide {
  margin: 20px 0;
}
:deep(.el-table th.el-table__cell) {
  background-color: var(--el-fill-color-light);
}
</style>


```
