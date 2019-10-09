# 侧边栏导航

单页的后台管理系统侧边栏导航几乎都是和路由绑定的，点击侧边导航显示不同的路由，侧边栏导航使用的是对`element ui`中的菜单导航组件的二次封装，
只要给菜单导航数据，侧边栏就能动态的生成了。大大减轻了手动重复编辑侧边栏的工作量。当然菜单数据需要遵守一些约定。

## 数据配置项

```javascript
const menuList = [
  {
    // 子路由，没有为空，有就渲染子路由
    children: [],
    description: "",
    // 后台存储的菜单导航唯一 id
    funcId: "bfunc10",
    // 路由视图的router-link,若有子路由为空
    href: "/home",
    // 一级菜单显示的图标
    icon: "iconshouye",
    // 导航菜单显示的 label 文案 需要与路由配置项中的 title一样 meta: {title: "mock数据"},
    label: "首页",
    type: null
  },
  {
    children: [
      {
        children: [],
        description: "",
        funcId: "bfunc1004",
        href: "/components/drag-dialog",
        icon: "",
        label: "DragDialogDemo"
      },
      {
        children: [],
        description: "",
        funcId: "components1004",
        href: "/components/click-outside",
        icon: "",
        label: "clickOutside"
      }
    ],
    description: "",
    funcId: "bfunc110",
    href: "",
    icon: "iconzujian",
    label: "组件",
    type: null
  },
  {
    children: [
      {
        children: [],
        description: "",
        funcId: "bfunc1004",
        href: "/setting/user",
        icon: "",
        label: "用户设置",
        type: null
      }
    ],
    description: "",
    funcId: "bfunc10",
    href: "",
    icon: "iconshezhi",
    label: "系统设置",
    type: null
  },
  {
    children: [
      {
        children: [
          {
            children: [],
            description: "",
            funcId: "bfunc40021",
            href: "/nested/menu1/menu1-1",
            icon: "",
            label: "菜单1-1",
            type: null
          },
          {
            description: "",
            funcId: "bfunc40021",
            href: "",
            icon: "",
            label: "菜单1-2",
            type: null,
            children: [
              {
                children: [],
                description: "",
                funcId: "bfunc40021",
                href: "/nested/menu1/menu1-2/menu1-2-1",
                icon: "",
                label: "菜单1-2-1",
                type: null
              },
              {
                children: [],
                description: "",
                funcId: "bfunc40021",
                href: "/nested/menu1/menu1-2/menu1-2-2",
                icon: "",
                label: "菜单1-2-2",
                type: null
              }
            ]
          }
        ],
        description: "",
        funcId: "bfunc4002",
        href: "",
        icon: "",
        label: "菜单1"
      },
      {
        children: [],
        description: "",
        funcId: "bfunc4002",
        href: "/nested/menu2",
        icon: "",
        label: "菜单2"
      }
    ],
    description: "",
    funcId: "bfunc40",
    href: "",
    icon: "iconcaidan",
    label: "多级菜单",
    type: null
  },
  {
    children: [
      {
        children: [],
        description: "",
        funcId: "bfunc40021",
        href: "/mock/table",
        icon: "",
        label: "表格"
      }
    ],
    description: "",
    funcId: "bfunc401",
    href: "",
    icon: "iconcaidan",
    label: "mock数据",
    type: null
  }
];
```

## 使用

封装了 el-menu-item ，只需要引入 sidebar-item ，将所需属性传给它就行了

```html
<el-menu
  :default-active="onRoutes"
  class="el-menu-vertical-demo"
  :background-color="variables.menuBg"
  :text-color="variables.menuText"
  :active-text-color="variables.menuActiveText"
  :collapse="isCollapse"
  unique-opened
>
  <!--el-menu 不配置 router 属性 自行 click 实现路由切换-->
  <template v-for="(item, index) in menuList">
    <!-- 封装的递归组件 children 有值就递归渲染 menu-item  -->
    <sidebar-item :key="index" :item="item" />
  </template>
</el-menu>
```

## sidebar-item

这是封装的 em-menu-item 里面用的是固定值，`label` , `icon` , `children` , `funcId` , 所以必须是这些字段

```html
<template>
  <el-submenu v-if="item.children.length" :index="item.funcId">
    <template slot="title">
      <i v-if="item.icon" class="icon iconfont el-icon-" :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </template>
    <template v-for="(m, i) in item.children">
      <sidebar-item :key="i" :item="m" class="nest-menu" />
    </template>
  </el-submenu>
  <el-menu-item :index="item.href" v-else @click="clickRouter(item)">
    <i v-if="item.icon" class="icon iconfont el-icon-" :class="item.icon"></i>
    <span slot="title">{{ item.label }}</span>
  </el-menu-item>
</template>
```

## 点击侧边栏，跳转与刷新路由

spa(单页应用)有一个小缺陷，就是用户点击当前高亮的路由并不会刷新 view，因为 vue-router 会拦截你的路由，它判断你的 url 并没有任何变化，所以它不会触发任何钩子或者是 view 的变化（api 原理就是这）。在公司做的第一个 vue 项目济源农商行就遇到了这个问题，当时是加个时间戳。

```javascript
clickRouter(item) {
  this.$router.push({
    path:item.href
    query: {
      t: Date.now() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
    }
  })
}
```

现在采取的方案是判断当前点击的菜单路由和当前的路由是否一致，一致的时候，会先跳转到一个专门 Redirect 的页面，它会将路由重定向到我想去的页面，这样就起到了刷新的效果了。

```javascript
 // 侧边栏点击事件，切换路由
clickRouter(item) {
    const { fullPath } = this.$route;
    if (item.href == fullPath) {
        //hack vue-router 再次点击不会刷新的缺陷
        this.$router.replace({
        path: "/redirect" + fullPath
        });
    } else {
        // 跳转其他路由
        this.$router.push({
        path: item.href
        });
    }
}
```

## redirect

redirect 页面在重定向回原始页面
`view/redirect/index.vue`

```html
<script>
  export default {
    created() {
      const { params, query } = this.$route;
      const { path } = params;
      this.$router.replace({ path: "/" + path, query });
    },
    render: function(h) {
      return h(); // avoid warning message
    }
  };
</script>
```
