# gitcommit

观星台最近的一小部门开发任务交给了于莉，但是 git commit message 写的并不理想，于是给项目加了 commit 规范校验，以及提交规范 commit message
的脚本命令

## Git 的提交说明

Git 每次提交代码的时候都需要手写提交说明，一般我们都是一句话

```bash
git commit -m "修复xxx bug"
```

一般编辑器都带有辅助的 git commit 功能，很可能都是直接写一行 message 如：

`修复xxx` 然后就提交了。

其实 git 是可以书写多行信息的

```bash
git commit
```

此时会跳出一个文本编辑器，可以书写多行提交说明：

```bash
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch master
# Your branch is up to date with 'origin/master'.
#
# Changes to be committed:
#       modified:   vue.config.js
#
~
~
~
~
~
~
~
~
~
~
e:/project/lsms/.git/COMMIT_EDITMSG [unix] (11:34 14/11/2019)
```

如果没有规范的提交说明，很难阐述当前代码的提交性质（修复 Bug、代码性能优化、新增功能或者发布版本等）。查看 Vue 和 angular 源码的 Git 提交说明（fix 表明修复问题、feat 表明新增功能...）

手写符合规范的提交说明很难避免错误，可以借助工具来实现规范的提交说明。

## 规范的 Git 提交说明

Git 提交说明可分为三个部分：Header、Body 和 Footer。

```js
<Header> <Body> <Footer>
```

### Header

Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）。

```bash
<type>(<scope>): <subject>
```

`type` 用于说明 `commit` 的提交性质。
| 值 | 说明 |
| :-------- | :--------------------- |
| feat | 新增一个功能 |
| fix | 修复一个 Bug |
| docs | 文档变更 |
| style | 代码格式（不影响功能，例如空格、分号等格式修正） |
| refactor | 代码重构 |
| perf | 改善性能 |
| test | 测试 |
| build | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore | 变更构建流程或辅助工具 |
| revert | 代码回退 |

`scope` 说明 `commit` 影响的范围。`scope` 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。

subject 是 commit 的简短描述。

`Body`
commit 的详细描述，说明代码提交的详细说明。

`Footer`
如果代码的提交是不兼容变更或关闭缺陷，则 Footer 必需，否则可以省略。

不兼容变更
当前代码与上一个版本不兼容，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由和迁移方法。

关闭缺陷
如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

## Commitizen

[commitizen/cz-cli](https://github.com/commitizen/cz-cli)是一个可以实现规范的提交说明的工具：
当你使用 commitizen 来提交 git commit 消息时，命令行会提示您在提交时填写所有必需的提交字段。

### Making your repo Commitizen-friendly

首先 安装 Commitizen cli 工具

```bash
npm install commitizen -g
```

接下来，使用 cz-conventional-changelog 适配器来初始化您的项目

```bash
commitizen init cz-conventional-changelog --save-dev --save-exact
```

如果你使用的 yarn

```bash
commitizen init cz-conventional-changelog --yarn --dev --exact
```

初始化命令主要进行了 3 件事情

- 在项目中安装 cz-conventional-changelog 适配器依赖
- 将适配器依赖保存到 package.json 的 devDependencies 字段信息
- 在 package.json 中新增 config.commitizen 字段信息，主要用于配置 cz 工具的适配器路径

```json
{
  "devDependencies": {
    ...
    "cz-conventional-changelog": "3.0.2",
  },

  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

然后就可以直接使用 git-cz 来代替 git message

```
npx git-cz
```

也可以使用 npm script

```json
  ...
  "scripts": {
    "commit": "npx git-cz"
  }
```

然后命令行就可以执行：

```bash
npm run commit
```

## Commitlint

上面的方式虽然提供了规范的 commit 方式，但是仍然可以提交不符合规范的 commit，接下来要做的就是杜绝不符合规范的 commit
对 commit 做校验，不符合的不让提交。

校验提交说明是否符合规范，安装校验工具 commitlint：

```bash
npm i @commitlint/cli -D
#or
yarn add @commitlint/cli -D
```

安装校验规则：

```bash
npm i  @commitlint/config-conventional  -D
#or
yarn add  @commitlint/config-conventional  -D
```

安装完成之后创建 `commitlint.config.js` 文件

```bash
echo module.exports = {extends: ['@commitlint/config-conventional']}; > commitlint.config.js
```

vue 项目在 package.json 中添加 commit-msg 校验，vue 项目中用的是尤大的 yorkie 作为钩子。
我在 gitHooks 中写好像不起作用，还是按照官网写的使用 husky 作为钩子添加如下

```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## test commitlint

更改 git repo 文件然后提交 commit 测试

```bash
git commit -m "remove unuse code"
husky > commit-msg (node v10.16.0)
⧗   input: remove unuse code
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky > commit-msg hook failed (add --no-verify to bypass)
```

成功阻止了不符合规范的 commit message

## vscode Commitizen Support

在 vscode 扩展市场搜索 Visual Studio Code Commitizen Support

安装成功后 `ctrl+shift+p` 打开命令面板然后输入`conventional commit` 就会有 commit 操作提示了
