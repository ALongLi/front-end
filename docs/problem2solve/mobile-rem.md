# 移动端适配

新开的移动端项目大都是使用的 vue 技术栈。但是还有部分前端小伙伴没有用 vue 项目做过移动端项目，移动端的一个问题就是适配各个分辨率，方法有很多，这里介绍下目前使用的方式。希望以后新做移动端项目的小伙伴能直接采用

## 适配方案

- flexible + rem 方案适配

  该方案是由 rem 以及 flexible 组成的。rem （font size of the root element）相对于根元素(即 html 元素)font-size 计算值的倍数,flexible 即 flexible.js, 手淘团队提供的一个为该方案屏幕适配而写的一个库,主要实现的功能就是，根据屏幕的宽度给 html 元素设置一个合适的 font-size 值。在工程化时代这些都不需要我们去手写和计算了。下文主要介绍这种方式

- vh/vw viewport 适配方案

  这个 vw 的方案，用的是 css 的新属性，vw 即（viewport width）可视窗口的宽度。100vw 可视窗口的总宽度，同样的属性还有 vh（viewport height）可视窗口的高度。 去年 viewport 单位属性已经得到了众多浏览器的支持。目前也可以在项目中使用，但是鉴于以前用的都是 rem 适配，这种方式就不做介绍，感兴趣的可以下去自己看下，也很简单。

## rem 适配实践

所用技术栈

- vue 全家桶
- amfe-flexible: 根据屏幕的宽度给 html 元素设置一个合适的 font-size 值
- postcss-pxtorem: 转换 px 为 rem 的插件

### vue-create 创建一个项目

这个就不多说了，根据提示一路向下就行了

### 安装适配依赖

```bash
npm i postcss-pxtorem -D
npm i amfe-flexible -S
```

### 使用

首先在 main.js 引入 amfe-flexible 设置 html 元素的 font-size

```js
// main.js
import "amfe-flexible";
```

随后在 vue-config.js 设置 pxtorem,自动将 px 转换为 rem

```js
const path = require("path");
// 引入pxtorem 库
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const FileManagerPlugin = require("filemanager-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@mock", resolve("mock"))
      .set("@assets", resolve("src/assets"));
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },
  // 增加css配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5, //设计稿宽度除以10 这个设计稿的宽度是375
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    open: true
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV == "production") {
      config.plugins.push(
        new FileManagerPlugin({
          onEnd: {
            archive: [{ source: "./dist", destination: "./dist/dist.zip" }]
          }
        })
      );
    }
  }
};
```

重新 npm run server 就可以看到项目的 px 自动转换为 rem 了
::: tip
如果不想对某些样式转换，例如某个标题字体大小，你想无论哪种手机都是 17px 那设置样式的时候 px 大写就行了，写成 PX。
:::
[代码地址](https://github.com/ALongLi/vant-rem.git)
