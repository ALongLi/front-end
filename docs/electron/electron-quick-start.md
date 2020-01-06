## electron-quick-start

Electron 可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用。 你可以把它看作一个 Node. js 的变体，它专注于桌面应用而不是 Web 服务器端。

### 体验 electron

官网有一个简单的仓库，我们直接下载下来尝试

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

结果很不幸的就没跑起来报了下面的错误

```bash
(node:20292) UnhandledPromiseRejectionWarning: Error: EPERM: operation not permitted, lstat 'C:\Users\xxx\AppData\Local\Temp\electron-download-2VLgNf\electron-v7.0.0-win32-x64.zip'
```

主要是这个包 electron-v7.0.0-win32-x64.zip 没下载下来，然后就去 google 找解决办法

### 解决方法

前往淘宝镜像
https://npm.taobao.org/mirrors/electron/7.0.0/
手动下载对应的包，我用 windows，所以下载 electron-v7.0.0-win32-x64.zip
然后在 node_modules\electron\下创建 dist 文件夹。
将下载的压缩包解压进刚刚创建的 dist。
在 node_modules\electron\中创建 path.txt，内容为 electron.exe（对应自己的平台，不同平台不一样）

这每次都要这样干也太麻烦了，于是我就去把 package.json 里`"electron": "^7.0.0"`，改成了`"electron": "^6.0.0"`
然后删除 node_modules 后重新安装发现可以了

至此一个桌面应用就跑起来了
