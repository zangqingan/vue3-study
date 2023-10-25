# 一、说明
此指令限制用户只能输入数字，可以设置小数位数限制
# 二、使用
可选指令值
属性名	说明	类型	默认值
decimal	小数位数	数字	2
```
<el-input v-model="inputValue1" v-inputNumber />
<el-input v-model="inputValue2" v-inputNumber="{ decimal: 3 }" />
```