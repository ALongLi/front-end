# 响应式数据

由于 vue 的原理限制，数组和对象的响应式会有限制，更改数组的 length，或者设置一个对象新的属性都不会被检测到变更，也就不会生效，但是在工作中，这样写了却偶尔有效偶尔无效，不注意甚至会导致一些诡异的 bug。

## 时灵时不灵的响应式

下面是一个简单的例子

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

大家都知道这种方式不会触发视图更新。但是如果你有其他触发视图更新的操作。

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
      this.list.splice(0, 1, "sss"); //这个是响应式的
      this.list[1] = "lal"; //不是响应式的，但是页面竟然生效了 why?
    }
  };
</script>
```

这个时候就会发现视图更新了，但是 b 变成了 lal。

## Vue.\$set

所以为了避免偶尔出现诡异的 bug，对于新增的对象属性，以及数组的一些操作，务必按照官网给出的写法
`Vue.set( target, propertyName/index, value )`

- {Object | Array} target
- {string | number} propertyName/index
- {any} value
  例如：

```js
// 不要使用这种方式
this.myObject.newProperty = "hi";
// 使用这种
this.set(this.myObject, newProperty, "hi");
```
