# css 样式

vue 为我们提供了 scoped 来解决 css 污染的问题。 它相当于给 css 加了一个作用域的概念。

## css scoped

```html
<style scoped>
  .example {
    color: red;
  }
</style>

<template>
  <div class="example">hi</div>
</template>
```

转换结果：

```html
<style>
  .example[data-v-f3f3eg9] {
    color: red;
  }
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

而一般我们都使用 css 预处理器来写 css，这里推荐使用 scss 来

## scss

使用 scss 的文件目录如下

```tree
└─src
  ├─App.vue
  └─assets
    ├─css
    │ ├─mixin.scss --------- // 全局mixin
    │ ├─transition.scss ---- // transition 动画
    │ ├─_global.scss ------- // 全局通用样式
    │ └─_variable.scss ----- // 全局变量
    └─font
```

然后在 global.scss 中引入相应的 css 样式

```scss
@import "variable.scss";
@import "mixin.scss";
@import "./transition.scss";
// 下面是全局通用样式
body {
  height: 100%;
  margin: 0;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft
      YaHei, Arial, sans-serif;
  text-rendering: optimizeLegibility;
}
...
```

## 深度作用选择器

这个选择器是 [vue-loader](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%B9%E5%85%83%E7%B4%A0) 提供的,作用更深，可以影响子组件

```html
<style scoped>
  .a >>> .b {
    /* ... */
  }
</style>
```

上述代码将会编译成：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作

## css 顺序

对于 css 的书写，最好是遵循一定的规则，下面是推荐的书写顺序

```json
//变量 =>mixin =>位置 =>flex => 大小 =>文字 => 背景属性 => 动画等其他属性
  "sort-order": [
    "$variable",
    "$include",
    "$extend",
    "$import",

    "content",
    // 位置
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "z-index",
    "float",
    "clear",

    "display",
    "flex-align",
    "flex-flow",
    "flex-direction",
    "flex-order",
    "flex-pack",
    "flex-wrap",
    "justify-content",
    "align-content",
    "align-items",
    "align-self",
    "order",
    "flex",
    "flex-basis",
    "flex-grow",
    "flex-shrink",
    // 大小
    "box-sizing",
    "overflow",
    "overflow-x",
    "overflow-y",
    "width",
    "min-width",
    "max-width",
    "height",
    "min-height",
    "max-height",

    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "margin-collapse",
    "margin-top-collapse",
    "margin-right-collapse",
    "margin-bottom-collapse",
    "margin-left-collapse",

    "clip",
    "clip-path",

    "color",
    "counter-reset",
    "counter-increment",
    "direction",
    // 文字
    "font",
    "font-family",
    "font-feature-settings",
    "font-size",
    "font-kerning",
    "font-smoothing",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "hanging-punctuation",
    "hyphens",
    "quotes",
    "line-height",
    "letter-spacing",
    "text-align",
    "text-decoration",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-overflow",
    "text-overflow-ellipsis",
    "text-overflow-mode",
    "text-rendering",
    "text-size-adjust",
    "text-shadow",
    "text-transform",
    "word-break",
    "word-spacing",
    "word-wrap",
    "word-break",
    "tab-size",
    "vertical-align",
    "white-space",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "appearance",
    // 背景
    "background",
    "background-color",
    "background-attachment",
    "background-clip",
    "background-image",
    "background-repeat",
    "background-repeat-x",
    "background-repeat-y",
    "background-position",
    "background-position-x",
    "background-position-y",
    "background-origin",
    "background-size",
    "box-decoration-break",
    "box-shadow",

    "border",
    "border-collapse",
    "border-top",
    "border-right",
    "border-bottom",
    "border-left",
    "border-color",
    "border-image",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "border-spacing",
    "border-style",
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style",
    "border-width",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
    "border-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
    "border-top-left-radius",
    "border-radius-topright",
    "border-radius-bottomright",
    "border-radius-bottomleft",
    "border-radius-topleft",
    "outline",
    "outline-width",
    "outline-style",
    "outline-color",
    "outline-offset",
    "perspective",
    "perspective-origin",
    "table-layout",
    // 其他
    "transform",
    "transform-origin",
    "transform-style",
    "animation",
    "animation-delay",
    "animation-duration",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "animation-fill-mode",
    "backface-visibility",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "will-change",

    "cursor",
    "opacity",
    "filter",
    "visibility",
    "zoom",
    "marks",
    "page-break",
    "page-break-before",
    "page-break-inside",
    "page-break-after",
    "pointer-events",
    "resize",
    "unicode-bidi",
    "user-select",
    "scrollbar",
    "widows"
  ]
```
