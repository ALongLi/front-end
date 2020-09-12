# markdown 预览

marked.js 是一个可以在线转码 Markdown 的 JavaScript 编写的库。可以非常方便的在线编译 Markdown 代码为 HTML 并直接显示，并且支持完全的自定义各种格式。如何项目种有一些开发文档之类得页面，则可以采用这种方式

## 安装

`marked.js`，提供了不仅提供了页面使用，还同样之支持命令行工作模式。

**cli** `npm install -g marked`
**browser** `npm install marked -s`

## 简单使用

### cli 命令行使用

这种基本不会使用到，除非将某个 md 文件转换为 html 发给别人看

```bash
$ marked -o hello.html
hello world
^D
$ cat hello.html
<p>hello world</p>
$ marked -s "*hello world*"
<p><em>hello world</em></p>

```

### Browser 使用

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Marked in the browser</title>
  </head>
  <body>
    <div id="content"></div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
      document.getElementById("content").innerHTML = marked(
        "# Marked in browser\n\nRendered by **marked**."
      );
    </script>
  </body>
</html>
```

`marked` 中的字符串会被转换成 `html` 标签，显示在 `div` 中。因此我们可以将项目中对外暴漏的 开发文档以 md 文件书写，然后再网页中显示出来。统一数据中心中就采用了这种方式，接下来说一下具体实现。

### 方法解析

**marked(markdownString [,options][,callback])**

- `markdownString` string 类型 - 要编译的 markdown 源码（md 文件字符串）。
- `options` object 类型 - 选项，也可以使用 marked.setOptions 方法设置。
- `callback` function 类型 - 当 `markdownString` 已经被完全的异步解析完毕会调用这个函数。如果 `options` 参数被省略，这个可以作为第二个参数。

这里介绍几个重要的配置项，其他的可以去官网查看。

**highlight**

function 类型，代码高亮的回调函数。有三个参数

- `code` string 类型 - 传给 highlighter 的代码块。
- `lang` string 类型 - 代码块中指定的编程语言。
- `callback` function 类型 - 当使用一个异步 highlighter 时要调用这个回调函数。

下面是使用 highlight.js 代码高亮的例子：

```js
import hljs from "highlight.js";

marked.setOptions({
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  langPrefix: "hljs language-",
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
```

**renderer**
object 类型 - 默认为 new Renderer()。一个 Object，包含了渲染为 HTML 的函数。这里最主要的用户是自定义渲染结果。

重写 `renderer` 方法。
renderer 选项允许你使用自定义样式进行渲染。这里有一个重写标题标记渲染的例子，给标题一个 id，方便后续滚动操作：

```js
const renderer = {
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return `<h${level} id="${slugger.slug(raw)}" class="docs-h" >${text}</h${level}> \n`;
    }
  },
  // TODO md 图片资源路径重写增加md-docs前缀
  // image(href) {
  //   console.log(href);
  //   return `!${href}!`;
  // },
};

marked.use({ renderer });
```

## 具体实现

首先先安装`npm install marked -s`。
然后新建 `sdk-docs.vue` 页面

### 页面布局

```html
<template>
  <div class="container">
    <div class="docs-container">
      <!-- 文章内容区域 -->
      <el-scrollbar ref="scrollbar" id="scrollbar-wrapper" wrap-class="scrollbar-wrapper">
        <el-main id="helpDocs" @scroll.native="docsScroll" ref="helpDocs">
          <div class="docs-content" @scroll="docsScroll" v-html="compiledMd"></div>
        </el-main>
      </el-scrollbar>
    </div>
    <!-- 文章标题 -->
    <el-aside class="right-aside" width="210px">
      <!-- 存放标题 -->
    </el-aside>
  </div>
</template>

<script>
  export default {
    name: "zcs-vue",
    props: {},
    data() {
      return {
        compiledMd: "", //
        navList: [],
        activeIndex: 0,
        treeKey: "",
      };
    },
    computed: {},
    created() {},
    methods: {},
  };
</script>

