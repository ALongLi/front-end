# Electron 窗口

`Electron = Node.js + Chromium + Native API`

1. 窗口的创建，最大化，最小化，失去焦点等
2. 系统托盘，托盘的闪烁，托盘于窗口的交互

## `new BrowserWindow([options])`

- `options` Object (可选)

  - `width` Integer (可选) - 窗口的宽度，单位为像素。默认为 800.
  - `height` height Integer(可选) - 窗口的高度，单位为像素。默认为 `600`.
  - `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
  - `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
  - `useContentSize` Boolean (optional) - The `width` and `height` 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 `false`.
  - `center` Boolean (optional) -窗口在屏幕居中..
  - `minWidth` Integer (可选) - 窗口的最小宽度, 默认值为 0. ``
  - `minHeight` Integer (可选) - 窗口的最小高度. 默认值为 0. ``
  - `maxWidth` Integer (可选) - 窗口的最大宽度, 默认无限制.
  - `maxHeight` Integer (可选) - 窗口的最大高度, 默认无限制.
  - `resizable` 窗口是否可以改变尺寸. 默认值为 true.
  - `movable` 窗口是否可以移动. 在 Linux 中无效. 默认值为 `true`.
  - `show` Boolean (可选) - 窗口创建的时候是否显示. 默认值为 `true`.
  - `frame` Boolean (可选) - 设置为 `false` 时可以创建一个[Frameless Window](frameless-window.md). Default is `true`.
  - `parent` BrowserWindow (可选) - 指定父窗口. 默认值为 `null`.
  - `modal` Boolean (可选) -是否为模态窗. 仅供子窗口使用 `false`.

  - `webPreferences` Object (可选) - 网页功能的设置.

    - `devTools` Boolean (可选) - 是否开启 DevTools. 如果设置为 false, 则无法使用 BrowserWindow.webContents.openDevTools () 打开 DevTools。 默认值为 true.
    - `nodeIntegration` Boolean (可选) - 是否集成 Node，默认为 `true`.

    - `preload` String (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成 Node, 此脚本都可以访问所有 Node API 脚本路径为文件的绝对路径。 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入 node 的全局引用标志 [here](process.md#event-loaded).

## 创建主窗口

```js
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// app.on("ready", async () => {
//   createWindow();
// });
// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});
```

## 优雅的显示窗口

当页面在窗口中直接加载时，用户会看到未完成的页面，这不是一个好的原生应用的体验。为了让画面准备好了再显示，这有两种不同的解决方案。

### 使用`ready-to-show`事件

在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁：

```javascript
const { BrowserWindow } = require("electron");
let win = new BrowserWindow({ show: false });
win.once("ready-to-show", () => {
  win.show();
});
```

### 设置 `backgroundColor`

对于一个复杂的应用，ready-to-show 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor

```javascript
const { BrowserWindow } = require("electron");

let win = new BrowserWindow({ backgroundColor: "#2e2c29" });
win.loadURL("https://github.com");
```

请注意，使用此事件意味着渲染器将被认为是“可见的”，即使显示是假的，也可以进行绘制。如果您使用画图初始隐藏:false，此事件将永远不会触发

## 父子窗口

通过使用 `parent` 选项，你可以创建子窗口：

```javascript
const { BrowserWindow } = require("electron");

let top = new BrowserWindow();
let child = new BrowserWindow({ parent: top });
child.show();
top.show();
```

`child` 窗口将总是显示在 `top` 窗口的顶部.

### Modal windows

模态窗口是禁用父窗口的子窗口，创建模态窗口必须设置 `parent` 和 `modal` 选项：

```javascript
const { BrowserWindow } = require("electron");

let child = new BrowserWindow({ parent: top, modal: true, show: false });
child.loadURL("https://github.com");
child.once("ready-to-show", () => {
  child.show();
});
```

### 无边框窗口

无边框窗口是不带外壳（包括窗口边框、工具栏等），只含有网页内容的窗口。 这些是 `BrowserWindow` 类上的选项。

要创建无边框窗口，只需在 `BrowserWindow` 的 `options` 中将 `frame` 设置为 `false：`

```javascript
const { BrowserWindow } = require("electron");
let win = new BrowserWindow({ width: 800, height: 600, frame: false });
win.show();
```

## 多窗口

上面的例子虽然功能都是正常的，但是都有一个问题，那就是可以一直创建窗口。

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

如果不进行处理就能一直创建窗口。改写 `createWindow` 函数。可以采用 Object 或者 Set 来维护。

```js
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

## 系统托盘

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

## 文件及代码设计

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
