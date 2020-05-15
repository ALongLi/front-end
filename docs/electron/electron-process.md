## Electron

Electron = Node.js + Chromium + Native API

### Electron 组成

`Electron = Node.js + Chromium + Native API`

1. Node 提供 es 运行环境
2. Chromium 提供 HTML、CSS、DOM 等 web 相关技术
3. Native API 平台特性

既然 Electron 提供了这三种环境是不是就意味着在 Electron 里写的 js，都可以使用上述三个环境的各种 api 嘛？当然不是，如果是这样，就会造成混乱，electron 同样采用了浏览器的多进程架构，一个主进程，多个渲染进程

### 主进程 main-process

主进程作用

- 渲染进程管理（创建/切换/销毁），表现即为窗口的创建，销毁
- 应用生命周期管理
- 主进程，渲染进程通信
- 自动更新
- 工具条菜单栏注册

### 渲染进程 renderer-process

界面交互相关的，具体的业务功能，都由 renderer 进程来做，和平时开发 web 项目一致。

渲染进程之间是相互独立，不会共享内存和状态的。如果把主进程理解为浏览器，那么渲染进程就相遇与浏览器中的 Tab 页面，每个页面都是独立的，不能共享状态。比如 tab1 网页中的 window 上挂在一个 window.a,但在 tab2 中的 window 上你并不会获得 window.a 这个变量，因为他们在不同的进程里。这样的一个好处就是，一个 Tab 死掉了，并不会影响另一个网页的内容，也并不会卡死浏览器。
在 electron 中的场景大致就是一下这些

- 一个渲染进程死了，另一个渲染进程页不会死，照常运行
- 一个渲染进程死了，主进程不会卡死，还是可以开启其他窗口
- 一个渲染进程页死了，渲染进程也会死
