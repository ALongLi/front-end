# 防抖和节流

## 防抖

函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。下面是 debounce 的实现代码

```javascript
const debounce = (fn, ms = 250) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
```

举个例子：

```js
window.addEventListener("resize", debounce(() => console.log("111"), 300));
```

我们可以看到，当持续触发 resize 事件时，事件处理函数只在停止操作 300 毫秒之后才会调用一次，也就是说在持续触发 resize 事件的过程中，事件处理函数一直没有执行。
应用场景：

- 表单提交
- input 实时搜索
- resize，scroll 等高频操作

## 节流

函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点，最好是如我们心意按照一定规律在某个时间间隔内一滴一滴的往下滴。

```javascript
const throttle = (fn, wait = 250) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
```

举个例子：

```js
window.addEventListener("resize", throttle(() => console.log("111"), 1000));
```

比较适合用在无限滚动，需要立即执行一次操作的场景
