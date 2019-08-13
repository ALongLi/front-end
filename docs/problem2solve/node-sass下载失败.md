# node-sass下载失败

  在现代开发过程中，css的书写方式也便了，scss无疑是很常用的，但是编译为css需要我们安装node-sass模块，这个包安装失败的几率几乎为100%。
因为npm 安装 node-sass 依赖时，会从 github.com 上下载 .node 文件。由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。
下面记录几种解决方式

## 安装时使用淘宝镜像

设置变量 sass_binary_site，指向淘宝镜像地址。示例

- 优点 ：可以拿到其返回时机，可以做交互
- 缺点 ：线上会存储大量的中间临时文件，可以用设置时限来优化。另外涉及用户隐私的问题，可以用token等验证机制实现。


```bash
  npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```


## 创建 .npmrc文件

在项目根目录创建.npmrc文件，然后在文件中写入下面代码


```bash
 sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

  //  随后卸载node-sass重新安装
  npm uninstall node-sass

  npm install node-sass
```


## 设置全局代理（个人推荐）

上面的方法解决了问题，但是下次再安装还要重新指定代理路径，直接设置全局代理一次配置，终身使用

```bash

  npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

```