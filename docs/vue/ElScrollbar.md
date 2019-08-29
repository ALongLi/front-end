# el-scrollbar 组件

在使用 Element-UI 的其他组件里发现，发现里面有滚动条这个组件，并且还不错，由于 Element-UI 官方文档并没有写关于 el-scrollbar 的文档（不知道什么原因），然后扒了下源码，看了下使用方式，仅供参考

## 简单使用

直接当容器就行了

```html
<!-- 这里有点问题，出现了横向滚定条，下面说 -->
<el-scrollbar style="height:100px">
  <div style="height:300px"></div>
</el-scrollbar>
```

## 全属性使用

```html
<el-scrollbar
  wrapClass="wrapClass"
  viewClass="viewClass"
  wrapStyle="color:'#fff';fontSize:'16px';"
  viewStyle="color:'#fff';fontSize:'16px';"
  :native="false"
  :noresize="true"
  tag="div"
  style="height:100px"
>
  <div style="height:300px"></div>
</el-scrollbar>
```

| 参数      | 说明                   | 类型    | 可选值 | 默认值 |
| :-------- | :--------------------- | :------ | :----- | :----- |
| wrapClass | 容器的样式名           | string  | -      | -      |
| wrapStyle | 容器的样式             | string  | -      | -      |
| viewClass | 视图的样式名           | string  | -      | -      |
| viewStyle | 视图的样式             | string  | -      | -      |
| native    | 是否使用原生滚动       | boolean | -      | false  |
| noresize  | 容器大小是否是不可变的 | boolean | -      | false  |
| tag       | 渲染容器的标签         | string  | -      | div    |

## 注意事项

- el-scrollbar 的父层要有固定高度,el-scrollbar 的高度要设成 100%
- 如果父元素没高度，el-scrollbar 要设置高度
- 如果出现横滚动条，请添加 css（.el-scrollbar\_\_wrap{overflow-x:hidden;}）
- native 和 noresize 几乎用不到，tag 和设置样式的倒是用得到
