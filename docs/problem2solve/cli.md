# 脚手架实现方式

vue-cli 已经是非常优秀的脚手架，通过脚手架，我们可以快速初始化一个项目，无需自己从零开始一步步配置，有效提升开发体验。尽管如此，但是未必是符合我们的实际应用的，我们可以定制一个属于自己的脚手架(或公司通用脚手架)，来提升自己的开发效率。内置一些规则，库...，例如 jeecg。

## 需要使用的第三方库

- commander: 命令行工具
- download-git-repo: 用来下载远程模板
- inquirer: 交互式命令行工具
- ora: 显示 loading 动画
- chalk: 修改控制台输出内容样式
- metalsmith,consolidate,ejs 模板渲染组合
- fs-extra: 文件操作扩展库

## 初始化项目

```bash
npm init
```

然后一路向下

## 配置全局使用

为了可以全局使用，我们需要在 package.json 里面设置一下：

```json
  "bin": {
    "xd": "bin/www/main.js"
  },

```

本地调试的时候，在项目根目录下执行： npm link 。
即可把 xd 命令绑定到全局，以后就可以直接以 xd 作为命令开头。

## 入口文件的设置

在根目录下建立 \bin\www 文件夹，在里面建立一个 main.js 文件。这个 main.js 文件是整个脚手架的入口文件，所以我们首先对它进行编写。

```js
#!/usr/bin/env node
require("../../src/main");
```

## 命令管理 (src/main.js)

先引入基本得第三方库和信息

```js
const program = require("commander");
const { version } = require("./constants");

program
  .command("create")
  .description("创建一个项目")
  .alias("c")
  .action(() => {
    create();
  });

program
  .command("add")
  .description("添加新模板")
  .alias("a") // 简写
  .action(() => {
    add();
  });
```

考虑到后续功能命令会越来越多，所有对上述代码进行改写于抽离

```js
const program = require("commander");
const path = require("path");
const { version } = require("./constants");

const actionsMap = {
  create: {
    description: "create project",
    alias: "cr",
    examples: ["xd create <project-name>"],
  },
  config: {
    description: "config info",
    alias: "c",
    examples: ["xd config get <k>", "xd config set <k> <v>"],
  },

  add: {
    description: "新增模板",
    alias: "a",
    examples: ["xd add <template-name>"],
  },
  "*": {
    description: "command not found",
  },
};
// 循环增加命令
Object.keys(actionsMap).forEach((action) => {
  program
    .command(action)
    .alias(actionsMap[action].alias)
    .description(actionsMap[action].description)
    .action(() => {
      // 动作
      if (action === "*") {
        console.log(actionsMap[action].description);
      } else {
        console.log(path.resolve(__dirname, action));
        // 加载对应得命令函数，每一个命令对应一个文件，命令名称与文件名称相同
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
      // console.log('执行动作', action)
    });
});

program.on("--help", () => {
  console.log("Examples");
  Object.keys(actionsMap).forEach((action) => {
    (actionsMap[action].examples || []).forEach((example) => {
      console.log(example);
    });
  });
});

// 这一行一定要有
program.version(version).parse(process.argv);
```

## 创建项目拉取模板

文件拉取 —— 使用 download-git-repo
使用方式如下

```js
download("direct:https://gitee.com/fillter/vue-template.git",
targetPath,{ clone:true }, // 目标路径
(err)=>{ // 回调函数
    console.log(err)
}
```

个人更喜欢 async 语法，直观简洁

```js
const downLoadGitRepo = require("download-git-repo");
const { promisify } = require("util");
// 将错误优先回调函数 promise化
const downLoadGit = promisify(downLoadGitRepo);

// 对下载模板功能封装并返回下载目录
/**
 * @description  从远程下载仓库模板
 * @param {*} repoUrl  仓库 url 地址 https 或者 ssh，最好是 https 不会存在权限问题
 * @param {*} repoName  仓库对应得名字与 repoList 中得key保持一致
 */
const downLoad = async (repoUrl, repoName) => {
  const dest = `${downLoadDirectory}/${repoName}`;
  // fs.existsSync(dest);
  fs.remove(dest);
  await downLoadGit(`direct:${repoUrl}`, dest, {
    clone: true,
  });
  return dest;
};
```

## 命令行问询交互

命令行交互 —— 使用 inquirer 示例如下：

```js
const inquirer = require("inquirer");

const promptList = [
  {
    type: "input",
    message: "设置一个用户名:",
    name: "name",
    default: "test_user", // 默认值
  },
  {
    type: "input",
    message: "请输入手机号:",
    name: "phone",
    validate: function(val) {
      if (val.match(/\d{11}/g)) {
        // 校验位数
        return val;
      }
      return "请输入11位数字";
    },
  },
];

inquirer.prompt(promptList).then((answers) => {
  console.log(answers); // 返回的结果
});
```

