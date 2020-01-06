# 异步回调

## callBack

未来执行的函数通常也叫 callback。使用 callback 的异步模式，解决了阻塞的问题，但是也带来了一些其他问题。主要表现为回调地狱

```js
const fs = require("fs");
// 下次接口需要上次的结果
fs.readFile("./1.txt", "utf8", function(err, data) {
  console.log(data);
  fs.readFile(data, "utf8", function(err, data) {
    console.log(data);
    fs.readFile(data, "utf8", function(err, data) {
      console.log(data);
    });
  });
});
// 展示的内容需要调两个不同接口
fs.readFile("./template.txt", "utf8", function(err, template) {
  fs.readFile("./data.txt", "utf8", function(err, data) {
    console.log(template + " " + data);
  });
});
```

## promise

callback 虽然帮我们解决了异步问题，但是它仍有一些不足。首先：代码嵌套多，结构复杂难以阅读和维护；其次：就是无法合并两个或多个异步的结果。
Promise 的引入就解决了以上这些问题

```js
const fs = require("fs");
function read(url) {
  return new Promise(function(resolve, reject) {
    fs.readFile(url, "utf8", function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

read("./1.txt")
  .then(data => {
    console.log("promisify" + data);
    return data;
  })
  .then(data => {
    return read(data).then(data => {
      console.log("data取的数据" + data);
      return data + "sdsd";
    });
  })
  .then(data => {
    console.log("最后的data" + data);
  });
```

## async await

async+await 就是目前为至，异步的最佳解决方案，它同时解决了

- 回调地狱
- 并发执行异步，在同一时刻同步返回结果 Promise.all
- 返回值的问题
- 可以实现代码的 try/catch;示例代码：

```js
const fs = require("fs");
function read(url) {
  return new Promise(function(resolve, reject) {
    fs.readFile(url, "utf8", function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}
async function readAllFile() {
  //await后面必须跟一个promise,
  let a = await read("./1.txt");
  console.log(a);
  let b = await read("./2.txt");
  console.log(b);
  let c = await read("./3.txt");
  console.log(c);
  return "ok";
}

readAllFile().then(data => {
  console.log(data);
});
```

```js
function who() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("🤡");
    }, 200);
  });
}

function what() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("lurks");
    }, 300);
  });
}

function where() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("in the shadows");
    }, 500);
  });
}

async function msg() {
  const a = await who();
  const b = await what();
  const c = await where();

  console.log(`${a} ${b} ${c}`);
}

msg();
```

```js
async function msg() {
  const [a, b, c] = await Promise.all([who(), what(), where()]);

  console.log(`${a} ${b} ${c}`);
}

msg();
```
