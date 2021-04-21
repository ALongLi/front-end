(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{210:function(s,t,a){s.exports=a.p+"assets/img/electron-vue-start.2d9ac1cb.png"},211:function(s,t,a){s.exports=a.p+"assets/img/electron-install.1f27f590.gif"},240:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"electron-vue-集成"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#electron-vue-集成"}},[s._v("#")]),s._v(" Electron vue 集成")]),s._v(" "),n("p",[s._v("Electron = Node.js + Chromium + Native API")]),s._v(" "),n("h2",{attrs:{id:"electron-组成"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#electron-组成"}},[s._v("#")]),s._v(" Electron 组成")]),s._v(" "),n("p",[n("code",[s._v("Electron = Node.js + Chromium + Native API")])]),s._v(" "),n("ol",[n("li",[s._v("Node 提供 es 运行环境")]),s._v(" "),n("li",[s._v("Chromium 提供 HTML、CSS、DOM 等 web 相关技术")]),s._v(" "),n("li",[s._v("Native API 平台特性")])]),s._v(" "),n("p",[s._v("既然 Electron 提供了这三种环境是不是就意味着在 Electron 里写的 js，都可以使用上述三个环境的各种 api 嘛？当然不是，如果是这样，就会造成混乱，electron 同样采用了浏览器的多进程架构，一个主进程，多个渲染进程")]),s._v(" "),n("h2",{attrs:{id:"主进程-main-process"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#主进程-main-process"}},[s._v("#")]),s._v(" 主进程 main-process")]),s._v(" "),n("p",[s._v("主进程作用")]),s._v(" "),n("ul",[n("li",[s._v("渲染进程管理（创建/切换/销毁），表现即为窗口的创建，销毁")]),s._v(" "),n("li",[s._v("应用生命周期管理")]),s._v(" "),n("li",[s._v("主进程，渲染进程通信")]),s._v(" "),n("li",[s._v("自动更新")]),s._v(" "),n("li",[s._v("工具条菜单栏注册")])]),s._v(" "),n("h2",{attrs:{id:"渲染进程-renderer-process"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#渲染进程-renderer-process"}},[s._v("#")]),s._v(" 渲染进程 renderer-process")]),s._v(" "),n("p",[s._v("界面交互相关的，具体的业务功能，都由 renderer 进程来做，和平时开发 web 项目一致。")]),s._v(" "),n("p",[s._v("渲染进程之间是相互独立，不会共享内存和状态的。如果把主进程理解为浏览器，那么渲染进程就相遇与浏览器中的 Tab 页面，每个页面都是独立的，不能共享状态。比如 tab1 网页中的 window 上挂在一个 window.a,但在 tab2 中的 window 上你并不会获得 window.a 这个变量，因为他们在不同的进程里。这样的一个好处就是，一个 Tab 死掉了，并不会影响另一个网页的内容，也并不会卡死浏览器。\n在 electron 中的场景大致就是一下这些")]),s._v(" "),n("ul",[n("li",[s._v("一个渲染进程死了，另一个渲染进程页不会死，照常运行")]),s._v(" "),n("li",[s._v("一个渲染进程死了，主进程不会卡死，还是可以开启其他窗口")]),s._v(" "),n("li",[s._v("一个渲染进程页死了，渲染进程也会死")])]),s._v(" "),n("h2",{attrs:{id:"体验-electron"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#体验-electron"}},[s._v("#")]),s._v(" 体验 electron")]),s._v(" "),n("p",[s._v("官网有一个简单的仓库，我们直接下载下来尝试")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Clone this repository")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/electron/electron-quick-start\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Go into the repository")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" electron-quick-start\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Install dependencies")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Run the app")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" start\n")])])]),n("p",[s._v("结果很不幸的在 install 安装依赖的时候 命令行卡在 node install.js，这个文件是要从国外网络下载 electron.zip\n导致下载不下来")]),s._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),n("p",[s._v("npm 下载的包有两种类型，一种是就是 npm 上的 js 包直接就下完了，还有一种是 npm 包里去下载另外的开源软件，例如 node-sass, electron\n这种即便使用 npm 淘宝镜像也是下载不下来的，必要的时候还是要科学上网的。")])]),s._v(" "),n("h2",{attrs:{id:"解决方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#解决方法"}},[s._v("#")]),s._v(" 解决方法")]),s._v(" "),n("ol",[n("li",[s._v("前往淘宝镜像\nhttps://npm.taobao.org/mirrors/electron/8.3.0/\n手动下载对应的包，我用 windows，所以下载 electron-v8.3.0-win32-x64.zip\n然后在 node_modules\\electron\\下创建 dist 文件夹。\n将下载的压缩包解压进刚刚创建的 dist。\n在 node_modules\\electron\\中创建 path.txt，内容为 electron.exe（对应自己的平台，不同平台不一样）")])]),s._v(" "),n("p",[s._v("这每次都要这样干也太麻烦了，")]),s._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[s._v("设置开源镜像软件代理，在 package.json 同目录下新建 .npmrc 文件，内容为 electron_mirror=https://npm.taobao.org/mirrors/electron/")])]),s._v(" "),n("li",[n("p",[s._v("删除 node_modules 重新执行 npm i,下载依赖，成功后执 npm run start")])])]),s._v(" "),n("h2",{attrs:{id:"electron-集成-vue-方案对比"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#electron-集成-vue-方案对比"}},[s._v("#")]),s._v(" electron 集成 vue 方案对比")]),s._v(" "),n("ol",[n("li",[n("p",[s._v("electron-vue")])]),s._v(" "),n("li",[n("p",[s._v("vue-cli-plugin-electron-builder")])])]),s._v(" "),n("h2",{attrs:{id:"electron-vue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#electron-vue"}},[s._v("#")]),s._v(" electron-vue")]),s._v(" "),n("p",[s._v("electron-vue 是 vue-cli2.0 的版本，现在 cli 的最新版本已经是都已经出到 4.3.1 了，再者 electron-vue 中间断更了很久我看了下提交记录有长达一年半的时间没有更新任何内容。不过这个集成方案里面用到的技术还是很有参考意义，并且使用这个方案也是能做出产品的。")]),s._v(" "),n("h2",{attrs:{id:"vue-cli-plugin-electron-builder"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue-cli-plugin-electron-builder"}},[s._v("#")]),s._v(" vue-cli-plugin-electron-builder")]),s._v(" "),n("p",[s._v("vue-cli-plugin-electron-builder 是 cli 插件市场中的 electron 集成方案，项目结构也比较清晰，基本和 vue 项目保持一致。")]),s._v(" "),n("p",[s._v("并且集成了开发环境与生产环境，打包使用的也是主流的 electron-builder 方案。")]),s._v(" "),n("blockquote",[n("p",[s._v("complete solution to package and build a ready for distribution Electron, Proton Native or Muon app for macOS, Windows and Linux with “auto update” support out of the box.")])]),s._v(" "),n("p",[s._v("简单的说，electron-builder 就是有比 electron-packager 有更丰富的的功能，支持更多的平台，同时也支持了自动更新。除了这几点之外，由 electron-builder 打出的包更为轻量，并且可以打包出不暴露源码的 setup 安装程序。")]),s._v(" "),n("h2",{attrs:{id:"实战-demo"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实战-demo"}},[s._v("#")]),s._v(" 实战 demo")]),s._v(" "),n("p",[s._v("接下来的部分是对 vue 和 electron 开发的 demo。个人写文档都是采用 md 文件来记录，奈何公司 confluence 不支持 md 格式文件导入。\n那就开发一个 md 格式文件转成公司 confluence 支持的格式。麻雀虽小，五脏俱全，包含，开发，默认打包，以及安装软件问题等。")]),s._v(" "),n("p",[s._v("先把需要的环境配好")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" config "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("sass_binary_site")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://npm.taobao.org/mirrors/node-sass\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" config "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("electron_mirror")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://npm.taobao.org/mirrors/electron/\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" config "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("phantomjs_cdnurl")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("http://cnpmjs.org/downloads\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" config "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("electron_mirror")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://npm.taobao.org/mirrors/electron/\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" config "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("chromedriver_cdnurl")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://npm.taobao.org/mirrors/chromedriver\n")])])]),n("p",[s._v("把这些可能用到的开源软件包先配上代理")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("vue create vue-electron-demo\n")])])]),n("p",[s._v("和平常 vue 开发一样，选择自己需要的选项，")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("├─.browserslistrc\n├─.eslintrc.js\n├─.gitignore\n├─babel.config.js\n├─package-lock.json\n├─package.json\n├─public\n│ ├─favicon.ico\n│ └─index.html\n├─README.md\n└─src\n  ├─App.vue\n  ├─assets\n  │ └─logo.png\n  ├─components\n  │ └─HelloWorld.vue\n  ├─main.js\n  ├─router\n  │ └─index.js\n  ├─store\n  │ └─index.js\n  └─views\n    ├─About.vue\n    └─Home.vue\n\n")])])]),n("p",[s._v("随后添加 vue-cli-plugin-electron-builder")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("\nvue "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" vue-cli-plugin-electron-builder\n")])])]),n("p",[s._v("接下来等待安装成功即可")]),s._v(" "),n("p",[s._v("安装完成后，目录会发生改变")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("\n├─.browserslistrc\n├─.eslintrc.js\n├─.gitignore\n├─.npmrc\n├─babel.config.js\n├─package-lock.json\n├─package.json\n├─public\n│ ├─favicon.ico\n│ └─index.html\n├─README.md\n└─src\n  ├─App.vue\n  ├─assets\n  │ └─logo.png\n  ├─background.js    //多的主进程入口文件\n  ├─components\n  │ └─HelloWorld.vue\n  ├─main.js\n  ├─router\n  │ └─index.js\n  ├─store\n  │ └─index.js\n  └─views\n    ├─About.vue\n    └─Home.vue\n\n")])])]),n("p",[s._v("其中 package.json 中会 多几条 script 脚本")]),s._v(" "),n("div",{staticClass:"language-json extra-class"},[n("pre",{pre:!0,attrs:{class:"language-json"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"serve"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vue-cli-service serve"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vue-cli-service build"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"lint"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vue-cli-service lint"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"electron:build"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vue-cli-service electron:build"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"electron:serve"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vue-cli-service electron:serve"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"postinstall"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"electron-builder install-app-deps"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token property"}},[s._v('"postuninstall"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"electron-builder install-app-deps"')]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),n("p",[s._v("我们执行 npm run electron:server，等待片刻")]),s._v(" "),n("p",[s._v("打开如下界面表示启动成功")]),s._v(" "),n("p",[n("img",{attrs:{src:a(210),alt:"electron-vue-start"}})]),s._v(" "),n("p",[s._v("先测试下打包")]),s._v(" "),n("p",[s._v("执行 "),n("code",[s._v("npm run electron:build")])]),s._v(" "),n("p",[s._v("控制台会输出打包过程信息")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v(" INFO  Building app with electron-builder:\n  • electron-builder  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("version")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("21.2")]),s._v(".0 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("os")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.0")]),s._v(".18363\n  • description is missed "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" the package.json  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("appPackageFile")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("E:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("vue-electron-demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("bundled"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("package.json\n  • author is missed "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" the package.json  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("appPackageFile")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("E:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("vue-electron-demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("bundled"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("package.json\n  • writing effective config  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("file")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("builder-effective-config.yaml\n  • packaging       "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("platform")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("win32 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("arch")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("x64 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("electron")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("6.1")]),s._v(".12 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("appOutDir")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("win-unpacked\n  • default Electron icon is used  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("reason")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("application icon is not "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v("\n  • downloading     "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("url")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.5.0/winCodeSign-2.5.0.7z "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("size")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("5.6")]),s._v(" MB "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("parts")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\n")])])]),n("p",[s._v("可以看到在打包的时候会去 github 官网上下载 winCodeSign 软件包，直接从 GitHub 上下载出现的问题就是一直卡在下载过程然后失败。最简单的方法就是科学上网，另外就是想办法从 github 上把软件包下载下来放在本地。")]),s._v(" "),n("p",[s._v("上述问题解决后，继续打包")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("\n INFO  Building app with electron-builder:\n  • electron-builder  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("version")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("21.2")]),s._v(".0 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("os")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.0")]),s._v(".18363\n  • description is missed "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" the package.json  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("appPackageFile")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("E:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("vue-electron-demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("bundled"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("package.json\n  • author is missed "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" the package.json  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("appPackageFile")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("E:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("vue-electron-demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("bundled"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("package.json\n  • writing effective config  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("file")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("builder-effective-config.yaml\n  • packaging       "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("platform")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("win32 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("arch")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("x64 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("electron")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("6.1")]),s._v(".12 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("appOutDir")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("win-unpacked\n  • default Electron icon is used  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("reason")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("application icon is not "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v("\n  • building        "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("target")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("nsis "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("file")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("vue-electron-demo Setup "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(".0.exe "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("archs")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("x64 "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("oneClick")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("true "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("perMachine")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("false\n  • building block map  "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("blockMapFile")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist_electron"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("vue-electron-demo Setup "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(".0.exe.blockmap\n DONE  Build complete"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("\n\n")])])]),n("p",[s._v("当看到 DONE Build complete!表示打包成功")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("\n├─.browserslistrc\n├─.eslintrc.js\n├─.gitignore\n├─.npmrc\n├─babel.config.js\n├─dist_electron   //打包后生成的文件夹\n│ ├─builder-effective-config.yaml\n│ ├─bundled\n│ │ ├─background.js\n│ │ ├─css\n│ │ │ └─app.4aa4aa41.css\n│ │ ├─favicon.ico\n│ │ ├─img\n│ │ │ └─logo.82b9c7a5.png\n│ │ ├─index.html\n│ │ ├─js\n│ │ │ ├─about.d5b24448.js\n│ │ │ ├─about.d5b24448.js.map\n│ │ │ ├─app.a4a7a228.js\n│ │ │ ├─app.a4a7a228.js.map\n│ │ │ ├─chunk-vendors.284623cd.js\n│ │ │ └─chunk-vendors.284623cd.js.map\n│ │ ├─node_modules\n│ │ └─package.json\n│ ├─index.js\n│ ├─package.json\n│ ├─vue-electron-demo Setup "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(".0.exe  //exe安装包\n│ ├─vue-electron-demo Setup "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(".0.exe.blockmap\n│ └─win-unpacked    //免安装 绿色版\n\n")])])]),n("p",[s._v("至此一个小流程就走完了")]),s._v(" "),n("p",[s._v("我尝试安装了下，直接给我安装到 c 盘了，原因是没有进行打包配置")]),s._v(" "),n("p",[s._v("接下来更改一下打包配置项。")]),s._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//vue-config.js")]),s._v("\nmodule"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n  pluginOptions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    electronBuilder"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      builderOptions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        productName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mac-test"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        appId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mac-test.desktop"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// win: {")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//   icon: "./public/favicon.ico"')]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// },")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// mac: {")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//   icon: "./public/app.png"')]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// }")]),s._v("\n        publish"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//这个是升级用的")]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            provider"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"generic"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            url"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://127.0.0.1:80/"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//这里是我本地开的服务器的地址")]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        nsis"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          oneClick"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否一键安装")]),s._v("\n          allowElevation"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。")]),s._v("\n          allowToChangeInstallationDirectory"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 允许修改安装目录")]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// installerIcon: "./build/icons/aaa.ico", // 安装图标')]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// uninstallerIcon: "./build/icons/bbb.ico", //卸载图标')]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// installerHeaderIcon: "./build/icons/aaa.ico", // 安装时头部图标')]),s._v("\n          createDesktopShortcut"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建桌面图标")]),s._v("\n          createStartMenuShortcut"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建开始菜单图标")]),s._v("\n          shortcutName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mac-test"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 图标名称")]),s._v("\n          "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// include: "build/script/installer.nsh" // 包含的自定义nsis脚本')]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),n("p",[s._v("打包后安装 exe 文件")]),s._v(" "),n("p",[n("img",{attrs:{src:a(211),alt:"install"}})]),s._v(" "),n("h2",{attrs:{id:"代码设计与组织"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#代码设计与组织"}},[s._v("#")]),s._v(" 代码设计与组织")]),s._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("\n├─.browserslistrc\n├─.eslintrc.js\n├─.gitignore\n├─.npmrc\n├─.prettierrc\n├─.vscode\n├─babel.config.js\n├─debug.log\n├─dist_electron\n├─package-lock.json\n├─package.json\n├─public\n├─README.md\n├─src\n│ ├─App.vue\n│ ├─assets\n│ │ └─logo.png\n│ ├─background.js\n│ ├─components\n│ ├─main-process\n│ │ ├─communication -------------- // 进程通信\n│ │ │ └─ipc.js\n│ │ ├─menus ---------------------- // 菜单管理\n│ │ │ ├─config.js\n│ │ │ └─create.js\n│ │ ├─native-ui\n│ │ │ ├─dialogs ------------------ // 弹框，保存打开文件\n│ │ │ │ ├─error.js\n│ │ │ │ ├─index.js\n│ │ │ │ ├─information.js\n│ │ │ │ ├─open-file.js\n│ │ │ │ └─save.js\n│ │ │ ├─drag\n│ │ │ │ ├─codeIcon.png\n│ │ │ │ └─drag.js\n│ │ │ ├─notice ------------------- // 系统通知\n│ │ │ │ └─index.js\n│ │ │ └─tray --------------------- // 系统托盘\n│ │ │   ├─iconTemplate.png\n│ │ │   ├─iconTemplate@2x.png\n│ │ │   ├─tray.js\n│ │ │   └─windows-icon@2x.png\n│ │ ├─shortcuts ------------------ // 全局快捷键\n│ │ ├─system\n│ │ ├─update\n│ │ │ └─checkUpdate.js ----------- // 检测更新\n│ │ └─windows\n│ │   └─create-window.js --------- // 窗口管理\n│ ├─main.js\n│ ├─router\n│ ├─store\n│ ├─utils\n│ └─views\n├─vue.config.js\n")])])]),n("h2",{attrs:{id:"后续内容以及要解决的问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#后续内容以及要解决的问题"}},[s._v("#")]),s._v(" 后续内容以及要解决的问题")]),s._v(" "),n("ol",[n("li",[s._v("electron 原生菜单的自定义，菜单事件，菜单自定义事件。以及渲染进程的菜单自定义，菜单绑定快捷键，全局快捷键 --耿艳")]),s._v(" "),n("li",[s._v("进程间通信，交互包含选择本地文件上传，下载文件保存到本地。文件下载的默认位置配置项，类似微信，ipc 封装思路--辛柳")]),s._v(" "),n("li",[s._v("多窗口的维护与管理。窗口的最大化，最小化，显示在最前面的窗口，系统托盘，托盘闪烁。 --李阿龙")]),s._v(" "),n("li",[s._v("electron-builder 方向打包。 --徐会忠")]),s._v(" "),n("li",[s._v("electron-updater 方向升级方案，全量，增量。实现方式，以及各种方案适用场景，优劣对比 --李惠荣")]),s._v(" "),n("li",[s._v("调用 c++ dll 文件 --刘浩")]),s._v(" "),n("li",[s._v("要有 demo git 链接，http://gitlab.idc.safecenter.cn/electron。放在这个组下，自己新建git仓库")])]),s._v(" "),n("p",[s._v("electron-localshortcut\nelectron-store")])])}),[],!1,null,null,null);t.default=e.exports}}]);