## Electron 开发

`Electron = Node.js + Chromium + Native API`

1. Node 提供 es 运行环境
2. Chromium 提供 HTML、CSS、DOM 等 web 相关技术
3. Native API 平台特性

既然 Electron 提供了这三种环境是不是就意味着在 Electron 里写的 js，都可以使用上述三个环境的各种 api 嘛？当然不是，如果是这样，就会造成混乱，electron 同样采用了浏览器的多进程架构，一个主进程，多个渲染进程

### Electron 本次培训内容

1. 菜单，自定义菜单
2. 进程间通讯
3. 渲染进程窗口事件
4. 窗口的管理,重复创建窗口，聚焦，等
5. 文件上传，选择，拖拽，点击，文件保存，快捷键
6. 系统托盘，托盘右键菜单，托盘闪烁,任务栏
7. 打包配置
8. 升级
9. 代码的组织

### 菜单，自定义菜单

主进程提供的 Menu 类，来创建菜单等功能。主要用到的有两个静态方法

`Menu.buildFromTemplate(template)`

一般来说 template 是一个 options 类型的数组，用于构建一个 MenuItem。
类似下面这样

```js
const template = [
  {
    label: "文件",
    submenu: [
      {
        label: "打开文件",
        accelerator: "CmdOrCtrl+O",
        role: "open",
        click: function() {
          openFile();
        },
      },
    ],
  },
  {
    label: "设置",
    submenu: [
      {
        label: "快速重启",
        accelerator: "F5",
        role: "reload",
      },
      {
        label: "退出",
        accelerator: "CmdOrCtrl+F4",
        role: "close",
      },
    ],
  },
];
let menu = Menu.buildFromTemplate(template);
```

如上形式 label 是惨淡显示的文案，submenu 是子菜单。 accelerator 是绑定的快捷键，role 是提供的功能，如果提供的功能不能满足，可以自定义点击事件，做业务处理。

role 主要有以下这些。

undo, redo, cut, copy, paste, pasteAndMatchStyle, delete, selectAll, reload, forceReload, toggleDevTools, resetZoom, zoomIn, zoomOut, togglefullscreen, window, minimize, close, help, about, services, hide, hideOthers, unhide, quit, startSpeaking, stopSpeaking, close, minimize, zoom, front, appMenu, fileMenu, editMenu, viewMenu, recentDocuments, toggleTabBar, selectNextTab, selectPreviousTab, mergeAllWindows, clearRecentDocuments, moveTabToNewWindow, windowMenu

`Menu.setApplicationMenu(menu)`

创建菜单，显示在应用的最顶上。

如果觉得丑就不要菜单，自己定义`Menu.setApplicationMenu(null)`

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
- 一个渲染进程页死了，渲染进程也会死。

### 进程间通讯

进程间通信主要通过 ipc 模块来完成。也可以使用 remote,不过这里只讲 ipc 通讯的方式 `ipcMac`, `ipcRenderer` 。

```js
//渲染进程
ipcRenderer.send("dbValue", 7);
ipcRenderer.on("dbValueDone", (event, val) => console.log(val));

//主进程
ipcMain.on("dbValue", function(e, val) {
  log.info(val * val);
  e.sender.send("dbValueDone", calcVal);
  // e.reply("dbValueDone", calcVal);
});
```

这种方法需要来回交互，比较繁琐，`electron7.0`版本以后提供了支持异步的链式调用类似 promise

```js
// Renderer process
ipcRenderer.invoke("some-name", someArgument).then((result) => {
  // ...
});

// Main process
ipcMain.handle("some-name", async (event, someArgument) => {
  const result = await doSomeWork(someArgument);
  return result;
});
```

业务一般都是在渲染进程中，所以通信一般都是渲染进程去主动和主进程通信。不可避免的会有主进程主动与渲染进程通信

如果主进程要主动和渲染进程通信

```js
// 主进程:  win是渲染进程的BrowserWindow的实列
setTimeout(() => {
  win.webContents.send("renderEvent");
}, 5 * 1000);
// 渲染进程:
ipcRenderer.on("renderEvent", () => {
  console.log("222");
});
```

