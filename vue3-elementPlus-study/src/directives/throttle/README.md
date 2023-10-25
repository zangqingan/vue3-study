# 一、说明
节流策略（throttle）,顾名思义，可以减少一段时间内事件的触发频率
此指令应用在按钮上，当用户重复点击按钮，指定时间内只执行一次操作或请求。
模板中使用
属性名	说明	类型	默认值
time	时间间隔（毫秒）	数字	1000
# 二、使用

```
<el-button type="primary" v-throttle @click="testThrottle(100)">
    点击我（间隔1秒）！
</el-button>
    <el-button type="primary" v-throttle="{ time: 3000 }" click="testThrottle(200)">点击我(间隔3秒)！
</el-button >
```