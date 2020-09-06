# xss 攻击原理以及防范

`XSS 即（Cross Site Scripting）`中文名称为：跨站脚本攻击。XSS 的重点不在于跨站点，而在于脚本的执行。那么 XSS 的原理是：
恶意攻击者在 web 页面中会插入一些恶意的 script 代码。当用户浏览该页面的时候，那么嵌入到 web 页面中 script 代码会执行，因此会达到恶意攻击用户的目的。

## `XSS` 攻击类型

XSS 有三类：反射型 XSS（也叫非持久型 XSS）、存储型 XSS（也叫持久型 XSS）和 DOM XSS。

### 反射型 XSS

发出请求时，XSS 代码出现在 URL 中，作为输入提交到服务端，服务端解析后响应，在响应内容中出现这段 XSS 代码，最后浏览器解析执行。这个过程就像一次反射，故称为反射型 XSS。

常见案例：`恶意链接`

攻击者通过恶意代码来窃取到用户数据并发送到攻击者的网站。攻击者会获取到比如 cookie 等信息，然后使用该信息来冒充合法用户

### 存储型 XSS

存储型 XSS 的原理是：主要是将恶意代码上传或存储到服务器中，下次只要受害者浏览包含此恶意代码的页面就会执行恶意代码。

因此存储型 XSS 的攻击步骤如下：

1. 攻击者利用表单将恶意代码提交后台服务器存储。
2. 当前端接收到响应后解析执行，那么其中的恶意代码也会被执行。
3. 恶意代码执行后，就能获取到用户数据，比如 cookie 等信息

### DOM-based 型 XSS

js 可以对页面 dom 节点进行动态的操作，比如插入、修改页面的内容。比如说客户端从 URL 中提取数据并且在本地执行、如果用户在客户端输入的数据包含了恶意的 js 脚本的话，但是这些脚本又没有做任何过滤处理的话，那么我们的应用程序就有可能受到 DOM-based XSS 的攻击

列入动态创建表单

## `XSS` 攻击防范

### HTML 编码

例如下面的代码

```HTML
<div>
  <script>
    alert(1)
  </script>
</div>
```

当浏览器解析的时候会执行 js 脚本。因此必要的时候我们要将 & < > " ' / 转义为实体字符

```js
// 使用正则表达式实现html编码
    function htmlEncodeByRegExp(str) {
      var s = '';
      if (str.length === 0) {
        return s;
      }
      return (s + str)
        .replace(/&/g, "&")
        .replace(/</g, "<")
        .replace(/>/g, ">")
        .replace(/ /g, " ")
        .replace(/\'/g, "&#39")
        .replace(/\"/g, """)
        .replace(/\//g, '&#x2F;');
    }
```

### Attribute 编码

和 HTML 编码一样，html 中的属性也要进行编码，比如

```js
function encodeForHTMLAttribute(str) {
  let encoded = "";
  for (let i = 0; i < str.length; i++) {
    let ch = (hex = str[i]);
    if (!/[A-Za-z0-9]/.test(str[i]) && str.charCodeAt(i) < 256) {
      hex = "&#x" + ch.charCodeAt(0).toString(16) + ";";
    }
    encoded += hex;
  }
  return encoded;
}
```

### javascript 编码

例如输入框输入 `<img onerror="alert(1)">`,

```js
let str = `<img onerror="alert(1)">`;
// 使用正则表达式实现html编码
function encodeForHTMLAttribute(str) {
  let encoded = "";
  for (let i = 0; i < str.length; i++) {
    let ch = (hex = str[i]);
    if (!/[A-Za-z0-9]/.test(str[i]) && str.charCodeAt(i) < 256) {
      hex = "&#x" + ch.charCodeAt(0).toString(16) + ";";
    }
    encoded += hex;
  }
  return encoded;
}
console.log(encodeForHTMLAttribute(str)); // "&#x3c;img&#x20;onerror&#x3d;&#x22;alert&#x28;1&#x29;&#x22;&#x3e;"
```

## 统一解决方案

[xss.js](https://jsxss.com/zh/index.html)，可以在网站查看详细内容

### 浏览器使用

```html
<script src="https://raw.github.com/leizongmin/js-xss/master/dist/xss.js"></script>
<script>
  // 官网是这样写的，好像报错
  // 使用函数名 filterXSS，用法一样
  var html = filterXSS('<script>alert("xss");</scr' + "ipt>");
  alert(html);

  var xssOptions = {
    whiteList: {
      // a: ["href", "title", "target"],
    },
  };
  var XSS = new filterXSS.FilterXSS(xssOptions);
  options.paramObj = XSS.process(options.paramObj); //options.paramObj代表请求此参数
</script>
```

## 推荐阅读书籍

[web 前端黑客技术揭秘](https://book.douban.com/subject/20451827/)

[白帽子讲 Web 安全](https://book.douban.com/subject/10546925/)

## 常见漏扫问题

1. Vulnerable Javascript library,/jquery.min.js

   jq 版本有漏洞，大家一般用的都是 1.11.1 这个版本，再往上基本就是 2.0 了，大版本更新会有兼容性问题
   解决方法更改源码

2. Password field submitted using GET method

   这个问题就比较奇葩了，就算你请求发的是 post 他也会报这个错
   解决方法`<form>` 更改为 `<form method="POST">`

3. HTML form without CSRF protection

   表单没有 csrf 防范，这个扫描出来的也没有明确说有这问题，让你自己人工确认是否有这个问题，在 `<form>` 表单里增加一个无用的 `input`
   `<input type="hidden" name="csrf_token"/>`

4. 登录密码明文传送

   先对密码进行 md5 加密，再通过密钥使用 sha512 加密
   统一解决方案在 `\\fileserver.xdja.com\信大捷安\部门文件\研发中心\行业后台\java培训资料\第二课时\testWeb` 里面，包含了前端和后端的加密逻辑

5. 登录界面验证码
   使用 canvas 生成一个验证码校验，目前我这有 jq 插件和 vue 组件
