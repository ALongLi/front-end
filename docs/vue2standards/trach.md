# 前端数据埋点

## 发送请求的方式

1. navigator.sendBeacon(url, data);
2. new Image()
3. ajax

## 可能用到的方式 api

document.visibilityState 监听浏览器

[ua-device](https://github.com/fex-team/ua-device)
[uuid-js](https://www.npmjs.com/package/uuid-js)

fingerprintJS2

<script> function login(name,pass) { var img = document.createElement("img"); img.src = "http://www.chenre.cn/test2.aspx?name="+encodeURI(name)+"&password="+encodeURI(pass); img.style.visibility = "hidden"; img.style.height = "1px"; img.style.width = "1px"; img.onerror = function() { //Finish Code Here alert("Err"); } img.onload = function() { //Finish Code Here alert("Ok") } document.body.appendChild(img); } </script> <body> 用户名：<input name="" id="name" type="text" /> 密码：<input name="" id="password" type="password" /> <input name="" value="登录" type="button" onclick="login(document.getElementById('name').value,document.getElementById('password').value)" /> </body>

## oa 问题

oa 中的应用按照哪种方式，类似微信小程序这种单独的应用

还是 oa 中的一个功能点，这两种是完全不同的实现方式。而且统计的内容也会有区别

比如 pv 页面访问量，启动次数

## 页面属性

```js
//document
domain = document.domain || ""; // 域名
url = document.URL || ""; // 当前 URL 地址
title = document.title || ""; // 当前页面标题
referrer = document.referrer || ""; // 上一个访问页面 URL 地址
// window
sh = window.screen.height || 0; // 屏幕高度
sw = window.screen.width || 0; // 屏幕宽度
// navigator
lang = navigator.language || ""; // 语言
ua = navigator.userAgent || ""; // ua  可提取设备属性

//performance

let timing = performance.timing,
  start = timing.navigationStart,
  firstPaintTime = 0,
  domRenderTime = 0,
  loadTime = 0;

firstPaintTime = timing.responseStart - start; //首屏时间
domRenderTime = timing.domContentLoadedEventEnd - start; //dom渲染完成时间
loadTime = timing.loadEventEnd - start; //页面onload时间

// click点击 web节点

id = document.getElementById() || ""; // 元素id
className = document.getElementByClassName() //元素class
... 元素属性

```
