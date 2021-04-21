(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{245:function(t,e,n){"use strict";n.r(e);var s=n(2),a=Object(s.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"electron-quick-start"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#electron-quick-start"}},[t._v("#")]),t._v(" electron-quick-start")]),t._v(" "),n("p",[t._v("Electron 可以让你使用纯 JavaScript 调用丰富的原生(操作系统) APIs 来创造桌面应用。 你可以把它看作一个 Node. js 的变体，它专注于桌面应用而不是 Web 服务器端。")]),t._v(" "),n("h2",{attrs:{id:"体验-electron"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#体验-electron"}},[t._v("#")]),t._v(" 体验 electron")]),t._v(" "),n("p",[t._v("官网有一个简单的仓库，我们直接下载下来尝试")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Clone this repository")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/electron/electron-quick-start\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Go into the repository")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" electron-quick-start\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Install dependencies")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Run the app")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" start\n")])])]),n("p",[t._v("结果很不幸的就没跑起来报了下面的错误")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node:20292"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" UnhandledPromiseRejectionWarning: Error: EPERM: operation not permitted, lstat "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'C:\\Users\\xxx\\AppData\\Local\\Temp"),n("span",{pre:!0,attrs:{class:"token entity",title:"\\e"}},[t._v("\\e")]),t._v("lectron-download-2VLgNf"),n("span",{pre:!0,attrs:{class:"token entity",title:"\\e"}},[t._v("\\e")]),t._v("lectron-v7.0.0-win32-x64.zip'")]),t._v("\n")])])]),n("p",[t._v("主要是这个包 electron-v7.0.0-win32-x64.zip 没下载下来，然后就去 google 找解决办法")]),t._v(" "),n("h2",{attrs:{id:"解决方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#解决方法"}},[t._v("#")]),t._v(" 解决方法")]),t._v(" "),n("p",[t._v("前往淘宝镜像\nhttps://npm.taobao.org/mirrors/electron/7.0.0/\n手动下载对应的包，我用 windows，所以下载 electron-v7.0.0-win32-x64.zip\n然后在 node_modules\\electron\\下创建 dist 文件夹。\n将下载的压缩包解压进刚刚创建的 dist。\n在 node_modules\\electron\\中创建 path.txt，内容为 electron.exe（对应自己的平台，不同平台不一样）")]),t._v(" "),n("p",[t._v("这每次都要这样干也太麻烦了，于是我就去把 package.json 里"),n("code",[t._v('"electron": "^7.0.0"')]),t._v("，改成了"),n("code",[t._v('"electron": "^6.0.0"')]),t._v("\n然后删除 node_modules 后重新安装发现可以了")]),t._v(" "),n("p",[t._v("至此一个桌面应用就跑起来了")])])}),[],!1,null,null,null);e.default=a.exports}}]);