渲染进程之间的通信就是上面两种方式的组合，由渲染进程一先和主进程通信，然后主进程再和渲染进程 2 通信。

`ipcRenderer.sendTo` electron5 之后的 api

```js

// 共享渲染进程的id，将进程的id放到global全局对象中
global.sharedObject = {
  win2webContentsId: win2.webContents.id,
  win1webContentsId: win1.webContents.id
}

// 然后在进程1中，通过remote远程模块，调getGlobal方法，获取主进程设置的global的sharedObject对象。
const {remote} = require("remote")
let sharedObject = remote.getGlobal('sharedObject')
let win2WebContentsId = sharedObject.win2webContentsId
ipcRenderer.sendTo(win2WebContentsId, 'win2Event', 23)

// 在进程2中，按照之前的方式定义win2Event即可
let { ipcRenderer } = require('electron')
ipcRenderer.on('win2Event', (e, a) => {
  console.log('win2Event', a)
}
// 输出结果:win2Event,23
```

上面这种事 remote 实现的，但是千万不要滥用 remote

remote 提供了一种简便的、无侵入的形式来访问主进程的 API 和数据。但是其底层基于同步的 IPC。

比如获取一个主进程中的对象:

```js
// 主进程
global.foo = {
  foo: 1,
  bar: {
    baz: 2,
  },
};
```

```js
// 渲染进程
import { remote } from "electron";

JSON.stringify(remote.getGlobal("foo"));
```

这里会触发 4 次 同步 IPC: getGlobal、foo、bar、bar.baz。对于复杂的数据，这个消耗就很难忍受了。
避免使用 remote，如果你清楚的知道你在干什么，那么可以酌情使用。

ipc 的顶层是通过 EventEmitter 来实现的，前端技术的很多机制也是这种发布订阅设计模式。

另外还有一些纯 web 的存储 `api` 。`localStorage`、`sessionStorage`、`indexedDB`

更有甚着可以使用数据库。例如 `Sqlite3`

### 渲染进程窗口管理

管理好窗口能更有利于组织代码，防止内存泄漏等。如何避免重复创建窗口，窗口的聚焦，窗口最大化，最小化等。
下面一一说明

先在渲染进程下写一些 ui 交互，通知主进程创建新的渲染进程窗口。

```html
<button id="btn" @click="newWin">新建渲染进程</button>
```

```js
// 直接采用await
export default {
  name: "zcs-vue",
  props: {},
  data() {},
  methods: {
    async newWin() {
      const res = await ipcRenderer.invoke("newWin", this.value);
      console.log(res);
    },
  },
};

// 主进程
ipcMain.handle("newWin", () => {
  createWindow();
  return "createWindowDone";
});
```

如果不进行处理就能一直创建窗口。改写 `createWindow` 函数。

```js
/*
 * @description:
 * @Author: lal
 * @Date: 2020-05-25 11:10:44
 * @LastEditors: lal
 * @LastEditTime: 2020-05-28 11:39:46
 */

import { protocol, BrowserWindow } from "electron";
// import winInstance from "./BrowserWindowInstance";
import log from "electron-log";

import {
  createProtocol,
  /* installVueDevtools */
} from "vue-cli-plugin-electron-builder/lib";

const windows = Object.create(null);
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
function createWindow(windowId, opt, url) {
  // 已经创建
  if (windows[windowId]) {
    // windows[windowId].setAlwaysOnTop(true);
    windows[windowId].showInactive();
    windows[windowId].focus();
    return false;
  }
  // Create the browser window.
  let defaultOpt = {
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  };

  opt = Object.assign(defaultOpt, opt);
  let newWindow = new BrowserWindow(opt);

  // windows.add(newWindow);
  windows[windowId] = newWindow;

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    if (url) {
      newWindow.loadURL(url);
    } else {
      newWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    }
    if (!process.env.IS_TEST) newWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    newWindow.loadURL("app://./index.html");
  }
  // 载入菜单
  newWindow.on("focus", () => {
    // windows.delete(newWindow);
    log.info(windowId);
    newWindow.setSkipTaskbar(false);
    log.info("获取焦点了");
  });
  newWindow.on("close", (e) => {
    log.info(windowId);
    log.info("开始退出");
    if (windowId == "mainWindow") {
      newWindow.minimize();
      newWindow.setSkipTaskbar(true);
      e.preventDefault();
    } else {
      newWindow = null;
      delete windows[windowId];
    }
    // windows.delete(newWindow);
  });
  newWindow.on("closed", () => {
    // windows.delete(newWindow);
    newWindow = null;
    delete windows[windowId];
  });

  return newWindow;
}

export { createWindow, windows };
```

