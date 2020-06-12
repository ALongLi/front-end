/*
 * @description:
 * @Author: lal
 * @Date: 2020-01-04 16:04:03
 * @LastEditors: lal
 * @LastEditTime: 2020-06-12 11:33:19
 */
module.exports = {
  title: "knowledge",
  description: "前端技术积累",
  head: [
    ["link", { rel: "icon", href: `/favicon.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["link", { rel: "apple-touch-icon", href: `/icons/apple-touch-icon-152x152.png` }],
    ["link", { rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", color: "#3eaf7c" }],
    ["meta", { name: "msapplication-TileImage", content: "/icons/msapplication-icon-144x144.png" }],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  themeConfig: {
    smoothScroll: true,
    nav: [
      {
        text: "front-end",
        items: [
          { text: "javascript", link: "/javaScript/" },
          { text: "vue", link: "/vue/" },
          { text: "problem2solve", link: "/problem2solve/" },
          // { text: "vue-manager", link: "/vue2manager/" },
          { text: "vue-standards", link: "/vue2standards/" },
          { text: "electron", link: "/electron/" },
        ],
      },
      { text: "Project", link: "/Project/" },
      { text: "Resume", link: "/Resume/" },
    ],
    sidebar: {
      "/javaScript/": ["", "数组去重", "urlSearchParams"],
      "/vue/": [
        {
          title: "vue核心知识",
          collapsable: false,
          sidebarDepth: 2,
          children: [
            // "",
            "vue组件通信",
          ],
        },
        // "vue组件通信",
        "ElScrollbar",
      ],
      "/problem2solve/": [
        {
          title: "问题及解决方法",
          collapsable: false,
          children: [
            // "",
            "前端文件下载",
            "node-sass下载失败",
            "element样式更改失效",
            "更改数组的length为何生效了",
            "浏览器顶部进度条",
            "mock",
            "mobile-rem",
            "echarts按需加载",
            "移动端之骨架屏",
            "pc大屏自适应",
          ],
        },
      ],
      "/vue2manager/": [
        {
          title: "基础",
          collapsable: false,
          children: ["", "Layout", "sideNav"],
        },
      ],
      "/vue2standards/": [
        {
          title: "正文(持续更新...)",
          collapsable: false,
          children: [
            "",
            "filterAndDirective",
            "chartAndIcon",
            "stylesheet",
            "ESLint",
            "debounce",
            "promise",
            "reactiveData",
            "gitcommit",
            "oa",
            "oaBuild",
            "deploy",
          ],
        },
      ],
      "/electron/": [
        {
          title: "正文(持续更新...)",
          collapsable: false,
          children: ["", "electron-quick-start", "electron-process", "electron-demo"],
        },
      ],
    },
  },
  plugins: [
    "vuepress-plugin-cat",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
  ],
  base: "/front-end/",
};
