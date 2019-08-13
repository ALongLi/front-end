# 更改数组的length为何生效了

  在使用vue开发的时候，数组和对象的响应式会有限制，更改数组的length，或者设置一个对象新的属性都不会被检测到变更，也就不会生效，但是在工作中，这样写了却偶尔有效偶尔无效，这是怎么回事？

## vue的数据响应失效了

下面看一个例子：
```html
<template>
  <div>
    <h1>demo页面</h1>
    <!-- 显示 a b c -->
    {{list}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ["a", "b", "c"]
    };
  },
  mounted() {
    this.list[1] = "lal"; //不是响应式的，无效
  }
};
</script>

```
这确实没什么问题，官方文档也说的很清楚，数组的变更只支持以下写法：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

当然还有其他的方法这就不列举了。继续往下看，

## vue的数据不支持响应的为何却响应了
主要是看下面的一个例子：

```html
<template>
  <div>
    <h1>demo页面</h1>
    <!-- 显示 sss lal c -->
    {{list}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ["a", "b", "c"]
    };
  },
  mounted() {
    this.list.splice(0, 1, 'sss') //这个是响应式的
    this.list[1] = "lal"; //不是响应式的，但是页面竟然生效了 why?
  }
};
</script>
```

Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

第一行代码监听到数据变化，然后开启一个任务队列，所以上面的两行代码是在一个队列中， 而watcher，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

所以我们依然可以使用那些不被监听的方法去改变值，只要和能触发响应式的方法一起使用就行了。 切记不要单独使用！！！






