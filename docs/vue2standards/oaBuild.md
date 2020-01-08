<!--
 * @description:
 * @Author: lal
 * @Date: 2020-01-08 08:44:42
 * @LastEditors  : lal
 * @LastEditTime : 2020-01-08 09:17:20
 -->

# oa 打包简单优化

oa 中目前使用的是 jenkins 打包流程，但是前端还是需要本地打包后再放上去（jenkins 打包前端太慢），然后就引出了一个源码仓库，一个打包仓库
导致前端每次提测都要手动在两个仓库中切换 copy 打包后的文件。为了避免每次都手动决定改进下流程。试过 node 中的 [rimraf](https://www.npmjs.com/package/rimraf) 包删除打包仓库对应的文件然后脚本拷进去，试过 [filemanager-webpack-plugin](https://www.npmjs.com/package/filemanager-webpack-plugin) 这个包。最后仔细阅读了 filemanager-webpack-plugin 的文档后决定用这个加 sh 脚本

## 实现方式

直接上代码

```js
  ...
  configureWebpack: config => {

    if (process.env.NODE_ENV == "production") {
      config.plugins.push(
        new FileManagerPlugin({
          onEnd: {
            delete: ["E:/project/web/view/performance"],//删除打包代码仓库对应的应用文件夹
            copy: [
              {
                destination: "E:/project/web/view/performance" //创建一个应用空文件夹
                source: "E:/project/eoa-h5-src/h5/performanceAppraisal/dist/", // 将打包后的文件放到创建的空文件夹中
              }
            ]
          }
        })
      );
    }
  }
  ...

```

上面的是避免了每次都要 copy 文件 ，但是还要切换到打包仓库操作 git，接下来是避免这种操作。这种决定使用脚本来操作
新建 deploy.sh 放在源码根目录和 package.json 一级

```sh

#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e

#源码目录执行打包
npm run dev-build

# 进入打包后的git仓库
cd E:/project/web

#提交到暂存区
git add -A

#提交到本地仓库
git commit -m 'deploy'

#拉取远程仓库变更
git pull

#确保没有冲突可使用git push
git push

cd -

```

最终在 package.json 中添加一个 script 命令

```json
...
"scripts": {
  "deploy": "sh deploy.sh"
}
...
```

最后在命令行直接执行 `npm run deploy`就行了
