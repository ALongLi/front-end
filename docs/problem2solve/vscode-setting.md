# vscode 编辑器配置

Visual Studio Code (简称 VSCode / VSC) 是一款免费开源的现代化轻量级代码编辑器，支持几乎所有主流的开发语言的语法高亮、智能代码补全、自定义热键、括号匹配、代码片段、代码对比 Diff、Git 等特性，支持插件扩展，并针对网页开发和云端应用开发做了优化。软件跨平台支持 Win、Mac 以及 Linux...

## 下载安装

直接在官网进行下载
[vscode](https://code.visualstudio.com/)

## 简单使用

[vscode 使用教程](https://geek-docs.com/vscode/vscode-tutorials/vs-code-quick-repair.html)

## 常用插件

- Chinese (Simplified) Language Pack for Visual Stu dio Code -编辑器汉化插件
- Auto Close Tag -在写标签的时候，插件会自动帮我们带上结束的标签。
- Auto Rename Tag -在编写 HTML 的时候，自动修改重命名配对的标签。
- Bracket Pair Colorizer -颜色识别匹配括号
- Debugger for Chrome -chrome 调试
- Code Runner -代码运行调试，用于写一些函数方法
- Code Spell Checker -检测单词拼写
- HTML Snippets -html 代码片段（必备）
- ESLint -代码校验
- Git History - git log 记录
- GitLens - vscode 内置 git 增强
- JavaScript (ES6) code snippets - es6 代码片段
- koroFileHeader - 文件头部注释
- Live Server - 启动一个服务跑 html，支持反向代理
- Path Intellisense - 文件路径提示
- Prettier - 代码格式化
- Vetur - vue 必备插件
- Visual Studio IntelliCode - 代码智能提示
- vscode-icons - 文件图标 icon
- Vue 2 Snippets - vue2 代码片段提示
- VS DocBlockr - vue 文件支持 jsdoc

## 可选插件

- DotENV - env 代码高亮
- filesize - 文件大小
- lit-html - 字符串中标签匹配
- Markdown Preview Enhanced - Markdown 增强
- One Dark Pro - 主题插件
- SCSS IntelliSense - SCSS 提示

## 插件配置

```json
{
  "window.zoomLevel": 1,
  "editor.wordWrap": "on",
  "editor.fontFamily": "Fira Code,Source Code Pro, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 22,
  "editor.formatOnType": true,
  "editor.formatOnPaste": false,
  "editor.snippetSuggestions": "inline",
  "editor.tabCompletion": "on",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.suggestSelection": "first",
  "editor.renderWhitespace": "all",
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.renderControlCharacters": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.formatOnSave": true,

  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html",
    "vue-javascript": "javascript"
  },
  "workbench.statusBar.visible": true,
  "workbench.activityBar.visible": true,
  "workbench.iconTheme": "vscode-icons",
  "workbench.colorTheme": "One Dark Pro",

  //"terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "terminal.integrated.rightClickBehavior": "selectWord",

  "window.menuBarVisibility": "default",

  "emmet.triggerExpansionOnTab": true,

  "files.eol": "\n",

  "fileheader.customMade": {
    "description": "",
    "Author": "lal",
    "Date": "Do not edit", // 文件创建时间(不变)
    "LastEditors": "lal", // 文件最后编辑者
    "LastEditTime": "Do not edit" // 文件最后编辑时间
  },
  "fileheader.cursorMode": {
    "description": "",
    "param": "",
    "return": ""
  },
  "fileheader.configObj": {
    "prohibitAutoAdd": ["json", "md"], // 禁止.json .md文件，自动添加头部注释
    "showErrorMessage": false // 默认不显示错误通知 用于debugger
  },
  "[html]": {
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": true
    }
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.quickSuggestions": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // "[vue]": {
  //   "editor.defaultFormatter": "octref.vetur"
  // },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "todohighlight.isEnable": true,
  "[css]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "git.autofetch": true,
  "git.ignoreLegacyWarning": true,
  //"git.path": "D:\\Git\\bin\\git.exe",
  "gitlens.keymap": "alternate",
  "gitlens.views.repositories.files.layout": "list",
  "gitlens.views.fileHistory.enabled": true,
  "gitlens.views.lineHistory.enabled": true,
  "gitlens.advanced.messages": {
    "suppressCommitHasNoPreviousCommitWarning": false,
    "suppressCommitNotFoundWarning": false,
    "suppressFileNotUnderSourceControlWarning": false,
    "suppressGitVersionWarning": false,
    "suppressLineUncommittedWarning": false,
    "suppressNoRepositoryWarning": false,
    "suppressResultsExplorerNotice": false,
    "suppressShowKeyBindingsNotice": true
  },
  "sync.gist": "c6ec808351c16f2d536cc089831ea88a",
  "sync.lastUpload": "2018-06-02T03:37:32.020Z",
  "sync.autoDownload": false,
  "sync.autoUpload": false,
  "sync.lastDownload": "",
  "sync.forceDownload": false,
  "sync.host": "",
  "sync.pathPrefix": "",
  "sync.quietSync": false,
  "sync.askGistName": false,
  "sync.removeExtensions": true,
  "sync.syncExtensions": true,
  "sync.forceUpload": true,

  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",

  "extensions.autoUpdate": false,
  "cSpell.userWords": [
    "Vant",
    "amfe",
    "browserslist",
    "cnpm",
    "cropperjs",
    "dayjs",
    "echarts",
    "esnext",
    "fileheader",
    "filemanager",
    "fillter",
    "foxmail",
    "gitlens",
    "imgs",
    "mockjs",
    "nprogress",
    "polyfill",
    "pxtorem",
    "saveclick",
    "todohighlight",
    "typeof",
    "vetur",
    "vnode",
    "vuedraggable",
    "vuepress",
    "vuex",
    "websockets",
    "wordcloud",
    "xdja"
  ],
  "path-intellisense.extensionOnImport": true,

  "liveServer.settings.donotShowInfoMsg": true,
  "javascript.validate.enable": false,

  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.proxy": {
    "enable": true, //set it true to enable the feature.
    "baseUri": "/key", //from where you want to proxy.
    //"proxyUri": "http://11.12.98.64:2010/jsdata/api" //the actual url jhm.
    //"proxyUri": "http://11.12.98.60:18085/jsdata/api" //the actual url.
    //"proxyUri": "http://11.12.110.39/jsdata/api" //the actual url.
    //"proxyUri": "http://192.168.9.141/jsdata/api" //the actual url.
    // "proxyUri": "http://192.168.35.205:5050/pmmc/api" //the actual url.
    "proxyUri": "http://11.12.98.57:8080/key" //the actual url.
  },
  "css_peek.peekFromLanguages": [
    "html",
    "ejs",
    "erb",
    "php",
    "javascriptreact",
    "typescriptreact",
    "typescript",
    "javascript",
    "css",
    "vue"
  ],
  "search.exclude": {
    "**/node_modules": true,
    "**/.history": true,
    "**/bower_components": true,
    "**/dist": true
  },
  "search.followSymlinks": false,
  "html.format.enable": false,
  "breadcrumbs.enabled": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": ["javascript", "javascriptreact", "vue"],

  "cSpell.enabledLanguageIds": [
    "asciidoc",
    "c",
    "cpp",
    "csharp",
    "css",
    "git-commit",
    "go",
    "handlebars",
    "haskell",
    "html",
    "jade",
    "java",
    "javascript",
    "javascriptreact",
    "json",
    "jsonc",
    "latex",
    "less",
    "markdown",
    "php",
    "plaintext",
    "pug",
    "python",
    "restructuredtext",
    "rust",
    "scala",
    "scss",
    "text",
    "typescript",
    "typescriptreact",
    "yaml",
    "yml"
  ],
  "vueStyle.preset": {
    "leading-zero": true
  },

  "task.autoDetect": "off",
  "prettier.jsxBracketSameLine": true,
  "prettier.printWidth": 100,
  "prettier.trailingComma": "es5",

  "bracketPairColorizer.colorMode": "Independent",
  "vetur.validation.script": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",

  // "vetur.format.defaultFormatter.less": "none",

  "emmet.showSuggestionsAsSnippets": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "javascript.implicitProjectConfig.experimentalDecorators": true,

  "[nginx]": {
    "editor.defaultFormatter": "raynigon.nginx-formatter"
  },
  "explorer.confirmDelete": false,

  "github.gitAuthentication": false,
  "npm.enableRunFromFolder": true
}
```
