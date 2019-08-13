# element样式更改失效

  在使用vue开发的时候，后台系统大都使用element ui ，书写组件的时候都会给style加上scope，该组件样式只能够在本组件才能执行，就不会影响全局样式了，但是更改Element组件样式的时候就不起作用了，去掉scope就生效，但是就变成全局样式了。

## 更改样式单独写在全局样式里

直接写在全局样式里，但是要给样式加个限定class， .customClassName，这个是我以前的写法

```css
/* steps-box是限定的父元素className */
.steps-box .el-steps .iconfont {
  font-size: 26px;
}
```


## 使用深度作用选择器

.vue中的vue-loader提供了一个新写法能够直接更改样式，如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：

```css
 <style scoped>
    /* steps-box是限定的父元素className */
    .steps-box >>> .el-steps .iconfont {
        font-size: 26px;
    }
</style>
```
如果使用了scss语法，则无法正确解析 >>>。这种情况下你可以使用 /deep/。

```css
<style lang="scss" scoped>
    /* steps-box是限定的父元素className */
    .steps-box {
        /deep/ .el-steps .iconfont {
            font-size: 26px;
        }
    }
</style>
```
