<template>
  <div>
    111
    <el-button @click="hanldeClick">按钮</el-button>
    <SearchForm
      :form-data="queryParams"
      :options-data="searchOptions"
      @on-search="handleQuery"
      @on-reset="handleReset"
    />
    <CommonTable />
    <CommonTable />
    <Pagination />
  </div>
</template>

<script setup>
const modal = inject("modal");
const hanldeClick = () => {
  modal.successMsg("我成功批量注入了依赖");
};

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  title: undefined,
  dispatcherName: undefined,
  taskNo: undefined,
  gender: undefined,
  deptName: undefined,
  address: undefined,
  happenedTime: undefined,
  happenedWeek: undefined,
  happenedMonth: undefined,
  happenedYear: undefined,
  happenedDateRange: undefined,
  happenedMonthRange: undefined,
});

const data = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
const searchOptions = [
  { name: "文章名称", props: "title" },
  { name: "创建人", props: "dispatcherName" },
  { name: "任务单号", props: "taskNo" },
  {
    name: "性别",
    props: "gender",
    type: "select",
    customDict: [
      {
        label: "男",
        value: "male",
      },
      {
        label: "女",
        value: "female",
      },
    ],
  },
  {
    name: "部门",
    props: "deptName",
    type: "treeSelect",
    customOptions: data,
  },
  {
    name: "地址",
    props: "address",
    type: "cascader",
    customOptions: data,
  },
  {
    name: "发生日期",
    props: "happenedTime",
    type: "date",
    disabledDateFn: (time) => {
      return time.getTime() > Date.now();
    },
  },
  {
    name: "发生周数",
    props: "happenedWeek",
    type: "week",
    disabledDateFn: (time) => {
      return time.getTime() > Date.now();
    },
  },
  {
    name: "发生月份",
    props: "happenedMonth",
    type: "month",
    disabledDateFn: (time) => {
      return time.getTime() > Date.now();
    },
  },
  {
    name: "发生年份",
    props: "happenedYear",
    type: "year",
    disabledDateFn: (time) => {
      return time.getTime() > Date.now();
    },
  },
  {
    name: "日期范围",
    props: "happenedDateRange",
    type: "daterange",
    disabledDateFn: (time) => {
      return time.getTime() > Date.now();
    },
  },
  {
    name: "月份范围",
    props: "happenedMonthRange",
    type: "monthrange",
    disabledDateFn: (time) => {
      return time.getTime() > Date.now();
    },
  },
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
