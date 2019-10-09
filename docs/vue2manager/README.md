# 介绍

[vue-manager](https://github.com/ALongLi/vue-manager.git) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，目前实现了动态路由，权限验证，它可以帮助你快速开始一个项目。

:::tip 建议
做这个项目的初心是整合数据分析平台中使用到的技术，定位是后台集成方案（任重而道远），适合当基础模板来进行业务开发。
:::

## 准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES6+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli3](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](http://mockjs.com/)进行模拟，所以需要这些基础知识。

## 开始安装

```bash
# 克隆项目
git clone https://github.com/ALongLi/vue-manager.git

# 进入项目目录
cd vue-manager

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm config set registry https://registry.npm.taobao.org

# 安装依赖
npm install

# 本地开发 启动项目 初次使用
npm run dev

# 后续重新跑服务 切记使用下面的
npm run serve

```

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