### 文件操作

electron 相比较 web 很明显的一个特点就是可以进行文件 io 操作，例如读取本地文件内容显示，保存文件到指定地方。
先来试一下打开本地文件。
打开，保存都是调用的 dialog 模块

#### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

- `browserWindow` BrowserWindow (optional)
- `options` Object
  - `title` String (可选)
  - `defaultPath` String (可选)
  - `buttonLabel` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  - `filters` [FileFilter[]](structures/file-filter.md) (optional)
  - `属性` String[](可选) -包含对话框应用的功能。支持以下值:
    - `openFile` - 允许选择文件
    - `openDirectory` - 允许选择文件夹.
    - `multiSelections` -允许多选。
    - `showHiddenFiles` - 显示对话框中的隐藏文件。
    - `createDirectory` - 允许你通过对话框的形式创建新的目录 _macOS_
    - `promptToCreate` --如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。. _Windows_
    - `noResolveAliases` - 禁用自动别名 (symlink) 路径解析。 选定的别名现在将返回别名路径而不是其目标路径。. _macOS_
    - `treatPackageAsDirectory` - 将包 (如 .app 文件夹) 视为目录而不是文件. _macOS_
  - `message` String (optional) _macOS_ -显示在输入框上方的消息。.
- `callback` Function (optional)
  - `filePaths` String[] - An array of file paths chosen by the user

Returns `String[]`, an array of file paths chosen by the user, if the callback is provided it returns `undefined`.

`browserWindow` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。例如:

```javascript
{
  filters: [
    { name: "Images", extensions: ["jpg", "png", "gif"] },
    { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
    { name: "Custom File Type", extensions: ["as"] },
    { name: "All Files", extensions: ["*"] },
  ];
}
```

下面是一个打开弹框选择本地文件的代码

```js
async function openFile() {
  const window = BrowserWindow.getFocusedWindow();

  const result = await dialog.showOpenDialog({
    properties: ["openFile"], // properties字符串 - 包含对话框应该使用的特征，常用的是选择文件openFile，多选multiSelections，选择目录：openDirectory
  });

  if (result.canceled === false) {
    log.info(result);
    window.webContents.send("openFiled", result.filePaths);
  }
}
```

**拖拽** 还是按照原生 js 来操作吧。

保存文件和打开文件时同样的道理只是调用的方法不同

#### `dialog.showSaveDialog([browserWindow, ]options)`

保存调用上面的方法，options 大致一样，大家自行看 api 了解

```js
// 渲染进程请求
ipcRenderer.invoke("save-dialog", {
  name: "wiki.txt",
  value: value,
});

/**
 * 主进程处理
 */
ipcMain.handle("save-dialog", async (event, { name, value }) => {
  const result = await dialog.showSaveDialog({
    defaultPath: name,
  });
  if (result.canceled === false) {
    await fs.writeFileSync(result.filePath, new Uint8Array(Buffer.from(value)));
  }
});
```

### 快捷键

electron 同意提供了全局快捷键功能。这里提供一个`F5`刷新的功能

```js
const { BrowserWindow, globalShortcut } = require("electron");

function registerShortcut() {
  globalShortcut.register("F5", function() {
    console.log("ctrl+x is pressed");
    let focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.reload();
    }
  });
}
export default registerShortcut;

// 在创建渲染进程后注册
registeredShortcuts();
```

这里要注意下，在 app 退出后，解除快捷键绑定

```js
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  globalShortcut.unregisterAll();

  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

### 系统托盘

一般我们在关闭应用的时候会有个最小化到系统托盘的交互，这时候再双击会显示出主窗口。electron 同样提供了这种功能

```js
const { app, Menu, Tray } = require("electron");

