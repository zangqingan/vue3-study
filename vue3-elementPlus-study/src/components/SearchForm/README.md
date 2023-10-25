# 一、搜索栏组件封装说明

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单用来收集、验证和提交数据。
在饿了么里每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。
所有每一项就是一个 el-form-item，要循环的就是它。

newFormData：根据父组件 formData 传入的一个可读写计算属性，它也是最终要提交的表单数据。
optionsData：父组件传入的表单配置对象，每个对象的 props 字段名要和 formData 对象一致，不然无法找到进而导致无法双向绑定数据。
type 是 select 下拉框时要传入自定义下拉选项数组 customDict，它每一项是{label:'名字',value:'zhangsan'}的形式。
type 是 treeSelect 或 cascader (下拉树或者级联选择器时)，需要传入 customOptions 选项，它是一个树结构数据。

日期组件类型的每一个类型是一个对应的 type，它们都可以传入一个 disabledDateFn 用来禁用指定日期不可选的函数。
使用 format 指定输入框中展示的格式。 使用 value-format 指定绑定值的格式也就是传给后端的格式。

optionsData 中每个对象的 type 字段用来区分不同的表单项，默认不传就是普通文本输入框。
具体有以下类型：
| type | 描述 |
| ----------- | ----------- |
| 'input'/ 缺省 | 普通文本输入框 |
| 'select' | 下拉框 |
| 'treeSelect' | 下拉树 |
| 'cascader' | 级联选择器 |
| 'date' | 选择某一天 |
| 'week' | 选择某一周 |
| 'month' | 月份 |
| 'year' | 年份 |
| 'daterange' | 日期范围 |
| 'monthrange' | 月份范围 |

# 二、具体使用方法

全局搜索组件双向绑定了透传$attrs 所以它接收和原来 el-form 一样的属性和方法。

```
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

```
