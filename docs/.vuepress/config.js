module.exports = {
  title: "knowledge",
  description: "花里胡哨",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    nav: [
      {
        text: "Blog",
        items: [
          { text: "javascript", link: "/javaScript/" },
          { text: "vue", link: "/vue/" },
          { text: "problem2solve", link: "/problem2solve/" },
          { text: "vue-manager", link: "/vue2manager/" },
          { text: "vue-standards", link: "/vue2standards/" }
        ]
      },
      { text: "Project", link: "/Project/" },
      { text: "Resume", link: "/Resume/" }
    ],
    sidebar: {
      "/javaScript/": ["", "数组去重", "urlSearchParams"],
      "/vue/": ["", "vue组件通信", "ElScrollbar"],
      "/problem2solve/": [
        "",
        "前端文件下载",
        "node-sass下载失败",
        "element样式更改失效",
        "更改数组的length为何生效了",
        "浏览器顶部进度条",
        "mock",
        "mobile-rem",
        "echarts按需加载",
        "移动端之骨架屏"
      ],
      "/vue2manager/": [
        {
          title: "基础",
          collapsable: false,
          children: ["", "Layout", "sideNav"]
        }
      ],
      "/vue2standards/": [
        {
          title: "起步",
          collapsable: false,
          children: [
            "",
            "filterAndDirective",
            "chartAndIcon",
            "stylesheet",
            "ESLint"
          ]
        }
      ]
    }
  },
  plugins: ["vuepress-plugin-cat"],
  base: "/blog/"
};