let appIcon = null;
app.on("ready", () => {
  appIcon = new Tray("/path/to/my/icon");
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
  ]);

  // Make a change to the context menu
  contextMenu.items[1].checked = false;

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu);
});
```

```js
const { ipcMain, app, Menu, Tray } = require("electron");
import { windows } from "../../windows/create-window";
import log from "electron-log";

let appIcon = null;

function createTray() {
  const iconName = "windows-icon.png";
  const iconName2 = "empty.ico";
  // eslint-disable-next-line no-undef
  let iconPath = `${__static}/${iconName}`;
  // eslint-disable-next-line no-undef
  let iconPath2 = `${__static}/${iconName2}`;
  log.info(process.platform);
  // const iconPath = path.join(__dirname, iconName);
  appIcon = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出",
      click: () => {
        windows["mainWindow"] = null;
        delete windows["mainWindow"];
        log.info("退出");
        app.quit();
        app.exit();
        appIcon.destroy();
      },
    },
  ]);

  appIcon.setToolTip("Electron Demo in the tray.");
  appIcon.setContextMenu(contextMenu);

  appIcon.on("double-click", function() {
    if (windows["mainWindow"]) {
      windows["mainWindow"].show();
    }
  });

  // var count = 0;
  // setInterval(function() {
  //   if (count++ % 2 == 0) {
  //     appIcon.setImage(iconPath);
  //   } else {
  //     appIcon.setImage(iconPath2);
  //   }
  // }, 400);
}
// ipcMain.on("put-in-tray", event => {});

ipcMain.on("remove-tray", () => {
  appIcon.destroy();
});

app.on("window-all-closed", () => {
  if (appIcon) appIcon.destroy();
});

export default createTray;
```

### 打包配置

打包这里只使用 `electron-builder` 不考虑其他的。阿里都在用的打包工具，还是很值得肯定的。而且配置也很简单。

```js
//vue-config.js
module.exports = {
  // ...
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "electron-demo",
        appId: "electron-demo.desktop",
        // win: {
        //   icon: "./public/favicon.ico"
        // },
        // mac: {
        //   icon: "./public/app.png"
        // }
        publish: [
          //这个是升级用的
          {
            provider: "generic",
            url: "http://127.0.0.1:80/", //这里是我本地开的服务器的地址
          },
        ],
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // installerIcon: "./build/icons/aaa.ico", // 安装图标
          // uninstallerIcon: "./build/icons/bbb.ico", //卸载图标
          // installerHeaderIcon: "./build/icons/aaa.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "electron-demo", // 图标名称
          // include: "build/script/installer.nsh" // 包含的自定义nsis脚本
        },
      },
    },
  },
};
```

执行 `npm run electron:build`

控制台会输出打包过程信息

```bash
 INFO  Building app with electron-builder:
  • electron-builder  version=21.2.0 os=10.0.18363
  • description is missed in the package.json  appPackageFile=E:\electron\vue-electron-demo\dist_electron\bundled\package.json
  • author is missed in the package.json  appPackageFile=E:\electron\vue-electron-demo\dist_electron\bundled\package.json
  • writing effective config  file=dist_electron\builder-effective-config.yaml
  • packaging       platform=win32 arch=x64 electron=6.1.12 appOutDir=dist_electron\win-unpacked
  • default Electron icon is used  reason=application icon is not set
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.5.0/winCodeSign-2.5.0.7z size=5.6 MB parts=1

```

可以看到在打包的时候会去 github 官网上下载 winCodeSign 软件包，直接从 GitHub 上下载出现的问题就是一直卡在下载过程然后失败。最简单的方法就是科学上网，另外就是想办法从 github 上把软件包下载下来放在本地。

上述问题解决后，继续打包

```bash

 INFO  Building app with electron-builder:
  • electron-builder  version=21.2.0 os=10.0.18363
  • description is missed in the package.json  appPackageFile=E:\electron\vue-electron-demo\dist_electron\bundled\package.json
  • author is missed in the package.json  appPackageFile=E:\electron\vue-electron-demo\dist_electron\bundled\package.json
  • writing effective config  file=dist_electron\builder-effective-config.yaml
  • packaging       platform=win32 arch=x64 electron=6.1.12 appOutDir=dist_electron\win-unpacked
  • default Electron icon is used  reason=application icon is not set
  • building        target=nsis file=dist_electron\vue-electron-demo Setup 0.1.0.exe archs=x64 oneClick=true perMachine=false
  • building block map  blockMapFile=dist_electron\vue-electron-demo Setup 0.1.0.exe.blockmap
 DONE  Build complete!

