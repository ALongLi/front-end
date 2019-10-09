# 介绍

这个文档的内容主要是介绍 vue-cli 创建项目的一些建议以及规范

:::tip
以下内容仅为个人建议。
:::

## 目录结构

```tree
├─.browserslistrc ---------- // 浏览器配置
├─.eslintrc.js ------------- // eslint配置
├─.gitignore --------------- // git忽略文件
├─babel.config.js ---------- // babel 插件配置
├─mock --------------------- // 数据mock
├─package-lock.json
├─package.json
├─postcss.config.js -------- // postcss 配置
├─public
│ ├─favicon.ico
│ ├─images
│ └─index.html
├─src
│ ├─App.vue
│ ├─assets
│ │ ├─css
│ │ │ ├─main.scss
│ │ │ ├─mixin.scss
│ │ │ ├─transition.scss
│ │ │ ├─_global.scss
│ │ │ └─_variable.scss
│ │ ├─font
│ │ ├─img
│ │ ├─json
│ │ └─logo.png
│ ├─components
│ │ └─HelloWorld.vue
│ ├─fetch
│ │ ├─excelDownload.js ----- // excel文件下载函数
│ │ ├─index.js ------------- // api接口管理入口
│ │ └─instance.js ---------- // axios实例化
│ ├─filters
│ │ └─index.js ------------- // 全局过滤器
│ ├─lib -------------------- // 第三方插件库
│ │ ├─eoa.js
│ │ └─initEcharts.js ------- // 初始化echarts配置
│ ├─main.js ---------------- // app入口文件
│ ├─router.js
│ ├─skeleton --------------- // 骨架屏
│ │ ├─entry-skeleton.js ---- // 骨架屏入口
│ │ ├─Skeleton1.vue
│ │ └─Skeleton2.vue
│ ├─store.js
│ ├─utils ------------------ // 工具函数
│ │ └─dom.js --------------- // dom操作
│ └─views
│   ├─demo.vue
│   └─Home.vue
└─vue.config.js
```

这里是一个小型项目的目录结构，中大型可以在此基础上扩展，比如 router，store 等都可以单独一个文件夹，里面放上相应的配置

## 项目地址

```bash
# 克隆项目
git clone git@gitlab.idc.safecenter.cn:lal/jsdata-mobile.git

# 进入项目目录
cd jsdata-mobile

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm config set registry https://registry.npm.taobao.org

# 安装依赖
npm install

# 跑服务
npm run serve

```

可以通过以上操作查看这个项目
::: tip
强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug ，我已经很久没用过 cnpm 了，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。

Windows 用户若安装不成功（大家基本都是），很大概率是`node-sass`安装失败，[解决方案](http://192.168.9.116:8090/pages/viewpage.action?pageId=9424363)。

:::

## 其他

在公司 wiki 处分享的有项目中用到的一些技术

- [node-sass 安装失败解决方法](http://192.168.9.116:8090/pages/viewpage.action?pageId=9424363)
- [Element 组件样式更改无效解决方案](http://192.168.9.116:8090/pages/viewpage.action?pageId=16843360)
- [el-scrollbar 滚动条组件](http://192.168.9.116:8090/pages/viewpage.action?pageId=16843455)
- [前端文件下载](http://192.168.9.116:8090/pages/viewpage.action?pageId=9421936)
- [给路由跳转加上进度条(vue)](http://192.168.9.116:8090/pages/viewpage.action?pageId=16844368)
