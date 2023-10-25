# 一、说明
此指令用于复制文本到剪贴板中
可选指令值
属性名	说明	类型	默认值
position	相对目标元素的位置，可选'out'	string
# 二、使用

```
<div v-copy>222</div>
<div><el-tag v-copy="{ position: 'out' }">343434</el-tag></div>

```