```

当看到 DONE Build complete!表示打包成功

### 升级

这里不说 electron 自带的 autoUpdater。而是说一个和 electron-builder 配套使用的 electron-updater。使用也比较简单

```js
let checkForUpdates = () => {
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl);
  // 更新前，删除本地安装包 ↓
  let updaterCacheDirName = "electron-demo-updater";
  const updatePendingPath = path.join(
    autoUpdater.app.baseCachePath,
    updaterCacheDirName,
    "pending"
  );

  fs.emptyDir(updatePendingPath);

  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on("error", function(message) {
    log.info("error");
    log.info(message);
    // sendStatusToWindow("error", message);
  });
  autoUpdater.on("checking-for-update", function(message) {
    log.info("checking-for-update");
    sendStatusToWindow("checking-for-update", message);
  });
  autoUpdater.on("update-available", function(message) {
    log.info("update-available");
    sendStatusToWindow("update-available", message);
  });
  autoUpdater.on("update-not-available", function(message) {
    log.info("update-not-available");
    sendStatusToWindow("update-not-available", message);
  });

  // 更新下载进度事件
  autoUpdater.on("download-progress", function(progressObj) {
    log.info(parseInt(progressObj.percent));
    sendStatusToWindow("downloadProgress", progressObj);
  });

  // 更新下载完成事件
  autoUpdater.on("update-downloaded", function(
    event,
    releaseNotes,
    releaseName,
    releaseDate,
    updateUrl,
    quitAndUpdate
  ) {
    log.info(quitAndUpdate);
    ipcMain.on("install", () => {
      autoUpdater.quitAndInstall();
    });
  });

  //执行自动更新检查
  autoUpdater.checkForUpdates();
};
```

这里有几个问题，

**开发环境检测升级报错** `dev-app-update.yml`不存在
在 `updateHandle` 方法内，加入下面代码，地址是本地打包后的 `app-update.yml` 文件路径

**下载包缓存导致的更新失败**
`fs.emptyDir(updatePendingPath)` 清空缓存文件夹

另外还有增量更新...

### 文件及代码设计

```bash

├─.browserslistrc
├─.eslintrc.js
├─.gitignore
├─.npmrc
├─.prettierrc
├─.vscode
├─babel.config.js
├─debug.log
├─dist_electron
├─package-lock.json
├─package.json
├─public
├─README.md
├─src
│ ├─App.vue
│ ├─assets
│ │ └─logo.png
│ ├─background.js
│ ├─components
│ ├─main-process
│ │ ├─communication -------------- // 进程通信
│ │ │ └─ipc.js
│ │ ├─menus ---------------------- // 菜单管理
│ │ │ ├─config.js
│ │ │ └─create.js
│ │ ├─native-ui
│ │ │ ├─dialogs ------------------ // 弹框，保存打开文件
│ │ │ │ ├─error.js
│ │ │ │ ├─index.js
│ │ │ │ ├─information.js
│ │ │ │ ├─open-file.js
│ │ │ │ └─save.js
│ │ │ ├─drag
│ │ │ │ ├─codeIcon.png
│ │ │ │ └─drag.js
│ │ │ ├─notice ------------------- // 系统通知
│ │ │ │ └─index.js
│ │ │ └─tray --------------------- // 系统托盘
│ │ │   ├─iconTemplate.png
│ │ │   ├─iconTemplate@2x.png
│ │ │   ├─tray.js
│ │ │   └─windows-icon@2x.png
│ │ ├─shortcuts ------------------ // 全局快捷键
│ │ ├─system
│ │ ├─update
│ │ │ └─checkUpdate.js ----------- // 检测更新
│ │ └─windows
│ │   └─create-window.js --------- // 窗口管理
│ ├─main.js
│ ├─router
│ ├─store
│ ├─utils
│ └─views
├─vue.config.js
```
