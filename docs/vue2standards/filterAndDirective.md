# 过滤器和指令

## 过滤器的书写与注册

不要用下面的方式注册

```javascript
/**
 * 日期对比
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * @param value 对比的时间戳
 * @param fmt 超过一天的时间格式化参数默认为fmt="yyyy-MM-dd",可不传
 */
Vue.filter("dateDiff", function(value, fmt = "yyyy-MM-dd") {
  if (new Date(+value) === "Invalid Date") {
    return "";
  }
  let now = new Date().getTime(),
    diffValue = now - value,
    result = "",
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    _day = diffValue / day,
    _hour = diffValue / hour,
    _min = diffValue / minute;
  if (_day >= 1) result = formatDate(value, fmt);
  else if (_hour >= 1) result = parseInt(_hour) + "小时前";
  else if (_min >= 1) result = parseInt(_min) + "分钟前";
  else result = "刚刚";
  return result;
});

Vue.filter("formatDate", function(value, fmt = "yyyy-MM-dd") {
  ...
  return result;
});
```

这种方式繁琐且代码复用性低，
过滤器的书写实现一律放在 filters/index.js 中，过滤器的本质是一个功能函数，有可能不仅仅用于过滤器，而放在 index.js 中作为一个函数就可以随时引入使用

```javascript
const formatterNumber = number => {
  let formatterNum = 0;
  if (number > 99999999) {
    formatterNum = (number / 100000000).toFixed(2) + "亿";
  } else if (number > 9999) {
    formatterNum = (number / 10000).toFixed(2) + "万";
  } else {
    formatterNum = parseInt(number);
  }
  return formatterNum;
};

const number2nodes = number => {
  let numberArr = number.toString().split("");
  let numberNodes = "";
  numberArr.forEach(function(item) {
    numberNodes = numberNodes + "<span class='num'>" + item + "</span>";
  });
  return numberNodes;
};

export { formatterNumber, number2nodes };
```

```javascript
import * as filters from "./filters"; // global filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]); //注册filters
});
```

这样写的好处不仅可以在其他地方使用，在你需要新的过滤器时只需要在 filters/index.js 中实现逻辑即可，以上代码会帮你自动注册。

## 指令的书写与注册

directive 的书写相对过滤器稍微复杂些，因为一个 directive 一般是一个单独的 js 文件，directive 的文件存放位置和 filter 一样，

```javascript
import elDragDialog from "./directives/drag.js;
import clickOutside from "./directives/clickoutside.js;

 Vue.directive(elDragDialog, elDragDialog);
 Vue.directive(clickOutside, clickOutside);
```

这种方式也相对繁琐，经过个人的学习与实验发现解除 webpack 的 require.context 可以很巧妙的实现指令的注册，这个方法有 3 个参数：

- 要搜索的文件夹目录
- 是否还应该搜索它的子目录，
- 以及一个匹配文件的正则表达式。

所以我们可以用下面的方法注册指令：

```javascript
const context = require.context("./directives", true, /^((?!demo\.js).)+\.js$/);
try {
  context.keys().forEach(path => {
    let res = context(path);
    // 导出指令对象，并且存在指令名称，全局注册，否则不注册，自行引入注册
    if (res.default.name) {
      Vue.directive(res.default.name, res.default);
    }
  });
} catch (e) {
  // console.log(e);
}
```

这种方法需要你在写指令的时候给个 name 来确保指令注册成功，下面是一个简单的指令：

```js
export default {
  // 指令是一个方法  指令有自己的生命周期
  // 上面这种方法注册一定要确保有一个name属性作为指令的名称
  name: "clickOutside",
  inserted(el, bindings) {
    // el真实的dom元素
    el.listener = function listener(e) {
      if (e.target === el || el.contains(e.target)) {
        return;
      }
      bindings.value(); // close事件
    };
    document.addEventListener("click", el.listener);
  },
  unbind(el) {
    document.removeEventListener("click", el.listener);
  }
};
```

组件的注册可以与指令的注册方法一样
