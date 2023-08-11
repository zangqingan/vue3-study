# 一、说明
在元素上使用该指令，元素左边/右边会自动加上问号图标，图标附带tooltip。因为使用el-tooltip来开发的这个指令，所以可选指令可以根据el-tooltip的属性继续扩展。
可选指令值


属性名说明类型默认值message提示文字内容，为空不会显示tooltip图标string-position提示图标位置enum：left\rightlefteffecttooltip主题enum：light\darklightplacementtooptip出现的位置enum：top\top-start\top-end\bottom\bottom-start\bottom-end\left\left-start\left-end\right\right-start\right-endtop

# 二、使用

```
<div v-tooptip="{ message: '我是一个说明', effect: 'dark' }">我有一个说明文字</div>
<div v-tooptip="{ message: '我是一个说明', position: 'right' }">我有一个说明文字在右边</div>

```