<template>
  <div>
    <h2>lodash工具库使用</h2>
    <div>
      <div>
        <h3>1、_.compact(array)方法</h3>
        <div>
          将传入数组中的 falsy 值(假值)去除(即
          false、null、0、""、undefined、NaN)返回一个过滤掉假值的新数组。
          在使用数组的遍历方法前除去比较常用。
        </div>
        <h3>2、_.findIndex(array, [predicate=_.identity], [fromIndex=0])</h3>
        <div>
          这个方法和原生的findIndex效果是一样的,只不过使用上更方便。它也是返回符合指定条件的元素的索引值(index)，如果没有找到则返回
          -1。关键是它可以传递的第二第三个参数。<br />
          第二个参数可以是：一个数组、一个对象、一个函数、一个字符串。<br />
          数组时本质是调用:_.matchesProperty()方法 <br />
          对象时本质是调用:_.matches()方法 <br />
          函数则会在每一次迭代时调用执行一次。<br />
          字符串时本质是调用:_.property()方法<br />
          第三个参数则是指定开始查询的起始位置。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";

const hasFalsyValue = [0, 1, false, 2, "", 3];
const noFalsyValue = _.compact(hasFalsyValue);
const hasFalsyData = [
  { name: "zhangsan", age: 24, gender: "male" },
  0,
  { name: "lisi", age: 26, gender: "female" },
  undefined,
  "",
  { name: "wangwu", age: 29, gender: "male" },
  { name: "maliu", age: 34, gender: "female" },
];
const noFalsyData = _.compact(hasFalsyData);
console.log("noFalsyValue", noFalsyValue);
console.log("noFalsyData", noFalsyData);

const arr = [
  { name: "Alice", age: 18 },
  { name: "Bob", age: 20 },
  { name: "second", age: 18 },
  { name: "Charlie", age: 22 },
];
const currentAge = 18;
const resultIndex = _.findIndex(arr, { age: currentAge }, 1);
console.log("resultIndex", resultIndex);
console.log("arr[resultIndex]", arr[resultIndex]);
</script>

<style lang="scss" scoped></style>
