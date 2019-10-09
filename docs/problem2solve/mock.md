# 关于前端数据 mock

最近的数据分析平台因为 es 升级，导致测试环境蹦了，不能代理过去，后台也时不时的服务停止，对开发造成了不小的困扰，
只能把很久不用的前端数据 `mock` 拿出来了。

前端 mock 数据的方式太多了，体验了手写 json 文件，mockjs，json-server，都不能达到心里的预期，
最终采用了 mocker-api + mockjs 的方式，感觉还不错

## json 文件

这种方式需要写很多个 json 文件，而且数据要完全手写，光想名字，脑细胞都要累死好多，而且直接 axios 的话到时候还要改接口，体验极差

## mockjs

这种方式比上面好很多，不光可以自己随机造数据，还能拦截真实的请求，感觉是理想的方式

```javascript
//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据
const Mock = require("mockjs");
const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft", "deleted"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      platforms: ["a-platform"]
    })
  );
}
// 拦截http请求
Mock.mock("/api/data", (req, res) => {
  return {
    data: [
      {
        id: 1,
        username: "aaa",
        password: "aaa"
      },
      {
        id: 2,
        username: "bbb",
        password: "bbb"
      },
      {
        id: 3,
        username: "ccc",
        password: "ccc"
      }
    ]
  };
});
```

在 main.js 中引入上面定义的文件
`require('./mock')`

然后发请求

```html
<script>
  export default {
    data() {
      return {
        data: []
      };
    },
    mounted: function() {
      this.$axios.get("/api/data").then(res => {
        this.data = res.data;
        console.log(data);
      });
    }
  };
</script>
```

但是这种方式也有一个极大的弊端，浏览器控制台根本看不到发的请求，究其原因是因为 `mock` 重写了 `xhr`导致了
这种现象，一顿操作后，发请求想在控制台看下请求参数都是奢侈，只能打 `console` ，不是我想要的理想状态，放弃。

## json-server

json-server 这种是要新开一个服务，而且所有的数据都要写在 `db.json` 中，简单介绍下

```bash
npm i json-server -g
```

然后在项目根目录下建立 `db.json` 文件，比如

```json
"menuList":[
  {
    "children": [],
    "description": "",
    "funcId": "bfunc10",
    "href": "/home",
    "icon": "iconshouye",
    "label": "首页",
    "type": null
  },
  {
    "children": [
      {
        "children": [],
        "description": "",
        "funcId": "bfunc1004",
        "href": "/components/drag-dialog",
        "icon": "",
        "label": "DragDialogDemo"
      },
      {
        "children": [],
        "description": "",
        "funcId": "components1004",
        "href": "/components/click-outside",
        "icon": "",
        "label": "clickOutside"
      }
    ],
    "description": "",
    "funcId": "bfunc110",
    "href": "",
    "icon": "iconzujian",
    "label": "组件",
    "type": null
  }
]
```

然后在 `package.json`中加个执行脚本

```json
"mock":"json-server db.json --port 3000"
```

然后 `npm run mock`

随后就可以在项目中访问接口了

```html
<script>
  export default {
    data() {
      return {
        data: []
      };
    },
    mounted: function() {
      this.$axios.get("http://localhost:3000/menuList").then(res => {
        this.data = res.data;
        console.log(data);
      });
    }
  };
</script>
```

跨域了，也可以使用 proxy，这种相对好很多，但是还是有点繁琐。

## mocker-api + mockjs

最终选用的方式，不用新开服务，不用设置代理，控制台真实的数据请求，还能根据请求参数做出不同的响应，直接上代码

```bash
 npm install mocker-api  mockjs -D
```

然后在与 `src` 同级的目录新建 `mock` 文件夹，里面新建文件 `index.js`

```javascript
const Mock = require("mockjs");
const List = [];
const count = 100;
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft", "deleted"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      platforms: ["a-platform"]
    })
  );
}
// 上面的定义可以提取到另外的文件
const proxy = {
  "GET /api/table": List,
  "POST /api/public/login": (req, res) => {
    const { password, username } = req.body;
    console.log(req.body);
    if (password === "123456" && username === "sysmanager") {
      return res.send({
        status: "ok",
        code: 1,
        token: "sdfsdfsdfdsf",
        data: { id: 1, username: "kenny", sex: 6 }
      });
    } else {
      return res.send({ status: "error", code: 403 });
    }
  }
};
module.exports = proxy;
```

定义好了，接下来就是使用了

```javascript
const path = require("path");
const apiMocker = require("mocker-api");
module.exports = {
  devServer: {
    before(app) {
      apiMocker(app, path.resolve("./mock/index.js"));
    }
  }
};
```

只需要在 devServer 中的 before 中使用就可以了，然后`npm run serve` 接下来就可以愉快的玩耍了。

然后直接使用

```javascript
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { token } = await fetch.login({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          });
          Cookie.set("token", token);
          this.$router.push("/");
        } else {
          return false;
        }
      });
    }
  }
};
```

这样，接口不用改，参数该怎么写还怎么写，打包也是直接打包，只作用与开发环境。