<style scoped lang="scss"></style>
```

### 编译 md 文件

```js
export default {
  methods: {
    async getMdFile() {
      let vm = this;
      let data = await fetch.getMdFile("./md-docs/electron-windows.md");
      this.compiledMd = marked(data);
    },
  },
};
```

### html 样式

md 文件编译后默认是没有样式的，需要我们自己实现样式，样式代码如下

```css
.docs-content {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #2c3e50;
  code,
  kbd,
  .line-number {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    line-height: 1.7;
  }
  p,
  ul,
  ol {
    line-height: 1.7;
  }
  ul,
  ol {
    padding-left: 1.2em;
  }
  ul {
    list-style-type: disc;
    ul {
      list-style-type: circle;
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }

  ol {
    list-style-type: decimal;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  a {
    color: #2196f3;
  }
  img {
    max-width: 100%;
  }
  pre {
    line-height: 1.4;
    padding: 1.25rem 1.5rem;
    margin: 0.85rem 0;
    background-color: #282c34;
    border-radius: 6px;
    overflow: auto;
  }
  table {
    border-collapse: collapse;
    margin: 1rem 0;
    display: block;
    overflow-x: auto;
    tr {
      border-top: 1px solid #dfe2e5;
    }
    tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    th,
    td {
      border: 1px solid #dfe2e5;
      padding: 0.6em 1em;
    }
  }
}
```

### 代码高亮

这时候预览已经很好看了，但是代码还是一堆灰色，颜色都一样，我们给他增加一下代码高亮。高亮样式采用`atom-one-dark.css`。

```js
import hljs from "highlight.js";
// import "highlight.js/styles/github.css";
import "highlight.js/styles/atom-one-dark.css";
export default {
  methods: {
    async getMdFile() {
      let vm = this;
      let data = await fetch.getMdFile("./md-docs/electron-windows.md");
      marked.setOptions({
        // renderer: new marked.Renderer(),

        highlight: function(code, language) {
          const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
          return hljs.highlight(validLanguage, code).value;
        },
        langPrefix: "hljs language-",
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
      });
      this.compiledMd = marked(data);
    },
  },
};
```

注意事项:

- langPrefix 一定要设置有 "hljs ",因为 css 样式中命名空间是 hljs

### 提取标题

接下来我们要提取 md 文件中的标题来当作文章菜单导航，我思考了下有以下几种方式。

1. 对 md 源文件进行正则匹配获取标题
2. 获取渲染后的 html 内容中的 h 标签
3. 自定义渲染 标题并获取标题

第二中要渲染完成后才能获取标题，速度慢，放弃，第一种方式自己写正则，容易出错，最后放弃。最后选择自定义渲染标题获取，一边获取标题，一边渲染文件，渲染完文件，标题也获取完成了。
我们改写下 marked renderer

```js
export default {
  methods: {
    async getMdFile() {
      let vm = this;
      let data = await fetch.getMdFile("./md-docs/electron-windows.md");

      const renderer = {
        heading(text, level, raw, slugger) {
          if (this.options.headerIds) {
            // 提取标题放在 this上
            vm.navList.push({
              title: slug(raw),
              level: level,
              id: slug(raw),
            });
            // 自定义标题，和菜单标题匹配
            return `<h${level} id="${slugger.slug(raw)}" class="docs-h" >${text}</h${level}> \n`;
          }
        },
      };

      marked.use({ renderer });
      this.compiledMd = marked(data);
    },
  },
};
```

**渲染标题导航**
'nav-item--h' + nav.level 表示标题级别
activeIndex 表示高亮的标题

```html
<el-aside class="right-aside" width="210px">
  <div class="artice-title-container">
    <div
      v-for="nav in navList"
      :key="nav.id"
      class="nav-item"
      :class="[activeIndex == nav.id ? 'active-link' : '', 'nav-item--h' + nav.level]"
      :id="getId(nav.id)"
      :title="nav.title"
      @click="pageJump(nav)"
    >
      <a>
        {{ nav.title }}
      </a>
    </div>
  </div>
</el-aside>
```

导航标题点击事件

```js
export default {
  methods: {
    pageJump(nav) {
      this.activeIndex = nav.id;
      let escapedText = slug(nav.title);

      var hashElement = document.getElementById(escapedText);
      if (hashElement) {
        // 不能使用锚点，使用scrollIntoView 平缓滚动
        hashElement.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
```

### 文章滚动

点击导航标题，文档会滚动到指定内容区域。文章滚动浏览的时候，导航标题也要高亮对应的标题。给文档增加滚动事件

```js
export default {
  methods: {
    handleScroll() {
      // 因为这里使用了element 的scrollbar 组件，直接监听不起作用，必须这样写
      let el = this.$refs.scrollbar.wrap;
      el.onscroll = this.docsScroll;
    },
    docsScroll() {
      let helpDocs = document.getElementsByClassName("scrollbar-wrapper")[1];
      let scollTop = helpDocs.scrollTop;
      let title = document.querySelectorAll(".docs-h");
      let navItem = document.querySelectorAll(".nav-item");

      // 计算标题据顶部的距离,当大于等于0 并小于100说明标题在顶部
      for (let i = 0; i < title.length; i++) {
        let offsetTop = title[i].offsetTop;
        let calcTop = offsetTop - scollTop;
        if (calcTop >= 0 && calcTop < 100) {
          for (let j = 0; j < title.length; j++) {
            // navItem[j].className = "nav-item";
            removeClass(navItem[j], "active-link");
          }
          console.log(i);
          // 第一个在可视区的元素
          let navEl = document.querySelector("#nav_" + title[i].id);
          // navEl.className = navEl.className + " active-link ";
          addClass(navEl, "active-link");
          break;
        }
      }
    },
  },
  mounted() {
    this.handleScroll();
  },
};
```

至此，所以的实现思路基本完成了。
