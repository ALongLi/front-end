module.exports = {
  title: "blog",
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
          { text: "vue-manager", link: "/vue2manager/" }
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
        "浏览器顶部进度条"
      ],
      "/vue2manager/": [
        {
          title: "基础",
          collapsable: false,
          children: ["", "Layout"]
        }
      ]
    }
  },
  plugins: ["vuepress-plugin-cat"],
  base: "/blog/"
};