prompt 提交一个询问数组，`name` 是 `key` 值，`message` 是输入时的提示，结束后返回得是个对象
{ name: xxx, phone: yyy} 对应得值就是输入的 `value`，
问询得设计并没有放在脚手架中而是放在模板中，模板需要提供一个 `ask.js`，采用 `node` 模块语法导出,如下

```js
module.exports = [
  {
    type: "confirm",
    name: "private",
    message: "ths resgistery is private?",
  },
  {
    type: "input",
    name: "author",
    message: "author?",
  },
  {
    type: "input",
    name: "description",
    message: "description?",
  },
  {
    type: "input",
    name: "license",
    message: "license?",
  },
  {
    type: "input",
    name: "ROOT_URL",
    validate: function(val) {
      console.log(val);
      return !/^\s*$/.test(val.trim());
    },
    message: "请输入项目根路径(必填)?",
  },
  {
    type: "list",
    message: "请选择项目主题色调:",
    name: "navTheme",
    choices: ["dark", "light"],
  },
  {
    type: "list",
    message: "请选择项目布局方式:",
    name: "layout",
    choices: [
      {
        name: "左侧导航",
        value: "sidemenu",
      },
      {
        name: "顶部导航",
        value: "topmenu",
      },
    ],
  },
  {
    type: "confirm",
    name: "fixedHeader",
    message: "固定 Header?",
    default: false,
  },
  {
    type: "confirm",
    message: "是否固定左侧菜单栏？",
    name: "fixSiderbar",
    default: false,
    // when: function (answers) {
    //   // 当watch为true的时候才会提问当前问题
    //   return answers.layout == "sidemenu";
    // },
  },
];
```

## 模板编译替换

metalsmith,consolidate,ejs 模板渲染组合，具体用法大家可以去官网或者 github 查看，这里不详细说明

```js
/*
 * @description: 渲染模板
 * @Author: lal
 * @Date: 2020-07-27 15:23:10
 * @LastEditors: lal
 * @LastEditTime: 2020-08-08 11:44:32
 */

const { promisify } = require("util");
const inquirer = require("inquirer");
const path = require("path");
const MetalSmith = require("metalsmith");
let { render } = require("consolidate").ejs;
const { printError, printSuccess, needCompile } = require("./index");

render = promisify(render);

/**
 * @description 模板渲染函数
 * @param {*} cacheDir
 * @param {*} projectDir
 * @param {*} projectName
 */
module.exports = async (cacheDir, projectDir, projectName) => {
  const askPath = path.join(cacheDir, "ask.js");
  await new Promise((resolve, reject) => {
    MetalSmith(__dirname)
      .source(cacheDir)
      .destination(projectDir)
      .use(async (files, metal, done) => {
        const result = await inquirer.prompt(require(askPath));
        result.BASE_URL = "<%= BASE_URL %>";
        // 命令行交互的得到的结果
        const data = metal.metadata();
        // 将询问的结果放在metaData中保证在下一个中间价中可以获取到
        Object.assign(data, result);

        delete files["ask.js"];
        done();
      })
      .use(async (files, metal, done) => {
        Reflect.ownKeys(files).forEach(async (file) => {
          let content = files[file].contents.toString(); // 获取文件中的内容
          // 需要编译得文件，并不是所有得文件都编译
          if (needCompile(file, [".js", ".json", ".html", ".vue"])) {
            if (content.includes("<%")) {
              // 文件中用<% 我才需要编译
              content = await render(content, metal.metadata()); // 用数据渲染模板
              files[file].contents = Buffer.from(content); // 渲染好的结果替换即可
            }
          }
        });
        // 不能少
        done();
      })
      .build((err) => {
        // 执行中间件
        if (!err) {
          printSuccess(`✨ 🎉 📦创建项目成功 请执行`);
          printSuccess(`cd ${projectName}`);
          printSuccess(`npm i`);
          printSuccess(`npm run serve`);
          resolve();
        } else {
          printError(err);
          reject();
        }
      });
  });
};
```

## 代码结构

[仓库地址](http://code.dev.xdja.com/source/jeecg-cli/)

```bash
├─.eslintignore
├─.eslintrc.js
├─.gitignore
├─bin
│ └─www
│   └─main.js
├─package-lock.json
├─package.json
├─README.md
├─src
│ ├─add.js
│ ├─config.js
│ ├─constants.js
│ ├─create.js ---------------- // 创建项目
│ ├─main.js ------------------ // 主入口
│ └─utils
│   ├─index.js --------------- // 工具函数库
│   └─render.js -------------- // 渲染函数
└─template
  └─jeecg
    ├─ask.js
    ├─package.json
    └─src
      ├─App.vue
      ├─defaultSetting.js
      └─main.js
```

## 结尾

以上只是实现脚手架的核心逻辑，具体的实现大家可以查看代码，代码中逻辑更清晰。还有一些辅助的命令没有实现
例如增加模板的仓库 `xd add` ，理论上是可以支持 java 等代码仓库的
