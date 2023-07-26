<template>
  <div>
    myTable-study

    <SearchForm
      :form-data="queryParams"
      :options-data="searchOptions"
      @on-search="handleQuery"
      @on-reset="handleReset"
    />
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
</script>

<style lang="scss" scoped></style>
